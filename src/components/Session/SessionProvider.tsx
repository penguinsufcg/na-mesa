import { updateTableStatus } from '@/api/tables'
import { useFirestoreObjectQuery } from '@/hooks/useFirestoreObjectQuery'
import { SessionContext } from '@/hooks/useSession'
import { createSession, getSession } from 'api/session'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { generateRandomCode } from 'utils/codeGenerator'

type SessionContextProps = {
  children: ReactNode
}

function SessionProvider({ children }: SessionContextProps): JSX.Element {
  const [session, setSession] = useState<EntityWithID<Session> | null>(null)
  const [sessionRef, setSessionRef] = useState<Reference<Session> | null>(null)
  const [sessionId, setSessionId] = useState<string | undefined>(undefined)
  const { data, isLoading } = useFirestoreObjectQuery<Session>(
    `sessions/${sessionId}`,
    [sessionId],
  )
  const router = useRouter()

  const closeSession = () => {
    localStorage.clear()

    setSessionId(undefined)
    setSession(null)
    setSessionRef(null)

    router.push('/logout')
  }

  const logout = () => {
    setSessionId(undefined)
    setSession(null)
    setSessionRef(null)
  }

  const getSessionLocal = () => {
    const sessionId = localStorage.getItem('sessionId')

    return sessionId
  }

  const createNewSession = async ({
    table,
    client,
  }: {
    table: string
    client: string
  }) => {
    const secretCode = generateRandomCode()

    const { session, sessionRef } = await createSession({
      code: secretCode.toString(),
      client,
      orders: [],
      table,
      status: 'ACTIVE',
      openTime: new Date().toISOString(),
    })

    if (!session) {
      throw new Error('Error creating session')
    }
    await updateTableStatus({
      id: table,
      currentSession: sessionRef,
      newStatus: 'OCCUPIED',
    })
    setSession(session)
    setSessionRef(sessionRef)

    return session?.code
  }

  const joinSession = ({ sessionId }: { sessionId: string }) => {
    setSessionId(sessionId)
  }

  useEffect(() => {
    const updateSessionRef = async (sessionId: string) => {
      const sessionRef = await getSession(sessionId)
      setSessionRef(sessionRef)
    }

    const sessionId = getSessionLocal()

    if (!sessionId) {
      return
    }

    updateSessionRef(sessionId)
    setSessionId(sessionId)
  }, [])

  useEffect(() => {
    if (!data) {
      return
    }

    setSession(data)
  }, [data])

  useEffect(() => {
    if (!session) {
      return
    }

    localStorage.setItem('sessionId', session.id)
    setSessionId(session.id)
  }, [session])

  useEffect(() => {
    if (session?.status === 'FINISHED') {
      closeSession()
    }
  }, [session])

  const context = useMemo(
    () => ({
      session,
      sessionRef,
      isLogged: sessionId && sessionId !== 'undefined' ? true : false,
      underPayment: session?.status == 'PAYMENT',
      isLoading,
      createNewSession,
      joinSession,
      logout,
    }),
    [session, sessionRef, sessionId, isLoading],
  )

  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider

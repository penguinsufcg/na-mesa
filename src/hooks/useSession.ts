import React, { Context, useContext } from 'react'

type SessionContextProps = {
  isLoading: boolean
  session?: EntityWithID<Session> | null,
  isLogged: boolean,
  createNewSession?: (params: {table: string, client: string }) => Promise<string>
  joinSession?: (params: { sessionId: string }) => void
}

export const SessionContext: Context<SessionContextProps> =
  React.createContext<SessionContextProps>({
    session: null,
    isLogged: false,
    isLoading: false,
  })

const useSession = (): SessionContextProps =>  {
  const context = useContext<SessionContextProps>(SessionContext)

  if (!context) {
    throw new Error('Do not use Session outside of context')
  }
  
  return context
}

export default useSession

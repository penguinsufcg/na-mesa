import React, { Context, useContext } from 'react'

type SessionContextProps = {
  client: string | null
  code: string
  orders: []
  table: string | null
}

export const SessionContext: Context<SessionContextProps> =
  React.createContext<SessionContextProps>({
    client: null,
    code: '',
    orders: [],
    table: null,
  })

const useSessionContext = (): SessionContextProps =>
  useContext<SessionContextProps>(SessionContext)

export default useSessionContext

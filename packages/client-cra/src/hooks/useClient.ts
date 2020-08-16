import { useState, createContext } from 'react'
import { Client } from 'colyseus.js'

export interface IClientContext<T> {
  client?: T
  setClient: (client: T) => void
}

export const useNewClientContext = (): IClientContext<Client> => {
  const [client, setClient] = useState<Client>()
  return { client, setClient }
}

const defaultClientContext: IClientContext<Client> = {
  client: undefined,
  setClient: (client: Client) => {},
}

export const ClientContext = createContext<IClientContext<Client>>(
  defaultClientContext,
)

import { useState, createContext } from 'react'
import { Client, Room } from 'colyseus.js'
import { State } from '@pixatore/game'

export interface IGameContext<TClient, TRoom> {
  client?: TClient
  room?: TRoom
  gameEngine: any
  setClient: (client: TClient) => void
  setRoom: (room: TRoom) => void
  createGameEngine: () => void
}

const defaultGameContext: IGameContext<Client, Room<State.GameState>> = {
  client: undefined,
  room: undefined,
  gameEngine: undefined,
  setClient: (client: Client) => {},
  setRoom: (room: Room<State.GameState>) => {},
  createGameEngine: () => {},
}

export const useNewGameContext = (): IGameContext<
  Client,
  Room<State.GameState>
> => {
  const [client, setClient] = useState<Client>()
  return { ...defaultGameContext, client, setClient }
}

export const GameContext = createContext<
  IGameContext<Client, Room<State.GameState>>
>(defaultGameContext)

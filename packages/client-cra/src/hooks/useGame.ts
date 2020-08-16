import { useState, createContext } from 'react'
import { Client, Room } from 'colyseus.js'
import { State } from '@pixatore/game'
import { GameEngine } from '../engine/GameEngine'

export interface IGameContext<TClient, TRoom> {
  client?: TClient
  room?: TRoom
  gameEngine: any
  setClient: (client: TClient) => void
  setRoom: (room: TRoom) => void
}

const defaultGameContext: IGameContext<Client, Room<State.GameState>> = {
  client: undefined,
  room: undefined,
  gameEngine: undefined,
  setClient: (client: Client) => {},
  setRoom: (room: Room<State.GameState>) => {},
}

export const useNewGameContext = (): IGameContext<
  Client,
  Room<State.GameState>
> => {
  const [client, setClient] = useState<Client>()
  const [room, _setRoom] = useState<Room<State.GameState>>()
  const [gameEngine, setGameEngine] = useState<GameEngine>()

  const setRoom = (room: Room<State.GameState>) => {
    _setRoom(room)
    setGameEngine(new GameEngine(room))
  }

  return { ...defaultGameContext, client, gameEngine, room, setClient, setRoom }
}

export const GameContext = createContext<
  IGameContext<Client, Room<State.GameState>>
>(defaultGameContext)

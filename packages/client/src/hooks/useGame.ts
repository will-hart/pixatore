import { useState, createContext, useCallback, useEffect, useRef } from 'react'
import { Client, Room } from 'colyseus.js'
import debug from 'debug'

import { State } from '@pixatore/game'
import { GameEngine } from '../engine/GameEngine'
import { useAnimationTimer } from './useAnimationTimer'

const log = debug('PX:APP:Hooks     :useGame   ')
log.log = console.log.bind(console)

export interface IGameContext<TClient, TRoom> {
  client?: TClient
  lastFps?: number
  room?: TRoom
  gameEngine?: GameEngine
  setClient: (client: TClient) => void
  setRoom: (room: TRoom) => void
  stopLoop: () => void
}

const defaultGameContext: IGameContext<Client, Room<State.GameState>> = {
  client: undefined,
  lastFps: undefined,
  room: undefined,
  gameEngine: undefined,
  setClient: (client: Client) => {},
  setRoom: (room: Room<State.GameState>) => {},
  stopLoop: () => {},
}

export const useNewGameContext = (): IGameContext<
  Client,
  Room<State.GameState>
> => {
  const [client, setClient] = useState<Client>()
  const [room, _setRoom] = useState<Room<State.GameState>>()
  const [gameEngine, setGameEngine] = useState<GameEngine>()
  const [lastFps, setLastFps] = useState<number>(1)

  const frameElapsed = useAnimationTimer(!gameEngine)
  const lastFrameTime = useRef<number>(0)

  // game loop
  useEffect(() => {
    if (!gameEngine) return

    const delta = frameElapsed - lastFrameTime.current
    setLastFps(1000 / delta)
    gameEngine?.tick(delta)

    lastFrameTime.current = frameElapsed
  }, [gameEngine, frameElapsed, setLastFps])

  const setRoom = useCallback(
    (room: Room<State.GameState>) => {
      _setRoom(room)

      const gameEngine = new GameEngine(room)
      setGameEngine(gameEngine)
    },
    [_setRoom, setGameEngine],
  )

  return {
    ...defaultGameContext,
    client,
    gameEngine,
    lastFps,
    room,
    setClient,
    setRoom,
  }
}

export const GameContext = createContext<
  IGameContext<Client, Room<State.GameState>>
>(defaultGameContext)

import { useState, createContext, useCallback, useEffect, useRef } from 'react'
import * as ECS from '@pixatore/ecs'
import { Client, Room } from 'colyseus.js'
import debug from 'debug'

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

const defaultGameContext: IGameContext<Client, Room<ECS.World>> = {
  client: undefined,
  lastFps: undefined,
  room: undefined,
  gameEngine: undefined,
  setClient: (client: Client) => {},
  setRoom: (room: Room<ECS.World>) => {},
  stopLoop: () => {},
}

export const useNewGameContext = (): IGameContext<Client, Room<ECS.World>> => {
  const [client, setClient] = useState<Client>()
  const [room, _setRoom] = useState<Room<ECS.World>>()
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
    (room: Room<ECS.World>) => {
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

export const GameContext = createContext<IGameContext<Client, Room<ECS.World>>>(
  defaultGameContext,
)

import { useState, useCallback } from 'react'
import debug from 'debug'
import { Client, Room } from 'colyseus.js'
import * as ECS from '@pixatore/ecs'
import { Constants } from '@pixatore/game'
import { useLocalStorage } from './useLocalStorage'

const log = debug('PX:APP:Hooks     :useRoomOps')
log.log = console.log.bind(console)

export const useRoomOperations = (client?: Client) => {
  const [room, setRoom] = useState<Room<ECS.World>>()
  const [error, setError] = useState<string | null>(null)

  const {
    value: lastRoomId,
    setValue: setLastRoomId,
    clearValue: clearLastRoomId,
  } = useLocalStorage<string>(Constants.LOCALSTORAGE_LAST_ROOM_KEY, '')

  const {
    value: lastSessionId,
    setValue: setLastSessionId,
    clearValue: clearLastSessionId,
  } = useLocalStorage<string>(Constants.LOCALSTORAGE_LAST_ROOM_KEY, '')

  const afterConnect = useCallback(
    async (room?: Room<ECS.World>, error?: Error) => {
      if (error) {
        log('Error connecting %o', error)
        setError(error.message)
        setRoom(undefined)
        return
      }

      if (!room) {
        log('Error connecting - no room found. Error - %o', error)
        setError('No room found')
        setRoom(undefined)
        return
      }

      log(`joined ${room.id} on ${room.name}`)
      setLastRoomId(room.id)
      setLastSessionId(room.sessionId)
      setError(null)
      setRoom(room)
    },
    [setLastRoomId, setLastSessionId, setError, setRoom],
  )

  const joinGame = useCallback(
    async (roomId: string) => {
      if (!client) return

      try {
        log(`joining room ${roomId}`)
        const room = await client.joinById(roomId, {}, ECS.World)
        await afterConnect(room)
      } catch (e) {
        await afterConnect(undefined, e)
      }
    },
    [afterConnect, client],
  )

  const createGame = useCallback(async () => {
    if (!client) return

    try {
      log('creating new game...')
      const room = await client.create(Constants.GAME_ROOM_NAME, {}, ECS.World)
      await afterConnect(room)
    } catch (e) {
      await afterConnect(undefined, e)
    }
  }, [afterConnect, client])

  const reconnect = useCallback(async () => {
    if (!client) return

    if (!lastRoomId || !lastSessionId) {
      await afterConnect(undefined, {
        name: 'Reconnection Error',
        message: 'Unable to reconnect - no stored details',
      })
      return
    }

    try {
      log('reconnecting to room %s with session %s', lastRoomId, lastSessionId)
      const room = await client.reconnect(lastRoomId, lastSessionId, ECS.World)
      afterConnect(room)
    } catch (e) {
      // TODO: be smarter here
      // TODO: expire reconnection after a period of disconnect?
      log('Failed to reconnect, clearing session storage')
      await afterConnect(undefined, e)
      clearLastRoomId()
      clearLastSessionId()
    }
  }, [
    afterConnect,
    clearLastRoomId,
    clearLastSessionId,
    client,
    lastRoomId,
    lastSessionId,
  ])

  return {
    createGame,
    error,
    joinGame,
    lastRoomId,
    reconnect,
    room,
  }
}

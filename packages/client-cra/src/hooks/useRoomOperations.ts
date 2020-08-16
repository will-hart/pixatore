import { useState, useEffect, useCallback } from 'react'
import debug from 'debug'
import { Client, Room } from 'colyseus.js'
import { Constants, State } from '@pixatore/game'
import { useLocalStorage } from './useLocalStorage'

const log = debug('PX:APP:Hooks     :useRoomOps')
log.log = console.log.bind(console)

export const useRoomOperations = (client?: Client) => {
  const [room, setRoom] = useState<Room<State.GameState>>()
  const [canReconnect, setCanReconnect] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [lastRoomId, setLastRoomId, clearLastRoomId] = useLocalStorage<string>(
    Constants.LOCALSTORAGE_LAST_ROOM_KEY,
    '',
  )
  const [lastSessionId, setLastSessionId, clearLastSessionId] = useLocalStorage<
    string
  >(Constants.LOCALSTORAGE_LAST_ROOM_KEY, '')

  // update the connetion status based on the stored room ID
  useEffect(() => {
    setCanReconnect(!!lastRoomId)
  }, [lastRoomId])

  const afterConnect = useCallback(
    async (room?: Room<State.GameState>, error?: Error) => {
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
      setLastSessionId(Constants.LOCALSTORAGE_LAST_SESSION_KEY, room.sessionId)
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
        const room = await client.joinById(roomId, {}, State.GameState)
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
      const room = await client.create(
        Constants.GAME_ROOM_NAME,
        {},
        State.GameState,
      )
      await afterConnect(room)
    } catch (e) {
      await afterConnect(undefined, e)
    }
  }, [afterConnect, client])

  const reconnect = useCallback(async () => {
    if (!client) return

    if (!canReconnect) {
      await afterConnect(undefined, {
        name: 'Reconnection Error',
        message: 'Unable to reconnect',
      })
      return
    }

    try {
      log('reconnecting to room %s with session %s', lastRoomId, lastSessionId)
      const room = await client.reconnect(
        lastRoomId,
        lastSessionId,
        State.GameState,
      )
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
    canReconnect,
    clearLastRoomId,
    clearLastSessionId,
    client,
    lastRoomId,
    lastSessionId,
  ])

  return {
    canReconnect,
    createGame,
    error,
    joinGame,
    reconnect,
    room,
  }
}

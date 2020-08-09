import { ref, Ref, shallowRef } from 'vue'
import { RoomAvailable, Client, Room } from 'colyseus.js'
import { Constants, State } from '@pixatore/game'

import debug from 'debug'
import { useGameEngine } from './useGameEngine'
import { GameEngine } from '@/engine/GameEngine'
const log = debug('App:Composables:useClientRoomQueries')
log.log = console.log.bind(console)

interface IUseClientRoomQueriesReturnValue {
  roomList: Ref<RoomAvailable<State.GameState>[]>
  getRoomList: (client: Client) => Promise<void>
  roomListLoading: Ref<boolean>
  lastRoom: Ref<string | null>
  lastSession: Ref<string | null>
  lobbyStatus: Ref<'idle' | 'connected' | 'error'>
  joinGame: (client: Client, roomId: string) => Promise<void>
  createGame: (client: Client) => Promise<void>
  reconnect: (
    client: Client,
    roomId: string,
    sessionId: string,
  ) => Promise<void>
}

export function useClientRoomQueries(): IUseClientRoomQueriesReturnValue {
  const roomList = shallowRef<RoomAvailable<State.GameState>[]>([])
  const lobbyStatus = ref<'idle' | 'connected' | 'error'>('idle')
  const roomListLoading = ref(false)
  const getRoomList = async (client: Client) => {
    roomListLoading.value = true

    try {
      const rooms =
        (await client.getAvailableRooms<State.GameState>(
          Constants.GAME_ROOM_NAME,
        )) || []
      roomList.value = [...rooms]
    } catch (err) {
      console.error(err)
    } finally {
      roomListLoading.value = false
    }
  }

  const lastRoom = ref(
    localStorage.getItem(Constants.LOCALSTORAGE_LAST_ROOM_KEY),
  )
  const lastSession = ref(
    localStorage.getItem(Constants.LOCALSTORAGE_LAST_SESSION_KEY),
  )

  const { setGameEngine } = useGameEngine()

  const onConnect = (room: Room<State.GameState>) => {
    log(`joined ${room.id} on ${room.name}`)

    const gameEngine = new GameEngine(room)
    setGameEngine(gameEngine)

    lastRoom.value = room.id
    localStorage.setItem(Constants.LOCALSTORAGE_LAST_ROOM_KEY, room.id)

    lastSession.value = room.sessionId
    localStorage.setItem(
      Constants.LOCALSTORAGE_LAST_SESSION_KEY,
      room.sessionId,
    )

    lobbyStatus.value = 'connected'
  }

  const joinGame = async (client: Client, roomId: string) => {
    try {
      log(`joining room ${roomId}`)
      const room = await client.joinById<State.GameState>(roomId)
      onConnect(room)
    } catch (e) {
      console.error('[USE_CLIENT_ROOM_QUERIES] Join error', e)
      lobbyStatus.value = 'error'
    }
  }

  const createGame = async (client: Client) => {
    try {
      log('creating new game...')
      const room = await client.create<State.GameState>(
        Constants.GAME_ROOM_NAME,
        {},
      )
      onConnect(room)
    } catch (e) {
      log('Create room error %o', e)
      lobbyStatus.value = 'error'
    }
  }

  const reconnect = async (
    client: Client,
    roomId: string,
    sessionId: string,
  ) => {
    try {
      log('reconnecting to room %s with session %s', roomId, sessionId)
      const room = await client.reconnect<State.GameState>(roomId, sessionId)
      onConnect(room)
    } catch (e) {
      log('Error reconnecting %o', e)
      lobbyStatus.value = 'error'

      // session invalid, clear the storage
      // TODO: check for and handle specific errors
      lastRoom.value = null
      localStorage.removeItem(Constants.LOCALSTORAGE_LAST_ROOM_KEY)
      lastSession.value = null
      localStorage.removeItem(Constants.LOCALSTORAGE_LAST_SESSION_KEY)
    }
  }

  return {
    roomList,
    getRoomList,
    roomListLoading,
    lastRoom,
    lastSession,
    lobbyStatus,
    joinGame,
    reconnect,
    createGame,
  }
}

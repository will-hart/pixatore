import { ref, Ref, shallowRef } from 'vue'
import { RoomAvailable, Client, Room } from 'colyseus.js'
import { Constants, State } from '@pixatore/shared'

import { LobbyConnectionStatus } from '../gameEngine/scenes/ServerBrowserScene'
import { useRoom } from './useRoom'
import { mountEventBusToRoom } from './mountEventBusToRoom'
import { useEventBus } from './useEventBus'
import { useEngine } from './useGameEngine'

interface IUseClientRoomQueriesReturnValue {
  roomList: Ref<RoomAvailable<State.GameState>[]>
  getRoomList: (client: Client) => Promise<void>
  roomListLoading: Ref<boolean>
  lastRoom: Ref<string | null>
  lastSession: Ref<string | null>
  lobbyStatus: Ref<LobbyConnectionStatus>
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
  const lobbyStatus = ref<LobbyConnectionStatus>('idle')
  const eventBus = useEventBus()
  const engine = useEngine()
  const { setRoom } = useRoom()

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

  const onConnect = (room: Room<State.GameState>) => {
    console.log(`[USE_CLIENT_ROOM_QUERIES] joined ${room.id} on ${room.name}`)
    mountEventBusToRoom(eventBus, room)

    lastRoom.value = room.id
    localStorage.setItem(Constants.LOCALSTORAGE_LAST_ROOM_KEY, room.id)

    lastSession.value = room.sessionId
    localStorage.setItem(
      Constants.LOCALSTORAGE_LAST_SESSION_KEY,
      room.sessionId,
    )

    engine.subscribe(eventBus)
    setRoom(room)

    lobbyStatus.value = 'connected'
  }

  const joinGame = async (client: Client, roomId: string) => {
    try {
      console.log('[USE_CLIENT_ROOM_QUERIES] joining room...', roomId)
      const room = await client.joinById<State.GameState>(roomId)
      onConnect(room)
    } catch (e) {
      console.error('[USE_CLIENT_ROOM_QUERIES] Join error', e)
      lobbyStatus.value = 'error'
    }
  }

  const createGame = async (client: Client) => {
    try {
      console.log('[USE_CLIENT_ROOM_QUERIES] creating new game...')
      const room = await client.create<State.GameState>(
        Constants.GAME_ROOM_NAME,
        {},
      )
      onConnect(room)
    } catch (e) {
      console.error('[USE_CLIENT_ROOM_QUERIES] Create room error', e)
      lobbyStatus.value = 'error'
    }
  }

  const reconnect = async (
    client: Client,
    roomId: string,
    sessionId: string,
  ) => {
    try {
      console.log(
        '[USE_CLIENT_ROOM_QUERIES] reconnecting...',
        roomId,
        sessionId,
      )
      const room = await client.reconnect<State.GameState>(roomId, sessionId)
      onConnect(room)
    } catch (e) {
      console.error('[USE_CLIENT_ROOM_QUERIES] Error reconnecting', e)
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

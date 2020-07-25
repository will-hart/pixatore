import { ref, Ref, shallowRef } from 'vue'
import { RoomAvailable, Client } from 'colyseus.js'
import { Constants, State } from '@pixatore/shared'

import { LobbyConnectionStatus } from '../gameEngine/scenes/ServerBrowserScene'
import { useRoom } from './useRoom'
import { mountEventBusToRoom } from './mountEventBusToRoom'
import { useEventBus } from './useEventBus'

interface IUseClientRoomQueriesReturnValue {
  roomList: Ref<RoomAvailable<State.GameState>[]>
  getRoomList: (client: Client) => Promise<void>
  roomListLoading: Ref<boolean>
  lobbyStatus: Ref<LobbyConnectionStatus>
  joinGame: (client: Client, roomId: string) => Promise<void>
  createGame: (client: Client) => Promise<void>
}

export function useClientRoomQueries(): IUseClientRoomQueriesReturnValue {
  const roomList = shallowRef<RoomAvailable<State.GameState>[]>([])
  const lobbyStatus = ref<LobbyConnectionStatus>('idle')
  const eventBus = useEventBus()
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

  const joinGame = async (client: Client, roomId: string) => {
    try {
      const room = await client.join<State.GameState>(
        Constants.GAME_ROOM_NAME,
        { roomId },
      )

      console.log(`[USE_CLIENT_ROOM_QUERIES] joined ${room.id} on ${room.name}`)
      mountEventBusToRoom(eventBus, room)

      localStorage.setItem(Constants.LOCALSTORAGE_LAST_ROOM_KEY, room.id)
      setRoom(room)

      lobbyStatus.value = 'connected'
    } catch (e) {
      console.error('[USE_CLIENT_ROOM_QUERIES] Join error', e)
      lobbyStatus.value = 'error'
    }
  }

  const createGame = async (client: Client) => {
    try {
      const room = await client.create<State.GameState>(
        Constants.GAME_ROOM_NAME,
        {},
      )

      console.log(
        `[USE_CLIENT_ROOM_QUERIES] created ${room.id} on ${room.name}`,
      )
      mountEventBusToRoom(eventBus, room)

      localStorage.setItem(Constants.LOCALSTORAGE_LAST_ROOM_KEY, room.id)
      setRoom(room)

      lobbyStatus.value = 'connected'
    } catch (e) {
      console.error('[USE_CLIENT_ROOM_QUERIES] Create room error', e)
      lobbyStatus.value = 'error'
    }
  }

  return {
    roomList,
    getRoomList,
    roomListLoading,
    lobbyStatus,
    joinGame,
    createGame,
  }
}

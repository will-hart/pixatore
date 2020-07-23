import { ref, Ref, shallowRef } from 'vue'
import { RoomAvailable, Client } from 'colyseus.js'
import { Types, Constants } from '@tauri-game/shared'
import { LobbyConnectionStatus } from '../gameEngine/scenes/ServerBrowserScene'

interface IUseClientRoomQueriesReturnValue {
  roomList: Ref<RoomAvailable<Types.GameState>[]>
  getRoomList: (client: Client) => Promise<void>
  lobbyStatus: Ref<LobbyConnectionStatus>
  joinGame: (client: Client, roomId: string) => Promise<void>
  createGame: (client: Client) => Promise<void>
}

export function useClientRoomQueries(): IUseClientRoomQueriesReturnValue {
  const roomList = shallowRef<RoomAvailable<Types.GameState>[]>([])
  const lobbyStatus = ref<LobbyConnectionStatus>('idle')

  const getRoomList = async (client: Client) => {
    const rooms =
      (await client.getAvailableRooms<Types.GameState>(
        Constants.GAME_ROOM_NAME,
      )) || []

    roomList.value = [...rooms]
  }

  const joinGame = async (client: Client, roomId: string) => {
    try {
      const room = await client.join<Types.GameState>(
        Constants.GAME_ROOM_NAME,
        { roomId },
      )
      console.log(`[LOBBY] joined ${room.sessionId} on ${room.name}`)
      lobbyStatus.value = 'connected'
    } catch (e) {
      console.error('[LOBBY] JOIN ERROR', e)
      lobbyStatus.value = 'error'
    }
  }

  const createGame = async (client: Client) => {
    try {
      const room = await client.create<Types.GameState>(
        Constants.GAME_ROOM_NAME,
        {},
      )

      console.log(`[LOBBY] created ${room.sessionId} on ${room.name}`)
      lobbyStatus.value = 'connected'
    } catch (e) {
      console.error('[LOBBY] CREATE ERROR', e)
      lobbyStatus.value = 'error'
    }
  }

  return { roomList, getRoomList, lobbyStatus, joinGame, createGame }
}

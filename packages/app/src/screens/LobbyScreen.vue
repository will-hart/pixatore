<template>
  <div id="lobby-screen" class="container middle">
    <button v-if="status === 'idle'" @click="createGame">
      Create
    </button>

    <ul v-for="room in roomList" :key="room.roomId">
      <li>
        {{ room.roomId }} ({{ room.clients }} / {{ room.maxClients }})
        <button v-show="status === 'idle'" @click="joinGame(room.roomId)">
          Join
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, shallowRef, ref, watchEffect } from 'vue'
import { Client, RoomAvailable } from 'colyseus.js'

import Engine from '../gameEngine/Engine'
import LobbyScreen, {
  LobbyConnectionStatus,
} from '../gameEngine/screens/LobbyScreen'
import { Constants, Types } from '@tauri-game/shared'

export default defineComponent({
  name: 'LobbyScreen',

  setup() {
    // TODO be a bit smarter with this URL
    const client = shallowRef<Client>(new Client('ws://localhost:2567'))
    const roomList = shallowRef<RoomAvailable<Types.GameState>[]>([])
    const status = ref<LobbyConnectionStatus>('idle')
    const screen = shallowRef<LobbyScreen | null>(null)

    const getRoomList = async () => {
      const rooms = await client.value.getAvailableRooms<Types.GameState>(
        Constants.GAME_ROOM_NAME,
      )

      roomList.value = rooms
    }

    const joinGame = (roomId: string) => {
      client.value
        .join<Types.GameState>(Constants.GAME_ROOM_NAME, { roomId })
        .then((room) => {
          console.log(`[LOBBY] joined ${room.sessionId} on ${room.name}`)
          status.value = 'connected'
        })
        .catch((e) => {
          console.error('[LOBBY] JOIN ERROR', e)
          status.value = 'error'
        })
    }

    const createGame = () => {
      client.value
        .create<Types.GameState>(Constants.GAME_ROOM_NAME, {})
        .then((room) => {
          console.log(`[LOBBY] created ${room.sessionId} on ${room.name}`)
          status.value = 'connected'
        })
        .catch((e) => {
          console.error('[LOBBY] CREATE ERROR', e)
          status.value = 'error'
        })
    }

    let refreshInterval = setInterval(getRoomList, 5000)

    onUnmounted(() => {
      console.log('[DESTROY] LobbyScreen')
      clearInterval(refreshInterval)
    })

    watchEffect(() => {
      console.log('Updating status tint')
      screen.value?.setStatus(status.value)
    })

    return { client, roomList, joinGame, createGame, status, screen }
  },

  mounted(): void {
    console.log('[MOUNTED] SplashScreen')

    const engine: Engine = this.$engine()
    this.screen = new LobbyScreen(engine)
    engine.navigator.replace(this.screen)

    this.screen.once('exit', () =>
      console.log('Exited Lobby Screen (not implemented)'),
    )
  },
})
</script>

<style lang="scss" scoped>
.middle {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100vw;

  color: white;
}
</style>

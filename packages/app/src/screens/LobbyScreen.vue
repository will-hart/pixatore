<template>
  <div id="lobby-screen" class="container middle">
    <button v-if="lobbyStatus === 'idle'" @click="createGame(client)">
      Create
    </button>

    <ul v-for="room in roomList" :key="room.roomId">
      <li>
        {{ room.roomId }} ({{ room.clients }} / {{ room.maxClients }})
        <button
          v-show="lobbyStatus === 'idle'"
          @click="joinGame(client, room.roomId)"
        >
          Join
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onUnmounted,
  watchEffect,
  onMounted,
  unref,
} from 'vue'

import LobbyScreen from '../gameEngine/screens/LobbyScreen'
import { useEngine } from '../composables/useGameEngine'
import { useClient } from '../composables/useClient'
import { useClientRoomQueries } from '../composables/useClientRoomQueries'

export default defineComponent({
  name: 'LobbyScreen',

  setup() {
    // TODO be a bit smarter with this URL
    const { client, setClient } = useClient()
    onMounted(() => {
      unref(setClient)('ws://localhost:2567')
    })

    const engine = useEngine()
    const screen = new LobbyScreen(engine)
    const {
      roomList,
      getRoomList,
      lobbyStatus,
      joinGame,
      createGame,
    } = useClientRoomQueries()

    const refreshInterval = setInterval(() => getRoomList(unref(client)), 5000)

    onMounted(() => {
      console.log('[MOUNTED] SplashScreen')
      engine.navigator.replace(screen)

      screen.once('exit', () =>
        console.log('Exited Lobby Screen (not implemented)'),
      )
    })

    onUnmounted(() => {
      console.log('[DESTROY] LobbyScreen')
      clearInterval(refreshInterval)
    })

    watchEffect(() => {
      console.log('[LOBBY] Updating status tint')
      screen.setStatus(lobbyStatus.value)
    })

    return { client, roomList, joinGame, createGame, lobbyStatus, screen }
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

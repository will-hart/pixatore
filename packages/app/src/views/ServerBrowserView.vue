<template>
  <div id="server-browser-vuew" class="container middle">
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

import ServerBrowserScene from '../gameEngine/scenes/ServerBrowserScene'
import { useEngineWithScene } from '../composables/useGameEngine'
import { useClient } from '../composables/useClient'
import { useClientRoomQueries } from '../composables/useClientRoomQueries'
import Engine from '../gameEngine/Engine'
import { useRouter } from 'vue-router'
import { useRoom } from '../composables/useRoom'

export default defineComponent({
  name: 'ServerBrowserScreen',

  setup() {
    // TODO be a bit smarter with this URL
    const { client, setClient } = useClient()
    onMounted(() => {
      console.log('[MOUNT_VIEW] Server Browser')
      unref(setClient)('ws://localhost:2567')
    })

    const {
      scene,
      engine,
    }: { scene: ServerBrowserScene; engine: Engine } = useEngineWithScene(
      ServerBrowserScene,
    )
    engine.navigator.push(scene)
    scene.once('exit', () =>
      console.log('Exited Lobby Screen (not implemented)'),
    )

    const {
      roomList,
      getRoomList,
      lobbyStatus,
      joinGame,
      createGame,
    } = useClientRoomQueries()
    const { room } = useRoom()

    const refreshInterval = setInterval(() => getRoomList(unref(client)), 5000)

    onUnmounted(() => {
      console.log('[UNMOUNT_VIEW] Server Browser')
      clearInterval(refreshInterval)
    })

    const router = useRouter()
    watchEffect(() => {
      console.log(`[SERVER BROWSER] Client lobby status: ${lobbyStatus.value}`)
      scene.setStatus(lobbyStatus.value)

      if (lobbyStatus.value === 'connected' && unref(room)) {
        router.push(`/lobby/${unref(room).id}`)
      }
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

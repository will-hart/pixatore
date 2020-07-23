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

export default defineComponent({
  name: 'ServerBrowserScreen',

  setup() {
    // TODO be a bit smarter with this URL
    const { client, setClient } = useClient()
    onMounted(() => {
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

    const refreshInterval = setInterval(() => getRoomList(unref(client)), 5000)

    onMounted(() => {
      console.log('[MOUNT_VIEW] Server Browser')
    })

    onUnmounted(() => {
      console.log('[UNMOUNT_VIEW] Server Browser')
      clearInterval(refreshInterval)
    })

    watchEffect(() => {
      console.log('[SERVER BROWSER] Updating status tint')
      scene.setStatus(lobbyStatus.value)
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

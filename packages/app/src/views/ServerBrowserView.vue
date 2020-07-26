<template>
  <div id="server-browser-view" class="container middle">
    <div class="panel">
      <h1>Server browser</h1>
      <button
        class="success"
        v-if="lobbyStatus === 'idle'"
        @click="createGame(client)"
      >
        Create
      </button>

      <div
        v-if="roomList.length === 0"
        style="margin-top: 2em; color: #aaa; font-style: italic;"
      >
        There are no servers with free slots available, but you can create one
        using the big green "create" button above.
      </div>

      <div v-if="lastRoom && lastSession">
        It looks like you were previously in a game. Would you like to
        <button @click="reconnect(client, lastRoom, lastSession)">
          Reconnect?
        </button>
      </div>

      <table v-show="roomList.length > 0">
        <thead>
          <tr class="header">
            <th>Server Name</th>
            <th>Player Count</th>
            <th>Join</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="room in roomList" :key="room.id">
            <td>{{ room.roomId }}</td>
            <td>({{ room.clients }} / {{ room.maxClients }})</td>
            <td>
              <button
                v-show="lobbyStatus === 'idle'"
                @click="joinGame(client, room.roomId)"
              >
                Join
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <loading-spinner v-if="roomListLoading" />
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
import Engine from '../gameEngine/Engine'
import LoadingSpinner from '../components/LoadingSpinner.vue'

import { useEngineWithScene } from '../composables/useGameEngine'
import { useClient } from '../composables/useClient'
import { useClientRoomQueries } from '../composables/useClientRoomQueries'
import { useRouter } from 'vue-router'
import { useRoom } from '../composables/useRoom'

export default defineComponent({
  name: 'ServerBrowserScreen',

  components: {
    'loading-spinner': LoadingSpinner,
  },

  setup() {
    const { client, setClient } = useClient()
    onMounted(() => {
      console.log('[MOUNT_VIEW] Server Browser')
      // TODO be a bit smarter with this URL
      unref(setClient)('ws://localhost:2567')
    })

    const {
      scene,
      engine,
    }: { scene: ServerBrowserScene; engine: Engine } = useEngineWithScene(
      ServerBrowserScene,
    )
    engine.navigator.push(scene)

    const {
      roomList,
      getRoomList,
      roomListLoading,
      lastRoom,
      lastSession,
      lobbyStatus,
      joinGame,
      reconnect,
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

    return {
      client,
      roomList,
      roomListLoading,
      joinGame,
      createGame,
      reconnect,
      lobbyStatus,
      screen,
      lastRoom,
      lastSession,
    }
  },
})
</script>

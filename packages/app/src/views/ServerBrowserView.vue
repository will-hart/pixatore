<template>
  <div id="server-browser-view" class="container middle">
    <div class="wrapper">
      <h1>Server browser</h1>
      <button
        class="success"
        v-if="lobbyStatus === 'idle'"
        @click="createGame(client)"
      >
        Create
      </button>

      <table>
        <thead>
          <tr class="header">
            <th>Server Name</th>
            <th>Player Count</th>
            <th>Join</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="room in roomList" :key="room.roomId">
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
.wrapper {
  width: 90vw;
  height: 90vh;
  margin: auto;
  padding: 2em;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  & h1 {
    margin: 0 0 1em 0;
    padding-bottom: 0.3em;
    width: 100%;
    text-align: left;
    border-bottom: 2px solid white;
  }

  & button {
    cursor: pointer;
    outline: none;
    border: 1px solid rgba(150, 150, 150, 0.5);
    background: rgba(50, 50, 50, 0.5);
    padding: 1em;
    color: white;
  }

  & button:hover {
    background: rgba(50, 50, 50, 0.75);
  }

  & button.success {
    margin-left: auto;
    background: rgba(50, 250, 50, 0.2);
  }

  & button.success:hover {
    background: rgba(50, 250, 50, 0.3);
  }

  & table {
    width: 100%;
    margin-top: 2em;
  }
}

.header {
  background: rgba(50, 50, 50, 0.5);

  & th {
    padding: 1em;
  }
}

td {
  padding: 1em;
}
</style>

<template>
  <div id="lobby-view" class="container middle">
    <div class="panel">
      <h1>Lobby</h1>

      <lobby-slot
        v-for="player in slotList"
        :key="player.slotId"
        :slotId="player.slotId"
        :name="player.name || 'Empty Slot'"
        :connected="!!player.connected"
        :ready="!!player.ready"
        :me="me && player.name === me.id"
      />

      <button @click="setReady(!me.ready)">Ready</button>
      <button v-if="allReady && me && me.slot === 1" @click="startGame">
        Start Game
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  unref,
  shallowRef,
  onUnmounted,
  computed,
  ref,
} from 'vue'
import { useRouter } from 'vue-router'
import { useRoom } from '../composables/useRoom'
import { useEventBus } from '../composables/useEventBus'
import { Entities, Types } from '@pixatore/shared'

import LobbySlot from '../components/LobbySlot.vue'

export default defineComponent({
  name: 'LobbyScreen',

  components: {
    'lobby-slot': LobbySlot,
  },

  setup() {
    const eventBus = useEventBus()
    const router = useRouter()
    const { room } = useRoom()

    if (!unref(room)) {
      // TODO: handle reconnection attempt
      router.push('/browser')
    }

    const playerList = shallowRef<Entities.Player[]>([])

    const unsubscribeGameStatus = eventBus.onGameStatusChange((current) => {
      console.log(`[LOBBY_VIEW] game status updated to ${current}`)
      if (current === Types.GameStatus.playing) {
        router.push('/game')
      }
    })

    const unsubscribeAddPlayer = eventBus.onPlayerAdd((player) => {
      playerList.value = [...playerList.value, player]
    })

    const unsubscribeRemovePlayer = eventBus.onPlayerRemove((player) => {
      playerList.value = [...playerList.value.filter((p) => p.id !== player.id)]
    })

    const unsubcribePlayerUpdate = eventBus.onPlayerUpdate((player) => {
      const idx = playerList.value.findIndex((p) => p.id === player.id)
      if (idx < 0) return

      playerList.value = [
        ...playerList.value.slice(0, idx),
        player,
        ...playerList.value.slice(idx + 1),
      ]
    })

    const me = computed((): Entities.Player | undefined => {
      const sessId = unref(room)?.sessionId
      if (!sessId) return undefined

      return playerList.value.find((p) => p.id === sessId)
    })

    const slotList = computed(() => {
      return [1, 2, 3, 4].map((slotId) => {
        const player = playerList.value.find((p) => p.slot === slotId)
        return {
          slotId,
          name: player?.id || 'Empty Slot',
          connected: !!player?.connected,
          ready: !!player?.ready,
        }
      })
    })

    const setReady = (isReady: boolean) => {
      unref(room).send(Types.MessageTypes.PLAYER_READY, { isReady })
    }

    const startGame = () => {
      unref(room).send(Types.MessageTypes.START_GAME)
    }

    // to start must have > 1 player and all are ready and connected
    const allReady = computed(
      () =>
        !playerList.value.some((p) => !p.ready || !p.connected) &&
        playerList.value.length > 1,
    )

    onUnmounted(() => {
      unsubscribeAddPlayer()
      unsubscribeRemovePlayer()
      unsubcribePlayerUpdate()
      unsubscribeGameStatus()
    })

    return { allReady, me, setReady, slotList, startGame }
  },
})
</script>

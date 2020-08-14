<template>
  <div id="lobby-view" class="container middle">
    <div class="panel">
      <h1>Lobby</h1>

      <lobby-slot
        v-for="player in slotList"
        :key="player.slotId"
        :slotId="player.slotId"
        :name="player.name || 'Empty Slot'"
        :connected="!!player.isConnected"
        :ready="!!player.isReady"
        :me="me && player.name === me.id"
      />

      <button @click="setReady(!me.isReady)">Ready</button>
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

import LobbySlot from '../components/LobbySlot.vue'
import { useGameEngine } from '../composables/useGameEngine'
import { clientEvents, Components, Types } from '@pixatore/game'
import { GameEngine } from '../engine/GameEngine'

import debug from 'debug'
const log = debug('PX:APP:Views     :Lobby     ')
log.log = console.log.bind(console)

export default defineComponent({
  name: 'LobbyScreen',

  components: {
    'lobby-slot': LobbySlot,
  },

  setup() {
    const router = useRouter()
    const { gameEngine: gameEngineRef } = useGameEngine()
    const gameEngine: GameEngine | null = unref(gameEngineRef)

    if (!gameEngine) {
      // TODO: handle reconnection attempt
      router.push('/serverbrowser')
    }

    // TODO: move into pixi app tick
    // currently there isn't a PIXI APP to hook into, so just requestAnimationFrame the world updates
    let rafId = ref(0)
    let timeNow = ref(Date.now())
    const onFrame = () => {
      const newTimeNow = Date.now()
      gameEngine?.tick(newTimeNow - timeNow.value)
      timeNow.value = newTimeNow
      rafId.value = requestAnimationFrame(onFrame)
    }
    requestAnimationFrame(onFrame)
    const cancelRaf = () => cancelAnimationFrame(rafId.value)

    const playerList = shallowRef<Components.PlayerData[]>([])

    const unsubscribeUpdatePlayer = gameEngine?.eventBus.subscribe(
      clientEvents.onPlayerUpdateEvent,
      (event) => {
        const component = event.payload.component as Components.PlayerData
        log(`[LOBBY_VIEW] player ${component.playerId} updated`)

        playerList.value = [
          ...playerList.value.filter((p) => p.playerId !== component.playerId),
          component,
        ].sort((a, b) => a.slot - b.slot)
      },
    )

    const unsubscribeRemovePlayer = gameEngine?.eventBus.subscribe(
      clientEvents.onPlayerRemoveEvent,
      (event) => {
        const component = event.payload.component as Components.PlayerData
        log(`[LOBBY_VIEW] player ${component.playerId} removed`)

        playerList.value = [
          ...playerList.value.filter((p) => p.playerId !== component.playerId),
        ]
      },
    )

    const me = computed((): Components.PlayerData | undefined => {
      if (!gameEngine?.room?.sessionId) return undefined
      return playerList.value.find(
        (p) => p.playerId === gameEngine.room.sessionId,
      )
    })

    const slotList = computed(() => {
      return [1, 2, 3, 4].map((slotId) => {
        const player = playerList.value.find((p) => p.slot === slotId)
        return {
          slotId,
          name: player?.playerId || 'Empty Slot',
          connected: !!player?.isConnected,
          isReady: !!player?.isReady,
        }
      })
    })

    const setReady = (isReady: boolean) => {
      gameEngine?.room?.send(Types.MessageTypes.PLAYER_READY, { isReady })
    }

    const startGame = () => {
      gameEngine?.room?.send(Types.MessageTypes.START_GAME)
    }

    // to start must have > 1 player and all are ready and connected
    const allReady = computed(
      () =>
        !playerList.value.some((p) => !p.isReady || !p.isConnected) &&
        playerList.value.length > 1,
    )

    const cancelStatusChange = gameEngine?.eventBus.subscribe(
      clientEvents.ClientEventTypes.GAME_STATUS_UPDATED,
      (e) => {
        const status = e.payload.status
        log(`Game status updated to ${status}`)

        const id = gameEngine.room.id
        if (!id) {
          log('Unable to redirect as no room ID avaiable on engine')
          return
        }

        log(`Redirecting to '/loading/${id}'`)
        router.push(`/loading/${id}`)
      },
    )

    onUnmounted(() => {
      cancelRaf()
      cancelStatusChange?.()
      unsubscribeRemovePlayer?.()
      unsubscribeUpdatePlayer?.()
    })

    return { allReady, me, setReady, slotList, startGame }
  },
})
</script>

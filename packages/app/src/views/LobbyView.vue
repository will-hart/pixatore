<template>
  <div id="lobby-view" class="container middle">
    <div class="panel">
      <h1>Lobby</h1>

      <lobby-slot
        v-for="player in playerList"
        :key="player.id"
        :slotId="player.slot"
        :name="player.id"
      />

      <lobby-slot :slotId="1" v-if="playerList.length <= 0" name="Empty Slot" />
      <lobby-slot :slotId="2" v-if="playerList.length <= 1" name="Empty Slot" />
      <lobby-slot :slotId="3" v-if="playerList.length <= 2" name="Empty Slot" />
      <lobby-slot :slotId="4" v-if="playerList.length <= 3" name="Empty Slot" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, unref, shallowRef, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRoom } from '../composables/useRoom'
import { useEventBus } from '../composables/useEventBus'
import { Entities } from '@pixatore/shared'

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

    const unsubscribeAddPlayer = eventBus.onPlayerAdd((player) => {
      playerList.value = [...playerList.value, player]
    })

    const unsubscribeRemovePlayer = eventBus.onPlayerRemove((player) => {
      const idx = playerList.value.findIndex((p) => p.id === player.id)
      if (idx >= 0) {
        playerList.value.splice(idx, 1)
      } else {
        console.warn(
          `[LOBBY_VIEW] unable to remove player ${player.id}, player not found in list`,
        )
      }
    })

    onUnmounted(() => {
      unsubscribeAddPlayer()
      unsubscribeRemovePlayer()
    })

    return { playerList }
  },
})
</script>

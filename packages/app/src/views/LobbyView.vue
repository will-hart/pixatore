<template>
  <div id="lobby-view" class="container middle">
    <div class="panel">
      <h1>Lobby</h1>

      <lobby-slot
        v-for="player in slotList"
        :key="player.slotId"
        :slotId="player.slotId"
        :name="player.name || 'Empty Slot'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, unref, shallowRef, onUnmounted, computed } from 'vue'
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
      playerList.value = [...playerList.value.filter((p) => p.id !== player.id)]
    })

    const slotList = computed(() => {
      return [1, 2, 3, 4].map((slotId) => ({
        slotId,
        name:
          playerList.value.find((p) => p.slot === slotId)?.id || 'Empty Slot',
      }))
    })

    onUnmounted(() => {
      unsubscribeAddPlayer()
      unsubscribeRemovePlayer()
    })

    return { slotList }
  },
})
</script>

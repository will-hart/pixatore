<template>
  <div id="game-view" class="container middle">
    <div id="hud" class="panel">
      <h1>Game</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, unref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRoom } from '../composables/useRoom'

export default defineComponent({
  name: 'GameView',

  setup() {
    const { room } = useRoom()
    const router = useRouter()

    if (!unref(room)) {
      router.push('/browser')
    }

    onUnmounted(() => {
      // unsubscribeAddPlayer()
      // unsubscribeRemovePlayer()
      // unsubcribePlayerUpdate()
      // unsubscribeGameStatus()
    })

    return {}
  },
})
</script>

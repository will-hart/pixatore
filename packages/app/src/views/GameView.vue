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
import { useEngineWithScene } from '../composables/useGameEngine'
import { useRoom } from '../composables/useRoom'

import GameScene from '../gameEngine/scenes/GameScene'

export default defineComponent({
  name: 'GameView',

  setup() {
    const { room } = useRoom()
    const router = useRouter()

    if (!unref(room)) {
      router.push('/browser')
    }

    useEngineWithScene(GameScene)
    // const eventBus = useEventBus()
    // scene.init(unref(room).state, eventBus)

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

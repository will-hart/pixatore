<template>
  <div id="game" v-on:mount-game="mountGame">
    <router-view v-show="gameMounted" />
    <fps :fps="fps" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { GameEngineSymbol } from '../plugins/gameEngine'
import FPS from './FPS.vue'
import Engine from '../gameEngine/Engine'

export default defineComponent({
  components: {
    fps: FPS,
  },

  methods: {
    updateFps: function () {
      this.fps = Math.round((this.$engine() as Engine).ticker?.FPS || 0)
    },
  },

  inject: { [GameEngineSymbol]: { from: 'gameEngine' } },

  setup() {
    const gameMounted = ref(false)
    const fps = ref(0)
    return { gameMounted, fps }
  },

  mounted() {
    const engine: Engine = this.$engine()

    engine.mount(document.getElementById('game'))
    engine.ticker.add(this.updateFps)

    this.gameMounted = true
  },

  beforeUnmount() {
    ;(this.$engine() as Engine).ticker.remove(this.updateFps)
  },
})
</script>

<style lang="scss" scoped>
#game {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
}
</style>

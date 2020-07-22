<template>
  <div id="game" v-on:mount-game="mountGame">
    <router-view v-show="gameMounted" />
    <fps :fps="fps" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, watchEffect } from 'vue'
import { GameEngineSymbol } from '../plugins/gameEngine'
import FPS from './FPS.vue'
import Engine from '../gameEngine/Engine'

export default defineComponent({
  props: {
    width: Number,
    height: Number,
  },

  components: {
    fps: FPS,
  },

  methods: {
    updateFps: function () {
      this.fps = Math.round((this.$engine() as Engine).ticker?.FPS || 0)
    },
  },

  inject: { [GameEngineSymbol]: { from: 'gameEngine' } },

  setup(props) {
    const gameMounted = ref(false)
    const fps = ref(0)
    const resizeRef = ref<((w: number, h: number) => void) | null>(null)

    // watch([props.width, props.height], ([w, h], [lastW, lastH]) => {
    //   console.log('Changed!')
    //   if (w === lastW && h === lastH) return

    //   if (!resizeRef.value) {
    //     console.log('Unable to resize game, ref not set')
    //     return
    //   }

    //   console.log('resizing to ', w, h)
    //   resizeRef.value(w, h)
    // })

    watchEffect(() => resizeRef.value?.(props.width, props.height))

    return { gameMounted, fps, resizeRef }
  },

  mounted() {
    const engine: Engine = this.$engine()

    engine.mount(document.getElementById('game'))
    engine.ticker.add(this.updateFps)

    this.resizeRef = engine.resize
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

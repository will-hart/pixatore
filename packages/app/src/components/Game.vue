<template>
  <div id="game" v-on:mount-game="mountGame">
    <router-view v-show="gameMounted" />
    <fps :fps="fps" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watchEffect,
  onUnmounted,
  onMounted,
  unref,
} from 'vue'
import FPS from './FPS.vue'
import { useFpsMonitor } from '../composables/useFpsMonitor'
import { useEngine } from '../composables/useGameEngine'
import Engine from '../gameEngine/Engine'

export default defineComponent({
  props: {
    width: Number,
    height: Number,
  },

  components: {
    fps: FPS,
  },

  setup(props) {
    const gameMounted = ref(false)

    const engine: Engine = useEngine()

    const { fps, setFps } = useFpsMonitor()
    const updateFps = () => setFps(Math.round(engine.ticker.FPS || 0))

    watchEffect(() => {
      engine.resize(unref(props.width), unref(props.height))
    })

    onMounted(() => {
      console.log('[MOUNTED] Game')
      engine.mount(document.getElementById('game'))
      gameMounted.value = true
      engine.ticker.add(updateFps)
    })

    onUnmounted(() => {
      console.log('[UNMOUNTED] Game')
      engine.ticker.remove(updateFps)
    })

    return { gameMounted, fps }
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

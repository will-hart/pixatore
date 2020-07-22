<template>
  <div class="home">
    <game :width="width" :height="height" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue'
import Game from './components/Game.vue'

export default defineComponent({
  components: {
    game: Game,
  },
  setup() {
    const width = ref(window?.innerWidth || 800)
    const height = ref(window?.innerHeight || 600)

    const listener = () => {
      width.value = window?.innerWidth || 800
      height.value = window?.innerHeight || 600
    }

    onMounted(() => {
      console.log('[APP] Adding resize event listeners')
      window?.addEventListener('resize', listener)
    })

    onBeforeUnmount(() => {
      console.log('[APP] Removing resize event listeners')
      window?.removeEventListener('resize', listener)
    })

    return { width, height }
  },
})
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

body {
  background: #111111;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  background: none;
}
</style>

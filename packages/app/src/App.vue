<template>
  <div class="home">
    <game :width="width" :height="height" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { provideEngine } from './composables/useGameEngine'
import { provideFpsMonitor } from './composables/useFpsMonitor'
import { provideClient } from './composables/useClient'
import { provideRoom } from './composables/useRoom'
import useWindowSize from './composables/useWindowSize'

import Game from './components/Game.vue'

export default defineComponent({
  components: {
    game: Game,
  },
  setup() {
    const { width, height } = useWindowSize()

    provideFpsMonitor()
    provideEngine()
    provideClient()
    provideRoom()

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

.middle {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100vw;

  color: white;
}
</style>

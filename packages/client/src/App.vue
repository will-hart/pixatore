<template>
  <div class="home">
    <game :width="width" :height="height" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { provideFpsMonitor } from './composables/useFpsMonitor'
import { provideClient } from './composables/useClient'
import useWindowSize from './composables/useWindowSize'

import Game from './components/Game.vue'
import { provideGameEngine } from './composables/useGameEngine'

export default defineComponent({
  components: {
    game: Game,
  },
  setup() {
    const { width, height } = useWindowSize()

    provideClient()
    provideFpsMonitor()
    provideGameEngine()

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
.panel {
  margin: 1em;
  padding: 2em;

  width: 100%;
  height: 100%;

  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  & h1 {
    margin: 0 0 1em 0;
    padding-bottom: 0.3em;
    width: 100%;
    text-align: left;
    border-bottom: 2px solid white;
  }

  & button {
    cursor: pointer;
    outline: none;
    border: 1px solid rgba(150, 150, 150, 0.5);
    background: rgba(50, 50, 50, 0.5);
    padding: 1em;
    color: white;
  }

  & button:hover {
    background: rgba(50, 50, 50, 0.75);
  }

  & button.success {
    margin-left: auto;
    background: rgba(50, 250, 50, 0.2);
  }

  & button.success:hover {
    background: rgba(50, 250, 50, 0.3);
  }

  & table {
    width: 100%;
    margin-top: 2em;
    border-collapse: collapse;
  }
  .header {
    background: rgba(50, 50, 50, 0.5);
  }

  & th,
  & td {
    padding: 0.5em;
  }
}
</style>

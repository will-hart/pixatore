<template>
  <div class="home">
    <game />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Game from './components/Game.vue'

export default defineComponent({
  components: {
    game: Game,
  },
})
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

body {
  background: #222222;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

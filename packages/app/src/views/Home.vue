<template>
  <div class="home">
    <Game />
  </div>
</template>

<script>
// @ is an alias to /src
import Game from '@/components/Game.vue'

export default {
  name: 'Home',
  components: {
    Game,
  },
}
</script>

<style lang="scss" scoped>
.home {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #050505;
}
</style>

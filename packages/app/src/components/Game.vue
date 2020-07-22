<template>
  <div id="game" v-on:mount-game="mountGame">
    <router-view v-show="gameMounted" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { GameEngineSymbol } from '../plugins/gameEngine'

export default defineComponent({
  inject: { [GameEngineSymbol]: { from: 'gameEngine' } },

  setup() {
    const gameMounted = ref(false)
    return { gameMounted }
  },

  mounted() {
    this.$engine().mount(document.getElementById('game'))
    this.gameMounted = true
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

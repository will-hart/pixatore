<template>
  <div id="game" v-on:mount-game="mountGame">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GameEngineSymbol } from '../plugins/gameEngine'

export default defineComponent({
  inject: { [GameEngineSymbol]: { from: 'gameEngine' } },

  mounted() {
    this.$engine().mount(document.getElementById('game'))
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

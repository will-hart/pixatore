<template>
  <div id="game" v-on:mount-game="mountGame">
    <router-view v-show="gameMounted" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted, onMounted } from 'vue'

import debug from 'debug'
const log = debug('App:Views:Game')
log.log = console.log.bind(console)

export default defineComponent({
  props: {
    width: Number,
    height: Number,
  },

  setup(props) {
    const gameMounted = ref(false)

    onMounted(() => {
      log('[MOUNTED] Game')
      gameMounted.value = true
    })

    onUnmounted(() => {
      log('[UNMOUNTED] Game')
    })

    return { gameMounted }
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

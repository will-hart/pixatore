<template>
  <div class="container middle">
    <button @click="createGame">Create Game</button>
    <button @click="joinGame">Join Game</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import debug from 'debug'
const log = debug('App:Views:MainMenu')
log.log = console.log.bind(console)

export default defineComponent({
  name: 'MainMenu',

  setup() {
    const router = useRouter()

    const joinGame = () => {
      router.push('/serverbrowser')
    }

    const createGame = () => {
      log('creating game')
    }

    onMounted(() => {
      log('[MOUNT_VIEW] MainMenu')
    })

    onUnmounted(() => {
      log('[UNMOUNT_VIEW] MainMenu')
    })

    return { createGame, joinGame }
  },
})
</script>

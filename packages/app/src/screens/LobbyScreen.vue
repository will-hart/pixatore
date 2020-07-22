<template>
  <div id="lobby-screen"></div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import Engine from '../gameEngine/Engine'
import LobbyScreen from '../gameEngine/screens/LobbyScreen'

export default defineComponent({
  name: 'LobbyScreen',

  setup(): void {
    onUnmounted(() => {
      console.log('[DESTROY] LobbyScreen')
    })
  },

  mounted(): void {
    console.log('[MOUNTED] SplashScreen')

    const engine: Engine = this.$engine()
    const screen = new LobbyScreen(engine)
    engine.navigator.replace(screen)

    screen.once('exit', () =>
      console.log('Exited Lobby Screen (not implemented)'),
    )
  },
})
</script>

<template>
  <div id="splash-screen"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Engine from '../gameEngine/Engine'
import SplashScreen from '../gameEngine/screens/SplashScreen'

export default defineComponent({
  name: 'SplashScreen',

  methods: {
    navigateToMenu: function () {
      this.$router.push('/lobby')
    },
  },

  mounted(): void {
    console.log('[MOUNTED] SplashScreen')

    const engine: Engine = this.$engine()
    const screen = new SplashScreen(engine)
    engine.navigator.replace(screen)

    screen.once('exit', this.navigateToMenu)
  },
  destroyed(): void {
    console.log('[DESTROY] SplashScreen')
  },
})
</script>

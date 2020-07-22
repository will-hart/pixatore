<template>
  <div id="splash-screen">Splash</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SplashScreen',
  mounted(): void {
    console.log('[MOUNTED] SplashScreen')
  },
  destroyed(): void {
    console.log('[DESTROY] SplashScreen')
  },
})
</script>

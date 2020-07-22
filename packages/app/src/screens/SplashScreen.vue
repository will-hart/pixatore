<template>
  <div id="splash-screen">Splash</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SplashScreen',
  mounted(): void {
    console.log('[MOUNTED] SplashScreen')
  },
  destroyed(): void {
    console.log('[DESTROY] SplashScreen')
  },
})
</script>

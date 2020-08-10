<template>
  <div id="loading-view" class="container middle">
    <img src="/assets/sprites/logo.png" alt="Pixatore Logo" />

    <div class="header">
      <h1>Pixatore Game Template</h1>
    </div>

    <spinner />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import LoadingSpinner from '../components/LoadingSpinner.vue'

import debug from 'debug'
const log = debug('PX:APP:Views     :SplashScrn')
log.log = console.log.bind(console)

export default defineComponent({
  name: 'SplashScreen',

  components: {
    spinner: LoadingSpinner,
  },

  setup() {
    const router = useRouter()

    const navigateToMenu = () => {
      router.push('/menu')
    }

    onMounted(() => {
      log('[MOUNT_VIEW] LoadingView')
      setTimeout(navigateToMenu, 2000)
    })

    onUnmounted(() => {
      log('[UNMOUNT_VIEW] LoadingView')
    })
  },
})
</script>

<style lang="scss" scoped>
#loading-view,
#loading-view .header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  flex-direction: column;
}
</style>

<template>
  <div id="loading-view"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import LoadingScene from '../gameEngine/scenes/LoadingScene'
import { useEngineWithScene } from '../composables/useGameEngine'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoadingView',

  setup() {
    const router = useRouter()

    const navigateToMenu = () => {
      router.push('/browser')
    }

    const { engine, scene } = useEngineWithScene(LoadingScene)
    engine.navigator.replace(scene)
    scene.once('exit', navigateToMenu)

    onMounted(() => {
      console.log('[MOUNT_VIEW] LoadingView')
    })

    onUnmounted(() => {
      console.log('[UNMOUNT_VIEW] LoadingView')
    })

    return { scene }
  },
})
</script>

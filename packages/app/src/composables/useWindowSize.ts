import { ref, onMounted, onUnmounted, unref, watchEffect } from 'vue'

const useWindowSize = (listener: (width: number, height: number) => void) => {
  const width = ref(window?.innerWidth || 800)
  const height = ref(window?.innerHeight || 600)

  const innerListener = () => {
    width.value = window.innerWidth || 800
    height.value = window.innerHeight || 600
  }

  const stop = watchEffect(() => listener(width.value, height.value))

  onMounted(() => {
    console.log('[USE_WINDOW_SIZE] Adding resize event listeners')
    window?.addEventListener('resize', innerListener)
  })

  onUnmounted(() => {
    console.log('[USE_WINDOW_SIZE] Removing resize event listeners')
    window?.removeEventListener('resize', innerListener)
    stop()
  })

  return { width, height }
}

export default useWindowSize

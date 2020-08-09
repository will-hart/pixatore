import { InjectionKey, provide, inject, ref, Ref } from 'vue'

import debug from 'debug'
const log = debug('App:Composables:useFpsMonitor')
log.log = console.log.bind(console)

const fpsKey: InjectionKey<Ref<number>> = Symbol('useFPS::FPS')
const setFpsKey: InjectionKey<(fps: number) => void> = Symbol('useFPS::setFPS')

export function provideFpsMonitor(): void {
  log('[PROVIDE] fpsMonitor provided')
  const fps = ref(0)
  const setFps = (_fps: number) => {
    fps.value = Math.round(_fps)
  }

  provide(fpsKey, fps)
  provide(setFpsKey, setFps)
}

export function useFpsMonitor(): {
  fps: Ref<number>
  setFps: (_fps: number) => void
} {
  const fps = inject(fpsKey)
  const setFps = inject(setFpsKey)

  if (!fps || !setFps) {
    throw new Error('FPS/setFPS not provided')
  }

  return { fps, setFps }
}

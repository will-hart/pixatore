import { InjectionKey, provide, inject, onMounted, onUnmounted } from 'vue'
import Engine from '@/gameEngine/Engine'
import BaseScene from '../gameEngine/scenes/BaseScene'

const key: InjectionKey<Engine> = Symbol('useGameEngine::Engine')

export function provideEngine(): void {
  console.log('[PROVIDE] gameEngine provided')
  const engine = new Engine()
  provide(key, engine)
}

export function useEngine(): Engine {
  const engine = inject<Engine>(key)

  if (!engine) {
    throw new Error('Engine not provided')
  }

  return engine
}

export function useEngineWithScene<T extends BaseScene>(type: {
  new (engine: Engine): T
}): { engine: Engine; scene: T } {
  const engine = useEngine()
  const scene = new type(engine)

  onMounted(() => {
    console.log(`[USE_ENGINE_SCENE] injected scene ${type.name}`)
    // TODO: this is currently automatically injected in the navigator
    //       ideally I can refactor out SceneNavigator and handle all
    //       injection and removal here. Currently use the SceneNavigator
    //       for input handling
    // scene.inject()
  })

  onUnmounted(() => {
    console.log(`[USE_ENGINE_SCENE] removed scene ${type.name}`)
    // TODO: this is currently automatically injected in the navigator
    //       ideally I can refactor out SceneNavigator and handle all
    //       injection and removal hereCurrently use the SceneNavigator
    //       for input handling
    // scene.remove()
  })

  return { engine, scene }
}

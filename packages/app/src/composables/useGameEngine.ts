import { InjectionKey, provide, inject } from 'vue'
import Engine from '@/gameEngine/Engine'

const key: InjectionKey<Engine> = Symbol('useGameEngine::Engine')

export function provideEngine() {
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

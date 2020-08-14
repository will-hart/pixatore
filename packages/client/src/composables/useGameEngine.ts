import { InjectionKey, provide, inject, shallowRef, Ref } from 'vue'

import debug from 'debug'
import { GameEngine } from '@/engine/GameEngine'

const log = debug('PX:APP:Composable:GameEngine')
log.log = console.log.bind(console)

const key: InjectionKey<Ref<GameEngine | null>> = Symbol(
  'useGameEngien::Engine',
)

export function provideGameEngine(): void {
  log('[PROVIDE] game engine provided')
  const gameEngine = shallowRef<GameEngine | null>(null)
  provide(key, gameEngine)
}

export function useGameEngine(): {
  gameEngine: Ref<GameEngine | null>
  clearGameEngine: () => void
  setGameEngine: (gameEngine: GameEngine) => void
} {
  const gameEngine = inject<Ref<GameEngine | null>>(key)

  if (!gameEngine) {
    throw new Error('GameEngine not provided')
  }

  return {
    gameEngine,
    clearGameEngine: () => {
      gameEngine.value = null
    },
    setGameEngine: (engine: GameEngine) => {
      gameEngine.value = engine
    },
  }
}

import { InjectionKey, provide, inject } from 'vue'
import { EventBus } from '@pixatore/game'

const key: InjectionKey<EventBus> = Symbol('useEventBus::EventBus')

export function provideEventBus(): void {
  console.log('[PROVIDE] eventBus provided')
  const eventBus = new EventBus()
  provide(key, eventBus)
}

export function useEventBus(): EventBus {
  const eventBus = inject<EventBus>(key)

  if (!eventBus) {
    throw new Error('EventBus not provided')
  }

  return eventBus
}

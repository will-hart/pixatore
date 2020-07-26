import { InjectionKey, provide, inject, shallowRef, Ref } from 'vue'
import { Room } from 'colyseus.js'
import { State } from '@pixatore/shared'

const key: InjectionKey<Ref<Room<State.GameState> | null>> = Symbol(
  'useRoom::Room',
)

export function provideRoom(): void {
  console.log('[PROVIDE] room provided')
  const room = shallowRef<Room<State.GameState> | null>(null)
  provide(key, room)
}

export function useRoom(): {
  room: Ref<Room<State.GameState> | null>
  setRoom: (_room: Room<State.GameState>) => void
} {
  const room = inject<Ref<Room<State.GameState> | null>>(key)

  if (!room) {
    throw new Error('Room not provided')
  }

  return {
    room,
    setRoom: (_room: Room<State.GameState>) => {
      room.value = _room
    },
  }
}

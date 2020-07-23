import { InjectionKey, provide, inject, shallowRef, Ref } from 'vue'
import { Room } from 'colyseus.js'
import { Types } from '@tauri-game/shared'

const key: InjectionKey<Ref<Room<Types.GameState> | null>> = Symbol(
  'useRoom::Room',
)

export function provideRoom(): void {
  console.log('[PROVIDE] room provided')
  const room = shallowRef<Room<Types.GameState> | null>(null)
  provide(key, room)
}

export function useRoom(): {
  room: Ref<Room<Types.GameState> | null>
  setRoom: (_room: Room<Types.GameState>) => void
} {
  const room = inject<Ref<Room<Types.GameState> | null>>(key)

  if (!room) {
    throw new Error('Room not provided')
  }

  return {
    room,
    setRoom: (_room: Room<Types.GameState>) => {
      room.value = _room
    },
  }
}

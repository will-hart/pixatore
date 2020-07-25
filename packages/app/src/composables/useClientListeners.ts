import { Entities, State } from '@pixatore/shared'
import { Room } from 'colyseus.js'

export const useClientListeners = (room: Room<State.GameState>): void => {
  if (!room) {
    console.warn(
      '[USE_CLIENT_LISTENERS] attempted to subscribe without a room available, no subscriptions will be applied',
    )
    return
  }

  console.log('[USE_CLIENT_LISTENERS] injecting room subscriptions')

  room.onMessage('*', (message: unknown) =>
    console.log(`[ROOM_MESSAGE] ${message}`),
  )
  room.state.players.onAdd = (player: Entities.Player, key: string) => {
    console.log(key, player)
  }
}

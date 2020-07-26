import { Entities, Events, State, EventBus, Types } from '@pixatore/shared'
import { Room } from 'colyseus.js'
import { DataChange } from '@colyseus/schema'

export const mountEventBusToRoom = (
  eventBus: EventBus,
  room: Room<State.GameState>,
): void => {
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

  room.state.status.onChange = (changes: DataChange<any>[]): any => {
    changes.forEach((change) => {
      if (change.field === 'current') {
        eventBus.publish(
          Events.onGameStatusChanged({
            current: change.value as Types.GameStatus,
          }),
        )
      } else {
        console.log(
          `[MOUNT_TO_EVENT_BUS] unknown game status change for field ${change.field} to ${change.value}`,
        )
      }
    })
  }

  room.state.players.onAdd = (player: Entities.Player, key: string) => {
    eventBus.publish(Events.onPlayerAddEvent({ player, key }))
  }

  room.state.players.onRemove = (player: Entities.Player, key: string) => {
    eventBus.publish(Events.onPlayerRemoveEvent({ player, key }))
  }

  room.state.players.onChange = (player: Entities.Player, key: string) => {
    eventBus.publish(Events.onPlayerUpdateEvent({ player, key }))
  }
}

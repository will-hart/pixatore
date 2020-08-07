import { Entities, Events, State, EventBus, Types } from '@pixatore/game'
import { Room } from 'colyseus.js'
import { DataChange } from '@colyseus/schema'

/**
 * Adds all the required subscribers to the colyseus state, using
 * them to trigger events on the EventBus. The VUe and PIXI components
 * that require synchronised game state can use this event bus to
 * update their internal states
 *
 * @param eventBus The EventBus used to sync colyseus, pixi and Vue game states
 * @param room The room the event bus is being mounted to
 */
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

  room.state.status.onChange = (
    changes: DataChange<Types.GameStatus>[],
  ): void => {
    changes.forEach((change) => {
      if (change.field === 'current') {
        eventBus.publish(
          Events.onGameStatusChanged({
            current: change.value,
          }),
        )
      } else {
        console.log(
          `[MOUNT_TO_EVENT_BUS] unknown game status change for field ${change.field} to ${change.value}`,
        )
      }
    })
  }

  // subscribe to new players
  room.state.players.onAdd = (player: Entities.Player, key: string) => {
    eventBus.publish(Events.onPlayerAddEvent({ player, key }))

    // subscribe to player position upates
    player.position.onChange = (changes: DataChange<unknown>[]) => {
      eventBus.publish(
        Events.onActorMove({
          type: 'player',
          id: player.id,
          x: changes.find((c) => c.field === 'x')?.value,
          y: changes.find((c) => c.field === 'y')?.value,
        }),
      )
    }

    // subscribe to player object changes (doesn't change child schema)
    // eslint-disable-next-line
    player.onChange = (changes: DataChange<any>[]): void => {
      // TODO: confirm that its ok to pass player here and "changes" can be ignored
      eventBus.publish(Events.onPlayerUpdateEvent({ player, key }))
    }
  }

  // subscribe to disconnecting players
  room.state.players.onRemove = (player: Entities.Player, key: string) => {
    eventBus.publish(Events.onPlayerRemoveEvent({ player, key }))
  }
}

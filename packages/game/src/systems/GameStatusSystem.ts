import { System } from '@pixatore/ecs'
import { EventBus } from '@pixatore/event-bus'

import * as Components from '../components'

import debug from 'debug'
import { clientEvents } from '../events'
const log = debug('PX:GAM:Systems   :GameStatus')
if (console) log.log = console.log.bind(console)

/**
 * Client system that monitors the game state and publishes the
 * ClientEvents.onGameStatusUpdatedEvent to notify the UI layer
 * of the new event state
 */
export class GameStatusSystem extends System {
  static queries = {
    status: {
      components: [Components.Status],
      listen: { changed: true },
    },
  }

  private eventBus!: EventBus

  init(attrs: { eventBus: EventBus }): void {
    this.eventBus = attrs.eventBus
  }

  execute(): void {
    const statusCount = this.queries.status.changed?.length || 0
    if (statusCount <= 0) return
    if (statusCount > 1) {
      log(
        'More than one status component detected. Status Change events will not be raised',
      )
      return
    }

    const status = this.queries.status.changed?.[0]?.getComponent?.(
      Components.Status,
    )
    if (!status) {
      log('Unable to update status, no status component found.')
      return
    }

    this.eventBus.publish(
      clientEvents.onGameStatusUpdateEvent({ status: status.value }),
    )
    log(`Game status changed to ${status.value}`)
  }
}

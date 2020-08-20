import { System, IQueryMap } from '@pixatore/ecs'
import { EventBus } from '@pixatore/event-bus'

import * as Components from '../components'

import debug from 'debug'
import { clientEvents } from '../events'
import { DataChange } from '@colyseus/schema'
const log = debug('PX:GAM:Systems   :GameStatus')
if (console) log.log = console.log.bind(console)

/**
 * Client system that monitors the game state and publishes the
 * ClientEvents.onGameStatusUpdatedEvent to notify the UI layer
 * of the new event state
 */
export class GameStatusSystem extends System {
  // This potentially is a memory leak as refs to the component are held
  // after statuses are removed. This is unlikely to be an issue as status
  // components are part of the singleton element and are only created once
  // per room.
  private _subscribedStatuses: Set<Components.Status> = new Set()

  public queryMap: IQueryMap = {
    status: {
      components: [Components.Status],
      notComponents: [],
    },
  }

  constructor(private eventBus: EventBus) {
    super()
    log('%o', this.eventBus)
  }

  execute(): void {
    const statuses = this.queries.status.entities
    if (statuses.length <= 0) return
    if (statuses.length > 1) {
      log(
        'More than one status component detected. Status Change events will not be raised',
      )
      return
    }

    const status = statuses[0].getComponent(Components.Status)!
    if (this._subscribedStatuses.has(status)) {
      // only subscribe once
      return
    }

    log('Subscribing to status updates')
    this._subscribedStatuses.add(status)
    status.onChange = this.raiseChanged.bind(this)
  }

  raiseChanged(changes: DataChange[]) {
    const change = changes.find((chg) => chg.field === 'value')

    if (!change) {
      log(
        'Failed to raise changed on status change - value field not found in changes. %o',
        changes,
      )
    }

    this.eventBus.publish(
      clientEvents.onGameStatusUpdateEvent({ status: change?.value }),
    )
    log(`Game status changed to ${change?.value}`)
  }
}

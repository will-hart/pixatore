import { System, IQueryMap } from '@pixatore/ecs'
import { clientEvents } from '../events'

import * as Components from '../components'

import debug from 'debug'
import { EventBus } from '@pixatore/event-bus'
const log = debug('PX:GAM:ClientSytm:LobbyHud  ')
if (console) log.log = console.log.bind(console)

export class LobbyHudSystem extends System {
  public queryMap: IQueryMap = {
    updatedPlayers: {
      components: [Components.PlayerData],
      notComponents: [],
    },
  }

  constructor(public eventBus: EventBus) {
    super()
  }

  public execute(): void {
    const ents = this.queries.updatedPlayers.entities

    for (const ent of ents) {
      const playerData = ent.getComponent?.(Components.PlayerData)
      if (!playerData) continue

      this.eventBus.publish(
        clientEvents.onPlayerUpdateEvent({ component: playerData }),
      )
    }
  }
}

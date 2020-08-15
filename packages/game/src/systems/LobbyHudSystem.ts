import { System } from '@colyseus/ecs'
import { EventBus } from '@pixatore/event-bus'

import * as Components from '../components'

import { clientEvents } from '../events'

import debug from 'debug'
const log = debug('PX:GAM:ClientSytm:LobbyHud  ')
if (console) log.log = console.log.bind(console)

export class LobbyHudSystem extends System {
  public eventBus?: EventBus

  static queries = {
    updatedPlayers: {
      components: [Components.PlayerData],
      listen: { changed: true, added: true, removed: true },
    },
  }

  init(attrs: { eventBus: EventBus }): void {
    this.eventBus = attrs?.eventBus
  }

  execute(): void {
    const changedEnts = Array.from(
      new Set([
        ...(this.queries.updatedPlayers.added || []),
        ...(this.queries.updatedPlayers.changed || []),
      ]),
    )
    for (const ent of changedEnts) {
      const playerData = ent.getComponent?.(Components.PlayerData)
      if (!playerData) continue

      log('Adding player %o', playerData)
      this.eventBus?.publish(
        clientEvents.onPlayerUpdateEvent({
          component: playerData,
        }),
      )
    }

    const removedEnts = this.queries.updatedPlayers.removed
    for (const ent of removedEnts || []) {
      const playerData = ent.getComponent?.(Components.PlayerData)
      if (!playerData) continue

      log('Removing player %o', playerData)
      this.eventBus?.publish(
        clientEvents.onPlayerRemoveEvent({
          component: playerData,
        }),
      )
    }
  }
}

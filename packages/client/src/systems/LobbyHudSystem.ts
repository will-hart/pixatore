import { System } from '@colyseus/ecs'
import { Components } from '@pixatore/game'
import { EventBus } from 'ts-bus'
import { onPlayerUpdateEvent, onPlayerRemoveEvent } from '../engine/events'

import debug from 'debug'
const log = debug('PX:APP:ClientSytm:LobbyHud  ')
log.log = console.log.bind(console)

export class LobbyHudSystem extends System {
  public eventBus?: EventBus

  static queries = {
    updatedPlayers: {
      components: [Components.PlayerData],
      listen: { added: true, removed: true },
    },
  }

  init(attrs?: any): void {
    this.eventBus = attrs?.eventBus
  }

  execute(): void {
    const changedEnts = this.queries.updatedPlayers.added
    for (const ent of changedEnts || []) {
      const playerData = ent.getComponent?.(Components.PlayerData)
      if (!playerData) continue

      log('Adding player %o', playerData)
      this.eventBus?.publish(
        onPlayerUpdateEvent({
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
        onPlayerRemoveEvent({
          component: playerData,
        }),
      )
    }
  }
}
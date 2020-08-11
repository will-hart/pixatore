import { System } from '@colyseus/ecs'
import { Components } from '@pixatore/game'
import { EventBus } from 'ts-bus'
import { onPlayerRemoveEvent, onPlayerUpdateEvent } from '../engine/events'

export class LobbyHudSystem extends System {
  public eventBus?: EventBus

  static queries = {
    playerData: {
      components: [Components.PlayerData],
      listen: { changed: true, removed: true },
    },
  }

  init(attrs?: any): void {
    this.eventBus = attrs?.eventBus
  }

  execute(): void {
    const changedEnts = this.queries.playerData.changed
    for (const ent of changedEnts || []) {
      const playerData = ent.getComponent?.(Components.PlayerData)
      if (!playerData) continue

      this.eventBus?.publish(
        onPlayerUpdateEvent({
          component: playerData,
        }),
      )
    }

    const removedEnts = this.queries.playerData.removed
    for (const ent of removedEnts || []) {
      const playerData = ent.getComponent?.(Components.PlayerData)
      if (!playerData) continue

      this.eventBus?.publish(
        onPlayerRemoveEvent({
          component: playerData,
        }),
      )
    }
  }
}

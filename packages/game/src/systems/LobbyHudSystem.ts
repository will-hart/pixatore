import { System } from '@pixatore/ecs'

import * as Components from '../components'

import debug from 'debug'
const log = debug('PX:GAM:ClientSytm:LobbyHud  ')
if (console) log.log = console.log.bind(console)

export class LobbyHudSystem extends System {
  static queries = {
    updatedPlayers: {
      components: [Components.PlayerData],
      listen: { added: true, removed: true },
    },
  }

  private onAddCallback!: (player: Components.PlayerData) => void
  private onRemoveCallback!: (player: Components.PlayerData) => void

  init(attrs: {
    onAdd: (player: Components.PlayerData) => void
    onRemove: (player: Components.PlayerData) => void
  }): void {
    this.onAddCallback = attrs.onAdd
    this.onRemoveCallback = attrs.onRemove
  }

  execute(): void {
    const addedEnts = this.queries.updatedPlayers.added || []

    for (const ent of addedEnts) {
      const playerData = ent.getComponent?.(Components.PlayerData)
      if (!playerData) continue

      log('Adding player %o', playerData)
      this.onAddCallback(playerData as Components.PlayerData)
    }

    const removedEnts = this.queries.updatedPlayers.removed || []
    for (const ent of removedEnts) {
      const playerData = ent.getComponent?.(Components.PlayerData)
      if (!playerData) continue

      log('Removing player %o', playerData)
      this.onRemoveCallback(playerData as Components.PlayerData)
    }
  }
}

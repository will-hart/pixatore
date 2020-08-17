import { System } from '@pixatore/ecs'

import * as Components from '../components'

import debug from 'debug'
const log = debug('PX:GAM:ClientSytm:LobbyHud  ')
if (console) log.log = console.log.bind(console)

export class LobbyHudSystem extends System {
  static queries = {
    updatedPlayers: {
      components: [Components.PlayerData],
      mandatory: true,
    },
  }

  private onPlayerChangeCallback: (player: Components.PlayerData) => void = (
    _player,
  ) => {}

  setCallback(callback: (player: Components.PlayerData) => void): void {
    this.onPlayerChangeCallback = callback
  }

  execute(): void {
    const ents = this.queries.updatedPlayers.results || []
    console.log(this.queries.updatedPlayers)

    for (const ent of ents) {
      const playerData = ent.getComponent?.(Components.PlayerData)
      if (!playerData) continue

      this.onPlayerChangeCallback(playerData as Components.PlayerData)
    }
  }
}

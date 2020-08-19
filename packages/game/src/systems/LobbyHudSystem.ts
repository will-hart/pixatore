import { System, IQueryMap } from '@pixatore/ecs'

import * as Components from '../components'

import debug from 'debug'
const log = debug('PX:GAM:ClientSytm:LobbyHud  ')
if (console) log.log = console.log.bind(console)

export class LobbyHudSystem extends System {
  public queryMap: IQueryMap = {
    updatedPlayers: {
      components: [Components.PlayerData],
      notComponents: [],
    },
  }

  private onPlayerChangeCallback: (player: Components.PlayerData) => void = (
    _player,
  ) => {}

  public setCallback(callback: (player: Components.PlayerData) => void): void {
    this.onPlayerChangeCallback = callback
  }

  public execute(): void {
    const ents = this.queries.updatedPlayers.entities

    for (const ent of ents) {
      const playerData = ent.getComponent?.(Components.PlayerData)
      if (!playerData) continue

      this.onPlayerChangeCallback(playerData as Components.PlayerData)
    }
  }
}

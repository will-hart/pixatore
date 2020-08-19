import { System, World, IQueryMap } from '@pixatore/ecs'
import * as Components from '../components'

import debug from 'debug'
const log = debug('PX:GAM:Systems   :JoinSystem')
log.log = console.log.bind(console)

export class PlayerJoinSystem extends System {
  public queryMap: IQueryMap = {
    messages: {
      components: [Components.PlayerJoinMessage],
      notComponents: [],
    },
    players: { components: [Components.PlayerData], notComponents: [] },
  }

  execute(_delta: number, world: World) {
    const messages = (this.queries.messages.entities || [])
      // TODO type errors if I use Entity typing here, as private fields are missing
      .map((ent) => {
        return ent.getComponent(Components.PlayerJoinMessage)!
      })
      .sort((a, b) => a!.messageReceivedMs - b!.messageReceivedMs)

    if (!messages.length) return

    log('Messages %o', messages)

    const playerData = this.queries.players.entities
      .map((ent) => ent.getComponent(Components.PlayerData)!)
      .filter((c): c is Components.PlayerData => !!c)

    // TODO: populate from room metadata / game settings
    const usedSlots = playerData.map((pd) => pd.slot)
    const availableSlots = [4, 3, 2, 1].filter(
      (slotId) => !usedSlots.includes(slotId),
    )

    // create players for each slot
    for (const message of messages) {
      const slotId = availableSlots.pop()
      if (!slotId) {
        throw new Error('No slots available for new player')
      }

      // issues between Ecsy and colyseus/ecs entities
      const playerEnt = world.createEntity(
        `Player_${message.sessionId}_${slotId}`,
      )
      world.addComponentToEntity(playerEnt, Components.PlayerData)
      world.addComponentToEntity(playerEnt, Components.Transform)

      const playerData = playerEnt.getComponent(Components.PlayerData)!

      if (!playerData) {
        throw new Error(`Error creating player entity - ${message.sessionId}`)
      }

      log('Player joined slot %d, session %s', slotId, message.sessionId)
      playerData.slot = slotId
      playerData.playerId = message.sessionId
      playerData.isReady = false
      playerData.isConnected = true
    }

    // tidy up messages

    this.queries.messages.entities.forEach((ent) =>
      world.releaseComponentFromEntity(ent, Components.PlayerJoinMessage),
    )
  }
}

import { System } from '@colyseus/ecs'
import { Archetypes } from '..'
import { Components } from '..'

import debug from 'debug'
const log = debug('PX:GAM:Systems   :JoinSystem')
log.log = console.log.bind(console)

export class PlayerJoinSystem extends System {
  static queries = {
    messages: {
      components: [Components.PlayerJoinMessage],
      listen: { added: true },
    },
    players: { components: [Components.PlayerData] },
  }

  execute(_delta: number) {
    const messages = (this.queries.messages.added || [])
      // TODO type errors if I use Entity typing here, as private fields are missing
      .map((ent) => {
        return ent.getComponent?.(Components.PlayerJoinMessage)
      })
      .filter((c): c is Components.PlayerJoinMessage => !!c)
      .sort((a, b) => a!.messageReceivedMs - b!.messageReceivedMs)

    if (!messages.length) return

    log('Messages %o', messages)

    const playerData = this.queries.players.results
      .map((ent) => ent.getMutableComponent?.(Components.PlayerData))
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
      const playerEnt = Archetypes.Player(
        // @ts-ignore
        this.world.createEntity(`Player_${message.sessionId}_${slotId}`),
      )
      const playerData = playerEnt.getMutableComponent?.(Components.PlayerData)

      if (!playerData) {
        throw new Error(`Error creating player entity - ${message.sessionId}`)
      }

      log('Player joined slot %d, session %s', slotId, message.sessionId)
      playerData.slot = slotId
      playerData.ready = false
      playerData.playerId = message.sessionId
      playerData.connected = true
    }

    // tidy up messages
    this.queries.messages.results.forEach((ent) =>
      ent.removeComponent(Components.PlayerJoinMessage, true),
    )
  }
}

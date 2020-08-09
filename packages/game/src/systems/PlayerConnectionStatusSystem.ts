import { System, Entity } from '@colyseus/ecs'
import { Components } from '..'

const handleRemovePlayer = (
  message: Readonly<Components.PlayerConnectionStatusMessage>,
  entities: Entity[],
  playerData: Components.PlayerData[],
): void => {
  const idx = playerData.findIndex((pd) => pd.playerId === message.sessionId)
  if (idx === -1) {
    throw new Error(
      `[PlayerConnectionStatusSystem::handleRemovePlayer] Unable to remove player ${message.sessionId}, they do not exist`,
    )
  }

  entities[idx].remove()
}

const handleUpdateConnection = (
  message: Readonly<Components.PlayerConnectionStatusMessage>,
  playerData: Components.PlayerData[],
): void => {
  const player = playerData.find((pd) => pd.playerId === message.sessionId)
  if (!player) {
    throw new Error(
      `[PlayerConnectionStatusSystem::handleUpdateConnection] unable to update player ${message.sessionId} as they don't exist`,
    )
  }

  player.ready = false
  player.connected = message.isConnected
}

export class PlayerConnectionStatusSystem extends System {
  static queries = {
    messages: {
      components: [Components.PlayerConnectionStatusMessage],
      listen: { added: true },
    },
    players: { components: [Components.PlayerData] },
  }

  execute(_delta: number) {
    const messages = (this.queries.messages.added || [])
      // TODO type errors if I use Entity typing here, as private fields are missing
      .map((ent) => {
        return ent.getComponent?.(Components.PlayerConnectionStatusMessage)
      })
      .filter((c): c is Components.PlayerConnectionStatusMessage => !!c)
      .sort((a, b) => a.messageReceivedMs - b.messageReceivedMs)

    if (!messages) return

    const playerData = this.queries.players.results
      .map((ent) => ent.getMutableComponent?.(Components.PlayerData))
      .filter((c): c is Components.PlayerData => !!c)

    for (const message of messages) {
      if (message.isRemoved) {
        // TODO: Entity typing issue with Ecsy vs colyseus/ecs
        //@ts-ignore
        handleRemovePlayer(message, this.queries.players.results, playerData)
      } else {
        handleUpdateConnection(message, playerData)
      }
    }

    // tidy up messages
    this.queries.messages.results.forEach((ent) =>
      ent.removeComponent(Components.PlayerConnectionStatusMessage, true),
    )
  }
}
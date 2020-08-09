import { System } from '@colyseus/ecs'
import { Components } from '..'
import { GameStatus } from '../types'

const handleReadyMessages = (
  messages: Readonly<Components.LobbyStateChangeMessage>[],
  playerData: Components.PlayerData[],
) => {
  // process each messaage in turn
  for (const message of messages) {
    if (message.startingGame) continue // ignore these

    const player = playerData.find((p) => p.playerId === message.sessionId)
    if (!player) {
      console.log(
        `Unable to apply ready message for player ${message.sessionId} at ${message.messageReceivedMs} - unknown player Id`,
      )
      continue
    }

    player.ready = message.readyState
  }
}

const handleGameStartMessages = (
  messages: Readonly<Components.LobbyStateChangeMessage>[],
  playerData: Components.PlayerData[],
  status?: Components.Status,
) => {
  if (!messages) return // nothing to do, any message implies game start

  if (!status) {
    console.log(
      '[LobbySystem::handleGameStartMessages] ignoring message, status not available',
    )
    return
  }

  const anyNotReady = playerData.some((pd) => !pd.ready)
  if (anyNotReady) {
    console.log(
      '[LobbySystem::handleGameStartMessages] ignoring message, not all players are ready',
    )
    return
  }

  status.current = GameStatus.playing
}

export class LobbySystem extends System {
  static queries = {
    status: { components: [Components.Status] },
    messages: { components: [Components.LobbyStateChangeMessage] },
    players: { components: [Components.PlayerData] },
  }

  execute(_delta: number) {
    const messages = this.queries.messages.results
      // TODO type errors if I use Entity typing here, as private fields are missing
      .map((ent) => {
        return ent.getComponent?.(Components.LobbyStateChangeMessage)
      })
      .filter((c): c is Components.LobbyStateChangeMessage => !!c)
      .sort((a, b) => a!.messageReceivedMs - b!.messageReceivedMs)

    if (!messages) return

    const playerData = this.queries.players.results
      .map((ent) => ent.getMutableComponent?.(Components.PlayerData))
      .filter((c): c is Components.PlayerData => !!c)

    const status = this.queries.status.results
      .map((ent) => ent.getMutableComponent?.(Components.Status))
      .filter((c): c is Components.Status => !!c)[0]

    handleReadyMessages(messages, playerData)
    handleGameStartMessages(messages, playerData, status)

    // tidy up all the message components
    this.queries.messages.results.forEach((ent) =>
      ent.removeComponent(Components.LobbyStateChangeMessage, true),
    )
  }
}

import { Room, Client } from 'colyseus'
import { Entities, Constants, State, Types } from '@pixatore/shared'

export class GameRoom extends Room<State.GameState> {
  static id = Constants.GAME_ROOM_NAME

  onCreate(options: Types.RoomOptions) {
    this.maxClients = Constants.MAX_PLAYERS

    this.setMetadata({
      playerName: options.playerName,
      roomName: options.roomName,
    })

    this.onMessage('*', (_client, type, contents) =>
      console.log(`[MESSAGE::${type}] ${contents}`),
    )

    this.setState(new State.GameState())
  }

  onJoin(client: Client, options: any) {
    if (this.state.players[client.sessionId]) return

    const player = new Entities.Player(client.sessionId)

    const availableSlots = [1, 2, 3, 4]
    // TODO migrate for colyseus 0.14
    const usedSlots = Object.values(this.state.players).map(
      (player: Entities.Player) => player.slot,
    )

    const slotNumber = availableSlots.find(
      (slotId) => !usedSlots.includes(slotId),
    )

    if (!slotNumber) {
      throw new Error(`No slots available for player ${player.id}`)
    }

    player.slot = slotNumber
    this.state.players[client.sessionId] = player
  }

  async onLeave(client: Client, consented: boolean) {
    const player = this.state.players[client.sessionId]
    const wasReady = player.ready
    player.connected = false
    player.ready = false

    if (consented) {
      delete this.state.players[client.sessionId]

      console.log(
        `[PLAYER ${client.sessionId}|${player.slot}] disconnected manually, removing from state`,
      )
      return
    }

    console.log(
      `[PLAYER ${client.sessionId}|${player.slot}] disconnected, waiting for reconnection`,
    )

    try {
      await this.allowReconnection(client, 30)

      player.connected = true
      player.ready = wasReady
    } catch (err) {
      console.log(
        `[PLAYER ${client.sessionId}|${player.slot}] failed to reconnect, removing from state`,
      )
      delete this.state.players[client.sessionId]
    }
  }

  onDispose() {}
}

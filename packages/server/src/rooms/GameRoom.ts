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

    // TODO migrate for colyseus 0.14
    const slotNumber = Object.keys(this.state.players).length + 1
    player.slot = slotNumber

    this.state.players[client.sessionId] = player
  }

  async onLeave(client: Client, consented: boolean) {
    const player = this.state.players[client.sessionId]
    player.connected = false

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
    } catch (err) {
      console.log(
        `[PLAYER ${client.sessionId}|${player.slot}] failed to reconnect, removing from state`,
      )
      delete this.state.players[client.sessionId]
    }
  }

  onDispose() {}
}

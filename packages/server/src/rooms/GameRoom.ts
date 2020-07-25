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
    this.state.players[client.sessionId] = new Entities.Player(client.sessionId)
  }

  async onLeave(client: Client, consented: boolean) {
    this.state.players[client.sessionId].connected = false

    if (consented) {
      delete this.state.players[client.sessionId]
      return
    }

    const reconnection = this.allowReconnection(client)

    try {
      await Promise.any([
        // reject in 30s
        new Promise(() => setTimeout(() => reconnection.reject(), 30000)),

        // or reconnect
        reconnection,
      ])
    } catch (err) {
      delete this.state.players[client.sessionId]
    }
  }

  onDispose() {}
}

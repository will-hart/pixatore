import { Room, Client } from 'colyseus'
import { Types, Constants, State } from '@tauri-game/shared'

export class GameRoom extends Room<State.GameState> {
  static id = 'game_room'

  onCreate(options: Types.RoomOptions) {
    this.maxClients = Constants.MAX_PLAYERS

    this.setMetadata({
      playerName: options.playerName,
      roomName: options.roomName,
    })
  }

  onJoin(client: Client, options: any) {}

  onLeave(client: Client, consented: boolean) {}

  onDispose() {}
}

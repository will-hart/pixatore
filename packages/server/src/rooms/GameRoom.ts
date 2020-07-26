import { Room, Client } from 'colyseus'
import { Dispatcher } from '../commands/Command' // @colyseus/command
import { Constants, State, Types } from '@pixatore/shared'
import {
  OnJoinCommand,
  OnCreateCommand,
  OnLeaveCommand,
  OnPlayerReadyCommand,
  OnGameStartCommand,
} from '../commands/LobbyCommands'

export class GameRoom extends Room<State.GameState> {
  static id = Constants.GAME_ROOM_NAME
  private _dispatcher: Dispatcher = new Dispatcher(this)

  onCreate(options: Types.RoomOptions) {
    this.onMessage(Types.MessageTypes.START_GAME, (client) => {
      this._dispatcher.dispatch(new OnGameStartCommand(), {})
    })

    this.onMessage(Types.MessageTypes.PLAYER_READY, (client, message) => {
      this._dispatcher.dispatch(new OnPlayerReadyCommand(), {
        sessionId: client.sessionId,
        isReady: message.isReady,
      })
    })

    this.onMessage('*', (_client, type, message) =>
      console.log(`[MESSAGE::${type}] ${message}`),
    )

    this._dispatcher.dispatch(new OnCreateCommand(), {
      options,
    })
  }

  onJoin(client: Client, options: Types.RoomOptions) {
    this._dispatcher.dispatch(new OnJoinCommand(), {
      sessionId: client.sessionId,
    })
  }

  // Use of "allowReconnection" makes command pattern tricky
  async onLeave(client: Client, consented: boolean) {
    await this._dispatcher.dispatch(new OnLeaveCommand(), {
      client,
      consented,
    })
  }

  onDispose() {}
}

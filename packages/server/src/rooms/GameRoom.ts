import { Room, Client } from 'colyseus'
import { Dispatcher } from '../commands/Command' // @colyseus/command
import { Constants, State, Types } from '@pixatore/shared'
import {
  OnJoinCommand,
  OnCreateCommand,
  OnLeaveCommand,
} from '../commands/LobbyCommands'

export class GameRoom extends Room<State.GameState> {
  static id = Constants.GAME_ROOM_NAME
  private _dispatcher: Dispatcher

  constructor() {
    super()
    this._dispatcher = new Dispatcher(this)
  }

  onCreate(options: Types.RoomOptions) {
    this.onMessage('*', (_client, type, contents) =>
      console.log(`[MESSAGE::${type}] ${contents}`),
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

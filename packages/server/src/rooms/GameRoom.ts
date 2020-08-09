import { World } from '@colyseus/ecs'
import { Room, Client } from 'colyseus'
import { Dispatcher } from '../commands/Command' // @colyseus/command
import { Constants, State, Types } from '@pixatore/game'
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
  readonly world?: World

  constructor() {
    super()
    this.world = State.buildWorld(State.WorldTypes.Server)
    this.setState(new State.GameState())
    this.world.useEntities(this.state.entities)
  }

  onCreate(options: Types.RoomOptions) {
    // handle "start game" messages from the client
    this.onMessage(Types.MessageTypes.START_GAME, (client) => {
      this._dispatcher.dispatch(new OnGameStartCommand(), {
        sessionId: client.sessionId,
      })
    })

    // handle "toggle ready" commands from the user
    this.onMessage(Types.MessageTypes.PLAYER_READY, (client, message) => {
      this._dispatcher.dispatch(new OnPlayerReadyCommand(), {
        sessionId: client.sessionId,
        isReady: message.isReady,
      })
    })

    // log all other messages
    this.onMessage('*', (_client, type, message) =>
      console.log(`[MESSAGE::${type}] ${message}`),
    )

    // finish creating the room
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

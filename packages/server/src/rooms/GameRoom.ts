import * as ECS from '@pixatore/ecs'
import { Constants, State, Systems, Types } from '@pixatore/game'
import { Room, Client } from 'colyseus'
import { EventBus } from '@pixatore/event-bus'

import { Dispatcher } from '../commands/Command' // @colyseus/command
import {
  OnJoinCommand,
  OnCreateCommand,
  OnLeaveCommand,
  OnPlayerReadyCommand,
  OnGameStartCommand,
} from '../commands/LobbyCommands'

import debug from 'debug'
const log = debug('PX:SRV:Rooms     :GameRoom  ')

export class GameRoom extends Room<ECS.World> {
  static id = Constants.GAME_ROOM_NAME
  private _dispatcher: Dispatcher = new Dispatcher(this)
  public readonly eventBus: EventBus

  constructor() {
    super()

    this.eventBus = new EventBus()
    this.setState(State.buildWorld(State.WorldTypes.Server, this.eventBus))

    this.state.registerSystem(new Systems.ConnectionStatusSystem(this.eventBus))
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
      log(`[MESSAGE::${type}] ${message}`),
    )

    // finish creating the room
    this._dispatcher.dispatch(new OnCreateCommand(), {
      options,
    })

    log('Starting ECS Tick')
    this.setSimulationInterval((delta) => {
      this.state.tick(delta)
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
}

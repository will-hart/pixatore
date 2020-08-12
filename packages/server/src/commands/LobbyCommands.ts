import {
  Components,
  Constants,
  ServerEvents,
  State,
  Types,
} from '@pixatore/game'
import { Client, Room } from 'colyseus'

import { Command } from './Command'
import { GameRoom } from '../rooms/GameRoom'

import debug from 'debug'
const log = debug('PX:SRV:Commands  :LobbyCmand')

const getNewEntity = (room: Room<any, any>) => {
  const gameRoom = room as GameRoom

  // TODO: typing as Entity creates an error here, missing private methods/fields
  // create a new message entity
  return gameRoom.world.createEntity()
}

const getEventBus = (room: Room<any, any>) => {
  const gameRoom = room as GameRoom
  return gameRoom.eventBus
}

export class OnCreateCommand extends Command<
  State.GameState,
  { options: Types.RoomOptions }
> {
  async execute({ options }: this['payload']): Promise<void> {
    log('[OnCreateCommand] Room created')
    this.room.maxClients = Constants.MAX_PLAYERS

    this.room.setMetadata({
      playerName: options.playerName,
      roomName: options.roomName,
    })
  }
}

export class OnGameStartCommand extends Command<
  State.GameState,
  { sessionId: string }
> {
  async execute({ sessionId }: this['payload']): Promise<void> {
    log('[OnGameStartCommand] Requesting game start')
    getEventBus(this.room).publish(
      ServerEvents.onRequestGameStart({
        sessionId,
        status: true,
      }),
    )
  }
}

export class OnJoinCommand extends Command<
  State.GameState,
  { sessionId: string }
> {
  async execute({ sessionId }: this['payload']): Promise<void> {
    log('[OnJoinCommand] Player attempting join')
    const newEnt = getNewEntity(this.room).addComponent(
      Components.PlayerJoinMessage,
    )

    const message = newEnt.getMutableComponent(Components.PlayerJoinMessage)

    message.messageReceivedMs = new Date().getTime()
    message.sessionId = sessionId
  }
}

export class OnLeaveCommand extends Command<
  State.GameState,
  {
    client: Client
    consented: boolean
  }
> {
  async execute({ client, consented }: this['payload']): Promise<void> {
    log(`[OnLeaveCommand] Player ${client.sessionId} leaving room`)
    // note this is a bit different to usual messages as awaiting reconnection
    // must be done in here with the connection
    const bus = getEventBus(this.room)

    if (consented) {
      // just remove the player straight away
      bus.publish(
        ServerEvents.onPlayerRemove({
          sessionId: client.sessionId,
          status: true,
        }),
      )
      return
    }

    // otherwise set the player to disconnected and not ready
    bus.publish(
      ServerEvents.onChangeConnectionState({
        sessionId: client.sessionId,
        status: false,
      }),
    )

    bus.publish(
      ServerEvents.onChangeReadyState({
        sessionId: client.sessionId,
        status: false,
      }),
    )

    // wait for reconnection
    try {
      log(`[OnLeaveCommand] Player ${client.sessionId} attempting reconnect`)
      await this.room.allowReconnection(client, 30)

      bus.publish(
        ServerEvents.onChangeConnectionState({
          sessionId: client.sessionId,
          status: true,
        }),
      )

      log(`[OnLeaveCommand] Player ${client.sessionId} reconnected`)
    } catch (err) {
      log(
        `[OnLeaveCommand] Player ${client.sessionId}] failed to reconnect, removing from state`,
      )

      bus.publish(
        ServerEvents.onPlayerRemove({
          sessionId: client.sessionId,
          status: true,
        }),
      )
    }
  }
}

export class OnPlayerReadyCommand extends Command<
  State.GameState,
  { sessionId: string; isReady: boolean }
> {
  async execute({ sessionId, isReady }: this['payload']): Promise<void> {
    log(`[OnPlayerReadyCommand] ${sessionId} requesting ready change`)

    getEventBus(this.room).publish(
      ServerEvents.onChangeReadyState({
        sessionId,
        status: isReady,
      }),
    )
  }
}

import { Command } from './Command'
import { State, Constants, Types, Components } from '@pixatore/game'
import { Client, Room } from 'colyseus'
import { GameRoom } from '../rooms/GameRoom'
import { Entity } from '@colyseus/ecs'

const getNewEntity = (room: Room<any, any>): Entity => {
  const gameRoom = room as GameRoom

  // TODO: typing as Entity creates an error here, missing private methods/fields
  // create a new message entity
  return gameRoom.world.createEntity() as any
}

export class OnCreateCommand extends Command<
  State.GameState,
  { options: Types.RoomOptions }
> {
  async execute({ options }: this['payload']): Promise<void> {
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
    const newEnt = getNewEntity(this.room).addComponent(
      Components.LobbyStateChangeMessage,
    )

    const lobbyState = newEnt.getMutableComponent(
      Components.LobbyStateChangeMessage,
    )

    lobbyState.messageReceivedMs = new Date().getTime()
    lobbyState.startingGame = true
    lobbyState.sessionId = sessionId
  }
}

export class OnJoinCommand extends Command<
  State.GameState,
  { sessionId: string }
> {
  async execute({ sessionId }: this['payload']): Promise<void> {
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
    // note this is a bit different to usual messages as awaiting reconnection
    // must be done in here with the connection

    const ent = getNewEntity(this.room)
      .addComponent(Components.PlayerConnectionStatusMessage)
      .addComponent(Components.LobbyStateChangeMessage)

    // add a "connection status" message for the player
    const conMessage = ent.getMutableComponent(
      Components.PlayerConnectionStatusMessage,
    )
    conMessage.messageReceivedMs = new Date().getTime()
    conMessage.sessionId = client.sessionId
    conMessage.isConnected = false
    conMessage.isRemoved = consented

    // add a ready message for the player
    const lobbyMsg = ent.getMutableComponent(Components.LobbyStateChangeMessage)
    lobbyMsg.messageReceivedMs = new Date().getTime()
    lobbyMsg.sessionId = client.sessionId
    lobbyMsg.readyState = false

    if (consented) return

    try {
      await this.room.allowReconnection(client, 30)

      // reconnected, send join message
      const entRejoin = getNewEntity(this.room).addComponent(
        Components.PlayerConnectionStatusMessage,
      )

      // add a "connection status" message for the player
      const rejoinMsg = entRejoin.getMutableComponent(
        Components.PlayerConnectionStatusMessage,
      )
      rejoinMsg.messageReceivedMs = new Date().getTime()
      rejoinMsg.sessionId = client.sessionId
      rejoinMsg.isConnected = true
      rejoinMsg.isRemoved = false

      console.log(`[PLAYER ${client.sessionId}] reconnected`)
    } catch (err) {
      console.log(
        `[PLAYER ${client.sessionId}] failed to reconnect, removing from state`,
      )

      // add a "connection status" message for the player
      const entRemove = getNewEntity(this.room).addComponent(
        Components.PlayerConnectionStatusMessage,
      )

      const removeMsg = entRemove.getMutableComponent(
        Components.PlayerConnectionStatusMessage,
      )
      removeMsg.messageReceivedMs = new Date().getTime()
      removeMsg.sessionId = client.sessionId
      removeMsg.isConnected = false
      removeMsg.isRemoved = true
    }
  }
}

export class OnPlayerReadyCommand extends Command<
  State.GameState,
  { sessionId: string; isReady: boolean }
> {
  async execute({ sessionId, isReady }: this['payload']): Promise<void> {
    const newEnt = getNewEntity(this.room).addComponent(
      Components.LobbyStateChangeMessage,
    )

    const lobbyState = newEnt.getMutableComponent(
      Components.LobbyStateChangeMessage,
    )

    lobbyState.messageReceivedMs = new Date().getTime()
    lobbyState.readyState = isReady
    lobbyState.sessionId = sessionId
  }
}

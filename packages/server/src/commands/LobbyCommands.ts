import { Command } from './Command'
import { State, Entities, Constants, Types } from '@pixatore/shared'
import { Room, Client, Deferred } from 'colyseus'

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

    this.room.setState(new State.GameState())
  }
}

export class OnJoinCommand extends Command<
  State.GameState,
  { sessionId: string }
> {
  async execute({ sessionId }: this['payload']): Promise<void> {
    if (this.state.players[sessionId]) return

    const player = new Entities.Player(sessionId)

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
    this.state.players[sessionId] = player
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
      await this.room.allowReconnection(client, 30)
      player.connected = true
      player.ready = wasReady
      console.log(`[PLAYER ${client.sessionId}|${player.slot}] reconnected`)
    } catch (err) {
      console.log(
        `[PLAYER ${client.sessionId}|${player.slot}] failed to reconnect, removing from state`,
      )
      console.error(err)
      delete this.state.players[client.sessionId]
    }
  }
}

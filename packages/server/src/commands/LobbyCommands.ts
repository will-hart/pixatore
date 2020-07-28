import { Command } from './Command'
import { State, Entities, Constants, Types } from '@pixatore/shared'
import { Client } from 'colyseus'

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

export class OnGameStartCommand extends Command<State.GameState, {}> {
  async execute(_payload: this['payload']): Promise<void> {
    if (this.state.status.current !== Types.GameStatus.lobby) {
      console.log(
        `[::OnGameStart] ignoring as game status is ${this.state.status}`,
      )
      return
    }

    if (
      Array.from(this.state.players.values()).some(
        (p: Entities.Player) => !p.ready || !p.connected,
      )
    ) {
      console.log(
        `[::OnGameStart] ignoring as not all players are connected/ready`,
      )
      return
    }

    this.state.status.current = Types.GameStatus.playing
  }
}

export class OnJoinCommand extends Command<
  State.GameState,
  { sessionId: string }
> {
  async execute({ sessionId }: this['payload']): Promise<void> {
    if (this.state.players.get(sessionId)) return

    const availableSlots = [1, 2, 3, 4]
    const usedSlots = Array.from(this.state.players.values()).map(
      (player: Entities.Player) => player.slot,
    )

    const slotNumber = availableSlots.find(
      (slotId) => !usedSlots.includes(slotId),
    )

    if (!slotNumber) {
      throw new Error(`No slots available for player ${sessionId}`)
    }

    const player = new Entities.Player(sessionId, slotNumber)
    this.state.players.set(sessionId, player)
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
    const player = this.state.players.get(client.sessionId)
    const wasReady = player.ready
    player.connected = false
    player.ready = false

    if (consented) {
      this.state.players.delete(client.sessionId)

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
      this.state.players.delete(client.sessionId)
    }
  }
}

export class OnPlayerReadyCommand extends Command<
  State.GameState,
  { sessionId: string; isReady: boolean }
> {
  async execute({ sessionId, isReady }: this['payload']): Promise<void> {
    if (this.state.status.current !== Types.GameStatus.lobby) {
      console.log(
        `[::OnPlayerReady] skipping ready message for player ${sessionId} as the game is not in the lobby`,
      )
      return
    }

    console.log(
      `[::OnPlayerReady] setting ${sessionId} ready state to '${isReady}'`,
    )

    const player = this.state.players.get(sessionId)
    if (!player) return
    player.ready = isReady
  }
}

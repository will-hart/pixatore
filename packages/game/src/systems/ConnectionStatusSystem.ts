import { System, Entity } from '@colyseus/ecs'
import { EventBus } from 'ts-bus'

import * as ServerEvents from '../serverEvents'
import * as Components from '../components'
const { ServerEventTypes } = ServerEvents

import debug from 'debug'
import { GameStatus } from '../types'
const log = debug('PX:GAM:Systems   :CnxStatusS')
if (console) log.log = console.log.bind(console)

export type PlayerMap = {
  [key: string]: { component: Components.PlayerData; entity: Entity }
}

export class ConnectionStatusSystem extends System {
  static queries = {
    players: {
      components: [Components.PlayerData],
    },
    status: {
      components: [Components.Status],
    },
  }

  private eventBus!: EventBus

  private readyChanges: ServerEvents.IPlayerStatusEvent[] = []
  private disconnections: ServerEvents.IPlayerStatusEvent[] = []
  private gameStartRequests: ServerEvents.IPlayerStatusEvent[] = []
  private playerRemovals: ServerEvents.IPlayerStatusEvent[] = []

  private unsubscribes: Function[] = []

  /** Initialise the system and subscribe to event updates */
  init(attrs: { eventBus: EventBus }): void {
    this.eventBus = attrs.eventBus

    this.eventBus.subscribe(
      ServerEventTypes.CHANGE_CONNECTION_STATE,
      (event) => {
        this.disconnections.push(event.payload)
      },
    )

    this.unsubscribes.push(
      this.eventBus.subscribe(ServerEventTypes.CHANGE_READY_STATE, (event) => {
        this.readyChanges.push(event.payload)
      }),
    )

    this.unsubscribes.push(
      this.eventBus.subscribe(ServerEventTypes.PLAYER_REMOVED, (event) => {
        this.playerRemovals.push(event.payload)
      }),
    )

    this.unsubscribes.push(
      this.eventBus.subscribe(ServerEventTypes.REQUEST_GAME_START, (event) => {
        this.gameStartRequests.push(event.payload)
      }),
    )
  }

  unsubscribe() {
    this.unsubscribes.forEach((unsub) => unsub())
  }

  execute(): void {
    const records =
      this.readyChanges.length +
      this.disconnections.length +
      this.gameStartRequests.length +
      this.playerRemovals.length

    if (records === 0) return

    const playerMap = this.getPlayerMap()

    if (this.readyChanges.length > 0) {
      const ready = [...this.readyChanges]
      this.readyChanges = []

      ready.forEach((event) => {
        log(`Player ${event.sessionId} set ready to ${event.status}`)
        playerMap[event.sessionId].component.isReady = event.status
      })
    }

    if (this.disconnections.length > 0) {
      const disconnect = [...this.disconnections]
      this.disconnections = []

      disconnect.forEach((event) => {
        log(`Player ${event.sessionId} set disconnected to ${event.status}`)
        playerMap[event.sessionId].component.isConnected = event.status
      })
    }

    if (this.playerRemovals.length > 0) {
      const playerRemovals = [...this.playerRemovals]
      this.playerRemovals = []

      playerRemovals.forEach((event) => {
        log(`Player ${event.sessionId} removed`)
        playerMap[event.sessionId].entity.remove()
      })
    }

    if (this.gameStartRequests.length > 0) {
      const gameStarts = [...this.gameStartRequests]
      this.gameStartRequests = []

      if (
        !gameStarts.some((g) => playerMap[g.sessionId].component.slot === 1)
      ) {
        log('Unable to start game - only the host may start the game')
        return
      }

      if (Object.values(playerMap).some((p) => !p.component.isReady)) {
        log('Unable to start game - not all players are ready')
        return
      }

      const statusEnt = this.queries.status.results?.[0]
      const status = statusEnt?.getMutableComponent?.(Components.Status)
      if (!status) {
        log('Unable to start game - no status entity found')
        return
      }

      status.value = GameStatus.playing

      log('Starting game - unregistering ConnectionStatusSystem')
      this.world.unregisterSystem(ConnectionStatusSystem)
    }
  }

  private getPlayerMap(): PlayerMap {
    return this.queries.players.results.reduce(
      // TODO: can't type item as Entity
      (acc: PlayerMap, item: any) => {
        const pd = (item as Entity).getMutableComponent?.(Components.PlayerData)
        if (!pd) return acc

        return { ...acc, [pd.playerId]: { component: pd, entity: item } }
      },
      {},
    )
  }
}

import { System, Entity, World, IQueryMap } from '@pixatore/ecs'
import { EventBus } from '@pixatore/event-bus'

import { ServerEvents } from '../events'
import * as Components from '../components'
const { ServerEventTypes } = ServerEvents

import debug from 'debug'
import { GameStatus } from '../types'
const log = debug('PX:GAM:Systems   :ConnStatus')
if (console) log.log = console.log.bind(console)

export type PlayerMap = {
  [key: string]: { component: Components.PlayerData; entity: Entity }
}

export class ConnectionStatusSystem extends System {
  public queryMap: IQueryMap = {
    players: {
      components: [Components.PlayerData],
      notComponents: [],
    },
    status: {
      components: [Components.Status],
      notComponents: [],
    },
  }

  constructor(private eventBus: EventBus) {
    super()
    this.subscribe()
  }

  private readyChanges: ServerEvents.IPlayerStatusEvent[] = []
  private disconnections: ServerEvents.IPlayerStatusEvent[] = []
  private gameStartRequests: ServerEvents.IPlayerStatusEvent[] = []
  private playerRemovals: ServerEvents.IPlayerStatusEvent[] = []

  private unsubscribes: Function[] = []

  /** Initialise the system and subscribe to event updates */
  private subscribe(): void {
    this.unsubscribes.push(
      this.eventBus.subscribe(
        ServerEventTypes.CHANGE_CONNECTION_STATE,
        (event) => {
          this.disconnections.push(event.payload)
        },
      ),
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

  private shouldExecute(): boolean {
    return (
      this.readyChanges.length +
        this.disconnections.length +
        this.gameStartRequests.length +
        this.playerRemovals.length >
      0
    )
  }

  private handlePlayerStateChange(
    operation: string,
    data: ServerEvents.IPlayerStatusEvent[],
    handler: (event: ServerEvents.IPlayerStatusEvent) => void,
  ) {
    if (data.length === 0) return
    data.forEach((event) => {
      log(`Player ${event.sessionId} set ${operation} to ${event.status}`)
      handler(event)
    })
  }

  private handleReadyChanges(playerMap: PlayerMap): void {
    this.handlePlayerStateChange('ready', [...this.readyChanges], (event) => {
      playerMap[event.sessionId].component.isReady = event.status
    })

    this.readyChanges = []
  }

  private handleDisconnections(playerMap: PlayerMap): void {
    this.handlePlayerStateChange(
      'disconnected',
      [...this.disconnections],
      (event) => {
        playerMap[event.sessionId].component.isConnected = event.status
      },
    )

    this.disconnections = []
  }

  private handlePlayerRemovals(world: World, playerMap: PlayerMap): void {
    if (this.playerRemovals.length === 0) return
    const playerRemovals = [...this.playerRemovals]
    this.playerRemovals = []

    playerRemovals.forEach((event) => {
      log(`Player ${event.sessionId} removed`)
      world.releaseEntity(playerMap[event.sessionId].entity)
    })
  }

  private handleGameStartRequests(world: World, playerMap: PlayerMap): void {
    if (this.gameStartRequests.length === 0) return
    const gameStarts = [...this.gameStartRequests]
    this.gameStartRequests = []

    if (!gameStarts.some((g) => playerMap[g.sessionId].component.slot === 1)) {
      log('Unable to start game - only the host may start the game')
      return
    }

    if (Object.values(playerMap).some((p) => !p.component.isReady)) {
      log('Unable to start game - not all players are ready')
      return
    }

    const statusEnts = this.queries.status.entities
    if (statusEnts.length !== 1) {
      throw new Error(`Expected 1 status entity, found ${statusEnts.length}`)
    }

    const status = statusEnts[0].getComponent(Components.Status)
    if (!status) {
      log('Unable to start game - no status entity found')
      return
    }

    status.value = GameStatus.playing

    log('Starting game - unregistering ConnectionStatusSystem')
    world.unregisterSystem(ConnectionStatusSystem as any)
  }

  private getPlayerMap(): PlayerMap {
    return this.queries.players.entities.reduce(
      (acc: PlayerMap, item: Entity) => {
        const pd = item.getComponent(Components.PlayerData)
        if (!pd) return acc

        return { ...acc, [pd.playerId]: { component: pd, entity: item } }
      },
      {},
    )
  }

  execute(_deltaT: number, world: World): void {
    if (!this.shouldExecute()) return

    const playerMap = this.getPlayerMap()
    this.handleReadyChanges(playerMap)
    this.handleDisconnections(playerMap)
    this.handlePlayerRemovals(world, playerMap)
    this.handleGameStartRequests(world, playerMap)
  }
}

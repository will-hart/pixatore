import debug from 'debug'

import { System, IQueryMap, World } from '@pixatore/ecs'
import { EventBus } from '@pixatore/event-bus'
import { LoadRenderer } from '../components/LoadRenderer'
import {
  Components,
  ILoadingProgressEvent,
  UniversalEvents,
} from '@pixatore/game'

const log = debug('PX:REC:ServrRenderLoadSystem')

export type LoadingMessagePayload = ILoadingProgressEvent & {
  sessionId: string
}

/**
 * A class to manage loading on the server
 */
export class ServerRendererLoadingSystem extends System {
  queryMap: IQueryMap = {
    loading: {
      components: [LoadRenderer],
      notComponents: [],
    },
    players: {
      components: [Components.PlayerData],
      notComponents: [],
    },
  }

  private _loadingUpdateMessages: LoadingMessagePayload[] = []

  private readyToLoad = false

  constructor(protected eventBus: EventBus) {
    super()

    this.eventBus.subscribe(UniversalEvents.onReadyToLoad, () => {
      log('Received ready event, setting up renderer in next tick')
      this.readyToLoad = true
    })
  }

  private setReadyToLoad(world: World): void {
    if (!this.readyToLoad) return

    log('Setting up load renderer component')
    world.createEntity('loading_status').addComponent(LoadRenderer)
  }

  private initialiseLoadingComponent(component: LoadRenderer): void {
    log('Initialising load renderer component')
    const players = this.queries.players.entities
    if (!players?.length) return

    players
      .map((p) => p.getComponent(Components.PlayerData)!)
      .forEach((pd) => {
        component.playerLoaded.set(pd.playerId, 0)
      })

    component.initialised = true
  }

  private handleLoadingMessages(
    component: LoadRenderer,
    messages: LoadingMessagePayload[],
  ) {
    // check if there are any messages to process
    if (messages.length === 0) return

    for (const message of messages) {
      component.playerLoaded.set(
        message.sessionId,
        message.isComplete ? 100 : message.progress,
      )
    }
  }

  execute(_deltaT: number, world: World) {
    const loading = this.queries.loading.entities

    if (loading.length === 0) {
      this.setReadyToLoad(world)
      return // initialise next server frame
    }

    const component = loading[0].getComponent(LoadRenderer)
    if (!component) return

    // initialise by adding players to the player ready map
    if (!component.initialised) {
      this.initialiseLoadingComponent(component)
    }

    this.handleLoadingMessages(component, this._loadingUpdateMessages)
    this._loadingUpdateMessages.length = 0
  }

  public queueLoadingUpdate(
    message: ILoadingProgressEvent & {
      sessionId: string
    },
  ): void {
    this._loadingUpdateMessages.push(message)
  }
}

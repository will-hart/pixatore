import debug from 'debug'

import { System, IQueryMap, INetworkMessageSender, World } from '@pixatore/ecs'
import { EventBus } from '@pixatore/event-bus'
import { UniversalEvents } from '@pixatore/game'
import { MessageTypes } from '..'

const log = debug('PX:REN:ClientRenderLoadinSys')
if (console) log.log = console.log.bind(console)

/**
 * A class to manage loading on the client - listens for progress
 * updates on the event bus and forwards them to the server
 */
export class ClientRendererLoadingSystem extends System {
  queryMap: IQueryMap = {}

  constructor(
    private room: INetworkMessageSender,
    protected eventBus: EventBus,
  ) {
    super()

    log('Creating system')

    eventBus.subscribe(
      UniversalEvents.onLoadingProgress,
      this.onLoadingProgress,
    )

    eventBus.subscribe(
      UniversalEvents.onLoadingComplete,
      this.onLoadingComplete,
    )
  }

  private onLoadingProgress = ({
    payload,
  }: {
    type: string
    payload: {
      status: string
      progress: number
      isComplete: boolean
    }
  }): void => {
    log('Sending loading progress %o', payload)
    this.room.send(MessageTypes.LOADING_PROGRESS, { ...payload })
  }

  private onLoadingComplete = (): void => {
    log('Sending loading complete')
    this.room.send(MessageTypes.LOADING_PROGRESS, {
      status: 'Complete',
      isComplete: true,
      progress: 1,
    })
  }

  execute(_deltaT: number, _world: World) {
    // nothing required
  }
}

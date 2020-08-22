import { System, IQueryMap, INetworkMessageSender, World } from '@pixatore/ecs'
import { EventBus } from '@pixatore/event-bus'
import { UniversalEvents } from '@pixatore/game'
import { MessageTypes } from '..'

/**
 * A class to manage loading on the client - listens for progress
 * updates on the event bus and forwards them to the server
 */
export class ClientRendererLoadingSystem extends System {
  queryMap: IQueryMap = {}

  constructor(
    private client: INetworkMessageSender,
    protected eventBus: EventBus,
  ) {
    super()

    eventBus.subscribe(UniversalEvents.onLoadingProgress, (event) =>
      this.onLoadingProgress(event),
    )
  }

  private onLoadingProgress({
    payload,
  }: {
    type: string
    payload: {
      status: string
      progress: number
      isComplete: boolean
    }
  }): void {
    this.client.send(MessageTypes.LOADING_PROGRESS, { ...payload })
  }

  execute(deltaT: number, world: World) {
    // nothing required
  }
}

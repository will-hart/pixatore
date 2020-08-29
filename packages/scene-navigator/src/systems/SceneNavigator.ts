import { System, IQueryMap, World } from '@pixatore/ecs'
import { EventBus } from '@pixatore/event-bus'

import { SceneNavigation } from '../components'
import {
  onSceneChange,
  ISceneTransitionEventPayload,
  SceneTransitionTypes,
} from '../events'
import Stack from '../Stack'

export class SceneNavigator extends System {
  queryMap: IQueryMap = {
    navigator: {
      components: [SceneNavigation],
      notComponents: [],
    },
  }

  private _sceneStack: Stack<string> = new Stack()

  private _sceneChangeRequests: ISceneTransitionEventPayload[] = []

  constructor(private eventBus: EventBus) {
    super()

    this.eventBus.subscribe(onSceneChange, (event) => {
      this._sceneChangeRequests.push(event.payload)
    })
  }

  execute(_deltaT: number, _world: World): void {
    if (this._sceneChangeRequests.length === 0) return

    const nav = this.queries.navigator.entities
    if (nav?.length <= 0) return

    this.handleSceneChanges(
      nav[0]?.getComponent(SceneNavigation),
      this._sceneChangeRequests,
    )
    this._sceneChangeRequests.length = 0
  }

  /**
   * Performs the requested scene change
   */
  private handleSceneChanges(
    nav: SceneNavigation | undefined,
    requests: ISceneTransitionEventPayload[],
  ) {
    if (!nav || !requests?.length) return

    for (const request of requests) {
      this.processRequest(request)
    }

    nav.currentScene = this._sceneStack.peek()
  }

  private processRequest = (request: ISceneTransitionEventPayload) => {
    if (request.transitionType === SceneTransitionTypes.reset) {
      this._sceneStack.clear()
    }

    if (request.transitionType === SceneTransitionTypes.replace) {
      this._sceneStack.dequeue()
    }

    if (request.nextScreen) {
      this._sceneStack.enqueue(request.nextScreen)
    }
  }
}

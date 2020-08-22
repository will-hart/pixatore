import { System, IQueryMap, World } from '@pixatore/ecs'
import { EventBus } from '@pixatore/event-bus'
import { LoadRendererComponent } from '../components/LoadRendererComponent'
import { Components } from '@pixatore/game'

/**
 * A class to manage loading on the server
 */
export class ServerRendererLoadingSystem extends System {
  queryMap: IQueryMap = {
    loading: {
      components: [LoadRendererComponent],
      notComponents: [],
    },
    players: {
      components: [Components.PlayerData],
      notComponents: [],
    },
  }

  constructor(protected eventBus: EventBus) {
    super()
  }

  execute(deltaT: number, world: World) {
    const loading = this.queries.loading.entities
    if (loading.length < 1) {
      return
    }

    const component = loading[0].getComponent(LoadRendererComponent)
    if (!component) return

    // initialise by adding players to the player ready map
    if (!component.initialised) {
      const players = this.queries.players.entities
      if (!players?.length) return

      players
        .map((p) => p.getComponent(Components.PlayerData)!)
        .forEach((pd) => {
          component.playerLoaded.set(pd.playerId, 0)
        })

      component.initialised = true
    }
  }
}

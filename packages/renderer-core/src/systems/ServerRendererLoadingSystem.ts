import debug from 'debug'

import { System, IQueryMap, World } from '@pixatore/ecs'
import { EventBus } from '@pixatore/event-bus'
import { LoadRendererComponent } from '../components/LoadRendererComponent'
import { Components, UniversalEvents } from '@pixatore/game'

const log = debug('PX:REC:ServrRenderLoadSystem')

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

  private readyToLoad = false

  constructor(protected eventBus: EventBus) {
    super()

    this.eventBus.subscribe(UniversalEvents.onReadyToLoad, () => {
      log('Received ready event, setting up renderer in next tick')
      this.readyToLoad = true
    })
  }

  execute(_deltaT: number, world: World) {
    const loading = this.queries.loading.entities

    if (loading.length === 0) {
      if (!this.readyToLoad) return

      log('Setting up load renderer component')
      const ent = world.createEntity('loading_status')
      ent.addComponent(LoadRendererComponent)

      return // initialise next server frame
    }

    const component = loading[0].getComponent(LoadRendererComponent)
    if (!component) return

    // initialise by adding players to the player ready map
    if (!component.initialised) {
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
  }
}

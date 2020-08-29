import { System, IQueryMap, World } from '@pixatore/ecs'
import { SceneNavigation } from '../components'

export class SceneNavigator extends System {
  queryMap: IQueryMap = {
    navigator: {
      components: [SceneNavigation],
      notComponents: [],
    },
  }
  execute(deltaT: number, world: World): void {
    throw new Error('Method not implemented.')
  }
}

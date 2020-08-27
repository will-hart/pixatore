import { IQueryMap } from './types'
import { Query } from './Query'
import { World } from './World'

export abstract class System {
  abstract queryMap: IQueryMap

  queries: { [key: string]: Query } = {}

  priority: number = 0

  abstract execute(deltaT: number, world: World): void

  destroy(): void {}
}

import { IQueryMap } from './types'
import { Query } from './Query'

export abstract class System {
  static queryMap: IQueryMap = {}

  queries: { [key: string]: Query } = {}

  priority: number = 0

  abstract execute(deltaT: number): void
}

import { IQueryMap, IQueryResultMap } from './types'
import { Query } from './QueryCache'

export abstract class System {
  static queryMap: IQueryMap = {}

  queries: { [key: string]: Query } = {}

  priority: number = 0

  abstract execute(queries: IQueryResultMap, deltaT: number): void
}

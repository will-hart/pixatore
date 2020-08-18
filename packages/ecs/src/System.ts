import { IQueryMap, IQueryResultMap } from './types'

export abstract class System {
  static queries: IQueryMap = {}

  priority: number = 0

  abstract execute(queries: IQueryResultMap, deltaT: number): void
}

import { ECS } from './ECS'
import { Entity } from './Entity'

export class ComponentFilter {
  constructor(private include: string[], private exclude: string[]) {
    //
  }

  getMatchingEntities(engine: ECS): Entity[] {
    return engine.allEntities.filter(
      (e) => e.hasAll(this.include) && e.hasNone(this.exclude),
    )
  }
}

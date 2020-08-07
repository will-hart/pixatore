import { ComponentFilter } from './ComponentFilter'
import { Entity } from './Entity'

export abstract class System {
  constructor(
    public readonly matcher: ComponentFilter,
    public readonly priority: number,
  ) {}

  abstract tick(entities: Entity[], elapsed: number): void
}

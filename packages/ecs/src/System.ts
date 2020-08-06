import ComponentMatcher from './ComponentFilter'
import Entity from './Entity'

export default abstract class System {
  constructor(
    public readonly matcher: ComponentMatcher,
    public readonly priority: number,
  ) {}

  abstract tick(entities: Entity[], elapsed: number): void
}

import SpriteDrawable from '../drawables/SpriteDrawable'
import { EventBus } from '@pixatore/shared'
import GroupDrawable from '../drawables/GroupDrawable'
import Engine from '../Engine'

/**
 * A collection of drawable objects that is synchronised with Colyseus game state
 */
abstract class EntityLink<
  TEntity extends { id: string },
  TDrawable extends SpriteDrawable
> {
  /** Contains the mapping between entity ID and drawable */
  protected collection: Map<string, TDrawable> = new Map<string, TDrawable>()

  constructor(protected engine: Engine, protected parent: GroupDrawable) {}

  /**
   * Subscribes to events required to keep this EntityLink up to date
   * @param bus
   */
  abstract subscribe(bus: EventBus): void

  abstract createEntity(entity: TEntity): void

  abstract updateEntity(entity: TEntity): void

  protected addDrawable(entity: TEntity, drawable: TDrawable): void {
    this.parent.addChild(drawable)
    this.collection.set(entity.id, drawable)
  }

  public removeEntity(entity: TEntity) {
    const drawable = this.collection.get(entity.id)
    if (!drawable) {
      console.warn(
        `Attempted to remove unknown entity ${entity.id} from EntityLink`,
      )
      return
    }

    this.parent.removeChild(drawable)
    this.collection.delete(entity.id)
  }
}

export default EntityLink

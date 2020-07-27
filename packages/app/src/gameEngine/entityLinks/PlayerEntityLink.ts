import EntityLink from './EntityLink'
import { Entities, EventBus } from '@pixatore/shared'
import SpriteDrawable from '../drawables/SpriteDrawable'
import { SpriteKey } from '../spriteMap'

export default class PlayerEntityLink extends EntityLink<
  Entities.Player,
  SpriteDrawable
> {
  subscribe = (bus: EventBus): void => {
    bus.onPlayerAdd(this.createEntity)
    bus.onPlayerRemove(this.removeEntity)
    bus.onPlayerUpdate(this.updateEntity)
  }

  createEntity = (entity: Entities.Player): void => {
    const sprite = new SpriteDrawable(this.engine, entity.id, SpriteKey.WHITE)
    sprite.tint = 0x00ff00
    sprite.width = sprite.height = 5
    sprite.position.set(entity.position.x, entity.position.y)
    this.addDrawable(entity, sprite)
  }

  updateEntity = (entity: Entities.Player): void => {
    const drawable = this.collection.get(entity.id)
    if (!drawable) return

    drawable.targetX = entity.position.x
    drawable.targetY = entity.position.y
  }
}

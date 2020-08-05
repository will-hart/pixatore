import { IComponent } from './Component'
import Entity from './Entity'

/** This is the main ECS class. It provides the following key features (in order of priority):
 *
 * 1. mapping components to entities (get entities for all position components)
 * 2. matching component queries (e.g. entities matching component type 1, 2, but not having 3)
 * 3. mapping entities to components (get all the components on entity X)
 */
export default class ECS {
  private entities = new Map<number, Entity>()
  private components = new Map<number, IComponent>()
  private componentToEntity = new Map<number, number>()

  private nextComponentId = 1

  /**
   * Adds a new component to an entity, creating a new entity if required.
   * Returns the entity (created or retrieved from an existing entity)
   *
   * @param component the component to add
   */
  add(component: IComponent, entityId?: number): Entity {
    let entity
    if (!entityId) {
      entity = new Entity()
      this.entities.set(entity.id, entity)
    }

    if (entityId && !entity) {
      entity = this.entities.get(entityId)
    }

    if (!entity) {
      throw new Error(`Error adding component - entity '${entityId}' not found`)
    }

    if (!component.id) {
      component.id = this.nextComponentId++
    }

    entity.addComponent(component)
    this.components.set(component.id, component)
    this.componentToEntity.set(component.id, entity.id)

    return entity
  }

  /**
   * Removes a component, returning the component
   */
  remove(component: IComponent): IComponent {
    if (!component.id) {
      throw new Error('Unable to remove component with no ID set')
    }

    const entityId = this.componentToEntity.get(component.id)
    if (!entityId) {
      throw new Error(
        `Unable to remove component '${component.id}' as no linked entity found`,
      )
    }

    const entity = this.entities.get(entityId)
    if (!entity) {
      throw new Error(
        `Unable to remove component '${component.id}', entity '${entityId}' not found`,
      )
    }

    entity.removeComponent(component)
    this.components.delete(component.id)
    this.componentToEntity.delete(component.id)

    return component
  }

  /**
   * Gets the number of entities currently in the map
   */
  get entityCount() {
    return this.entities.size
  }
}

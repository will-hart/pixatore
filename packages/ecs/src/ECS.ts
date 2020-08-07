import { IComponent } from './Component'
import { Entity } from './Entity'
import { System } from './System'

/** This is the main ECS class. It provides the following key features (in order of priority):
 *
 * 1. mapping components to entities (get entities for all position components)
 * 2. matching component queries (e.g. entities matching component type 1, 2, but not having 3)
 * 3. mapping entities to components (get all the components on entity X)
 */
export class ECS {
  private entities = new Map<number, Entity>()
  private components = new Map<number, IComponent>()
  private componentToEntity = new Map<number, number>()
  private systems: System[] = []

  private nextComponentId = 1

  /**
   * Updates all the attached systems
   *
   * @param delta The elapsed time in ms
   */
  tick(delta: number): void {
    for (let i = 0; i < this.systems.length; ++i) {
      const system = this.systems[i]
      system.tick(system.matcher.getMatchingEntities(this), delta)
    }
  }

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
   * Add a number of components to an entity
   *
   * @param components The components to add to the entity
   * @param entityId The entity ID to add the components to, or null to add a new entity
   */
  addMany(components: IComponent[], entityId?: number): Entity {
    if (components.length === 0) {
      throw new Error('Attempted to create entity with no components')
    }

    const ent: Entity = this.add(components[0], entityId)

    for (let i = 1; i < components.length; ++i) {
      this.add(components[i], ent.id)
    }

    return ent
  }

  /**
   * Adds a system to the engine in order of priority
   *
   * @param system the system to add
   */
  addSystem(system: System): void {
    this.systems.push(system)
    this.systems = this.systems.sort((a, b) => b.priority - a.priority)
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

  /**
   * Gets a readonly array of entities currently present in the system
   */
  get allEntities(): Entity[] {
    return [...this.entities.values()]
  }
}

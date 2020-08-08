import { EventBus } from 'ts-bus'
import { IComponent } from './Component'
import { Entity } from './Entity'
import { System } from './System'
import * as Events from './events'

/** This is the main ECS class. It provides the following key features (in order of priority):
 *
 * 1. mapping components to entities (get entities for all position components)
 * 2. matching component queries (e.g. entities matching component type 1, 2, but not having 3)
 * 3. mapping entities to components (get all the components on entity X)
 */
export class ECS {
  private eventBus: EventBus = new EventBus()
  private entities = new Map<string, Entity>()
  private components = new Map<number, IComponent>()
  private componentToEntity = new Map<number, string>()
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
   * @param entityId the id of the entity to add to (or undefined for a new entity)
   * @param createEntityIfNotExists if true, creates an entity if an ID is passed but no matching entity exists. If false, throws if entityId is passed and doesn't exist
   */
  add(
    component: IComponent,
    entityId?: string,
    createEntityIfNotExists = false,
  ): Entity {
    let entity = entityId ? this.entities.get(entityId) : undefined

    // create a new entity if undefined is passed, or
    // if we don't have an entity but want to create (using an existing ID)
    // this handles the use case of injecting a networked entity that was just received at a client
    if (!entityId || (!entity && entityId && createEntityIfNotExists)) {
      entity = new Entity(entityId)
      this.entities.set(entity.id, entity)
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

    this.eventBus.publish(Events.componentAdded(component))

    return entity
  }

  /**
   * Add a number of components to an entity.
   *
   * If `undefined` is passed as entityId, a new entity ID will be created. If an entity
   * Id is passed, then it will reuse an existing entity if one exists, or create a new
   * entity with the given ID if one does not exist.
   *
   * @param components The components to add to the entity
   * @param entityId The entity ID to add the components to, or null to add a new entity
   */
  addMany(components: IComponent[], entityId?: string): Entity {
    if (components.length === 0) {
      throw new Error('Attempted to create entity with no components')
    }

    const ent: Entity = this.add(components[0], entityId, true)

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

    this.eventBus.publish(Events.componentRemoved(component))

    return component
  }

  /**
   * Gets a single component
   *
   * @param componentId The component ID to retrieve
   */
  getComponent<T extends IComponent>(
    componentId?: number,
  ): IComponent | undefined {
    if (!componentId) return undefined
    return this.components.get(componentId) as T
  }

  /**
   * Gets a reference to the internal event bus, used for subscribing to events
   */
  get events() {
    return this.eventBus
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

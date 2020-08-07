import { IComponent } from './Component'

export class Entity {
  private static nextId: number = 0

  readonly id: number

  private _componentTypes: Set<string>
  private _componentIds: Set<number>
  private destroyed = false

  constructor() {
    this.id = Entity.nextId++
    this._componentTypes = new Set<string>()
    this._componentIds = new Set<number>()
  }

  /**
   * Adds a new component to the entity
   *
   * @param component The component to add
   */
  addComponent(component: IComponent): void {
    if (!component.id) {
      throw new Error(
        `Attempted to add component without ID to entity '${this.id}'`,
      )
    }

    if (this._componentTypes.has(component.componentType)) {
      throw new Error(
        `Duplicate component type, unable to add '${component.componentType}' id ${component.id} to entity ${this.id}`,
      )
    }
    this._componentIds.add(component.id)
    this._componentTypes.add(component.componentType)
  }

  /**
   * Adds several components to the entity
   *
   * @param components The components to add
   */
  addComponents(components: IComponent[]): void {
    for (const component of components) {
      this.addComponent(component)
    }
  }

  /**
   * Removes a component from an entity
   *
   * @param component The component to remove
   */
  removeComponent(component: IComponent): void {
    if (!component.id) {
      throw new Error(
        `Attempted to remove component without ID from entity '${this.id}'`,
      )
    }

    this._componentIds.delete(component.id)
    this._componentTypes.delete(component.componentType)
  }

  /**
   * Removes several components from an entity
   *
   * @param components The components to remove
   */
  removeComponents(components: IComponent[]): void {
    for (const component of components) {
      this.removeComponent(component)
    }
  }

  /**
   * Returns true if the entity has the given component type
   *
   * @param componentType The component type to check
   */
  has(componentType: string): boolean {
    return this._componentTypes.has(componentType)
  }

  /**
   * Returns true if the entity has all the given component types
   *
   * @param componentTypes The list of component types to check
   */
  hasAll(componentTypes: string[]): boolean {
    if (componentTypes.length === 0) return true

    for (let i = 0; i < componentTypes.length; ++i) {
      if (!this.has(componentTypes[i])) return false
    }

    return true
  }

  /**
   * Returns true if the entity has NONE of the given component types
   *
   * @param componentTypes The list of component types to check
   */
  hasNone(componentTypes: string[]): boolean {
    if (componentTypes.length === 0) return true

    for (let i = 0; i < componentTypes.length; ++i) {
      if (this.has(componentTypes[i])) return false
    }

    return true
  }

  /**
   * Gets the component types on this entity
   */
  get componentTypes() {
    return Array.from(this._componentTypes)
  }

  /**
   * Gets the component Ids on this entity
   */
  get componentIds() {
    return Array.from(this._componentIds)
  }

  /**
   * Gets whether the entity has been destroyed (occurs when the last component is removed)
   */
  get isDestroyed() {
    return this.destroyed
  }
}

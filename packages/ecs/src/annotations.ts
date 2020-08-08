export interface IDecoratedComponentList {
  constructor: any
  _ecsComponents?: { [componentType: string]: string }
}

/**
 * Marks the given schema property as representing an ECS component.
 * This will allow the ECS to separately register this component with the
 * ECS on creation/sync.
 *
 * Should be applied to child schema of colyseus schema objects.
 *
 * @param componentType The component type (string) that will populate this schema field
 */
export function ecsComponent(componentType: string) {
  let _value: IDecoratedComponentList['_ecsComponents'] = {}

  return function (target: IDecoratedComponentList, field: string) {
    _value = { ...target._ecsComponents, [componentType]: field }

    Object.defineProperty(target, '_ecsComponents', {
      get: (): IDecoratedComponentList['_ecsComponents'] => _value,
      set: (value: IDecoratedComponentList['_ecsComponents']) =>
        (_value = value),
      enumerable: true,
      configurable: true,
    })
  }
}

/**
 * Marks this schema class as being an ECS entity. The class itself won't be
 * added to the ECS but any child component will be registered as ECS components.
 *
 * Should be applied to colyseus schema objects.
 *
 * @param target the schema class being marked
 */
export function ecsEntity(target: any) {
  target.prototype._isEntity = true
}

export const isEntity = (entity: any) => !!entity._isEntity

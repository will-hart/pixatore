export interface IDecoratedComponentList {
  constructor: any
  _ecsComponents?: { [componentType: string]: string }
}

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

export function ecsEntity(target: any) {
  target.prototype._isEntity = true
}

export const isEntity = (entity: any) => !!entity._isEntity

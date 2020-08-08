import { createEventDefinition } from 'ts-bus'
import { IComponent } from './Component'

export enum DefaultEventTypes {
  ComponentAdded = 'comp+',
  ComponentRemoved = 'comp-',
}

export const componentAdded = createEventDefinition<IComponent>()(
  DefaultEventTypes.ComponentAdded,
)

export const componentRemoved = createEventDefinition<IComponent>()(
  DefaultEventTypes.ComponentRemoved,
)

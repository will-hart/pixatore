import { Component } from '@colyseus/ecs'
import { Schema } from '@colyseus/schema'
import { createEventDefinition } from 'ts-bus'

import * as Components from './components'

export interface IComponentEvent<T extends Component> {
  component: Omit<T, keyof Schema>
}

export enum ClientEventTypes {
  PLAYER_DATA_UPDATED = 'PD~',
  PLAYER_DATA_REMOVED = 'PD-',
}

export const onPlayerUpdateEvent = createEventDefinition<
  IComponentEvent<Components.PlayerData>
>()(ClientEventTypes.PLAYER_DATA_UPDATED)

export const onPlayerRemoveEvent = createEventDefinition<
  IComponentEvent<Components.PlayerData>
>()(ClientEventTypes.PLAYER_DATA_REMOVED)

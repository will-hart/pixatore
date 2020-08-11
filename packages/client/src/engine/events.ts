import { Component } from '@colyseus/ecs'
import { Schema } from '@colyseus/schema'
import { Components } from '@pixatore/game'
import { createEventDefinition } from 'ts-bus'

export interface IComponentEvent<T extends Component> {
  component: Omit<T, keyof Schema>
}

export enum EventTypes {
  PLAYER_DATA_UPDATED = 'PD~',
  PLAYER_DATA_REMOVED = 'PD-',
}

export const onPlayerUpdateEvent = createEventDefinition<
  IComponentEvent<Components.PlayerData>
>()(EventTypes.PLAYER_DATA_UPDATED)

export const onPlayerRemoveEvent = createEventDefinition<
  IComponentEvent<Components.PlayerData>
>()(EventTypes.PLAYER_DATA_REMOVED)

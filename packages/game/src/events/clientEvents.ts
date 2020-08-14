import { Component } from '@colyseus/ecs'
import { Schema } from '@colyseus/schema'

import * as Components from '../components'
import { buildEvent } from './eventBuilder'

export interface IComponentEvent<T extends Component> {
  component: Omit<T, keyof Schema>
}

export enum ClientEventTypes {
  PLAYER_DATA_UPDATED = 'PD~',
  PLAYER_DATA_REMOVED = 'PD-',
}

export const onPlayerUpdateEvent = buildEvent<
  IComponentEvent<Components.PlayerData>
>(ClientEventTypes.PLAYER_DATA_UPDATED)

export const onPlayerRemoveEvent = buildEvent<
  IComponentEvent<Components.PlayerData>
>(ClientEventTypes.PLAYER_DATA_REMOVED)

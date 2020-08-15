export { EventBus } from 'ts-bus'
import { createEventDefinition } from 'ts-bus'

export const buildEvent = <T>(eventName: string) =>
  createEventDefinition<T>()(eventName)

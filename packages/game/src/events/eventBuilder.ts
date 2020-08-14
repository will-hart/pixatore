import { createEventDefinition } from 'ts-bus'

export const buildEvent = <T>(eventName: string) =>
  createEventDefinition<T>()(eventName)

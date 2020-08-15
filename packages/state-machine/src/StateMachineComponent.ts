import { type } from '@colyseus/schema'
import { Component } from '@pixatore/ecs'

/**
 * An abstract component that can be extended for individual state machines.
 *
 * A string enum should be provided as the generic type. See ecs.tests.ts for
 * an example of usage.
 */
export abstract class StateMachineComponent<
  TStateEnum extends string
> extends Component {
  @type('string') currentState?: TStateEnum
}

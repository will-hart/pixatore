import { System } from '@colyseus/ecs'
import { StateMachine, StateMachineTransitionMap } from './StateMachine'

/**
 * An abstract state machine system that should be updated with transition logic
 */
export abstract class StateMachineSystem<
  TStateEnum extends string
> extends System {
  protected stateMachine!: StateMachine<TStateEnum>

  init(attributes: {
    priority: number
    stateTransitions: StateMachineTransitionMap<TStateEnum>
    initialState: TStateEnum
    [key: string]: any
  }) {
    this.stateMachine = new StateMachine(
      attributes.stateTransitions,
      attributes.initialState,
    )
  }
}

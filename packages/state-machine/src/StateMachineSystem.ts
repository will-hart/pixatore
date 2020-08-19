import { System } from '@pixatore/ecs'
import { StateMachine, StateMachineTransitionMap } from './StateMachine'

export interface StateMachineSystemAttributes<TStateEnum extends string> {
  priority?: number
  stateTransitions: StateMachineTransitionMap<TStateEnum>
  initialState: TStateEnum
  [key: string]: any
}

/**
 * An abstract state machine system that should be updated with transition logic.
 *
 * Ensure that the system is registered with the correct attributes type, see
 * StateMachineSystemAttributes<TStateEnum>
 */
export abstract class StateMachineSystem<
  TStateEnum extends string
> extends System {
  protected stateMachine!: StateMachine<TStateEnum>

  constructor(attributes: StateMachineSystemAttributes<TStateEnum>) {
    super()
    this.stateMachine = new StateMachine(
      attributes.stateTransitions,
      attributes.initialState,
    )
  }
}

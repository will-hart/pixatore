import { Component } from '@colyseus/ecs'
import { type } from '@colyseus/schema'

export class StateMachineComponent<
  TStateEnum extends string
> extends Component {
  @type('string') currentState?: TStateEnum
}

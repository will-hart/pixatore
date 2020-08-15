import debug from 'debug'

const log = debug('PX:STM:StateMachine         ')

export type StateMachineTransitionMap<TStateEnum extends string> = {
  [key in TStateEnum]: TStateEnum[]
}

export class StateMachine<TStateEnum extends string> {
  constructor(
    private stateTransitions: StateMachineTransitionMap<TStateEnum>,
    private current: TStateEnum,
  ) {
    log('Created new state machine with transitions %o', stateTransitions)
  }

  /**
   * Gets the available transitions from the given state (or the given state)
   * if `from` is left undefined
   *
   * @param from The state to transition from (the current state if left undefined)
   */
  public availableTransitions(from?: TStateEnum): TStateEnum[] {
    return this.stateTransitions[from || this.current]
  }

  /**
   * Returns true if the given `from` and `to` transitions are a valid transition
   *
   * @param from The state being transitioned from
   * @param to The state being transitioned to
   */
  public canTransition(from: TStateEnum, to: TStateEnum): boolean {
    return this.stateTransitions[from].includes(to)
  }

  /**
   * Returns true if it is possible to transition from the current state to
   * the given `to` state.
   *
   * @param to The state being transitioned to
   */
  public canTransitionTo(to: TStateEnum): boolean {
    return this.canTransition(this.current, to)
  }

  public transitionTo(to: TStateEnum): boolean {
    if (!this.canTransitionTo(to)) {
      log(
        `Unable to transition from ${this.current} to ${to}, aborting transition`,
      )
      return false
    }

    log(`Transitioning from ${this.current} to ${to}`)
    this.current = to
    return true
  }

  /**
   * Gets the current state
   */
  public get currentState(): TStateEnum {
    return this.current
  }
}

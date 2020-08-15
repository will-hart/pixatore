import { StateMachine } from '../stateMachine'

describe('State Machine', () => {
  enum TestStates {
    State1 = 'state1',
    State2 = 'state2',
    State3 = 'state3',
  }

  const getStateMachine = (
    initialState: TestStates = TestStates.State1,
  ): StateMachine<TestStates> => {
    return new StateMachine<TestStates>(
      {
        [TestStates.State1]: [TestStates.State1, TestStates.State2],
        [TestStates.State2]: [TestStates.State1],
        [TestStates.State3]: [],
      },
      initialState,
    )
  }

  describe('SMS - create state machines', () => {
    it('SMS.01 - should create state machine without throwing', () => {
      getStateMachine()
    })

    it('SMS.02 - should set the initial state', () => {
      const sm1 = getStateMachine(TestStates.State1)
      expect(sm1.currentState).toEqual(TestStates.State1)
      const sm2 = getStateMachine(TestStates.State2)
      expect(sm2.currentState).toEqual(TestStates.State2)
    })
  })

  describe('SMT - available transitions', () => {
    it('SMT.01 - should retrieve available transitions for current state', () => {
      const sm = getStateMachine()
      expect(sm.availableTransitions()).toEqual([
        TestStates.State1,
        TestStates.State2,
      ])
    })

    it('SMT.02 - should retrieve available transitions for another state', () => {
      const sm = getStateMachine()
      expect(sm.availableTransitions(TestStates.State2)).toEqual([
        TestStates.State1,
      ])
    })
  })

  describe('SMC - can transition', () => {
    it('SMC.01 - can transition from current state', () => {
      const sm = getStateMachine()
      expect(sm.canTransitionTo(TestStates.State2)).toBeTruthy()
    })

    it('SMC.02 - cannot transition from current state', () => {
      const sm = getStateMachine(TestStates.State2)
      expect(sm.canTransitionTo(TestStates.State2)).toBeFalsy()
    })

    it('SMC.03 - can transition from another state', () => {
      const sm = getStateMachine()
      expect(
        sm.canTransition(TestStates.State1, TestStates.State2),
      ).toBeTruthy()
    })

    it('SMC.04 - cannot transition from another state', () => {
      const sm = getStateMachine()
      expect(sm.canTransition(TestStates.State2, TestStates.State2)).toBeFalsy()
    })
  })

  describe('SMX - transition', () => {
    it('SMX.01 - should transition when possible', () => {
      const sm = getStateMachine()

      expect(sm.currentState).toEqual(TestStates.State1)
      expect(sm.transitionTo(TestStates.State2)).toBeTruthy()
      expect(sm.currentState).toEqual(TestStates.State2)
    })

    it('SMX.02 - should not transition when not possible', () => {
      const sm = getStateMachine(TestStates.State3)

      expect(sm.currentState).toEqual(TestStates.State3)
      expect(sm.transitionTo(TestStates.State2)).toBeFalsy()
      expect(sm.currentState).toEqual(TestStates.State3)
    })
  })
})

import { World } from '@pixatore/ecs'

import { StateMachineComponent } from '../StateMachineComponent'
import { StateMachineSystem } from '../StateMachineSystem'

enum TestStates {
  State1 = '1',
  State2 = '2',
}

class TestComponent extends StateMachineComponent<TestStates> {}

class TestSystem extends StateMachineSystem<TestStates> {
  static queries = {
    stateMachine: {
      components: [TestComponent],
    },
  }

  execute(): void {
    // custom logic goes in here
    expect(this.queries.stateMachine.results).toHaveLength(1)
  }

  init(attrs: any) {
    super.init({
      stateTransitions: {
        [TestStates.State1]: [TestStates.State2],
        [TestStates.State2]: [TestStates.State1],
      },
      initialState: TestStates.State1,
    })
  }
}

describe('ECS State Machine', () => {
  describe('ECQ -query on components', () => {
    it('ECQ.01 - component queries should work', () => {
      const world = new World().registerSystem(TestSystem)
      world.createEntity('test').addComponent(TestComponent)
      world.execute()
    })
  })
})

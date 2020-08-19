import { World, IQueryMap } from '@pixatore/ecs'

import { StateMachineComponent } from '../StateMachineComponent'
import { StateMachineSystem } from '../StateMachineSystem'

enum TestStates {
  State1 = '1',
  State2 = '2',
}

class TestComponent extends StateMachineComponent<TestStates> {}

class TestSystem extends StateMachineSystem<TestStates> {
  queryMap: IQueryMap = {
    stateMachine: {
      components: [TestComponent],
      notComponents: [],
    },
  }

  execute(): void {
    // custom logic goes in here
    expect(this.queries.stateMachine.entities).toHaveLength(1)
  }

  constructor() {
    super({
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
      const world = new World()
      world.registerComponent(TestComponent)
      world.registerSystem(new TestSystem())

      const entity = world.createEntity('test')
      world.addComponentToEntity(entity, TestComponent)
      world.tick(0)
    })
  })
})

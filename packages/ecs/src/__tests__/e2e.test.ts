import * as ECS from '../index'
import { type } from '@colyseus/schema'

describe('Pixatore ECS E2E', () => {
  class TestCompA extends ECS.Component {
    @type('string') testA: string = 'asdf'

    reset(): void {
      this.testA = ''
    }
  }

  class TestCompB extends ECS.Component {
    @type('string') testB: string = 'asdf'

    reset(): void {
      this.testB = ''
    }
  }

  class SystemA extends ECS.System {
    static queries: ECS.IQueryMap = {
      systemAQuery: {
        components: [TestCompA, TestCompB],
      },
    }

    execute(queries: ECS.IQueryResultMap, _deltaT: number): void {
      queries.systemAQuery.forEach((ent) => {
        const comp = ent.getComponent(TestCompB)
        if (!comp) return

        comp.testB = 'modified by A'
      })
    }
  }

  class SystemB extends ECS.System {
    static queries: ECS.IQueryMap = {
      systemBQuery: {
        components: [TestCompA],
        notComponents: [TestCompB],
      },
    }

    execute(queries: ECS.IQueryResultMap, _deltaT: number): void {
      // console.log('SYSTEM B', JSON.stringify(entities, undefined, 2))
      queries.systemBQuery.forEach((ent) => {
        const comp = ent.getComponent(TestCompA)
        if (!comp) return

        comp.testA = 'modified by B'
      })
    }
  }

  it('should run', () => {
    const world = new ECS.World()

    world.registerComponent(TestCompA)
    world.registerComponent(TestCompB)

    world.registerSystem(new SystemA())
    world.registerSystem(new SystemB())

    const ent1 = world.acquireEntity()
    ent1.components.set(TestCompA._typeId, world.acquireComponent(TestCompA))
    ent1.components.set(TestCompB._typeId, world.acquireComponent(TestCompB))
    world.entities.push(ent1)

    const ent2 = world.acquireEntity()
    ent2.components.set(TestCompA._typeId, world.acquireComponent(TestCompA))
    // ent1.components.set(TestCompB._typeId, world.acquireComponent(TestCompB))
    world.entities.push(ent2)

    const ent3 = world.acquireEntity()
    // ent1.components.set(TestCompA._typeId, world.acquireComponent(TestCompA))
    ent3.components.set(TestCompB._typeId, world.acquireComponent(TestCompB))
    world.entities.push(ent3)

    world.tick(0)
    console.log(JSON.stringify(world, undefined, 2))
  })
})

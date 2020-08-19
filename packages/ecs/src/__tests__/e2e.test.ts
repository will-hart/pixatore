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
    static queryMap: ECS.IQueryMap = {
      systemAQuery: {
        components: [TestCompA, TestCompB],
      },
    }

    execute(_deltaT: number): void {
      this.queries.systemAQuery.entities.forEach((ent) => {
        const comp = ent.getComponent(TestCompB)
        if (!comp) return

        comp.testB = 'modified by A'
      })
    }
  }

  class SystemB extends ECS.System {
    static queryMap: ECS.IQueryMap = {
      systemBQuery: {
        components: [TestCompA],
        notComponents: [TestCompB],
      },
    }

    execute(_deltaT: number): void {
      // console.log('SYSTEM B', JSON.stringify(entities, undefined, 2))
      this.queries.systemBQuery.entities.forEach((ent) => {
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

    const sysA = new SystemA()
    world.registerSystem(sysA)
    const sysB = new SystemB()
    world.registerSystem(sysB)

    const ent1 = world.acquireEntity()
    world.addComponentToEntity(ent1, TestCompA)
    const moddedByA = world.addComponentToEntity(ent1, TestCompB)

    const ent2 = world.acquireEntity()
    const moddedByB = world.addComponentToEntity(ent2, TestCompA)

    const ent3 = world.acquireEntity()
    world.addComponentToEntity(ent3, TestCompB)

    world.tick(0)

    console.log('--------------- WORLD', JSON.stringify(world, undefined, 2))
    console.log(
      '--------------- SYS A QUERIES',
      JSON.stringify(sysA.queries, undefined, 2),
    )

    expect(moddedByA.testB).toEqual('modified by A')
    expect(moddedByB.testA).toEqual('modified by B')
  })
})

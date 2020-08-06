import ECS from '../ECS'
import { IComponent } from '../Component'
import ComponentFilter from '../ComponentFilter'
import System from '../System'
import Entity from '../Entity'

const mockTick = jest.fn()

class DummySystem extends System {
  constructor(priority: number) {
    super(new ComponentFilter([], []), priority)
  }

  tick(entities: Entity[], delta: number): void {
    mockTick(this.priority)
  }
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('ECS - Entity Component System', () => {
  it('ECS.01 - should create a new ECS', () => {
    expect(() => {
      const engine = new ECS()
      expect(engine).toBeDefined()
    }).not.toThrow()
  })

  it('ECS.02 - should create a new entity if entityId not provided', () => {
    const engine = new ECS()
    expect(engine.entityCount).toEqual(0)
    const entity = engine.add({ id: 1, componentType: 'a' })

    expect(entity).toBeDefined()
    expect(engine.entityCount).toEqual(1)
  })

  it('ECS.02 - should throw if entity not found', () => {
    const engine = new ECS()
    expect(engine.entityCount).toEqual(0)
    expect(() => engine.add({ id: 1, componentType: 'a' }, 1)).toThrowError(
      /Error adding component - entity '1' not found/,
    )
  })

  it('ECS.02 - should add to existing entity if entity exists', () => {
    const engine = new ECS()
    const entity = engine.add({ id: 1, componentType: 'a' })
    const entity2 = engine.add({ id: 1, componentType: 'b' }, entity.id)

    expect(entity).toBe(entity2)
    expect(entity.componentTypes).toEqual(['a', 'b'])
  })

  it('ECS.03 - should assign a component ID if undefined', () => {
    const engine = new ECS()
    const component: IComponent = { componentType: 'a' }
    engine.add(component)
    expect(component.id).toBeDefined()
  })

  it('ECS.04 - should keep existing component ID if defined', () => {
    const engine = new ECS()
    const component: IComponent = { id: 17, componentType: 'a' }
    engine.add(component)
    expect(component.id).toEqual(17)
  })

  it('ECS.05 - should throw if component has no id when removing', () => {
    const engine = new ECS()
    const component: IComponent = { componentType: 'a' }
    expect(() => engine.remove(component)).toThrowError(
      /Unable to remove component with no ID set/,
    )
  })

  it('ECS.06 - should throw if component has no linked entity', () => {
    const engine = new ECS()
    const component: IComponent = { id: 19, componentType: 'a' }
    expect(() => engine.remove(component)).toThrowError(
      /Unable to remove component '19' as no linked entity found/,
    )
  })

  it.skip('ECS.07 - should throw if entity is not found', () => {
    // don't think it would be possible to get into this state
  })

  it.skip('ECS.08 - should remove component', () => {
    const engine = new ECS()
    const component: IComponent = { id: 19, componentType: 'a' }
    const entity = engine.add(component)
    expect(entity.componentIds).toEqual([19])

    engine.remove(component)
    expect(entity.componentIds).toEqual([])
  })

  it.skip('ECS.09 - should remove entity when last component removed', () => {
    const engine = new ECS()
    const component: IComponent = { id: 19, componentType: 'a' }
    const entity = engine.add(component)
    expect(entity.componentIds).toEqual([19])

    engine.remove(component)
    expect(entity.componentIds).toEqual([])
  })

  it('ECS.10 - should add many components to existing entity', () => {
    const engine = new ECS()
    const componentA: IComponent = { id: 19, componentType: 'a' }
    const componentB: IComponent = { id: 20, componentType: 'b' }
    const componentC: IComponent = { id: 21, componentType: 'c' }
    const entity = engine.add(componentA)
    const entity2 = engine.addMany([componentB, componentC], entity.id)

    expect(entity).toBe(entity2)
    expect(entity.componentTypes).toEqual(['a', 'b', 'c'])
  })

  it('ECS.11 - should add many components to new entity', () => {
    const engine = new ECS()
    const componentB: IComponent = { id: 20, componentType: 'b' }
    const componentC: IComponent = { id: 21, componentType: 'c' }
    const entity = engine.addMany([componentB, componentC])

    expect(entity.componentTypes).toEqual(['b', 'c'])
  })

  it('ECS.12 - tick calls added systems', () => {
    const engine = new ECS()
    const sys1 = new DummySystem(2)
    engine.addSystem(sys1)
    engine.tick(0.1)

    expect(mockTick).toHaveBeenCalledTimes(1)
    expect(mockTick).toHaveBeenCalledWith(2)
  })

  it('ECS.13 - addSystem sorts system by descending priority', () => {
    const engine = new ECS()
    const sys1 = new DummySystem(1)
    const sys2 = new DummySystem(10)
    const sys3 = new DummySystem(3)
    engine.addSystem(sys1)
    engine.addSystem(sys2)
    engine.addSystem(sys3)
    engine.tick(0.1)

    expect(mockTick).toHaveBeenCalledWith(10)
    expect(mockTick).toHaveBeenCalledWith(3)
    expect(mockTick).toHaveBeenCalledWith(1)
  })
})

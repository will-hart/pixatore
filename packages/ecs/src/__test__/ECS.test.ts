import { ECS } from '../ECS'
import { IComponent } from '../Component'
import { ComponentFilter } from '../ComponentFilter'
import { System } from '../System'
import { Entity } from '../Entity'
import { EventBus } from 'ts-bus'
import { DefaultEventTypes } from '../events'

const mockTick = jest.fn()

class DummySystem extends System {
  constructor(priority: number) {
    super(new ComponentFilter([], []), priority)
  }

  tick(_entities: Entity[], _delta: number): void {
    mockTick(this.priority)
  }
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('ECS - Entity Component System', () => {
  describe('ECC - adding and removing components', () => {
    it('ECC.01 - should create a new ECS', () => {
      expect(() => {
        const engine = new ECS()
        expect(engine).toBeDefined()
      }).not.toThrow()
    })

    it('ECC.02 - should create a new entity if entityId not provided', () => {
      const engine = new ECS()
      expect(engine.entityCount).toEqual(0)
      const entity = engine.add({ id: 1, componentType: 'a' })

      expect(entity).toBeDefined()
      expect(engine.entityCount).toEqual(1)
    })

    it('ECC.02 - should throw if entity not found', () => {
      const engine = new ECS()
      expect(engine.entityCount).toEqual(0)
      expect(() => engine.add({ id: 1, componentType: 'a' }, '1')).toThrowError(
        /Error adding component - entity '1' not found/,
      )
    })

    it('ECC.02 - should add to existing entity if entity exists', () => {
      const engine = new ECS()
      const entity = engine.add({ id: 1, componentType: 'a' })
      const entity2 = engine.add({ id: 1, componentType: 'b' }, entity.id)

      expect(entity).toBe(entity2)
      expect(entity.componentTypes).toEqual(['a', 'b'])
    })

    it('ECC.03 - should create an entity if non-existent ID passed and flag set', () => {
      const engine = new ECS()
      const entity = engine.add({ id: 1, componentType: 'b' }, '1234', true)

      expect(engine.entityCount).toEqual(1)
      expect(entity.id).toEqual('1234')
    })

    it('ECC.04 - should assign a component ID if undefined', () => {
      const engine = new ECS()
      const component: IComponent = { componentType: 'a' }
      engine.add(component)
      expect(component.id).toBeDefined()
    })

    it('ECC.05 - should keep existing component ID if defined', () => {
      const engine = new ECS()
      const component: IComponent = { id: 17, componentType: 'a' }
      engine.add(component)
      expect(component.id).toEqual(17)
    })

    it('ECC.06 - should throw if component has no id when removing', () => {
      const engine = new ECS()
      const component: IComponent = { componentType: 'a' }
      expect(() => engine.remove(component)).toThrowError(
        /Unable to remove component with no ID set/,
      )
    })

    it('ECC.07 - should throw if component has no linked entity', () => {
      const engine = new ECS()
      const component: IComponent = { id: 19, componentType: 'a' }
      expect(() => engine.remove(component)).toThrowError(
        /Unable to remove component '19' as no linked entity found/,
      )
    })

    it('ECC.08 - should remove component', () => {
      const engine = new ECS()
      const component: IComponent = { id: 19, componentType: 'a' }
      const component2: IComponent = { id: 20, componentType: 'b' }
      const entity = engine.add(component)
      engine.add(component2, entity.id)
      expect(entity.componentIds).toEqual([19, 20])

      engine.remove(component)
      expect(entity.componentIds).toEqual([20])
    })

    it.skip('ECC.09 - should remove entity when last component removed', () => {
      // not yet sure if we want to do this, or how?
      const engine = new ECS()
      const component: IComponent = { id: 19, componentType: 'a' }
      const entity = engine.add(component)
      expect(entity.componentIds).toEqual([19])

      engine.remove(component)
      expect(entity.componentIds).toEqual([])
    })

    it('ECC.10 - should add many components to existing entity', () => {
      const engine = new ECS()
      const componentA: IComponent = { id: 19, componentType: 'a' }
      const componentB: IComponent = { id: 20, componentType: 'b' }
      const componentC: IComponent = { id: 21, componentType: 'c' }
      const entity = engine.add(componentA)
      const entity2 = engine.addMany([componentB, componentC], entity.id)

      expect(entity).toBe(entity2)
      expect(entity.componentTypes).toEqual(['a', 'b', 'c'])
    })

    it('ECC.11 - should add many components to new entity', () => {
      const engine = new ECS()
      const componentB: IComponent = { id: 20, componentType: 'b' }
      const componentC: IComponent = { id: 21, componentType: 'c' }
      const entity = engine.addMany([componentB, componentC])

      expect(entity.componentTypes).toEqual(['b', 'c'])
    })

    it('ECC.12 - should create an entity if non-existent ID passed for addMany', () => {
      const engine = new ECS()
      const entity = engine.addMany(
        [
          { id: 1, componentType: 'a' },
          { id: 2, componentType: 'b' },
        ],
        '1234',
      )

      expect(engine.entityCount).toEqual(1)
      expect(entity.id).toEqual('1234')
    })
  })

  describe('ECS - registering and calling systems', () => {
    it('ECS.01 - tick calls added systems', () => {
      const engine = new ECS()
      const sys1 = new DummySystem(2)
      engine.addSystem(sys1)
      engine.tick(0.1)

      expect(mockTick).toHaveBeenCalledTimes(1)
      expect(mockTick).toHaveBeenCalledWith(2)
    })

    it('ECS.02 - addSystem sorts system by descending priority', () => {
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

  describe('ECE - triggering events', () => {
    const mockHandler = jest.fn()
    const comp = { id: 1, componentType: 'a' }
    const comp2 = { id: 2, componentType: 'b' }

    it('ECE.01 - should create an event bus', () => {
      const e = new ECS()
      expect(e.events).toBeDefined()
      expect(e.events).toBeInstanceOf(EventBus)
    })

    it('ECE.02 - should trigger an event on component add', () => {
      const ecs = new ECS()
      ecs.events.subscribe(DefaultEventTypes.ComponentAdded, mockHandler)
      ecs.add(comp)

      expect(mockHandler).toHaveBeenCalledTimes(1)
      expect(mockHandler).toHaveBeenCalledWith({
        type: DefaultEventTypes.ComponentAdded,
        payload: comp,
      })
    })

    it('ECE.03 - should trigger multiple an event on components add', () => {
      const ecs = new ECS()
      ecs.events.subscribe(DefaultEventTypes.ComponentAdded, mockHandler)
      ecs.addMany([comp, comp2])

      expect(mockHandler).toHaveBeenCalledTimes(2)
      expect(mockHandler.mock.calls[0][0]).toEqual({
        type: DefaultEventTypes.ComponentAdded,
        payload: comp,
      })
      expect(mockHandler.mock.calls[1][0]).toEqual({
        type: DefaultEventTypes.ComponentAdded,
        payload: comp2,
      })
    })

    it('ECE.04 - should trigger an event on component remove', () => {
      const ecs = new ECS()
      ecs.events.subscribe(DefaultEventTypes.ComponentRemoved, mockHandler)
      ecs.add(comp)
      expect(mockHandler).toHaveBeenCalledTimes(0)

      ecs.remove(comp)
      expect(mockHandler).toHaveBeenCalledTimes(1)
      expect(mockHandler).toHaveBeenCalledWith({
        type: DefaultEventTypes.ComponentRemoved,
        payload: comp,
      })
    })

    it('ECE.05 - should unsubscribe from events', () => {
      const ecs = new ECS()
      const unsub = ecs.events.subscribe(
        DefaultEventTypes.ComponentAdded,
        mockHandler,
      )

      unsub()
      ecs.add(comp)

      expect(mockHandler).toHaveBeenCalledTimes(0)
    })
  })
})

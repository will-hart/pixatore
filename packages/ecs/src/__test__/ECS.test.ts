import ECS from '../ECS'
import { IComponent } from '../Component'

describe('ECS - Entity Component System', () => {
  it('ECS.01 - should create a new ECS', () => {
    expect(() => {
      const ecs = new ECS()
      expect(ecs).toBeDefined()
    }).not.toThrow()
  })

  it('ECS.02 - should create a new entity if entityId not provided', () => {
    const ecs = new ECS()
    expect(ecs.entityCount).toEqual(0)
    const entity = ecs.add({ id: 1, componentType: 'a' })

    expect(entity).toBeDefined()
    expect(ecs.entityCount).toEqual(1)
  })

  it('ECS.02 - should throw if entity not found', () => {
    const ecs = new ECS()
    expect(ecs.entityCount).toEqual(0)
    expect(() => ecs.add({ id: 1, componentType: 'a' }, 1)).toThrowError(
      /Error adding component - entity '1' not found/,
    )
  })

  it('ECS.02 - should add to existing entity if entity exists', () => {
    const ecs = new ECS()
    const entity = ecs.add({ id: 1, componentType: 'a' })
    const entity2 = ecs.add({ id: 1, componentType: 'b' }, entity.id)

    expect(entity).toBe(entity2)
    expect(entity.componentTypes).toEqual(['a', 'b'])
  })

  it('ECS.03 - should assign a component ID if undefined', () => {
    const ecs = new ECS()
    const component: IComponent = { componentType: 'a' }
    ecs.add(component)
    expect(component.id).toBeDefined()
  })

  it('ECS.04 - should keep existing component ID if defined', () => {
    const ecs = new ECS()
    const component: IComponent = { id: 17, componentType: 'a' }
    ecs.add(component)
    expect(component.id).toEqual(17)
  })

  it('ECS.05 - should throw if component has no id when removing', () => {
    const ecs = new ECS()
    const component: IComponent = { componentType: 'a' }
    expect(() => ecs.remove(component)).toThrowError(
      /Unable to remove component with no ID set/,
    )
  })

  it('ECS.06 - should throw if component has no linked entity', () => {
    const ecs = new ECS()
    const component: IComponent = { id: 19, componentType: 'a' }
    expect(() => ecs.remove(component)).toThrowError(
      /Unable to remove component '19' as no linked entity found/,
    )
  })

  it.skip('ECS.07 - should throw if entity is not found', () => {
    // don't think it would be possible to get into this state
  })

  it.skip('ECS.08 - should remove component', () => {
    const ecs = new ECS()
    const component: IComponent = { id: 19, componentType: 'a' }
    const entity = ecs.add(component)
    expect(entity.componentIds).toEqual([19])

    ecs.remove(component)
    expect(entity.componentIds).toEqual([])
  })

  it.skip('ECS.09 - should remove entity when last component removed', () => {
    const ecs = new ECS()
    const component: IComponent = { id: 19, componentType: 'a' }
    const entity = ecs.add(component)
    expect(entity.componentIds).toEqual([19])

    ecs.remove(component)
    expect(entity.componentIds).toEqual([])
  })

  it('ECS.10 - should add many components to existing entity', () => {
    const ecs = new ECS()
    const componentA: IComponent = { id: 19, componentType: 'a' }
    const componentB: IComponent = { id: 20, componentType: 'b' }
    const componentC: IComponent = { id: 21, componentType: 'c' }
    const entity = ecs.add(componentA)
    const entity2 = ecs.addMany([componentB, componentC], entity.id)

    expect(entity).toBe(entity2)
    expect(entity.componentTypes).toEqual(['a', 'b', 'c'])
  })

  it('ECS.11 - should add many components to new entity', () => {
    const ecs = new ECS()
    const componentB: IComponent = { id: 20, componentType: 'b' }
    const componentC: IComponent = { id: 21, componentType: 'c' }
    const entity = ecs.addMany([componentB, componentC])

    expect(entity.componentTypes).toEqual(['b', 'c'])
  })
})

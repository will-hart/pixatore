import { type } from '@colyseus/schema'
import * as ECS from '../index'

class TestComponentA extends ECS.Component {
  @type('number') something: number = 0
  reset(): void {}
}
class TestComponentB extends ECS.Component {
  @type('number') somethingElse: number = 1
  reset(): void {}
}

describe('Entity', () => {
  describe('initialisation', () => {
    it('should get ID on init', () => {
      const ent = new ECS.Entity()
      expect(ent.id).toEqual('')

      ent.init()
      expect(ent.id.length).toBeGreaterThan(0)
    })

    it('should be alive after init', () => {
      const ent = new ECS.Entity()
      expect(ent.isAlive).toBeFalsy()

      ent.init()
      expect(ent.isAlive).toBeTruthy()
    })

    it('components should have separate type ids', () => {
      expect(TestComponentA._typeId).not.toEqual(TestComponentB._typeid)
    })

    it('should clear ID on reset', () => {
      const ent = new ECS.Entity()
      ent.init()
      ent.reset()
      expect(ent.id).toEqual('')
    })
  })

  describe('has components', () => {
    // TESTING ONLY:  don't add components like this - use
    // the world or ECS.Entity methods
    it('has a component', () => {
      const ent = new ECS.Entity()
      ent.components.set(
        TestComponentA._typeId.toString(),
        new TestComponentA(),
      )

      expect(ent.hasComponent(TestComponentA)).toBeTruthy()
      expect(ent.hasComponent(TestComponentB)).toBeFalsy()
    })

    it('has all components', () => {
      const ent = new ECS.Entity()
      ent.components.set(
        TestComponentA._typeId.toString(),
        new TestComponentA(),
      )
      ent.components.set(
        TestComponentB._typeId.toString(),
        new TestComponentB(),
      )

      const ent2 = new ECS.Entity()
      ent.components.set(
        TestComponentB._typeId.toString(),
        new TestComponentB(),
      )

      expect(
        ent.hasAllComponents([TestComponentA, TestComponentB]),
      ).toBeTruthy()
      expect(
        ent2.hasAllComponents([TestComponentA, TestComponentB]),
      ).toBeFalsy()
    })

    it('has none of the components', () => {
      const ent = new ECS.Entity()
      ent.components.set(
        TestComponentA._typeId.toString(),
        new TestComponentA(),
      )
      ent.components.set(
        TestComponentB._typeId.toString(),
        new TestComponentB(),
      )

      const ent2 = new ECS.Entity()
      ent2.components.set(
        TestComponentB._typeId.toString(),
        new TestComponentB(),
      )

      expect(ent.doesNotHaveComponents([TestComponentA])).toBeFalsy()
      expect(ent.doesNotHaveComponents([TestComponentB])).toBeFalsy()
      expect(
        ent.doesNotHaveComponents([TestComponentA, TestComponentB]),
      ).toBeFalsy()

      expect(ent2.doesNotHaveComponents([TestComponentA])).toBeTruthy()
      expect(ent2.doesNotHaveComponents([TestComponentB])).toBeFalsy()
      expect(
        ent2.doesNotHaveComponents([TestComponentA, TestComponentB]),
      ).toBeFalsy()
    })

    it('has none of the components (empty query returns true)', () => {
      const ent = new ECS.Entity()
      ent.components.set(
        TestComponentA._typeId.toString(),
        new TestComponentA(),
      )
      ent.components.set(
        TestComponentB._typeId.toString(),
        new TestComponentB(),
      )

      const ent2 = new ECS.Entity()
      ent.components.set(
        TestComponentB._typeId.toString(),
        new TestComponentB(),
      )

      expect(ent.doesNotHaveComponents([])).toBeTruthy()
      expect(ent2.doesNotHaveComponents([])).toBeTruthy()
    })
  })

  describe('get component', () => {
    it('should get a typed component', () => {
      const ent = new ECS.Entity()
      ent.components.set(
        TestComponentA._typeId.toString(),
        new TestComponentA(),
      )

      const result = ent.getComponent(TestComponentA)
      expect(result).toEqual(
        ent.components.get(TestComponentA._typeid.toString()),
      )

      expect(result).toBeInstanceOf(TestComponentA)
    })
  })

  describe('add component', () => {
    it('should forward addComponent requests to the world', () => {
      const mockWorld: ECS.World = {
        addComponentToEntity: jest.fn(),
      } as any
      const ent = new ECS.Entity()
      ent.setWorld(mockWorld)

      ent.addComponent(TestComponentA)

      expect(mockWorld.addComponentToEntity).toHaveBeenCalledTimes(1)
      expect(mockWorld.addComponentToEntity).toHaveBeenCalledWith(
        ent,
        TestComponentA,
      )
    })
  })
})

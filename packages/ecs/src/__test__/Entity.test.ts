import Entity from '../Entity'
import { IComponent } from '../Component'

describe('ENT - entity', () => {
  it('ENT.01 - should create a new entity without throwing', () => {
    expect(() => {
      const ent = new Entity()
      expect(ent).toBeDefined()
    }).not.toThrow()
  })

  it('ENT.02 - should assign ID in constructor', () => {
    const ent = new Entity()
    expect(ent.id).toBeDefined()
  })

  it('ENT.03 - should increment ID in constructor', () => {
    const ent1 = new Entity()
    const ent2 = new Entity()
    expect(ent2.id).toEqual(ent1.id + 1)
  })

  it('ENT.04 - should add component without throwing', () => {
    const ent1 = new Entity()
    const component: IComponent = {
      id: 1,
      componentType: 'a',
    }
    expect(() => ent1.addComponent(component)).not.toThrow()
  })

  it('ENT.05 - should add component type when adding', () => {
    const ent1 = new Entity()
    const component: IComponent = {
      id: 1,
      componentType: 'a',
    }
    ent1.addComponent(component)

    expect(ent1.componentTypes).toEqual(['a'])
  })

  it('ENT.06 - should add component id when adding', () => {
    const ent1 = new Entity()
    const component: IComponent = {
      id: 1,
      componentType: 'a',
    }
    ent1.addComponent(component)

    expect(ent1.componentIds).toEqual([1])
  })

  it('ENT.07 - should only add component ID once', () => {
    const ent1 = new Entity()
    const component: IComponent = {
      id: 1,
      componentType: 'a',
    }
    ent1.addComponent(component)

    expect(() => ent1.addComponent(component)).toThrowError(
      /Duplicate component type, unable to add 'a' id 1 to entity/,
    )
  })

  it('ENT.08 - should add multiple components at once', () => {
    const ent1 = new Entity()
    const component: IComponent = {
      id: 1,
      componentType: 'a',
    }
    const component2: IComponent = {
      id: 2,
      componentType: 'b',
    }

    ent1.addComponents([component, component2])
    expect(ent1.componentTypes).toEqual(['a', 'b'])
    expect(ent1.componentIds).toEqual([1, 2])
  })

  it('ENT.09 - should throw if adding duplicate component types', () => {
    const ent1 = new Entity()
    const component: IComponent = {
      id: 1,
      componentType: 'a',
    }
    const component2: IComponent = {
      id: 2,
      componentType: 'a',
    }
    ent1.addComponent(component)
    expect(() => ent1.addComponent(component2)).toThrowError(
      /Duplicate component type, unable to add 'a' id 2 to entity/,
    )
  })

  it('ENT.10 - should throw if adding duplicate component types simultaneously', () => {
    const ent1 = new Entity()
    const component: IComponent = {
      id: 1,
      componentType: 'a',
    }
    const component2: IComponent = {
      id: 2,
      componentType: 'a',
    }
    expect(() => ent1.addComponents([component, component2])).toThrow()
  })

  it('ENT.11 - should remove component type and Id', () => {
    const ent1 = new Entity()
    const component: IComponent = {
      id: 1,
      componentType: 'a',
    }
    ent1.addComponent(component)
    expect(ent1.componentTypes).toEqual(['a'])
    expect(ent1.componentIds).toEqual([1])

    ent1.removeComponent(component)
    expect(ent1.componentTypes).toEqual([])
    expect(ent1.componentIds).toEqual([])
  })

  it('ENT.12 - should remove multiple components', () => {
    const ent1 = new Entity()
    const component: IComponent = {
      id: 1,
      componentType: 'a',
    }
    const component2: IComponent = {
      id: 2,
      componentType: 'b',
    }
    ent1.addComponents([component, component2])
    expect(ent1.componentTypes).toEqual(['a', 'b'])
    expect(ent1.componentIds).toEqual([1, 2])

    ent1.removeComponents([component, component2])
    expect(ent1.componentTypes).toEqual([])
    expect(ent1.componentIds).toEqual([])
  })

  it('ENT.13 - should return correct has value if component type exists', () => {
    const ent1 = new Entity()
    const component: IComponent = {
      id: 1,
      componentType: 'a',
    }
    ent1.addComponent(component)

    expect(ent1.has('a')).toBeTruthy()
    expect(ent1.has('b')).toBeFalsy()
  })

  it(`ENT.14 - should throw when adding component without an ID set`, () => {
    const ent1 = new Entity()
    const component: IComponent = {
      componentType: 'a',
    }
    expect(() => ent1.addComponent(component)).toThrowError(
      /Attempted to add component without ID to entity '[0-9]*'/,
    )
  })

  it(`ENT.14 - should throw when removing component without an ID set`, () => {
    const ent1 = new Entity()
    const component: IComponent = {
      componentType: 'a',
    }
    expect(() => ent1.removeComponent(component)).toThrowError(
      /Attempted to remove component without ID from entity '[0-9]*'/,
    )
  })
})

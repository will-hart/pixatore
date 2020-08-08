import {
  ecsComponent,
  IDecoratedComponentList,
  ecsEntity,
  isEntity,
  extractComponents,
} from '../annotations'

describe('annotations', () => {
  describe('ecsComponent decorator', () => {
    class TestSingleComponent {
      @ecsComponent('testType')
      testField: string = 'test'
    }

    class TestMultipleComponents {
      @ecsComponent('testType')
      testField: string = 'test'

      @ecsComponent('otherType')
      otherField: string = 'other'
    }

    it('ECC.01 - should populate _ecsComponents', () => {
      const item: IDecoratedComponentList = new TestSingleComponent()

      expect(item._ecsComponents).toBeDefined()
      expect(item._ecsComponents).toEqual({
        testType: 'testField',
      })
    })

    it('ECC.02 - should populate _ecsComponents with multiple components', () => {
      const item: IDecoratedComponentList = new TestMultipleComponents()

      expect(item._ecsComponents).toBeDefined()
      expect(item._ecsComponents).toEqual({
        testType: 'testField',
        otherType: 'otherField',
      })
    })

    it('ECC.03 - should safely populate _ecsComponents with multiple instances', () => {
      const item: IDecoratedComponentList = new TestSingleComponent()
      const item2: IDecoratedComponentList = new TestSingleComponent()

      expect(item._ecsComponents).toBeDefined()
      expect(item._ecsComponents).toEqual({
        testType: 'testField',
      })

      expect(item2._ecsComponents).toBeDefined()
      expect(item2._ecsComponents).toEqual({
        testType: 'testField',
      })
    })
  })

  describe('ecsEntity decorator', () => {
    @ecsEntity
    class TestEcsEntity {
      //
    }

    class NotAnEntity {
      //
    }

    it('ECE.01 - should mark an entity on create', () => {
      const e = new TestEcsEntity()
      expect((e as any)._isEntity).toBeTruthy()
    })

    it('ECE.02 - should not mark non entity on create', () => {
      const e = new NotAnEntity()
      expect((e as any)._isEntity).toBeUndefined()
    })

    it('ECE.03 - should identify entity using isEntity helper', () => {
      const e = new TestEcsEntity()
      expect(isEntity(e)).toBeTruthy()
    })

    it('ECE.04 - should identify non-entity using isEntity helper', () => {
      const e = new NotAnEntity()
      expect(isEntity(e)).toBeFalsy()
    })
  })

  describe('extract components helper', () => {
    class NotAnEntity {
      prop: string = 'asdf'
    }

    @ecsEntity
    class AnEntity {
      @ecsComponent('test') testProp: string = 'asdf'
    }

    it('EXC.01 - should return empty array for null/undefined', () => {
      expect(extractComponents(null)).toEqual([])
      expect(extractComponents(undefined)).toEqual([])
    })

    it('EXC.02 - should return empty array for non-entity objects', () => {
      expect(extractComponents(new NotAnEntity())).toEqual([])
    })

    it('EXC.03 - should return component list for entity objects', () => {
      expect(extractComponents(new AnEntity())).toEqual(['asdf'])
    })
  })
})

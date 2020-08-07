import { ECS } from '../ECS'
import { ComponentFilter } from '../ComponentFilter'
import { IComponent } from '../Component'
import { Entity } from '../Entity'

let engine: ECS
let entA: Entity
let entAB: Entity
let entBC: Entity
let compA: IComponent = {
  componentType: 'A',
}
let compB: IComponent = {
  componentType: 'B',
}
let compC: IComponent = {
  componentType: 'C',
}

beforeEach(() => {
  engine = new ECS()
  entA = engine.add({ ...compA })
  entAB = engine.addMany([{ ...compA }, { ...compB }])
  entBC = engine.addMany([{ ...compB }, { ...compC }])
})

describe('CF - component filter', () => {
  it('CF.01 - should construct without throwing', () => {
    expect(() => {
      var cf = new ComponentFilter([], [])
      expect(cf).toBeDefined()
    }).not.toThrow()
  })

  it('CF.02 - should match on included components', () => {
    const cf = new ComponentFilter(['B'], [])
    const ents = cf.getMatchingEntities(engine)
    expect(ents).toEqual([entAB, entBC])
  })

  it('CF.03 - should match on excluded components', () => {
    const cf = new ComponentFilter([], ['A'])
    const ents = cf.getMatchingEntities(engine)
    expect(ents).toEqual([entBC])
  })

  it('CF.04 - should match on included and excluded components', () => {
    const cf = new ComponentFilter(['A'], ['B'])
    const ents = cf.getMatchingEntities(engine)
    expect(ents).toEqual([entA])
  })
})

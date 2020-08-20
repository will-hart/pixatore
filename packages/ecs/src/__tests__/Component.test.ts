import { Component } from '../Component'

describe('Component', () => {
  class CustomComponent extends Component {
    reset(): void {}
  }

  it('should get ID on init', () => {
    const comp = new CustomComponent()
    expect(comp.id).toEqual('')

    comp.init()
    expect(comp.id.length).toBeGreaterThan(0)
  })

  it('should be alive after init', () => {
    const comp = new CustomComponent()
    expect(comp.isAlive).toBeFalsy()

    comp.init()
    expect(comp.isAlive).toBeTruthy()
  })

  it('should return a type id from the constructor', () => {
    expect(CustomComponent._typeId).toBeDefined()
  })
})

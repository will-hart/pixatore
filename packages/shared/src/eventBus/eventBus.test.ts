import EventBus from './eventBus'

describe('EB - event bus', () => {
  it('EB.01 - can create an event bus without throwing', () => {
    expect(() => {
      const eb = new EventBus()
      expect(eb).toBeDefined()
    }).not.toThrowError()
  })
})

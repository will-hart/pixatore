import * as events from '../'

describe('Event Bus E2E', () => {
  describe('create and consume events', () => {
    it('should create, subscribe and publish events', () => {
      const mockedHandler = jest.fn()

      const eb = new events.EventBus()
      const myEvent = events.buildEvent<{ payloadTest: string }>('TEST_EVENT')

      eb.subscribe('TEST_EVENT', mockedHandler)
      eb.publish(myEvent({ payloadTest: '1234' }))

      expect(mockedHandler).toHaveBeenCalledTimes(1)
      expect(mockedHandler).toHaveBeenNthCalledWith(1, {
        type: 'TEST_EVENT',
        payload: { payloadTest: '1234' },
      })
    })
  })
})

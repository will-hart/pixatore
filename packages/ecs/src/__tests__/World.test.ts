import * as ECS from '..'
import { type } from '@colyseus/schema'
import { World } from '../World'

class TestComponentA extends ECS.Component {
  @type('number') test: number = 0
  reset(): void {}
}

class TestComponentB extends ECS.Component {
  @type('number') test: number = 0
  reset(): void {}
}

describe('world', () => {
  describe('is query outdated', () => {
    it.skip('should return true if any hash is newer', () => {})
    it.skip('should return true if all hashes are newer', () => {})
    it.skip('should return false if all hashes are older', () => {})
    it.skip('should return false if all hashes are same', () => {})
  })

  describe.skip('register components', () => {
    it.skip('should register components', () => {
      const w = new World()
      w.registerComponent(TestComponentA).registerComponent(TestComponentB)
    })
  })

  describe.skip('create entity', () => {})

  describe.skip('add component to entity', () => {})

  describe.skip('release component from entity', () => {})

  describe.skip('release entity', () => {})

  describe.skip('get system', () => {})

  describe.skip('unregister system', () => {})

  describe.skip('tick', () => {})
})

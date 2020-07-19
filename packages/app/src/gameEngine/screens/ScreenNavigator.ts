import BaseScreen from './BaseScreen'
import Stack from '../utilities/Stack'
import Engine from '../Engine'

export default class ScreenNavigator {
  private screens: Stack<BaseScreen> = new Stack<BaseScreen>()

  constructor(private engine: Engine) {}

  get current(): BaseScreen {
    return this.screens.peek()
  }

  /**
   * Adds a new screen "on top" of the current screen
   * @param screen
   */
  push(screen: BaseScreen) {
    this.unregister(this.screens.peek())
    this.register(screen)
  }

  /**
   * Replaces the current top most screen
   * @param screen
   */
  replace(screen: BaseScreen) {
    this.unregister(this.screens.pop())
    this.register(screen)
  }

  /**
   * Clears the entire navigation stack and replaces with the given screen
   * @param screen
   */
  reset(screen: BaseScreen) {
    this.unregister(this.screens.peek())
    this.screens.clear()
    this.register(screen)
  }

  private register(screen: BaseScreen) {
    this.screens.enqueue(screen)
    screen.onAdd()
  }

  private unregister(screen?: BaseScreen) {
    if (!screen) return // no screen to unregister
    screen.onRemove()
  }
}

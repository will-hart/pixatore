import GroupDrawable from '../drawables/GroupDrawable'
import Drawable from '../drawables/Drawable'
import Engine from '../Engine'
import InputManager from '../InputManager'
import { EventBus, State } from '@pixatore/shared'

export default abstract class BaseScene extends GroupDrawable
  implements Drawable {
  constructor(
    public id: string,
    engine: Engine,
    ticker?: (group: GroupDrawable) => void,
  ) {
    super(engine, ticker)
  }

  /**
   * Injects this scene into the engine
   */
  inject(): void {
    this.engine.root.addChild(this)
  }

  /**
   * Removes this scene from the engine
   */
  remove(): void {
    this.engine.root.removeChild(this)
  }

  /**
   * Processes input from the input manager
   *
   * @param _input
   */
  // eslint-disable-next-line
  processInput(_input: InputManager): void {
    //
  }
}

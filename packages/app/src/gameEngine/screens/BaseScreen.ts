import GroupDrawable from '../drawables/GroupDrawable'
import Drawable from '../drawables/Drawable'
import Engine from '../Engine'
import InputManager from '../InputManager'

export default class BaseScreen extends GroupDrawable implements Drawable {
  constructor(
    public id: string,
    engine: Engine,
    ticker?: (group: GroupDrawable) => void,
  ) {
    super(engine, ticker)
  }

  onAdd(): void {
    this.engine.root.addChild(this)
  }

  onRemove(): void {
    this.engine.root.removeChild(this)
  }

  // eslint-disable-next-line
  processInput(_input: InputManager): void {
    //
  }
}

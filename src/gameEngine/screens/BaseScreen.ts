import GroupDrawable from '../drawables/GroupDrawable'
import Drawable from '../drawables/Drawable'
import Engine from '../Engine'

export default class BaseScreen extends GroupDrawable implements Drawable {
  constructor(
    public id: string,
    engine: Engine,
    ticker?: (group: GroupDrawable) => void,
  ) {
    super(engine, ticker)
  }

  onAdd() {
    //
  }

  onRemove() {
    //
  }
}

import { Container } from 'pixi.js'
import SpriteDrawable from './SpriteDrawable'
import Engine from '../Engine'
import { SpriteKey } from '../spriteMap'
import Drawable from './Drawable'
import TextDrawable from './TextDrawable'

export default class GroupDrawable extends Container {
  protected _drawables: { [key: string]: Drawable } = {}

  constructor(
    protected engine: Engine,
    protected ticker?: (group: GroupDrawable) => void,
  ) {
    super()

    if (this.ticker) {
      engine.ticker.add(() => this.invokeTicker())
    }
  }

  createAndAddSprite(id: string, spriteKey: SpriteKey): SpriteDrawable {
    const sprite = new SpriteDrawable(this.engine, id, spriteKey)
    this.addDrawable(sprite)
    return sprite
  }

  createAndAddText(
    id: string,
    text: string,
    style?: ConstructorParameters<typeof PIXI.TextStyle>[0],
  ): TextDrawable {
    const textDrawable = new TextDrawable(id, text, style)
    this.addDrawable(textDrawable)
    return textDrawable
  }

  addDrawable(drawable: Drawable): Drawable {
    if (this._drawables[drawable.id]) {
      throw new Error(
        `Naming collision on drawables in GroupDrawable::addDrawable, ${drawable.id} already exists in children`,
      )
    }

    this._drawables[drawable.id] = drawable
    drawable.onAdd(this)

    return drawable
  }

  removeDrawable(drawable: Drawable): boolean {
    if (!this._drawables[drawable.id]) return false

    drawable.onRemove(this)
    delete this._drawables[drawable.id]

    return true
  }

  removeDrawableById(id: string): boolean {
    if (!this._drawables[id]) {
      console.log('NOPE', this._drawables)
      return false
    }

    return this.removeDrawable(this._drawables[id])
  }

  getDisplayObjectById(id: string): PIXI.DisplayObject | null {
    if (!this._drawables[id]) return null
    return this._drawables[id] as PIXI.DisplayObject
  }

  private invokeTicker = () => {
    this.ticker?.(this)
  }

  destroy = () => {
    if (this.ticker) {
      this.engine.ticker.remove(this.invokeTicker)
    }
    super.destroy()
  }
}

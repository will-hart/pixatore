import * as PIXI from 'pixi.js'
import Drawable from './Drawable'

const DEFAULT_TEXT_STYLE: ConstructorParameters<typeof PIXI.TextStyle>[0] = {
  fontSize: 12,
  fill: '#FFFFFF',
}

export default class TextDrawable extends PIXI.Text implements Drawable {
  constructor(
    public id: string,
    text: string,
    style?: ConstructorParameters<typeof PIXI.TextStyle>[0],
  ) {
    super(text, new PIXI.TextStyle({ ...DEFAULT_TEXT_STYLE, ...style }))
  }

  inject(stage: PIXI.Container): void {
    stage.addChild(this)
  }

  remove(stage: PIXI.Container): void {
    stage.removeChild(this)
  }
}

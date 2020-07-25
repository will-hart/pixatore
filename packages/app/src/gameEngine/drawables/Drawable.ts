import * as PIXI from 'pixi.js'

export default interface Drawable extends PIXI.DisplayObject {
  id: string
  inject: (stage: PIXI.Container) => void
  remove: (stage: PIXI.Container) => void
}

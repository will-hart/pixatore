import * as PIXI from 'pixi.js'

export default interface IDrawable extends PIXI.DisplayObject {
  id: string
  onAdd: (stage: PIXI.Container) => void
  onRemove: (stage: PIXI.Container) => void
}

export enum SpriteKey {
  LOGO,
}

const ASSET_PATH = '/assets/sprites'

const spriteMap: Map<SpriteKey, string> = new Map<SpriteKey, string>()

spriteMap.set(SpriteKey.LOGO, `${ASSET_PATH}/logo.png`)

export default spriteMap

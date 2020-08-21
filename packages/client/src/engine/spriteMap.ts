export enum SpriteKey {
  LOGO,
  WHITE,
}

const ASSET_PATH = '/public/images/sprites'

export const spriteMap: Map<SpriteKey, string> = new Map<SpriteKey, string>()

spriteMap.set(SpriteKey.LOGO, `${ASSET_PATH}/logo.png`)

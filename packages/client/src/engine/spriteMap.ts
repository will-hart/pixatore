export enum SpriteKey {
  LOGO,
  WHITE,
}

const ASSET_PATH = '/public/images/sprites'

export const spriteMap: Map<string, string> = new Map<string, string>()

spriteMap.set(SpriteKey.LOGO.toString(), `${ASSET_PATH}/logo.png`)

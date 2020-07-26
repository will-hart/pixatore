export { RoomOptions } from './roomOptions'

export enum GameStatus {
  slotting = 'slotting',
  lobby = 'lobby',
  playing = 'playing',
  scoreScreen = 'ending',
}

export const MessageTypes = {
  PLAYER_READY: 'player::ready',
  ANY: '*',
}

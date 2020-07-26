export { RoomOptions } from './roomOptions'

export enum GameStatus {
  lobby = 'lobby',
  playing = 'playing',
  scoreScreen = 'ending',
}

export const MessageTypes = {
  PLAYER_READY: 'player::ready',
  START_GAME: 'game::start',
  ANY: '*',
}

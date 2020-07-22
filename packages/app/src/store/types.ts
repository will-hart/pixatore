export interface GameStatusModuleState {
  current: number
}

export interface AppState {
  gameStatus: GameStatusModuleState
}

export enum StoreNamespaces {
  gameStatus = 'gameStatus',
}

export const getActionName = (ns: StoreNamespaces, action: string): string =>
  `${ns}/${action}`

import { Component } from '@colyseus/ecs'
import { type } from '@colyseus/schema'
import { GameStatus } from '../types'

export class Status extends Component {
  @type('string')
  public current: GameStatus = GameStatus.lobby
}

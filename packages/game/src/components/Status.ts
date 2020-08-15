import { Component } from '@pixatore/ecs'
import { type } from '@colyseus/schema'
import { GameStatus } from '../types'

export class Status extends Component {
  @type('string')
  public value: GameStatus = GameStatus.lobby
}

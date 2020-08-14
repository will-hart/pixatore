/**
 * This file is adapted from Command.ts at @colyseus/command
 *
 * MIT Licensed
 */

import { Room } from 'colyseus'

import debug from 'debug'
const log = debug('PX:SRV:Core      :Dispatcher')

export abstract class Command<State = any, Payload = unknown> {
  payload: Payload

  room: Room<State>
  state: State
  clock: Room['clock']

  setPayload(payload: this['payload']) {
    this.payload = payload
    return this
  }

  validate?(payload: this['payload']): boolean

  abstract async execute(
    payload: this['payload'],
  ): Promise<void | Array<Command>>

  /**
   * Delay the execution by `milliseconds`
   * @param milliseconds
   */
  protected delay(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
  }
}

export class Dispatcher {
  room: Room
  stopped: boolean = false

  constructor(room: any) {
    this.room = room
  }

  stop() {
    this.stopped = true
  }

  async dispatch<T extends Command>(
    command: T,
    payload?: T['payload'],
  ): Promise<void> {
    if (this.stopped) {
      log('dispatcher stopped')
      return
    }

    command.room = this.room
    command.state = this.room.state
    command.clock = this.room.clock

    if (payload) {
      command.setPayload(payload)
    }

    if (!command.validate || command.validate(command.payload)) {
      const result: Command[] = (await command.execute(command.payload)) as any
      if (!result) return
      await Promise.all(this.getNextCommands(result).map(this.dispatch))
    }
  }

  // | Array<Promise<Command[] | void>>
  private getNextCommands(nextCommands: void | Command[]): Command[] {
    return Array.isArray(nextCommands) ? nextCommands : []
  }
}

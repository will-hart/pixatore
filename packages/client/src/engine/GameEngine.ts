import * as PIXI from 'pixi.js'

import * as ECS from '@pixatore/ecs'
import { State, clientEvents } from '@pixatore/game'
import { EventBus } from '@pixatore/event-bus'
import { Room } from 'colyseus.js'

import debug from 'debug'
import { SpriteStorage } from './SpriteStorage'
const log = debug('PX:APP:Core      :GameEngine')
log.log = console.log.bind(console)

export class GameEngine {
  private app: PIXI.Application
  public _spriteStorage?: SpriteStorage

  public get sprites(): SpriteStorage {
    if (!this._spriteStorage) throw new Error('No sprite storage available')
    return this._spriteStorage
  }

  public get world(): ECS.World {
    return this.room.state
  }
  public eventBus: EventBus

  constructor(public room: Room<ECS.World>) {
    log('Creating game engine...')
    log(' -> initialising event bus')
    this.eventBus = new EventBus()

    log(' -> Initialising ECS')
    State.buildWorld(State.WorldTypes.Client, this.eventBus, this.room.state)

    log(' --> Creating rendering App')
    this.app = new PIXI.Application({
      antialias: true,
      transparent: false,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    })

    log(' --> Game engine initialisation complete')
  }

  public initApp(parent: HTMLElement | null): void {
    if (!parent) {
      throw new Error('Unable to find parent element to mount game. Aborting')
    }

    this._spriteStorage = new SpriteStorage(this.app, this.eventBus)
    parent.appendChild(this.app.view)
  }

  // TODO, link this into the PIXI app ticker
  public tick(delta: number): void {
    this.world.tick(delta)
  }

  public disconnect(consented = false): void {
    log('Disconnecting from game engine, consented = %o', consented)
    this.room.leave(consented)
  }
}

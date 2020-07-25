export default class InputManager {
  private down: { [key: string]: boolean } = {}
  private held: { [key: string]: number } = {}
  private up: { [key: string]: boolean } = {}

  subscribe(): void {
    window.addEventListener('keydown', this.onKeyPress)
    window.addEventListener('keyup', this.onKeyRelease)
  }

  unsubscribe(): void {
    window.removeEventListener('keydown', this.onKeyPress)
    window.removeEventListener('keyup', this.onKeyRelease)
  }

  endFrame(): void {
    this.down = {}
    this.up = {}
  }

  reset(): void {
    this.down = {}
    this.up = {}
    this.held = {}
  }

  isDown = (key: string): boolean => !!this.down[key]

  get anyKeyDown(): boolean {
    return this.keysDown.length > 0
  }
  get keysDown(): string[] {
    return Object.keys(this.down)
  }

  isHeld = (key: string): boolean => !!this.held[key]
  heldFor = (key: string): number =>
    this.isHeld(key) ? (new Date().getTime() - this.held[key]) / 1000 : 0
  get anyKeyHeld(): boolean {
    return this.keysHeld.length > 0
  }
  get keysHeld(): string[] {
    return Object.keys(this.held)
  }

  isUp = (key: string): boolean => !!this.up[key]
  get anyKeyUp(): boolean {
    return this.keysUp.length > 0
  }
  get keysUp(): string[] {
    return Object.keys(this.up)
  }

  private onKeyPress = (event: KeyboardEvent): void => {
    // prevent repeat keypresses when keys are held
    if (this.isHeld(event.key)) return

    this.down[event.key] = true
    this.held[event.key] = new Date().getTime()
  }

  private onKeyRelease = (event: KeyboardEvent): void => {
    delete this.held[event.key]
    this.up[event.key] = true
  }
}

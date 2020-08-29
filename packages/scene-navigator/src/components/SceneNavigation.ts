import { Component } from '@pixatore/ecs'
export class SceneNavigation extends Component {
  public currentScene: string = 'loading'

  reset(): void {
    this.currentScene = 'loading'
  }
}

import Vue from 'vue'
import Engine from '@/gameEngine/Engine'

declare module 'vue/types/vue' {
  interface Component {
    $engine: () => Engine
  }
}

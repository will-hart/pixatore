<template>
  <div id="game">
    <resize-observer @notify="handleResize" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ResizeObserver } from 'vue-resize'

import Engine from '@/gameEngine/Engine'

@Component({
  components: {
    'resize-observer': ResizeObserver,
  },
})
export default class Game extends Vue {
  app?: Engine

  mounted() {
    if (!this.app) {
      this.app = new Engine()
      this.app.mount(document.getElementById('game'))
    } else {
      console.log('Reusing app instance')
    }
  }

  handleResize({ width, height }: { width: number; height: number }) {
    this.app?.resize(width, height)
  }
}
</script>

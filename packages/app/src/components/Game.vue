<template>
  <div id="game">
    <resize-observer @notify="handleResize" ref="resizer" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ResizeObserver } from 'vue-resize'
import { mapActions } from 'vuex'

import Engine from '../gameEngine/Engine'

@Component({
  components: {
    'resize-observer': ResizeObserver,
  },
  methods: {
    ...mapActions({ setFps: 'setFps' }),
  },
})
export default class Game extends Vue {
  app?: Engine
  setFps?: (fps: number) => void

  mounted(): void {
    if (!this.app) {
      this.app = new Engine()
      this.app.mount(document.getElementById('game'))
    } else {
      console.log('Reusing app instance')
    }

    // resize on mount
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref: any = this.$refs.resizer
    this.app.resize(ref.$el.offsetWidth, ref.$el.offsetHeight)

    // add the fps ticker
    this.app.ticker.add(() =>
      this.setFps?.(Math.round(this.app?.ticker?.FPS || 0)),
    )
  }

  handleResize({ width, height }: { width: number; height: number }): void {
    this.app?.resize(width, height)
  }
}
</script>

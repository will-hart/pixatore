<template>
  <div>
    <div id="game">
      <resize-observer @notify="handleResize" ref="resizer" />
    </div>

    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ResizeObserver } from 'vue-resize'
import { mapActions } from 'vuex'

import { StoreNamespaces, getActionName } from '../store/types'

export default Vue.extend({
  components: {
    'resize-observer': ResizeObserver,
  },
  methods: {
    ...mapActions({
      setFps: getActionName(StoreNamespaces.gameStatus, 'setFps'),
    }),

    handleResize({ width, height }: { width: number; height: number }): void {
      this.$engine.resize(width, height)
    },
  },
  mounted(): void {
    // mount the engine to the app
    this.$engine.mount(document.getElementById('game'))

    // resize on mount
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref: any = this.$refs.resizer
    this.$engine.resize(ref.$el.offsetWidth, ref.$el.offsetHeight)

    // add the fps ticker
    this.$engine.ticker.add(() =>
      this.setFps?.(Math.round(this.$engine.ticker?.FPS || 0)),
    )
  },
})
</script>

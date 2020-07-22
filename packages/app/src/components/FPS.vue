<template>
  <div class="fps-tracker">{{ fps }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    fps: Number,
  },
})
</script>

<style lang="scss" scoped>
.fps-tracker {
  position: fixed;
  top: 0;
  right: 0;

  font-size: 10px;
  color: white;
}
</style>

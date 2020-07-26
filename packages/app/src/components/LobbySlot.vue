<template>
  <div class="lobby-slot">
    <div class="slot-id">{{ slotId }}</div>
    <div
      :class="[
        name === 'Empty Slot' ? 'empty-slot' : '',
        name === 'Empty Slot' || connected ? '' : 'unconnected-slot',
        ready ? 'ready-slot' : '',
        'slot-name',
      ]"
    >
      {{ name }}
      <span v-if="name !== 'Empty Slot'">{{
        ready ? 'READY' : 'NOT READY'
      }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    slotId: Number,
    name: String,
    connected: Boolean,
    ready: Boolean,
  },
})
</script>

<style lang="scss" scoped>
.lobby-slot {
  display: flex;
}
.slot-id {
  font-weight: bold;
  width: 75px;
}

.slot-id,
.slot-name {
  font-size: 1.3em;
}

.empty-slot {
  color: #777777;
}

.unconnected-slot {
  color: red;
}

.ready-slot {
  color: green;
}
</style>

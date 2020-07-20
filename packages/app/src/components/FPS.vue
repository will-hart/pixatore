<template>
  <div class="fps-tracker">{{ fps }} fps</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
export default Vue.extend({
  computed: mapState(['fps']),
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

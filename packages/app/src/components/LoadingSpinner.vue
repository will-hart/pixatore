<template>
  <div class="bottom-spinner">
    <orbit-spinner :animation-duration="1200" :size="20" :color="'white'" />
  </div>
</template>

<script>
import { OrbitSpinner } from 'epic-spinners'

export default {
  components: {
    OrbitSpinner,
  },
}
</script>

<style lang="scss" scoped>
.bottom-spinner {
  position: fixed;
  bottom: 5px;
  right: 5px;
}
</style>

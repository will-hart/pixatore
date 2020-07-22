<template>
  <div id="app"><home /></div>
</template>

<script lang="ts">
import Vue from 'vue'
import Home from './views/Home.vue'

export default Vue.extend({
  components: {
    home: Home,
  },
})
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

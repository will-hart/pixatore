<template>
  <div id="lobby-view" class="container middle">
    Lobby
  </div>
</template>

<script lang="ts">
import { defineComponent, unref } from 'vue'
import { useClient } from '../composables/useClient'
import { useRouter } from 'vue-router'
import { useRoom } from '../composables/useRoom'
export default defineComponent({
  name: 'LobbyScreen',

  setup() {
    const router = useRouter()
    const { client } = useClient()
    const { room } = useRoom()

    if (!unref(client)) {
      router.push('/')
    }

    if (!unref(room)) {
      // TODO: handle reconnection attempt
      router.push('/browser')
    }
  },
})
</script>

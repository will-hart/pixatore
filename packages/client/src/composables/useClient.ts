import { InjectionKey, provide, inject, shallowRef, Ref } from 'vue'
import { Client } from 'colyseus.js'

import debug from 'debug'
const log = debug('App:Composables:useClient')
log.log = console.log.bind(console)

const key: InjectionKey<Ref<Client | null>> = Symbol('useClient::Client')

export function provideClient(): void {
  log('[PROVIDE] client provided')
  const client = shallowRef<Client | null>(null)
  provide(key, client)
}

export function useClient(): {
  client: Ref<Client | null>
  setClient: (uri: string) => void
} {
  const client = inject<Ref<Client | null>>(key)

  if (!client) {
    throw new Error('Client not provided')
  }

  return {
    client,
    setClient: (uri: string) => {
      client.value = new Client(uri)
    },
  }
}

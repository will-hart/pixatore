import { InjectionKey, provide, inject, shallowRef, Ref } from 'vue'
import { Client } from 'colyseus.js'

const key: InjectionKey<Ref<Client | null>> = Symbol('useClient::Client')

export function provideClient(): void {
  console.log('[PROVIDE] client provided')
  const client = shallowRef<Client | null>(null)
  provide(key, client)
}

export function useClient(): {
  client: Ref<Client | null>
  setClient: (uri: string) => void
} {
  const client = inject<Ref<Client | null>>(key)

  if (!client) {
    throw new Error('Engine not provided')
  }

  return {
    client,
    setClient: (uri: string) => {
      client.value = new Client(uri)
    },
  }
}

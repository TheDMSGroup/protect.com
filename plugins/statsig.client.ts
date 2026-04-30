import { StatsigClient } from '@statsig/js-client'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  if (!config.public.statsigClientKey) return

  const state = useState<{ bootstrapValues: object; user: { userID: string } } | null>('statsig', () => null)
  const { bootstrapValues, user } = state.value ?? { bootstrapValues: null, user: { userID: `anon-${crypto.randomUUID()}` } }

  const client = new StatsigClient(
    config.public.statsigClientKey,
    user,
    bootstrapValues ? { initializeValues: bootstrapValues } : {}
  )

  if (bootstrapValues) {
    client.initializeSync()
  } else {
    await client.initializeAsync()
  }

  nuxtApp.provide('statsig', {
    checkGate: (name: string) => client.checkGate(name),
    getExperiment: (name: string) => client.getExperiment(name),
    getDynamicConfig: (name: string) => client.getDynamicConfig(name),
    logEvent: (name: string, value?: string | number, metadata?: Record<string, string>) =>
      client.logEvent(name, value, metadata),
  })
})

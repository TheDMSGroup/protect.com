import { StatsigClient } from '@statsig/js-client'
import { runStatsigAutoCapture } from '@statsig/web-analytics'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  if (!config.public.statsigClientKey) return

  const client = new StatsigClient(config.public.statsigClientKey, {})
  await client.initializeAsync()

  runStatsigAutoCapture(client)

  nuxtApp.provide('statsig', {
    checkGate: (name: string) => client.checkGate(name),
    getExperiment: (name: string) => client.getExperiment(name),
    getDynamicConfig: (name: string) => client.getDynamicConfig(name),
    logEvent: (name: string, value?: string | number, metadata?: Record<string, string>) =>
      client.logEvent(name, value, metadata),
  })
})

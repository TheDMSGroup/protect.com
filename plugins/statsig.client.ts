import { StatsigClient } from '@statsig/js-client'
import { runStatsigAutoCapture } from '@statsig/web-analytics'
import { useStore } from '~/stores/store'

export default defineNuxtPlugin(async (nuxtApp) => {

  const config = useRuntimeConfig()
  if (!config.public.statsigClientKey) return

  const store = useStore()
  const { ueid, utm_source, utm_medium, utm_campaign, variant } = store.visitorInfo

  const custom: Record<string, string> = {}
  if (ueid) custom.ueid = ueid
  if (variant) custom.variant = variant
  if (utm_source) custom.utm_source = utm_source
  if (utm_medium) custom.utm_medium = utm_medium
  if (utm_campaign) custom.utm_campaign = utm_campaign

  const statsigUser = {
    userID: crypto.randomUUID(),
    custom,
  }

  const tier = config.public.branch === 'master' ? 'production' : config.public.branch === 'stage' ? 'staging' : 'development'
  const client = new StatsigClient(config.public.statsigClientKey, statsigUser, {
    environment: { tier },
  })
  await client.initializeAsync()

  runStatsigAutoCapture(client)

  const stableID = client.getContextHandle().stableID
  if (stableID) {
    store.setVisitorInfo({ statsig_sid: stableID })

    document.cookie = `sig_uid=${stableID}; path=/; max-age=${60 * 60 * 24}`
  }

  nuxtApp.provide('statsig', {
    checkGate: (name: string) => client.checkGate(name),
    getExperiment: (name: string) => client.getExperiment(name),
    getDynamicConfig: (name: string) => client.getDynamicConfig(name),
    logEvent: (name: string, value?: string | number, metadata?: Record<string, string>) =>
      client.logEvent(name, value, metadata),
    getUser: () => statsigUser.userID
  })
})

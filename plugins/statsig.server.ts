import Statsig from 'statsig-node'

let _initialized = false

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  if (!config.statsigServerKey) return

  if (!_initialized) {
    await Statsig.initialize(config.statsigServerKey)
    _initialized = true
  }

  const uid = useCookie('statsig_uid', {
    maxAge: 31536000,
    path: '/',
    sameSite: 'lax',
  })
  if (!uid.value) uid.value = crypto.randomUUID()

  const user = { userID: uid.value }
  const bootstrapValues = Statsig.getClientInitializeResponse(user)

  useState('statsig', () => ({ bootstrapValues, user }))

  nuxtApp.provide('statsig', {
    checkGate: (name: string) => Statsig.checkGate(user, name),
    getExperiment: (name: string) => Statsig.getExperiment(user, name),
    getDynamicConfig: (name: string) => Statsig.getDynamicConfig(user, name),
    logEvent: (name: string, value?: string | number, metadata?: Record<string, string>) =>
      Statsig.logEvent(user, name, value, metadata),
  })
})

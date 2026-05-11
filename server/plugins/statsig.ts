import Statsig from 'statsig-node'

export let statsigReady = false

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  if (!config.statsigServerKey) return

  await Statsig.initialize(config.statsigServerKey, {
    environment: { tier: import.meta.dev ? 'development' : 'production' },
  })

  statsigReady = true
  console.log('Statsig initialized, env:', import.meta.dev ? 'development' : 'production')
})

import Statsig from 'statsig-node'

export let statsigReady = false

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  if (!config.statsigServerKey) return

  const env = config.public.branch === 'master' ? 'production' : config.public.branch === 'stage' ? 'stage' : 'development'

  await Statsig.initialize(config.statsigServerKey, {
    environment: { tier: env },
  })

  statsigReady = true
  console.log('Statsig initialized, env:', env)
})

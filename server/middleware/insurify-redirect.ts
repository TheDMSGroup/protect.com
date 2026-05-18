import Statsig from 'statsig-node'
import { randomUUID } from 'crypto'
import { statsigReady } from '../plugins/statsig'

const EXPERIMENT_NAME = 'insurify_redirect'
const COOKIE_NAME = 'sig_uid'
const COOKIE_MAX_AGE = 60 * 60 * 24 // 1 day

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const { pathname } = url

  if (pathname !== '/car-insurance/form' && pathname !== '/car-insurance/form/') return

  console.log('[insurify-redirect] statsigReady:', statsigReady)
  if (!statsigReady) return

  let userId = getCookie(event, COOKIE_NAME)
  if (!userId) {
    userId = randomUUID()
    setCookie(event, COOKIE_NAME, userId, { maxAge: COOKIE_MAX_AGE, path: '/' })
  }

  const user = { userID: userId as string }

  const experiment = Statsig.getExperiment(user, EXPERIMENT_NAME)
  const redirectUrl = experiment.get<string>('redirect_url', '')
  const variant = experiment.get<string>('variant', '')

  console.log('[insurify-redirect] userId:', userId, 'redirectUrl:', redirectUrl, 'variant:', variant)

  if (redirectUrl) {
    const destination = new URL(redirectUrl)
    url.searchParams.forEach((value, key) => destination.searchParams.set(key, value))
    if (variant) destination.searchParams.set('variant', variant)

    const gaCookie = getCookie(event, '_ga_NGMYQLELL2')
    if (gaCookie) {
      const sessionIdMatch = decodeURIComponent(gaCookie).match(/[.$]s(\d+)/)
      if (sessionIdMatch) destination.searchParams.set('ga_session', sessionIdMatch[1])
    }

    await sendRedirect(event, destination.toString(), 302)
  }
})

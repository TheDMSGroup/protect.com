import Statsig from 'statsig-node'
import { randomUUID } from 'crypto'
import { statsigReady } from '../plugins/statsig'

const DYNAMIC_CONFIG_NAME = 'protect_deals_config'
const COOKIE_NAME = 'sig_uid'
const COOKIE_MAX_AGE = 60 * 60 * 24 // 1 day

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  if (!url.pathname.startsWith('/car-insurance/form/deals')) return

  if (!statsigReady) return

  let userId = getCookie(event, COOKIE_NAME)
  if (!userId) {
    userId = randomUUID()
    setCookie(event, COOKIE_NAME, userId, { maxAge: COOKIE_MAX_AGE, path: '/' })
  }

  const user = { userID: userId as string, customIDs: {} }

  const config = Statsig.getConfig(user, DYNAMIC_CONFIG_NAME)
  const redirectUrl = config.get<string>('redirect_url', '')
  const variant = config.get<string>('variant', '')

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

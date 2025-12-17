/**
 * Mastodon API proxy endpoint
 * POST /api/mastodon/ping
 *
 * This endpoint proxies requests to the Mastodon API
 * keeping the API key secure on the server side
 */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const MASTODON_API_URL = 'https://matching.platform.ue.co/ping'
  const MASTODON_API_KEY = config.mastodonApiKey

  if (!MASTODON_API_KEY) {
    console.error('MASTODON_API_KEY is not configured')
    throw createError({
      statusCode: 500,
      statusMessage: 'API configuration error'
    })
  }

  try {
    const response = await fetch(MASTODON_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MASTODON_API_KEY}`
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Mastodon API error:', response.status, errorText)
      throw createError({
        statusCode: response.status,
        statusMessage: `Mastodon API error: ${response.statusText}`
      })
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error calling Mastodon API:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to connect to Mastodon API'
    })
  }
})

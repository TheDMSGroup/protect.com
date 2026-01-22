/**
 * API endpoint to clear Google Sheets cache
 * POST /api/sheets/clear-cache
 *
 * Query parameters:
 *   - key: Specific cache key to clear (optional, clears all if not provided)
 *   - token: Authentication token (required)
 */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  // Simple token-based authentication for cache clearing
  const expectedToken = config.cacheClearToken || config.public.cacheClearToken;

  if (!expectedToken || query.token !== expectedToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized - Invalid or missing token',
    });
  }

  try {
    clearCache(query.key || null);

    return {
      success: true,
      message: query.key
        ? `Cache cleared for key: ${query.key}`
        : 'All cache cleared',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error clearing cache:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to clear cache',
      data: { original: error.message },
    });
  }
});

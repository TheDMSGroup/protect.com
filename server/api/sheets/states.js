/**
 * API endpoint for fetching state data from Google Sheets
 * GET /api/sheets/states
 *
 * Query parameters:
 *   - slug: Filter by state slug (optional)
 *   - abbreviation: Filter by state abbreviation (optional)
 *   - nocache: Set to 'true' to bypass cache (optional)
 */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  const spreadsheetId = config.public.statesSpreadsheetId || config.statesSpreadsheetId;
  const range = config.public.statesRange || config.statesRange || 'States!A:Z';

  if (!spreadsheetId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'States spreadsheet ID not configured',
    });
  }

  try {
    // Fetch data from Google Sheets with caching
    const states = await fetchSheetData(spreadsheetId, range, {
      useCache: query.nocache !== 'true',
      ttl: 1000 * 60 * 60 * 24 * 30, // 30 days cache for states data
      headerRow: true,
      skipRows: 1, // Skip row 1 (descriptive labels for humans)
    });

    // Apply filters if provided
    let filteredStates = states;

    if (query.slug) {
      filteredStates = filteredStates.filter(
        state => state.slug?.toLowerCase() === query.slug.toLowerCase()
      );
    }

    if (query.abbreviation) {
      filteredStates = filteredStates.filter(
        state => state.abbreviation?.toUpperCase() === query.abbreviation.toUpperCase()
      );
    }

    // Return single object if filtering by unique identifier, otherwise array
    if (query.slug || query.abbreviation) {
      return filteredStates[0] || null;
    }

    return filteredStates;
  } catch (error) {
    console.error('Error fetching states from Google Sheets:', error);
    throw createError({
      statusCode: error.statusCode || 502,
      statusMessage: error.statusMessage || 'Failed to fetch states data',
      data: { original: error.message },
    });
  }
});

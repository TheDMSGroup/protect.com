/**
 * API endpoint for fetching vehicle makes from Google Sheets
 * GET /api/sheets/vehicle-makes
 *
 * Query parameters:
 *   - slug: Filter by make slug (optional)
 *   - nocache: Set to 'true' to bypass cache (optional)
 */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  const spreadsheetId = config.vehiclesSpreadsheetId;
  // Allow ?stage=true to override and use stage sheet
  const range = query.stage === 'true' ? 'Stage-Makes!A:Z' : 'Makes!A:Z';

  if (!spreadsheetId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Vehicles spreadsheet ID not configured',
    });
  }

  try {
    // Fetch data from Google Sheets Makes tab with caching
    const makes = await fetchSheetData(spreadsheetId, range, {
      useCache: query.nocache !== 'true',
      ttl: 1000 * 60 * 60 * 24 * 30, // 30 days cache for vehicle makes
      headerRow: true,
    });

    // Apply filters
    let filteredMakes = makes;

    if (query.slug) {
      filteredMakes = filteredMakes.filter(
        make => make['make_slug']?.toLowerCase() === query.slug.toLowerCase()
      );
      // Return single object if filtering by slug
      return filteredMakes[0] || null;
    }

    return filteredMakes;
  } catch (error) {
    console.error('Error fetching vehicle makes from Google Sheets:', error);
    throw createError({
      statusCode: error.statusCode || 502,
      statusMessage: error.statusMessage || 'Failed to fetch vehicle makes data',
      data: { original: error.message },
    });
  }
});

/**
 * API endpoint for fetching detailed vehicle model data from Google Sheets
 * GET /api/sheets/vehicles-detail
 *
 * This endpoint fetches extended vehicle information from the Models tab including:
 * - Detailed ratings (Car & Driver, J.D. Power)
 * - Safety features and ratings (IIHS, NHTSA)
 * - FAQs and answers
 * - Insurance factors
 * - Year, pricing, MSRP, coverage costs
 *
 * Query parameters:
 *   - make: Filter by make slug (optional)
 *   - model: Filter by model slug (optional)
 *   - year: Filter by model year (optional)
 *   - nocache: Set to 'true' to bypass cache (optional)
 */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  const spreadsheetId = config.vehiclesSpreadsheetId;
  const range = config.public.vehiclesModelsRange || 'Models!A:Z';

  if (!spreadsheetId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Vehicles spreadsheet ID not configured',
    });
  }

  try {
    // Fetch data from Google Sheets Models tab with caching
    const models = await fetchSheetData(spreadsheetId, range, {
      useCache: query.nocache !== 'true',
      ttl: 1000 * 60 * 60 * 24 * 30, // 30 days cache for vehicle model data
      headerRow: true,
    });

    // Apply filters
    let filteredModels = models;

    if (query.make) {
      filteredModels = filteredModels.filter(
        model => model['make']?.toLowerCase() === query.make.toLowerCase()
      );
    }

    if (query.model) {
      filteredModels = filteredModels.filter(
        model => model['model_slug']?.toLowerCase() === query.model.toLowerCase()
      );
    }

    if (query.year) {
      filteredModels = filteredModels.filter(
        model => model['year']?.toString() === query.year.toString()
      );
    }

    // Return single object if filtering by make and model, otherwise array
    if (query.make && query.model) {
      return filteredModels[0] || null;
    }

    return filteredModels;
  } catch (error) {
    console.error('Error fetching vehicle models from Google Sheets:', error);
    throw createError({
      statusCode: error.statusCode || 502,
      statusMessage: error.statusMessage || 'Failed to fetch vehicle models data',
      data: { original: error.message },
    });
  }
});

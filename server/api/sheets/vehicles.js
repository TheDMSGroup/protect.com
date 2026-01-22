/**
 * API endpoint for fetching vehicle data from Google Sheets
 * GET /api/sheets/vehicles
 *
 * Query parameters:
 *   - make: Filter by make name (optional)
 *   - model: Filter by model name (optional)
 *   - year: Filter by model year (optional)
 *   - slug: Filter by model_page_slug (optional)
 *   - makesOnly: Return unique makes only (optional)
 *   - nocache: Set to 'true' to bypass cache (optional)
 */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  const spreadsheetId = config.vehiclesSpreadsheetId;
  const range = config.public.vehiclesRange || 'Sheet1!A:Z';

  if (!spreadsheetId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Vehicles spreadsheet ID not configured',
    });
  }

  try {
    // Fetch data from Google Sheets with caching
    // gid='0' is the first sheet (Sheet1)
    const vehicles = await fetchSheetData(spreadsheetId, range, {
      useCache: query.nocache !== 'true',
      ttl: 1000 * 60 * 60 * 24 * 30, // 30 days cache for vehicle data
      headerRow: true,
      gid: '0', // First sheet
    });

    // If makesOnly is requested, return unique makes
    if (query.makesOnly === 'true') {
      const uniqueMakes = {};
      vehicles.forEach(vehicle => {
        const makeKey = vehicle.make?.toLowerCase();
        if (makeKey && !uniqueMakes[makeKey]) {
          uniqueMakes[makeKey] = {
            make: vehicle.make,
            make_description: vehicle.make_description,
            slug: makeKey.replace(/\s+/g, '-'),
          };
        }
      });
      return Object.values(uniqueMakes);
    }

    // Apply filters
    let filteredVehicles = vehicles;

    if (query.make) {
      filteredVehicles = filteredVehicles.filter(
        vehicle => vehicle.make?.toLowerCase() === query.make.toLowerCase()
      );
    }

    if (query.model) {
      filteredVehicles = filteredVehicles.filter(
        vehicle => vehicle.model?.toLowerCase() === query.model.toLowerCase()
      );
    }

    if (query.year) {
      filteredVehicles = filteredVehicles.filter(
        vehicle => vehicle.model_year === query.year
      );
    }

    if (query.slug) {
      filteredVehicles = filteredVehicles.filter(
        vehicle => vehicle.model_page_slug?.toLowerCase() === query.slug.toLowerCase()
      );
    }

    // Return single object if filtering by slug, otherwise array
    if (query.slug) {
      return filteredVehicles[0] || null;
    }

    return filteredVehicles;
  } catch (error) {
    console.error('Error fetching vehicles from Google Sheets:', error);
    throw createError({
      statusCode: error.statusCode || 502,
      statusMessage: error.statusMessage || 'Failed to fetch vehicles data',
      data: { original: error.message },
    });
  }
});

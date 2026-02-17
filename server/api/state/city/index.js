import { states } from "~/utils/redirect-config";

const formatLocationNameForMatch = (name) =>
  name.toLowerCase().replaceAll(/\s+/g, "");

const formatCitySlugForMatch = (slug) =>
  slug.toLowerCase().replaceAll("-", "").replaceAll(/\s+/g, "");

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // Get query parameters
  const query = getQuery(event);
  const { state, city } = query;

  if (!state || !city) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required query parameters: state and city",
    });
  }

  const matchedState = states.find(
    (s) => formatLocationNameForMatch(s.name) === state
  );

  // Google Sheets configuration
  const SHEET_ID = "1auut2Px5pfJwaPA58OeUQeMG_5KP-RpEVUfzHIQadV0";
  const API_KEY = config.googleSheetsApiKey || "";
  // Try wrapping sheet name in quotes or use Sheet1 as default
  const RANGE = "Cities!2:101"; // Wrap sheet name in single quotes
  if (!SHEET_ID || !API_KEY) {
    throw createError({
      statusCode: 500,
      statusMessage: "Google Sheets configuration missing",
    });
  }

  try {
    // Construct the Google Sheets API URL - encode the range
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    // Fetch data from Google Sheets
    const response = await $fetch(url);

    // console.log("Google Sheets Response:", response.values);

    // Parse the data
    const rows = response.values;
    // Convert to array of objects
    const data = rows.map((row) => {
      return {
        name: row[1],
        stateCode: row[3],
        metroArea: row[4],
        cityState: row[2],
        population: row[5],
        licenseShare: row[6],
        licensedDrivers: row[7],
        primaryZip: row[8],
        coverageRates: {
          annual: row[12],
          monthly: row[13],
        },
        stateMinCoverage: row[14],
        stateFaultType: row[15],
        cityDescription: row[16],
        faq: [row[22], row[23], row[24], row[25], row[26]],
        cityPosition: row[27],
      };
    });
    // const filteredData = data.filter((item) => formatLocationNameForMatch(item.name) === city && state === matchedState?.slug);
    const filteredData = data
      .filter((item) => {
        const cityMatch =
          formatLocationNameForMatch(item.name) ===
          formatCitySlugForMatch(city);
        const stateMatch =
          item.stateCode.toLowerCase() ===
          matchedState?.abbreviation.toLowerCase();
        return cityMatch && stateMatch;
      })
      .map((item) => ({
        ...item,
        stateName: matchedState?.name || "",
      }));

    return {
      success: true,
      data: filteredData,
      total: filteredData.length,
    };
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: "Failed to fetch city data from Google Sheets",
      data: { error: error?.message || String(error) },
    });
  }
});

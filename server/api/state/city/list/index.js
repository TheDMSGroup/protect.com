import { states } from "~/utils/redirect-config";

const formatLocationNameForMatch = (name) =>
  name.toLowerCase().replaceAll(/\s+/g, "");

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const { state, limit } = query;

  // Google Sheets configuration
  const SHEET_ID = "1auut2Px5pfJwaPA58OeUQeMG_5KP-RpEVUfzHIQadV0";
  const API_KEY = config.googleSheetsApiKey || "";
  const RANGE = "Cities!2:101";

  if (!SHEET_ID || !API_KEY) {
    throw createError({
      statusCode: 500,
      statusMessage: "Google Sheets configuration missing",
    });
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    const response = await $fetch(url);
    const rows = response.values || [];

    const data = rows.map((row) => ({
      name: row[1],
    }));

    if (!state) {
      return {
        success: true,
        data: data.slice(0, limit),
        total: Math.min(limit, data.length),
      };
    }

    const matchedState = states.find(
      (s) =>
        formatLocationNameForMatch(s.slug) === formatLocationNameForMatch(state)
    );

    const filteredData = data.filter((item) => {
      if (matchedState?.abbreviation) {
        return (
          item.stateCode?.toLowerCase() ===
          matchedState.abbreviation.toLowerCase()
        );
      }
      return false;
    });

    return {
      success: true,
      data: filteredData.slice(0, limit),
      total: Math.min(limit, filteredData.length),
    };
  } catch (error) {
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: "Failed to fetch state city data from Google Sheets",
      data: { error: error?.message || String(error) },
    });
  }
});

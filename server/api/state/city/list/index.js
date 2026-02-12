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
      state: row[2],
      stateCode: row[3],
      slug: row[1].toLowerCase().replaceAll(/\s+/g, "-"),
    }));

    //if state is not passed or is empty, return all cities up to the limit, sorted alphabetically by state code
    if (!state) {
      const limitedData = data.slice(0, limit);
      const stateMap = new Map(
        states.map((s) => [s.name.toLowerCase(), s.name])
      );

      const groupedByState = limitedData.reduce((acc, city) => {
        const stateKey = city.state.toLowerCase();
        const normalizedState = stateMap.get(stateKey);

        if (!normalizedState) return acc;

        if (!acc[normalizedState]) {
          acc[normalizedState] = {
            state: normalizedState,
            cities: [],
          };
        }

        acc[normalizedState].cities.push({
          name: city.name,
          slug: city.slug,
          state: city.state,
          stateCode: city.stateCode,
        });

        return acc;
      }, {});

      // Sort state codes and cities within each state
      const result = Object.values(groupedByState)
        .sort((a, b) => a.state.localeCompare(b.state))
        .map((group) => ({
          ...group,
          cities: group.cities.sort((a, b) => a.name.localeCompare(b.name)),
        }));

      return {
        success: true,
        data: result,
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

import { states } from "~/utils/redirect-config";

const groupAndSortCities = (cities, stateMap, filterState = null) => {
  const grouped = cities.reduce((acc, city) => {
    //get the state name from the city data from the sheet
    const stateKey = city.state.toLowerCase();

    //get the official state name from stateMap
    const normalizedState = stateMap.get(stateKey);

    //Skip if state not in map, or if we have a filterState and this city doesn't match it
    //this allows this function to be used for either case - grouping all cities across states, or grouping cities for a specific state
    if (
      !normalizedState ||
      (filterState && stateKey !== filterState.toLowerCase())
    )
      return acc;

    //push new state group if it doesn't exist, otherwise push city to existing state group
    if (!acc[normalizedState]) {
      acc[normalizedState] = { state: normalizedState, cities: [] };
    }

    //spread city object to ensure we don't accidentally modify the original data structure
    acc[normalizedState].cities.push({
      ...city,
    });

    //return the accumulator object for the next iteration of reduce
    return acc;
  }, {});

  //convert grouped object to array, sort states alphabetically, and sort cities within each state alphabetically
  return Object.values(grouped)
    .sort((a, b) => a.state.localeCompare(b.state))
    .map((group) => ({
      ...group,
      cities: group.cities.sort((a, b) => a.name.localeCompare(b.name)),
    }));
};

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

    const stateMap = new Map(states.map((s) => [s.name.toLowerCase(), s.name]));

    //if we aren't passed a state, we want to limit the number of cities we return and just return the top cities across all states. If we are passed a state, we want to ignore the limit and return all cities for that state since it's likely there won't be that many cities for each state and it provides a better user experience to show them all instead of an arbitrary subset.
    if (!state) {
      const limitedData = data.slice(0, limit);
      const result = groupAndSortCities(limitedData, stateMap);

      return {
        success: true,
        data: result,
        total: Math.min(limit, data.length),
      };
    }

    //otherwise, if we are passed a state, ignore the limit and return all cities for that state, grouped and sorted
    const result = groupAndSortCities(data, stateMap, state);

    return {
      success: true,
      data: result,
      total: result.length,
    };
  } catch (error) {
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: "Failed to fetch state city data from Google Sheets",
      data: { error: error?.message || String(error) },
    });
  }
});

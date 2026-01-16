export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // Get query parameters
  const query = getQuery(event);
  const { state, city } = query;

  // Google Sheets configuration
  // You'll need to set these in your .env file:
  // GOOGLE_SHEETS_API_KEY=your_api_key
  // GOOGLE_SHEET_ID=your_sheet_id
  const SHEET_ID = "1auut2Px5pfJwaPA58OeUQeMG_5KP-RpEVUfzHIQadV0";
  const API_KEY = "AIzaSyDKMdKBaogjDHC7CR87SOmJx21I28hWyiI";
  // Try wrapping sheet name in quotes or use Sheet1 as default
  const RANGE = "Cities!A1:101"; // Wrap sheet name in single quotes

  if (!SHEET_ID || !API_KEY) {
    throw createError({
      statusCode: 500,
      statusMessage: "Google Sheets configuration missing",
    });
  }

  try {
    // Construct the Google Sheets API URL - encode the range
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/?key=${API_KEY}`;

    console.log("Fetching URL:", url);
    console.log("Range:", RANGE);

    // Fetch data from Google Sheets
    const response = await $fetch(url);

    console.log("Google Sheets Response:", response.sheets[0]);

    // Parse the data
    // Assuming first row is headers
    const headers = response.values[0];
    const rows = response.values.slice(1);

    // Convert to array of objects
    const data = rows.map((row) => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || "";
      });
      return obj;
    });

    // Filter by state and/or city if provided
    let filteredData = data;

    if (state) {
      filteredData = filteredData.filter(
        (item) => item.state?.toLowerCase() === state.toLowerCase() || item.State?.toLowerCase() === state.toLowerCase()
      );
    }

    if (city) {
      filteredData = filteredData.filter(
        (item) => item.city?.toLowerCase() === city.toLowerCase() || item.City?.toLowerCase() === city.toLowerCase()
      );
    }

    console.log("Filtered Data:", {
      success: true,
      data: filteredData,
      total: filteredData.length,
    });
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

/**
 * Google Sheets API Service
 * Handles fetching data from Google Sheets with caching
 */

import { google } from 'googleapis';

// In-memory cache with TTL
const cache = new Map();
const DEFAULT_TTL = 1000 * 60 * 15; // 15 minutes default

/**
 * Get cached data or fetch from callback
 */
function getCached(key, ttl = DEFAULT_TTL) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }
  return null;
}

/**
 * Set cache with timestamp
 */
function setCache(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

/**
 * Clear cache for a specific key or all cache
 */
export function clearCache(key = null) {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
}

/**
 * Initialize Google Sheets API client with API key
 */
function getGoogleSheetsClient() {
  const config = useRuntimeConfig();
  const apiKey = config.googleSheetsApiKey;

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Google Sheets API key not configured',
    });
  }

  return google.sheets({ version: 'v4', auth: apiKey });
}

/**
 * Fetch data from a Google Sheet
 * @param {string} spreadsheetId - The Google Sheets spreadsheet ID
 * @param {string} range - The range to fetch (e.g., 'Sheet1!A1:D10')
 * @param {object} options - Additional options
 * @param {number} options.ttl - Cache TTL in milliseconds
 * @param {boolean} options.useCache - Whether to use cache (default: true)
 * @param {boolean} options.headerRow - Whether first row is headers (default: true)
 * @param {number} options.skipRows - Number of rows to skip before header row (default: 0)
 * @returns {Promise<Array>} Array of data objects
 */
export async function fetchSheetData(spreadsheetId, range, options = {}) {
  const {
    ttl = DEFAULT_TTL,
    useCache = true,
    headerRow = true,
    skipRows = 0,
  } = options;

  const cacheKey = `${spreadsheetId}:${range}:${skipRows}`;

  // Check cache first
  if (useCache) {
    const cached = getCached(cacheKey, ttl);
    if (cached) {
      return cached;
    }
  }

  try {
    const sheets = getGoogleSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return [];
    }

    let data;

    if (headerRow) {
      // Skip the specified number of rows, then use the next row as headers
      const headerIndex = skipRows;
      if (headerIndex >= rows.length) {
        return [];
      }

      const headers = rows[headerIndex];
      data = rows.slice(headerIndex + 1).map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index] || '';
        });
        return obj;
      });
    } else {
      // Return raw rows (skip the specified number of rows first)
      data = rows.slice(skipRows);
    }

    // Cache the results
    if (useCache) {
      setCache(cacheKey, data);
    }

    return data;
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch data from Google Sheets',
      data: { original: error.message },
    });
  }
}

/**
 * Fetch multiple ranges from a Google Sheet in one request
 * @param {string} spreadsheetId - The Google Sheets spreadsheet ID
 * @param {Array<string>} ranges - Array of ranges to fetch
 * @param {object} options - Additional options
 * @returns {Promise<Object>} Object with range names as keys and data as values
 */
export async function fetchMultipleRanges(spreadsheetId, ranges, options = {}) {
  const {
    ttl = DEFAULT_TTL,
    useCache = true,
    headerRow = true,
  } = options;

  const cacheKey = `${spreadsheetId}:multi:${ranges.join(',')}`;

  // Check cache first
  if (useCache) {
    const cached = getCached(cacheKey, ttl);
    if (cached) {
      return cached;
    }
  }

  try {
    const sheets = getGoogleSheetsClient();

    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges,
    });

    const result = {};

    response.data.valueRanges.forEach((valueRange, index) => {
      const rows = valueRange.values;
      const rangeName = ranges[index];

      if (!rows || rows.length === 0) {
        result[rangeName] = [];
        return;
      }

      if (headerRow) {
        const headers = rows[0];
        result[rangeName] = rows.slice(1).map(row => {
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] = row[index] || '';
          });
          return obj;
        });
      } else {
        result[rangeName] = rows;
      }
    });

    // Cache the results
    if (useCache) {
      setCache(cacheKey, result);
    }

    return result;
  } catch (error) {
    console.error('Error fetching multiple ranges from Google Sheets:', error);
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch data from Google Sheets',
      data: { original: error.message },
    });
  }
}

/**
 * Helper to validate required sheet configuration
 */
export function validateSheetConfig(config) {
  if (!config.spreadsheetId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing spreadsheet ID in configuration',
    });
  }
  if (!config.range) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing range in configuration',
    });
  }
}

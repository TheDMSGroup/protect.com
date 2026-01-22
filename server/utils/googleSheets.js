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
 * Parse CSV data into objects
 * @param {string} csv - The CSV/TSV data to parse
 * @param {number} skipRows - Number of rows to skip before header row (default: 0)
 */
function parseCSV(csv, skipRows = 0) {
  const lines = csv.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  // Skip the specified number of rows, then use the next row as headers
  const headerIndex = skipRows;
  const headers = lines[headerIndex].split('\t').map(h => h.trim());
  const data = [];

  for (let i = headerIndex + 1; i < lines.length; i++) {
    const values = lines[i].split('\t');
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index]?.trim() || '';
    });
    data.push(obj);
  }

  return data;
}

/**
 * Fetch public Google Sheet as CSV (no API key needed)
 * @param {string} spreadsheetId - The spreadsheet ID
 * @param {string} gid - The sheet GID (default: '0')
 * @param {number} skipRows - Number of rows to skip before header row (default: 0)
 */
async function fetchPublicSheet(spreadsheetId, gid = '0', skipRows = 0) {
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=tsv&gid=${gid}`;

  try {
    const response = await fetch(url, {
      redirect: 'follow', // Follow redirects
      headers: {
        'User-Agent': 'Mozilla/5.0' // Some services require a user agent
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.status} ${response.statusText}`);
    }
    const csv = await response.text();
    return parseCSV(csv, skipRows);
  } catch (error) {
    throw new Error(`Error fetching public sheet: ${error.message}`);
  }
}

/**
 * Initialize Google Sheets API client (for private sheets with authentication)
 */
function getGoogleSheetsClient() {
  const config = useRuntimeConfig();

  // Check if using API key for public sheets
  if (config.googleApiKey || config.public.googleApiKey) {
    const apiKey = config.googleApiKey || config.public.googleApiKey;
    return google.sheets({ version: 'v4', auth: apiKey });
  }

  // Otherwise use service account credentials
  const credentials = config.googleServiceAccount
    ? JSON.parse(config.googleServiceAccount)
    : {
        client_email: config.googleClientEmail,
        private_key: config.googlePrivateKey?.replace(/\\n/g, '\n'),
      };

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  return google.sheets({ version: 'v4', auth });
}

/**
 * Fetch data from a Google Sheet
 * @param {string} spreadsheetId - The Google Sheets spreadsheet ID
 * @param {string} range - The range to fetch (e.g., 'Sheet1!A1:D10') or gid for public sheets
 * @param {object} options - Additional options
 * @param {number} options.ttl - Cache TTL in milliseconds
 * @param {boolean} options.useCache - Whether to use cache (default: true)
 * @param {boolean} options.headerRow - Whether first row is headers (default: true)
 * @param {string} options.gid - Sheet GID for public sheets (default: '0')
 * @param {boolean} options.usePublic - Force public CSV fetch (default: true if no auth configured)
 * @param {number} options.skipRows - Number of rows to skip before header row (default: 0)
 * @returns {Promise<Array>} Array of data objects
 */
export async function fetchSheetData(spreadsheetId, range, options = {}) {
  const {
    ttl = DEFAULT_TTL,
    useCache = true,
    headerRow = true,
    gid = '0',
    usePublic,
    skipRows = 0,
  } = options;

  const config = useRuntimeConfig();
  const cacheKey = `${spreadsheetId}:${range}:${gid}`;

  // Check cache first
  if (useCache) {
    const cached = getCached(cacheKey, ttl);
    if (cached) {
      return cached;
    }
  }

  // Determine if we should use public CSV fetch
  const hasAuth = config.googleApiKey || config.googleServiceAccount || config.googleClientEmail;
  const shouldUsePublic = usePublic !== false && !hasAuth;

  try {
    let data;

    if (shouldUsePublic) {
      // Fetch as public CSV (no authentication needed)
      console.log('Fetching public sheet:', spreadsheetId, 'gid:', gid, 'skipRows:', skipRows);
      data = await fetchPublicSheet(spreadsheetId, gid, skipRows);
    } else {
      // Use Google Sheets API with authentication
      const sheets = getGoogleSheetsClient();

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      const rows = response.data.values;

      if (!rows || rows.length === 0) {
        return [];
      }

      if (headerRow) {
        // First row is headers
        const headers = rows[0];
        data = rows.slice(1).map(row => {
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] = row[index] || '';
          });
          return obj;
        });
      } else {
        // Return raw rows
        data = rows;
      }
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

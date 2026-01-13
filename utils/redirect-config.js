/**
 * UNIFIED REDIRECT CONFIGURATION
 * Edit this file to configure redirects for both client and server middleware
 */

// State code to slug mapping
export const stateMapping = {
  AL: "alabama",
  AK: "alaska",
  AZ: "arizona",
  AR: "arkansas",
  CA: "california",
  CO: "colorado",
  CT: "connecticut",
  DE: "delaware",
  FL: "florida",
  GA: "georgia",
  HI: "hawaii",
  ID: "idaho",
  IL: "illinois",
  IN: "indiana",
  IA: "iowa",
  KS: "kansas",
  KY: "kentucky",
  LA: "louisiana",
  ME: "maine",
  MD: "maryland",
  MA: "massachusetts",
  MI: "michigan",
  MN: "minnesota",
  MS: "mississippi",
  MO: "missouri",
  MT: "montana",
  NE: "nebraska",
  NV: "nevada",
  NH: "newhampshire",
  NJ: "newjersey",
  NM: "newmexico",
  NY: "newyork",
  NC: "northcarolina",
  ND: "northdakota",
  OH: "ohio",
  OK: "oklahoma",
  OR: "oregon",
  PA: "pennsylvania",
  RI: "rhodeisland",
  SC: "southcarolina",
  SD: "southdakota",
  TN: "tennessee",
  TX: "texas",
  USA: "usa",
  UT: "utah",
  VT: "vermont",
  VA: "virginia",
  WA: "washington",
  WV: "westvirginia",
  WI: "wisconsin",
  WY: "wyoming",
};

// Legacy path redirects
export const redirectRules = [
  { from: "/insurance/auto", to: "/car-insurance", code: 301 },
  { from: "/insurance/home", to: "/home-insurance", code: 301 },
  { from: "/insurance/health", to: "/health-insurance", code: 301 },
];

// Car insurance sub-routes to skip state validation
export const carInsuranceSubRoutes = ["rate-calculator", "chat-form", "mystate", "vehicles", "discounts"];

// Paths to skip redirect processing
export const skipPaths = [
  "/articles/",
  ...carInsuranceSubRoutes.map((route) => `/car-insurance/${route}`),
];

// Reverse lookup map for slug validation
export const reverseSlugMap = Object.values(stateMapping).reduce((acc, slug) => {
  const normalized = slug.replace(/-/g, "");
  acc[normalized] = slug;
  return acc;
}, {});

// Get official slug from any variant
export function getOfficialSlug(inputSlug) {
  const normalized = inputSlug.toLowerCase().replace(/-/g, "");
  return reverseSlugMap[normalized];
}

/**
 * Core redirect logic - used by both client and server middleware
 * @param {string} path - The URL path to process
 * @returns {object|null} - Redirect action or null if no redirect needed
 *   { type: 'redirect', path: string, code: number }
 *   { type: 'error', code: number, message: string }
 *   null = no action needed
 */
export function processRedirect(path) {
  // Early return for non-relevant paths
  if (!path.startsWith("/insurance/") && !path.includes("car-insurance")) {
    return null;
  }

  // Check skip paths
  for (const skipPath of skipPaths) {
    if (path.startsWith(skipPath)) {
      return null;
    }
  }

  // Handle car insurance state redirects
  if (path.includes("car-insurance")) {
    const pathParts = path.split("/");
    const stateSegment = pathParts[2];

    if (stateSegment) {
      const upperSegment = stateSegment.toUpperCase();
      const isStateCode = stateSegment.length === 2 || upperSegment === "USA";

      // State code redirect (e.g., /car-insurance/CA -> /car-insurance/california)
      // Only redirect if the segment is uppercase (actual code) not already the slug
      if (isStateCode && stateMapping[upperSegment] && stateSegment !== stateMapping[upperSegment]) {
        return {
          type: "redirect",
          path: `/car-insurance/${stateMapping[upperSegment]}`,
          code: 301,
          reason: "state-code-to-name",
        };
      }

      // Check if valid slug
      const officialSlug = getOfficialSlug(stateSegment);

      if (!officialSlug) {
        // Invalid state slug
        return {
          type: "error",
          code: 404,
          message: "Page Not Found",
        };
      }

      // Normalize hyphenated slugs (e.g., /car-insurance/new-york -> /car-insurance/newyork)
      if (stateSegment.includes("-")) {
        return {
          type: "redirect",
          path: `/car-insurance/${officialSlug}`,
          code: 301,
          reason: "normalize-state-slug",
        };
      }
    }
  }

  // Handle legacy path redirects
  for (const rule of redirectRules) {
    if (path === rule.from || path.startsWith(rule.from + "/")) {
      return {
        type: "redirect",
        path: path.replace(rule.from, rule.to),
        code: rule.code,
        reason: "url-structure-change",
      };
    }
  }

  return null;
}

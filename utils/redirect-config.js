/**
 * UNIFIED REDIRECT CONFIGURATION
 * Edit this file to configure redirects for both client and server middleware
 */

// Single source of truth for all state data
export const states = [
  { name: "Alabama", abbreviation: "AL", slug: "alabama" },
  { name: "Alaska", abbreviation: "AK", slug: "alaska" },
  { name: "Arizona", abbreviation: "AZ", slug: "arizona" },
  { name: "Arkansas", abbreviation: "AR", slug: "arkansas" },
  { name: "California", abbreviation: "CA", slug: "california" },
  { name: "Colorado", abbreviation: "CO", slug: "colorado" },
  { name: "Connecticut", abbreviation: "CT", slug: "connecticut" },
  { name: "Delaware", abbreviation: "DE", slug: "delaware" },
  { name: "Florida", abbreviation: "FL", slug: "florida" },
  { name: "Georgia", abbreviation: "GA", slug: "georgia" },
  { name: "Hawaii", abbreviation: "HI", slug: "hawaii" },
  { name: "Idaho", abbreviation: "ID", slug: "idaho" },
  { name: "Illinois", abbreviation: "IL", slug: "illinois" },
  { name: "Indiana", abbreviation: "IN", slug: "indiana" },
  { name: "Iowa", abbreviation: "IA", slug: "iowa" },
  { name: "Kansas", abbreviation: "KS", slug: "kansas" },
  { name: "Kentucky", abbreviation: "KY", slug: "kentucky" },
  { name: "Louisiana", abbreviation: "LA", slug: "louisiana" },
  { name: "Maine", abbreviation: "ME", slug: "maine" },
  { name: "Maryland", abbreviation: "MD", slug: "maryland" },
  { name: "Massachusetts", abbreviation: "MA", slug: "massachusetts" },
  { name: "Michigan", abbreviation: "MI", slug: "michigan" },
  { name: "Minnesota", abbreviation: "MN", slug: "minnesota" },
  { name: "Mississippi", abbreviation: "MS", slug: "mississippi" },
  { name: "Missouri", abbreviation: "MO", slug: "missouri" },
  { name: "Montana", abbreviation: "MT", slug: "montana" },
  { name: "Nebraska", abbreviation: "NE", slug: "nebraska" },
  { name: "Nevada", abbreviation: "NV", slug: "nevada" },
  { name: "New Hampshire", abbreviation: "NH", slug: "newhampshire" },
  { name: "New Jersey", abbreviation: "NJ", slug: "newjersey" },
  { name: "New Mexico", abbreviation: "NM", slug: "newmexico" },
  { name: "New York", abbreviation: "NY", slug: "newyork" },
  { name: "North Carolina", abbreviation: "NC", slug: "northcarolina" },
  { name: "North Dakota", abbreviation: "ND", slug: "northdakota" },
  { name: "Ohio", abbreviation: "OH", slug: "ohio" },
  { name: "Oklahoma", abbreviation: "OK", slug: "oklahoma" },
  { name: "Oregon", abbreviation: "OR", slug: "oregon" },
  { name: "Pennsylvania", abbreviation: "PA", slug: "pennsylvania" },
  { name: "Rhode Island", abbreviation: "RI", slug: "rhodeisland" },
  { name: "South Carolina", abbreviation: "SC", slug: "southcarolina" },
  { name: "South Dakota", abbreviation: "SD", slug: "southdakota" },
  { name: "Tennessee", abbreviation: "TN", slug: "tennessee" },
  { name: "Texas", abbreviation: "TX", slug: "texas" },
  { name: "USA", abbreviation: "USA", slug: "usa" },
  { name: "Utah", abbreviation: "UT", slug: "utah" },
  { name: "Vermont", abbreviation: "VT", slug: "vermont" },
  { name: "Virginia", abbreviation: "VA", slug: "virginia" },
  { name: "Washington", abbreviation: "WA", slug: "washington" },
  { name: "West Virginia", abbreviation: "WV", slug: "westvirginia" },
  { name: "Wisconsin", abbreviation: "WI", slug: "wisconsin" },
  { name: "Wyoming", abbreviation: "WY", slug: "wyoming" },
];

// Derived: State code to slug mapping (for redirects)
export const stateMapping = states.reduce((acc, state) => {
  acc[state.abbreviation] = state.slug;
  return acc;
}, {});

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
        // Invalid state slug - redirect to parent
        return {
          type: "redirect",
          path: "/car-insurance",
          code: 302,
          reason: "invalid-state-to-parent",
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

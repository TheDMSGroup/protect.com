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

// Create reverse lookup map for efficient slug validation
// Maps normalized slugs (without hyphens) to official slugs (with hyphens)
export const reverseSlugMap = Object.values(stateMapping).reduce((acc, slug) => {
  const normalized = slug.replace(/-/g, ""); // 'new-york' -> 'newyork'
  acc[normalized] = slug; // Store: 'newyork' -> 'new-york'
  return acc;
}, {});

// Helper function to get official slug from any variant
export function getOfficialSlug(inputSlug) {
  const normalized = inputSlug.toLowerCase().replace(/-/g, "");
  return reverseSlugMap[normalized];
}

export const redirectRules = [
  { from: "/insurance/auto", to: "/car-insurance", code: 301 },
  { from: "/insurance/home", to: "/home-insurance", code: 301 },
  { from: "/insurance/health", to: "/health-insurance", code: 301 },
];

export const carInsuranceSubRoutes = ["rate-calculator", "chat-form", "bundle"];

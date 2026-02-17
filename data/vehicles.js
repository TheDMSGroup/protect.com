/**
 * Vehicle make and model configuration
 * Used for validation and page generation
 */

// Default year for vehicle images
export const DEFAULT_VEHICLE_YEAR = "2026";

export const vehicles = {
  "chevrolet": {
    "name": "Chevrolet",
    "models": [
      "blazer",
      "blazer-ev",
      "bolt-ev",
      "colorado",
      "corvette",
      "equinox",
      "equinox-ev",
      "malibu",
      "silverado-1500",
      "silverado-ev",
      "silverado-hd",
      "suburban",
      "tahoe",
      "trailblazer",
      "traverse",
      "trax"
    ]
  },
  "ford": {
    "name": "Ford",
    "models": [
      "bronco",
      "bronco-sport",
      "edge",
      "escape",
      "expedition",
      "explorer",
      "f-150",
      "f-250",
      "f-350",
      "f-450",
      "maverick",
      "mustang",
      "mustang-mach-e",
      "ranger",
      "transit",
      "transit-connect"
    ]
  },
  "honda": {
    "name": "Honda",
    "models": [
      "accord",
      "accord-hybrid",
      "civic-hatchback",
      "civic-sedan",
      "civic-type-r",
      "cr-v",
      "cr-v-hybrid",
      "hr-v",
      "odyssey",
      "passport",
      "pilot",
      "prelude-hybrid",
      "prologue",
      "ridgeline"
    ]
  },
  "hyundai": {
    "name": "Hyundai",
    "models": [
      "elantra",
      "elantra-hybrid",
      "elantra-n",
      "ioniq-5",
      "ioniq-6",
      "ioniq-9",
      "kona",
      "palisade",
      "santa-cruz",
      "santa-fe",
      "santa-fe-hybrid",
      "sonata",
      "sonata-hybrid",
      "tucson",
      "tucson-hybrid",
      "venue"
    ]
  },
  "jeep": {
    "name": "Jeep",
    "models": [
      "cherokee",
      "compass",
      "gladiator",
      "grand-cherokee",
      "grand-cherokee-l",
      "grand-wagoneer",
      "grand-wagoneer-l",
      // "recon",
      "wagoneer",
      "wagoneer-s",
      "wrangler"
    ]
  },
  "kia": {
    "name": "Kia",
    "models": [
      "carnival",
      "ev6",
      "ev9",
      "k4",
      "k5",
      "niro",
      "seltos",
      "sorento",
      "sportage",
      "telluride"
    ]
  },
  "nissan": {
    "name": "Nissan",
    "models": [
      "altima",
      "ariya",
      "armada",
      "frontier",
      "kicks",
      "leaf",
      "murano",
      "pathfinder",
      "rogue",
      "sentra",
      "titan",
      "versa",
      "z"
    ]
  },
  "ram": {
    "name": "Ram",
    "models": [
      "1500",
      "1500-classic",
      "1500-rev",
      "2500",
      "3500",
      "promaster"
    ]
  },
  "subaru": {
    "name": "Subaru",
    "models": [
      "ascent",
      "brz",
      "crosstrek",
      "crosstrek-hybrid",
      "forester",
      "forester-hybrid",
      "impreza",
      "legacy",
      "outback",
      "solterra",
      "wrx"
    ]
  },
  "toyota": {
    "name": "Toyota",
    "models": [
      "4-runner",
      "bz-4x",
      "camry",
      "corolla",
      "corolla-cross",
      "crown",
      "gr-86",
      "gr-corolla",
      "highlander",
      "mirai",
      "prius",
      "prius-prime",
      "rav-4",
      "rav-4-prime",
      "sequoia",
      "sienna",
      "supra",
      "tacoma",
      "tundra",
      "venza"
    ]
  }
};

// Helper to get formatted make name
export function getMakeName(slug) {
  return vehicles[slug]?.name || slug.charAt(0).toUpperCase() + slug.slice(1);
}

// Helper to check if make exists
export function isValidMake(slug) {
  return slug in vehicles;
}

// Helper to check if model exists for a make
export function isValidModel(make, model) {
  return vehicles[make]?.models.includes(model) || false;
}

// Get all makes as array
export function getAllMakes() {
  return Object.entries(vehicles).map(([slug, data]) => ({
    slug,
    name: data.name,
  }));
}

// Get all models for a make
export function getModelsForMake(make) {
  return vehicles[make]?.models || [];
}

// Get vehicle image path - images stored at /assets/vehicles/{year}/{make}/{model}.webp (or .png fallback)
export function getVehicleImagePath(make, model, year = DEFAULT_VEHICLE_YEAR, format = "webp") {
  // Remove hyphens from model slug for image filename (e.g., "bronco-sport" -> "broncosport")
  const imageModel = model.replace(/-/g, "");
  return `/assets/vehicles/${year}/${make}/${imageModel}.${format}`;
}

// Get make logo path - logos stored at /assets/vehicles/{year}/{make}/logo.webp (or .png fallback)
export function getMakeLogoPath(make, year = DEFAULT_VEHICLE_YEAR, format = "webp") {
  return `/assets/vehicles/${year}/${make}/logo.${format}`;
}

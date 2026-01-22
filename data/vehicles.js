/**
 * Vehicle make and model configuration
 * Used for validation and page generation
 */

// Default year for vehicle images
export const DEFAULT_VEHICLE_YEAR = "2026";

export const vehicles = {
  // acura: {
  //   name: "Acura",
  //   models: ["integra", "mdx", "rdx", "tlx", "ilx"],
  // },
  // honda: {
  //   name: "Honda",
  //   models: ["accord", "civic", "cr-v", "pilot"],
  // },
  ford: {
    name: "Ford",
    models: [
      "bronco",
      "bronco-sport",
      "edge",
      "escape",
      "expedition",
      "explorer",
      "f150",
      "f250",
      "f350",
      "f450",
      "maverick",
      "mustang",
      "mustang-mach-e",
      "ranger",
      "transit",
      "transit-connect",
    ],
  },
  toyota: {
    name: "Toyota",
    models: [
      "4runner",
      "bz4x",
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
      "rav4",
      "rav4-prime",
      "sequoia",
      "sienna",
      "supra",
      "tacoma",
      "tundra",
      "venza",
    ],
  },
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

// Get vehicle image path - images stored at /assets/vehicles/{year}/{make}/{model}.png
export function getVehicleImagePath(make, model, year = DEFAULT_VEHICLE_YEAR) {
  // Remove hyphens from model slug for image filename (e.g., "bronco-sport" -> "broncosport")
  const imageModel = model.replace(/-/g, "");
  return `/assets/vehicles/${year}/${make}/${imageModel}.png`;
}

// Get make logo path - logos stored at /assets/vehicles/{year}/{make}/logo.png
export function getMakeLogoPath(make, year = DEFAULT_VEHICLE_YEAR) {
  return `/assets/vehicles/${year}/${make}/logo.png`;
}

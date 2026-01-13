/**
 * Vehicle make and model configuration
 * Used for validation and page generation
 */

export const vehicles = {
  // acura: {
  //   name: "Acura",
  //   models: ["integra", "mdx", "rdx", "tlx", "ilx"],
  // },
  // honda: {
  //   name: "Honda",
  //   models: ["accord", "civic", "cr-v", "pilot"],
  // },
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

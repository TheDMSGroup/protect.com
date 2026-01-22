/**
 * State and city configuration
 * Used for validation and page generation
 */

export const stateCities = {
  california: {
    name: "California",
    cities: ["losangeles", "sandiego", "sanfrancisco", "sanjose", "fresno"],
  },
};

// Helper to get formatted state name
export function getStateName(slug) {
  return stateCities[slug]?.name || slug.charAt(0).toUpperCase() + slug.slice(1);
}

// Helper to check if state has cities configured
export function isValidStateWithCities(slug) {
  return slug in stateCities;
}

// Helper to check if city exists for a state
export function isValidCity(state, city) {
  return stateCities[state]?.cities.includes(city) || false;
}

// Get all cities for a state
export function getCitiesForState(state) {
  return stateCities[state]?.cities || [];
}

// Helper to format city name (e.g., "losangeles" -> "Los Angeles")
export function formatCityName(slug) {
  const cityNames = {
    losangeles: "Los Angeles",
    sandiego: "San Diego",
    sanfrancisco: "San Francisco",
    sanjose: "San Jose",
    sanantonio: "San Antonio",
  };
  return cityNames[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
}

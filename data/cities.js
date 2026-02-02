/**
 * State and city configuration
 * Used for validation and page generation
 */

export const stateCities = {
  alabama: {
    name: "Alabama",
    cities: ["birmingham"],
  },
  arizona: {
    name: "Arizona",
    cities: ["phoenix", "tucson"],
  },
  arkansas: {
    name: "Arkansas",
    cities: ["little-rock", "fayetteville"],
  },
  california: {
    name: "California",
    cities: [
      "los-angeles",
      "san-francisco",
      "san-diego",
      "riverside",
      "sacramento",
      "san-jose",
      "fresno",
      "bakersfield",
      "stockton",
      "oxnard",
    ],
  },
  colorado: {
    name: "Colorado",
    cities: ["denver", "colorado-springs"],
  },
  connecticut: {
    name: "Connecticut",
    cities: ["hartford", "bridgeport", "new-haven"],
  },
  districtofcolumbia: {
    name: "District of Columbia",
    cities: ["washington"],
  },
  florida: {
    name: "Florida",
    cities: [
      "miami",
      "tampa",
      "orlando",
      "jacksonville",
      "north-port",
      "cape-coral",
      "lakeland",
      "deltona",
      "palm-bay",
    ],
  },
  georgia: {
    name: "Georgia",
    cities: ["atlanta", "augusta"],
  },
  hawaii: {
    name: "Hawaii",
    cities: ["urban-honolulu"],
  },
  idaho: {
    name: "Idaho",
    cities: ["boise-city"],
  },
  illinois: {
    name: "Illinois",
    cities: ["chicago"],
  },
  indiana: {
    name: "Indiana",
    cities: ["indianapolis"],
  },
  iowa: {
    name: "Iowa",
    cities: ["des-moines"],
  },
  kansas: {
    name: "Kansas",
    cities: ["wichita"],
  },
  kentucky: {
    name: "Kentucky",
    cities: ["louisville-jefferson-county"],
  },
  louisiana: {
    name: "Louisiana",
    cities: ["new-orleans", "baton-rouge"],
  },
  maryland: {
    name: "Maryland",
    cities: ["baltimore"],
  },
  massachusetts: {
    name: "Massachusetts",
    cities: ["boston", "worcester", "springfield"],
  },
  michigan: {
    name: "Michigan",
    cities: ["detroit", "grand-rapids"],
  },
  minnesota: {
    name: "Minnesota",
    cities: ["minneapolis"],
  },
  mississippi: {
    name: "Mississippi",
    cities: ["jackson"],
  },
  missouri: {
    name: "Missouri",
    cities: ["st-louis", "kansas-city"],
  },
  nebraska: {
    name: "Nebraska",
    cities: ["omaha"],
  },
  nevada: {
    name: "Nevada",
    cities: ["las-vegas"],
  },
  newmexico: {
    name: "New Mexico",
    cities: ["albuquerque"],
  },
  newyork: {
    name: "New York",
    cities: ["new-york", "buffalo", "rochester", "albany", "syracuse"],
  },
  northcarolina: {
    name: "North Carolina",
    cities: ["charlotte", "raleigh", "greensboro", "winston", "durham"],
  },
  ohio: {
    name: "Ohio",
    cities: [
      "cincinnati",
      "columbus",
      "cleveland",
      "dayton",
      "akron",
      "toledo",
    ],
  },
  oklahoma: {
    name: "Oklahoma",
    cities: ["oklahoma-city", "tulsa"],
  },
  oregon: {
    name: "Oregon",
    cities: ["portland"],
  },
  pennsylvania: {
    name: "Pennsylvania",
    cities: ["philadelphia", "pittsburgh", "allentown", "harrisburg"],
  },
  rhodeisland: {
    name: "Rhode Island",
    cities: ["providence"],
  },
  southcarolina: {
    name: "South Carolina",
    cities: ["greenville", "columbia", "charleston"],
  },
  tennessee: {
    name: "Tennessee",
    cities: ["nashville", "memphis", "knoxville", "chattanooga"],
  },
  texas: {
    name: "Texas",
    cities: [
      "dallas",
      "houston",
      "san-antonio",
      "austin",
      "mcallen",
      "el-paso",
    ],
  },
  utah: {
    name: "Utah",
    cities: ["salt-lake-city", "provo", "ogden"],
  },
  virginia: {
    name: "Virginia",
    cities: ["virginia-beach", "richmond"],
  },
  washington: {
    name: "Washington",
    cities: ["seattle", "spokane"],
  },
  wisconsin: {
    name: "Wisconsin",
    cities: ["milwaukee", "madison"],
  },
};

// Helper to get formatted state name
export function getStateName(slug) {
  return (
    stateCities[slug]?.name || slug.charAt(0).toUpperCase() + slug.slice(1)
  );
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

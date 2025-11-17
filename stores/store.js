import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    name: "",
    description: "",
    assetsBaseUrl: "/assets",
    iconsBaseUrl: "/assets/icons",
    articles: {
      apiUrl: "https://us-west-2.cdn.hygraph.com/content/ckwzg7tk528a001z4e7z0bqi0/master",
      domain: "protectCom",
      articleType: "article",
    },
    _stateValueMapCache: null, // Private cache
  }),

  actions: {
    getStateValueMap() {
      // Return cached version if available
      if (this._stateValueMapCache) {
        return this._stateValueMapCache;
      }

      // Build the state mapping dynamically
      const states = [
        {
          name: "Alabama",
          abbreviation: "AL",
          slug: "alabama",
        },
        {
          name: "Alaska",
          abbreviation: "AK",
          slug: "alaska",
        },
        {
          name: "Arizona",
          abbreviation: "AZ",
          slug: "arizona",
        },
        {
          name: "Arkansas",
          abbreviation: "AR",
          slug: "arkansas",
        },
        {
          name: "California",
          abbreviation: "CA",
          slug: "california",
        },
        {
          name: "Colorado",
          abbreviation: "CO",
          slug: "colorado",
        },
        {
          name: "Connecticut",
          abbreviation: "CT",
          slug: "connecticut",
        },
        {
          name: "Delaware",
          abbreviation: "DE",
          slug: "delaware",
        },
        {
          name: "Florida",
          abbreviation: "FL",
          slug: "florida",
        },
        {
          name: "Georgia",
          abbreviation: "GA",
          slug: "georgia",
        },
        {
          name: "Hawaii",
          abbreviation: "HI",
          slug: "hawaii",
        },
        {
          name: "Idaho",
          abbreviation: "ID",
          slug: "idaho",
        },
        {
          name: "Illinois",
          abbreviation: "IL",
          slug: "illinois",
        },
        {
          name: "Indiana",
          abbreviation: "IN",
          slug: "indiana",
        },
        {
          name: "Iowa",
          abbreviation: "IA",
          slug: "iowa",
        },
        {
          name: "Kansas",
          abbreviation: "KS",
          slug: "kansas",
        },
        {
          name: "Kentucky",
          abbreviation: "KY",
          slug: "kentucky",
        },
        {
          name: "Louisiana",
          abbreviation: "LA",
          slug: "louisiana",
        },
        {
          name: "Maine",
          abbreviation: "ME",
          slug: "maine",
        },
        {
          name: "Maryland",
          abbreviation: "MD",
          slug: "maryland",
        },
        {
          name: "Massachusetts",
          abbreviation: "MA",
          slug: "massachusetts",
        },
        {
          name: "Michigan",
          abbreviation: "MI",
          slug: "michigan",
        },
        {
          name: "Minnesota",
          abbreviation: "MN",
          slug: "minnesota",
        },
        {
          name: "Mississippi",
          abbreviation: "MS",
          slug: "mississippi",
        },
        {
          name: "Missouri",
          abbreviation: "MO",
          slug: "missouri",
        },
        {
          name: "Montana",
          abbreviation: "MT",
          slug: "montana",
        },
        {
          name: "Nebraska",
          abbreviation: "NE",
          slug: "nebraska",
        },
        {
          name: "Nevada",
          abbreviation: "NV",
          slug: "nevada",
        },
        {
          name: "New Hampshire",
          abbreviation: "NH",
          slug: "newhampshire",
        },
        {
          name: "New Jersey",
          abbreviation: "NJ",
          slug: "newjersey",
        },
        {
          name: "New Mexico",
          abbreviation: "NM",
          slug: "newmexico",
        },
        {
          name: "New York",
          abbreviation: "NY",
          slug: "newyork",
        },
        {
          name: "North Carolina",
          abbreviation: "NC",
          slug: "northcarolina",
        },
        {
          name: "North Dakota",
          abbreviation: "ND",
          slug: "northdakota",
        },
        {
          name: "Ohio",
          abbreviation: "OH",
          slug: "ohio",
        },
        {
          name: "Oklahoma",
          abbreviation: "OK",
          slug: "oklahoma",
        },
        {
          name: "Oregon",
          abbreviation: "OR",
          slug: "oregon",
        },
        {
          name: "Pennsylvania",
          abbreviation: "PA",
          slug: "pennsylvania",
        },
        {
          name: "Rhode Island",
          abbreviation: "RI",
          slug: "rhodeisland",
        },
        {
          name: "South Carolina",
          abbreviation: "SC",
          slug: "southcarolina",
        },
        {
          name: "South Dakota",
          abbreviation: "SD",
          slug: "southdakota",
        },
        {
          name: "Tennessee",
          abbreviation: "TN",
          slug: "tennessee",
        },
        {
          name: "Texas",
          abbreviation: "TX",
          slug: "texas",
        },
        {
          name: "Utah",
          abbreviation: "UT",
          slug: "utah",
        },
        {
          name: "Vermont",
          abbreviation: "VT",
          slug: "vermont",
        },
        {
          name: "Virginia",
          abbreviation: "VA",
          slug: "virginia",
        },
        {
          name: "Washington",
          abbreviation: "WA",
          slug: "washington",
        },
        {
          name: "West Virginia",
          abbreviation: "WV",
          slug: "westvirginia",
        },
        {
          name: "Wisconsin",
          abbreviation: "WI",
          slug: "wisconsin",
        },
        {
          name: "Wyoming",
          abbreviation: "WY",
          slug: "wyoming",
        },
      ];

      // Cache the result
      this._stateValueMapCache = states;
      return states;
    },
  },
});

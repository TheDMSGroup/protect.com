export async function useCityLinksApi({
  limit = 50,
  state,
  excludedCities = [],
} = {}) {
  console.log("🚀 useCityLinksApi called with limit:", limit, "state:", state);
  const cacheKey = `cities-top-${limit}${state ? `-${state}` : ""}`;
  console.log("🔑 Cache key:", cacheKey);

  const nuxtApp = useNuxtApp();

  const {
    data: cityListResult,
    error: cityLinksError,
    pending: cityLinksPending,
  } = await useAsyncData(
    cacheKey,
    async () => {
      const stateQueryStr = state ? `&state=${encodeURIComponent(state)}` : "";
      const url = `/api/state/city/list?limit=${limit}${stateQueryStr}`;
      console.log("🌐 Making API request:", url);
      const result = await $fetch(url);

      // If we have excluded cities, filter them out of the results before returning
      if (excludedCities.length > 0) {
        result.data = result.data.map((group) => ({
          ...group,
          cities: group.cities.filter(
            (city) => !excludedCities.includes(city.name.toLowerCase())
          ),
        }));
      }
      return result;
    },
    {
      server: true,
      lazy: false,
      //watch: [() => route.params.slug],
      getCachedData(key) {
        const cacheHit = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        if (cacheHit) {
          console.log("✅ Using cached data for key:", key, cacheHit);
        }
        return cacheHit;
      },
    }
  );

  return { cityListResult, cityLinksError, cityLinksPending };
}

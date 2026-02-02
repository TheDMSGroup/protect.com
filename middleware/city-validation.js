import { stateCities } from "@/data/cities.js";

export default defineNuxtRouteMiddleware((to) => {
  const stateParam = to.params.state;
  const cityParam = to.params.city;

  if (!stateParam || !cityParam) {
    return navigateTo("/car-insurance");
  }

  const stateData = stateCities[stateParam.toLowerCase()];

  if (!stateData) {
    return navigateTo("/car-insurance");
  }

  const cityExists = stateData.cities.includes(cityParam.toLowerCase());

  if (!cityExists) {
    return navigateTo(`/car-insurance/${stateParam}`);
  }
});

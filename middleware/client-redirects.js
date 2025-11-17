import { stateMapping, redirectRules } from "~/utils/redirect-contants";

export default defineNuxtRouteMiddleware((to) => {
  // Early return optimization
  if (!to.path.includes("car-insurance") && !to.path.startsWith("/insurance/") && to.path !== "/car-insurance/") {
    return;
  }

  // Handle car insurance state code redirects
  const pathParts = to.path.split("/");
  const pathStateCode = pathParts[2];
  if (to.path.includes("car-insurance") && pathStateCode) {
    const carInsuranceSubPath = pathStateCode.toUpperCase();

    //redirect 301 if state code is found -> state name
    //do nothing if state name is found
    //redirect 404 if invalid state code/slug
    if (carInsuranceSubPath.length === 2 && stateMapping[carInsuranceSubPath]) {
      const stateName = stateMapping[carInsuranceSubPath];
      const newPath = `/car-insurance/${stateName}`;
      return navigateTo(newPath, { redirectCode: 301 });
    }
    if (!Object.values(stateMapping).includes(carInsuranceSubPath.toLowerCase())) {
      console.log(`Invalid state code/slug in path: ${to.path}`);
      // Throw error for client-side 404 - this will render error.vue
      throw createError({
        statusCode: 404,
        statusMessage: "Page Not Found",
      });
    }
    return navigateTo(to.path); // No redirect needed for valid state name
  }

  for (const rule of redirectRules) {
    if (to.path === rule.from || to.path.startsWith(rule.from + "/")) {
      const newPath = to.path.replace(rule.from, rule.to);
      return navigateTo(newPath, { redirectCode: rule.code });
    }
  }
});

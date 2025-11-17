import { stateMapping, redirectRules } from "~/utils/redirect-contants";

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  const path = url.pathname;

  // Early return for non-relevant paths
  if (!path.includes("car-insurance") && !path.startsWith("/insurance/") && path !== "/car-insurance/") {
    return;
  }
  // Handle car insurance state code redirects
  const pathStateCode = path.split("/")[2];
  if (path.includes("car-insurance") && pathStateCode) {
    const pathParts = path.split("/");
    const carInsuranceSubPath = pathParts[pathParts.length - 1].toUpperCase();

    //redirect 301 if state code is found -> state name
    //do nothing if state name is found
    //redirect 404 if invalid state code/slug
    if (carInsuranceSubPath.length === 2 && stateMapping[carInsuranceSubPath]) {
      const stateName = stateMapping[carInsuranceSubPath];
      const newPath = `/car-insurance/${stateName}`;

      // Set SEO-friendly headers for state redirects
      setHeader(event, "Cache-Control", "public, max-age=86400"); // Cache for 24 hours
      setHeader(event, "X-Redirect-Reason", "state-code-to-name");
      setHeader(event, "X-Redirect-Type", "permanent");
      setHeader(event, "Vary", "User-Agent");

      await sendRedirect(event, newPath, 301);
      return;
    }
    if (!Object.values(stateMapping).includes(carInsuranceSubPath.toLowerCase())) {
      // Let Nuxt handle 404 by throwing an error - this will render error.vue
      console.log(`Invalid state code/slug in path: ${path}`);
      throw createError({
        statusCode: 404,
        statusMessage: "Page Not Found",
      });
    }
    return; // No redirect needed for valid state name
  }

  for (const rule of redirectRules) {
    if (path === rule.from || path.startsWith(rule.from + "/")) {
      const newPath = path.replace(rule.from, rule.to);

      // Set SEO-friendly headers for URL structure redirects
      setHeader(event, "Cache-Control", "public, max-age=86400"); // Cache for 24 hours
      setHeader(event, "X-Redirect-Reason", "url-structure-change");
      setHeader(event, "X-Redirect-Type", "permanent");
      setHeader(event, "Vary", "User-Agent");

      await sendRedirect(event, newPath, rule.code);
      return;
    }
  }
});

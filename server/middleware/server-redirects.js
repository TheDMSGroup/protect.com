import { stateMapping, redirectRules, getOfficialSlug } from "~/utils/redirect-contants";

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  const path = url.pathname;
  console.log(path);
  // Early return for non-relevant paths
  if (!path.startsWith("/insurance/") && !path.includes("car-insurance") && path !== "/car-insurance/") {
    return;
  }

  // Skip articles paths entirely
  if (path.startsWith("/articles/")) {
    return;
  }
  // Skip state validation for specific car-insurance sub-routes
  if (path.startsWith("/car-insurance/rate-calculator")) {
    return;
  }

  // Handle car insurance state code redirects
  const pathStateCode = path.split("/")[2];
  if (path.includes("car-insurance") && pathStateCode) {
    const pathParts = path.split("/");
    const carInsuranceSubPath = pathParts[pathParts.length - 1];

    //redirect 301 if state code is found -> state name
    //do nothing if state name is found (with correct format)
    //redirect 301 if state name without hyphens -> state name with hyphens
    //redirect 404 if invalid state code/slug

    // Check if it's a state code (2 chars) or USA (3 chars uppercase)
    const upperSubPath = carInsuranceSubPath.toUpperCase();
    const isStateCode = carInsuranceSubPath.length === 2 || carInsuranceSubPath === "USA";

    if (isStateCode && stateMapping[upperSubPath]) {
      const stateName = stateMapping[upperSubPath];
      const newPath = `/car-insurance/${stateName}`;

      // Set SEO-friendly headers for state redirects
      setHeader(event, "Cache-Control", "public, max-age=86400"); // Cache for 24 hours
      setHeader(event, "X-Redirect-Reason", "state-code-to-name");
      setHeader(event, "X-Redirect-Type", "permanent");
      setHeader(event, "Vary", "User-Agent");

      await sendRedirect(event, newPath, 301);
      return;
    }

    // Check if the slug is valid (with or without hyphens)
    const officialSlug = getOfficialSlug(carInsuranceSubPath);

    if (!officialSlug) {
      // Invalid state slug - throw 404
      console.log(`Invalid state code/slug in path: ${path}`);
      throw createError({
        statusCode: 404,
        statusMessage: "Page Not Found",
      });
    }

    // If slug has hyphens, redirect to non-hyphenated version
    if (carInsuranceSubPath.includes("-")) {
      const newPath = `/car-insurance/${officialSlug}`;

      setHeader(event, "Cache-Control", "public, max-age=86400");
      setHeader(event, "X-Redirect-Reason", "normalize-state-slug");
      setHeader(event, "X-Redirect-Type", "permanent");
      setHeader(event, "Vary", "User-Agent");

      await sendRedirect(event, newPath, 301);
      return;
    }

    // Valid state slug found (non-hyphenated) - allow it through
    return;
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

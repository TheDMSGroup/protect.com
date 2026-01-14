export default defineNuxtRouteMiddleware((to, from) => {
  if (!from || from.path === to.path) {
    return;
  }

  // Middleware logic to persist URL parameters
  if (Object.keys(from.query).length > 0) {
    const mergedQueryParams = { ...from.query, ...to.query };

    // Only navigate if the merged params are different from current params
    if (JSON.stringify(mergedQueryParams) !== JSON.stringify(to.query)) {
      return navigateTo({ path: to.path, query: mergedQueryParams }, { replace: true });
    }
  }
});

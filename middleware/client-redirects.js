import { processRedirect } from "~/utils/redirect-config";

export default defineNuxtRouteMiddleware((to) => {
  const result = processRedirect(to.path);

  if (!result) {
    return;
  }

  if (result.type === "redirect") {
    return navigateTo(result.path, { redirectCode: result.code });
  }

  if (result.type === "error") {
    throw createError({
      statusCode: result.code,
      statusMessage: result.message,
    });
  }
});

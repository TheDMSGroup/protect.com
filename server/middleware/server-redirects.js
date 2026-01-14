import { processRedirect } from "~/utils/redirect-config";

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  const path = url.pathname;

  const result = processRedirect(path);

  if (!result) {
    return;
  }

  if (result.type === "redirect") {
    // Set SEO-friendly headers for redirects
    setHeader(event, "Cache-Control", "public, max-age=86400");
    setHeader(event, "X-Redirect-Reason", result.reason || "redirect");
    setHeader(event, "X-Redirect-Type", result.code === 301 ? "permanent" : "temporary");
    setHeader(event, "Vary", "User-Agent");

    await sendRedirect(event, result.path, result.code);
    return;
  }

  if (result.type === "error") {
    throw createError({
      statusCode: result.code,
      statusMessage: result.message,
    });
  }
});

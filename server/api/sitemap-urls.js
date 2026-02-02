import { stateMapping } from "~/utils/redirect-config";
import { vehicles } from "~/data/vehicles";
import { stateCities } from "~/data/cities";

export default defineEventHandler(async () => {
  // Derive state slugs from unified redirect config (excluding USA)
  const stateSlugs = Object.entries(stateMapping)
    .filter(([code]) => code !== "USA")
    .map(([, slug]) => slug);

  // Generate vehicle URLs from vehicles config
  const vehicleUrls = [];
  vehicleUrls.push("/car-insurance/vehicles");
  for (const [makeSlug, makeData] of Object.entries(vehicles)) {
    vehicleUrls.push(`/car-insurance/vehicles/${makeSlug}`);
    for (const model of makeData.models) {
      vehicleUrls.push(`/car-insurance/vehicles/${makeSlug}/${model}`);
    }
  }

  const query = `query getAllArticles {
    articles(where: {domain: protectCom}){
      urlSlug
    }
  }`;

  try {
    console.log("About to fetch articles...");
    // Fetch articles
    const data = await fetch(
      "https://us-west-2.cdn.hygraph.com/content/ckwzg7tk528a001z4e7z0bqi0/master",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    );

    const dataJson = await data.json();
    const urlMap = [];

    // Add article URLs
    if (dataJson.data && dataJson.data.articles) {
      const articleUrls = dataJson.data.articles.map(
        (article) => `/article/${article.urlSlug}`
      );
      urlMap.push(...articleUrls);
    }

    // Add static routes
    urlMap.push("/articles");
    urlMap.push("/car-insurance/calculator");

    // Add state-specific car insurance pages
    const stateUrls = stateSlugs.map((slug) => `/car-insurance/${slug}`);
    urlMap.push(...stateUrls);

    // Add vehicle pages
    urlMap.push(...vehicleUrls);

    //add cities
    const cityUrls = [];
    for (const [stateKey, stateData] of Object.entries(stateCities)) {
      if (stateData && stateData.cities && stateData.cities.length > 0) {
        for (const citySlug of stateData.cities) {
          cityUrls.push(`/car-insurance/${stateKey}/${citySlug}`);
        }
      }
    }
    console.log("Generated city URLs:", cityUrls.length);
    urlMap.push(...cityUrls);

    // Add vertical pages
    ["car-insurance", "home-insurance", "health-insurance"].forEach(
      (insuranceType) => {
        urlMap.push(`/${insuranceType}`);
        urlMap.push(`/articles/${insuranceType}`);
      }
    );

    console.log("Total URLs generated:", urlMap.length);
    return urlMap;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return minimal sitemap on error
    const fallbackUrls = [
      "/articles",
      ...stateSlugs.map((slug) => `/car-insurance/${slug}`),
    ];
    console.log("Returning fallback URLs:", fallbackUrls.length);
    return fallbackUrls;
  }
});

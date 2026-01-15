export default defineEventHandler(async () => {
  // Define state data directly since we can't use Pinia store on server side
  const stateData = [
    { slug: "alabama", abbreviation: "AL" },
    { slug: "alaska", abbreviation: "AK" },
    { slug: "arizona", abbreviation: "AZ" },
    { slug: "arkansas", abbreviation: "AR" },
    { slug: "california", abbreviation: "CA" },
    { slug: "colorado", abbreviation: "CO" },
    { slug: "connecticut", abbreviation: "CT" },
    { slug: "delaware", abbreviation: "DE" },
    { slug: "florida", abbreviation: "FL" },
    { slug: "georgia", abbreviation: "GA" },
    { slug: "hawaii", abbreviation: "HI" },
    { slug: "idaho", abbreviation: "ID" },
    { slug: "illinois", abbreviation: "IL" },
    { slug: "indiana", abbreviation: "IN" },
    { slug: "iowa", abbreviation: "IA" },
    { slug: "kansas", abbreviation: "KS" },
    { slug: "kentucky", abbreviation: "KY" },
    { slug: "louisiana", abbreviation: "LA" },
    { slug: "maine", abbreviation: "ME" },
    { slug: "maryland", abbreviation: "MD" },
    { slug: "massachusetts", abbreviation: "MA" },
    { slug: "michigan", abbreviation: "MI" },
    { slug: "minnesota", abbreviation: "MN" },
    { slug: "mississippi", abbreviation: "MS" },
    { slug: "missouri", abbreviation: "MO" },
    { slug: "montana", abbreviation: "MT" },
    { slug: "nebraska", abbreviation: "NE" },
    { slug: "nevada", abbreviation: "NV" },
    { slug: "new-hampshire", abbreviation: "NH" },
    { slug: "new-jersey", abbreviation: "NJ" },
    { slug: "new-mexico", abbreviation: "NM" },
    { slug: "new-york", abbreviation: "NY" },
    { slug: "north-carolina", abbreviation: "NC" },
    { slug: "north-dakota", abbreviation: "ND" },
    { slug: "ohio", abbreviation: "OH" },
    { slug: "oklahoma", abbreviation: "OK" },
    { slug: "oregon", abbreviation: "OR" },
    { slug: "pennsylvania", abbreviation: "PA" },
    { slug: "rhode-island", abbreviation: "RI" },
    { slug: "south-carolina", abbreviation: "SC" },
    { slug: "south-dakota", abbreviation: "SD" },
    { slug: "tennessee", abbreviation: "TN" },
    { slug: "texas", abbreviation: "TX" },
    { slug: "utah", abbreviation: "UT" },
    { slug: "vermont", abbreviation: "VT" },
    { slug: "virginia", abbreviation: "VA" },
    { slug: "washington", abbreviation: "WA" },
    { slug: "west-virginia", abbreviation: "WV" },
    { slug: "wisconsin", abbreviation: "WI" },
    { slug: "wyoming", abbreviation: "WY" },
  ];

  const query = `query getAllArticles {
    articles(where: {domain: protectCom}){
      urlSlug
    }
  }`;

  try {
    // Fetch articles
    const data = await fetch("https://us-west-2.cdn.hygraph.com/content/ckwzg7tk528a001z4e7z0bqi0/master", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const dataJson = await data.json();
    const urlMap = [];

    // Add article URLs
    if (dataJson.data && dataJson.data.articles) {
      const articleUrls = dataJson.data.articles.map((article) => `/article/${article.urlSlug}`);
      urlMap.push(...articleUrls);
    }

    // Add static routes
    urlMap.push("/articles");
    urlMap.push("/car-insurance/calculator");
    urlMap.push("/car-insurance/discounts");
    urlMap.push("/car-insurance/discounts/bundle");

    // Add state-specific car insurance pages
    const stateUrls = stateData.map((state) => `/car-insurance/${state.slug}`);
    urlMap.push(...stateUrls);

    // Add vertical pages
    ["car-insurance", "home-insurance", "health-insurance"].forEach((insuranceType) => {
      urlMap.push(`/${insuranceType}`);
      urlMap.push(`/articles/${insuranceType}`);
    });

    return urlMap;
  } catch (error) {
    console.error("Error generating sitemap URLs:", error);
    // Return minimal sitemap on error
    const fallbackUrls = ["/articles", ...stateData.map((state) => `/car-insurance/${state.slug}`)];
    return fallbackUrls;
  }
});

export default defineEventHandler(async (event) => {
  const {
    vertical,
    subvertical,
    domain = '"protectCom"',
    articleType = "article",
  } = query;

  if (!domain) {
    throw createError({
      statusCode: 400,
      statusMessage: "Domain is required",
    });
  }

  const getRecentArticles = async () => {
    const graphqlQuery = `query GetRecentArticles {
  articles(
    stage: DRAFT
    where: {vertical: "${vertical}", subvertical: "${subvertical}", articleType: article, domain: ${domain}}
    first: 3
    orderBy: date_DESC
  ) {
    id
    urlSlug
    title
  }
}`;
    const options = {
      method: "POST",
      body: JSON.stringify({
        graphqlQuery,
      }),
    };
    try {
      const { data: recentArticles } = await $fetch(
        "https://us-west-2.cdn.hygraph.com/content/ckwzg7tk528a001z4e7z0bqi0/master",
        options
      );
      return recentArticles?.articles;
    } catch (err) {
      // Log server-side for debugging
      console.error("Error fetching articles from GraphQL:", err);
      // Re-throw a Nuxt-friendly error so the client receives a proper HTTP status
      throw createError({
        statusCode: err?.statusCode || 502,
        statusMessage: "Failed to fetch articles",
        data: { original: err?.message || String(err) },
      });
    }
  };

  const recentArticles = await getRecentArticles();
  return recentArticles;
});

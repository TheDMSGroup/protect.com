export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiUrl = config.graphqlApiUrl;

  // Get query parameters from the request
  const query = getQuery(event);
  const { vertical, subvertical, domain = '"protectCom"', articleType = "article" } = query;

  if (!domain) {
    throw createError({
      statusCode: 400,
      statusMessage: "Domain is required",
    });
  }
  console.log("Query params:", { vertical, subvertical, domain, articleType });

  const getArticlesFeed = async () => {
    // Build where clause conditionally
    let whereClause = `
      domain: $domain
      articleType: $articleType
    `;

    const variableDefinitions = [`$domain: Domain!`, `$articleType: ArticleTypes`];

    if (vertical && vertical !== "") {
      whereClause += `\n      vertical: $vertical`;
      variableDefinitions.push(`$vertical: String`);
    }

    if (subvertical && subvertical !== "") {
      whereClause += `\n      subvertical: $subvertical`;
      variableDefinitions.push(`$subvertical: String`);
    }

    // Define GraphQL query with conditional variables
    const graphqlQuery = `
      query GetArticlesFeed(${variableDefinitions.join(", ")}) {
        articles(where: { 
          ${whereClause}
        }) {
          ...ArticleFragment
        }
      }
      
      fragment ArticleFragment on Article {
        title
        excerpt
        urlSlug
        id
        vertical
        subvertical
        coverImage {
          url
        }
      }
    `;

    // Prepare variables object
    const variables = {
      domain: domain.replace(/['"]/g, ""), // Remove any quotes
      articleType: articleType,
    };

    // Only include vertical/subvertical if they have values
    if (vertical && vertical !== "") {
      variables.vertical = vertical;
    }

    if (subvertical && subvertical !== "") {
      variables.subvertical = `${subvertical}-insurance`;
    }

    console.log("GraphQL Query:", graphqlQuery);
    console.log("Variables:", variables);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: variables,
      }),
    };
    try {
      const { data: articlesFeed } = await $fetch(apiUrl, options);
      console.log("Fetched articles:", articlesFeed);
      return articlesFeed;
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

  const results = await getArticlesFeed();
  return results;
});

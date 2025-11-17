export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiUrl = config.graphqlApiUrl;

  const query = getQuery(event);
  const { urlSlug } = query;

  console.log("Fetching article with urlSlug:", urlSlug);

  const getSingleArticle = async () => {
    const graphqlQuery = `
      query GetArticleBySlugAndRelatedArticles($urlSlug: String!) {
        article(stage: DRAFT, where: { urlSlug: $urlSlug }) {
          ...ArticleDetailFragment
          relatedArticles {
            ...RelatedArticleFragment
          }
        }
      }
      
      fragment ArticleDetailFragment on Article {
    id
        urlSlug
        title
        secondaryImage {
          url
        }
        readTime
        publishedAt
        excerpt
        date
        metaKeywords
        vertical
        subvertical
        coverImage {
          url
        }
        content {
          html
        }
        contentTag {
          tagValue
        }
      }
      
      fragment RelatedArticleFragment on Article {
        id
        urlSlug
        title
        secondaryImage {
          url
        }
        readTime
        publishedAt
        excerpt
        date
        coverImage {
          url
        }
        content {
          html
        }
      }
    `;

    const variables = {
      urlSlug: urlSlug,
    };
    console.log(graphqlQuery);
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
      const { data: article } = await $fetch(apiUrl, options);
      return article;
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
  const singleArticleData = await getSingleArticle();
  console.log(singleArticleData);
  return singleArticleData;
});

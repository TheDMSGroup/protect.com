import { astToHtmlString } from "@graphcms/rich-text-html-renderer";

/**
 * Fetches an article by slug, transforms rich-text content to HTML, and returns
 * content metadata for rendering (including jump links).
 *
 * @param {import('h3').H3Event} event - Incoming Nitro/H3 request event.
 * @returns {Promise<object>} Article payload with parsed content.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiUrl = config.graphqlApiUrl;

  const query = getQuery(event);
  const { urlSlug } = query;

  console.log("Fetching article with urlSlug:", urlSlug);

  /**
   * Queries Hygraph for the primary article and related content, then enriches
   * the response with content HTML and heading link metadata.
   *
   * @returns {Promise<object>} Normalized article response object.
   */
  const getSingleArticle = async () => {
    const graphqlQuery = `
      query GetArticleBySlugAndRelatedArticles($urlSlug: String!) {
        article(stage: DRAFT, where: { urlSlug: $urlSlug }) {
          ...ArticleDetailFragment
          relatedArticles {
            ...RelatedArticleFragment
          }
        }
        recentArticles: articles(
          where: { urlSlug_not: $urlSlug, domain: protectCom }
          orderBy: publishedAt_DESC
          first: 4
        ) {
          ...RelatedArticleFragment
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
          raw
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
          raw
        }
      }
    `;

    const variables = {
      urlSlug: urlSlug,
    };
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

      const articleContent = article.article;

      if (!articleContent || !articleContent.content.raw) {
        return article;
      }

      /**
       * Creates a stateful ID generator that slugifies heading text and appends
       * numeric suffixes for duplicates.
       *
       * @returns {(text: string) => string} Unique heading ID generator.
       */
      const createUniqueHeadingIdGenerator = () => {
        const seenIds = new Map();

        /**
         * Generates a unique, URL-friendly heading ID.
         *
         * @param {string} text - Heading text content.
         * @returns {string} Stable unique ID for anchor linking.
         */
        return (text) => {
          const baseId = String(text || "")
            .replace(/[^a-zA-Z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
            .toLowerCase() || "section";

          const currentCount = seenIds.get(baseId) || 0;
          seenIds.set(baseId, currentCount + 1);

          return currentCount === 0 ? baseId : `${baseId}-${currentCount + 1}`;
        };
      };

      const getHeadingIdForToc = createUniqueHeadingIdGenerator();
      const getHeadingIdForRender = createUniqueHeadingIdGenerator();

      /**
       * Recursively extracts plain text from a rich-text AST node.
       *
       * @param {object|null|undefined} node - Rich-text AST node.
       * @returns {string} Concatenated plain-text content.
       */
      const extractPlainText = (node) => {
        if (!node) return "";
        if (typeof node.text === "string") return node.text;
        if (Array.isArray(node.children)) {
          return node.children.map((child) => extractPlainText(child)).join("");
        }
        return "";
      };

      /**
       * Removes HTML tags from a string for text-based ID generation.
       *
       * @param {string} [value=""] - HTML string value.
       * @returns {string} Trimmed plain text.
       */
      const stripHtmlTags = (value = "") => String(value).replace(/<[^>]*>/g, "").trim();

      /**
       * Extracts heading metadata from rich-text nodes for jump-link rendering.
       * Includes native heading nodes and single-bold-paragraph pseudo headings.
       *
       * @param {Array<object>} nodes - Root rich-text child nodes.
       * @returns {Array<{text: string, id: string, level: number}>} Heading links.
       */
      const extractHeadings = (nodes) => {
        const headingsList = [];
        const levelMap = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };

        /**
         * Converts a heading AST node to a normalized heading metadata object.
         *
         * @param {object} headingNode - Rich-text heading node.
         * @returns {{text: string, id: string, level: number}} Heading metadata.
         */
        const generateHeading = (headingNode) => {
          const nodeType = headingNode?.type || "heading-two";
          const level = nodeType.split("-")[1];
          const headingLevel = levelMap[level] || 2;
          const text = extractPlainText(headingNode).trim();
          const id = getHeadingIdForToc(text);

          return { text, id, level: headingLevel };
        };
        nodes.forEach((node) => {
          const children = Array.isArray(node?.children) ? node.children : [];
          if (node?.type?.startsWith("heading-") || (children.length === 1 && children[0].bold && (children[0].text || "").length > 0)) {
            headingsList.push(generateHeading(node));
          }
        });

        return headingsList;
      };

      // Always extract headings for table of contents
      const contentLinks = extractHeadings(articleContent.content.raw.children || []);
      articleContent.contentLinks = contentLinks;

      /**
       * Renders a heading element with an auto-generated anchor ID.
       *
       * @param {string} tagName - HTML heading tag name (`h1`...`h6`).
       * @param {string} children - Inner HTML content.
       * @returns {string} Heading HTML string with `id` attribute.
       */
      const headingRenderer = (tagName, children) => {
        const text = stripHtmlTags(children);
        const id = getHeadingIdForRender(text);
        return `<${tagName} id="${id}">${children}</${tagName}>`;
      };

      const parsedHtml = astToHtmlString({
        content: articleContent.content.raw,
        references: articleContent.content.references || [],
        renderers: {
          h1: ({ children }) => headingRenderer("h1", children),
          h2: ({ children }) => headingRenderer("h2", children),
          h3: ({ children }) => headingRenderer("h3", children),
          h4: ({ children }) => headingRenderer("h4", children),
          h5: ({ children }) => headingRenderer("h5", children),
          h6: ({ children }) => headingRenderer("h6", children),
          p: ({ children }) => {
            const boldOnlyMatch = String(children || "").match(/^\s*<(strong|b)>([\s\S]*?)<\/\1>\s*$/i);
            if (!boldOnlyMatch) {
              return `<p>${children}</p>`;
            }

            const text = stripHtmlTags(boldOnlyMatch[2]);
            if (!text) {
              return `<p>${children}</p>`;
            }

            const id = getHeadingIdForRender(text);
            return `<p id="${id}">${children}</p>`;
          },
        },
      });

      articleContent.contentHtml = parsedHtml;
      articleContent.contentParts = parsedHtml
        ? [
            {
              type: "text",
              content: parsedHtml,
              tag: "rich-text",
            },
          ]
        : [];
      articleContent.componentNames = [];

      return {
        response: article,
        contentParts: articleContent.contentParts,
        componentNames: articleContent.componentNames,
        contentLinks: articleContent.contentLinks,
        recentArticles: article.recentArticles || [],
      };
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
  //console.log(singleArticleData);
  return singleArticleData;
});

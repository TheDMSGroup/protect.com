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

      const componentRegex = /!!component_(\w+)!!/;

      // Helper function to extract headings from AST (always runs)
      const extractHeadings = (nodes) => {
        const headingsList = [];
        const levelMap = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
        console.log("Nodes for heading extraction:", nodes);

        const generateHeading = (headingNode) => {
          const level = headingNode.type.split("-")[1];
          const headingLevel = levelMap[level] || 2;
          const text = headingNode.children?.map((c) => c.text || "").join("");
          const id = text.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();

          return { text, id, level: headingLevel };
        };
        nodes.forEach((node) => {
          console.log("Extracting heading from node:", node);
          if (node.type.startsWith("heading-") || (node.children.length === 1 && node.children[0].bold && node.children[0].text.length > 0)) {
            headingsList.push(generateHeading(node));
          }
        });

        return headingsList;
      };

      // Always extract headings for table of contents
      const contentLinks = extractHeadings(articleContent.content.raw.children);
      articleContent.contentLinks = contentLinks;

      // Always build contentParts from AST
      const contentParts = [];
      const componentNames = [];

      // Helper function to render text with formatting
      const renderTextNode = (textNode) => {
        let text = textNode.text || "";

        if (textNode.bold) {
          text = `<strong>${text}</strong>`;
        }
        if (textNode.italic) {
          text = `<em>${text}</em>`;
        }
        if (textNode.underline) {
          text = `<u>${text}</u>`;
        }
        if (textNode.code) {
          text = `<code>${text}</code>`;
        }

        return text;
      };

      // Helper function to render children nodes
      const renderChildren = (children) => {
        if (!children || !Array.isArray(children)) return "";

        return children
          .map((child) => {
            if (child.type === "link") {
              const linkText = renderChildren(child.children);
              const target = child.openInNewTab ? ' target="_blank" rel="noopener noreferrer"' : "";
              const title = child.title ? ` title="${child.title}"` : "";
              return `<a href="${child.href}"${target}${title}>${linkText}</a>`;
            } else if (child.type === "text") {
              return renderTextNode(child);
            } else if (child.text !== undefined) {
              return renderTextNode(child);
            }
            return "";
          })
          .join("");
      };

      // Helper function to render a full node
      const renderNode = (node) => {
        if (!node.type) return "";

        // Handle headings
        if (node.type.startsWith("heading-")) {
          const level = node.type.split("-")[1];
          const levelMap = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
          const headingLevel = levelMap[level] || 2;
          const content = renderChildren(node.children);
          const text = node.children?.map((c) => c.text || "").join("");
          const id = text.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();

          // Return heading node with id for scrolling
          return {
            type: "heading",
            level: headingLevel,
            id,
            content,
            html: `<h${headingLevel} id="${id}">${content}</h${headingLevel}>`,
          };
        }

        // Handle paragraphs
        if (node.type === "paragraph") {
          const content = renderChildren(node.children);

          // Check if this paragraph is being used as a heading (single bold child)
          if (node.children?.length === 1 && node.children[0].bold && node.children[0].text && node.children[0].text.length > 0) {
            const text = node.children[0].text;
            const id = text.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();

            // Return as a pseudo-heading with ID
            return {
              type: "heading",
              level: 3, // Treat bold paragraphs as h3
              id,
              content,
              html: `<p id="${id}"><strong>${text}</strong></p>`,
            };
          }

          return `<p>${content}</p>`;
        }

        // Handle lists
        if (node.type === "bulleted-list" || node.type === "numbered-list") {
          const tag = node.type === "numbered-list" ? "ol" : "ul";
          const items = node.children
            ?.map((child) => {
              if (child.type === "list-item" || child.type === "list-item-child") {
                return `<li>${renderChildren(child.children)}</li>`;
              }
              return "";
            })
            .join("");
          return `<${tag}>${items}</${tag}>`;
        }

        // Handle blockquotes
        if (node.type === "block-quote") {
          return `<blockquote>${renderChildren(node.children)}</blockquote>`;
        }

        // Handle code blocks
        if (node.type === "code-block") {
          const code = node.children?.map((c) => c.text || "").join("\n");
          return `<pre><code>${code}</code></pre>`;
        }

        // Handle images
        if (node.type === "image") {
          const alt = node.title || "";
          const width = node.width ? ` width="${node.width}"` : "";
          const height = node.height ? ` height="${node.height}"` : "";
          return `<img src="${node.src}" alt="${alt}"${width}${height} />`;
        }

        // Handle tables
        if (node.type === "table") {
          const rows = node.children
            ?.map((row) => {
              if (row.type === "table_row") {
                const cells = row.children
                  ?.map((cell) => {
                    const tag = cell.type === "table_head" ? "th" : "td";
                    return `<${tag}>${renderChildren(cell.children)}</${tag}>`;
                  })
                  .join("");
                return `<tr>${cells}</tr>`;
              }
              return "";
            })
            .join("");
          return `<table>${rows}</table>`;
        }

        return "";
      };

      // Process all nodes
      articleContent.content.raw.children.forEach((node) => {
        const result = renderNode(node);

        // Handle heading nodes with IDs
        if (result && typeof result === "object" && result.type === "heading") {
          contentParts.push({
            type: "text",
            content: result.html,
            tag: node.type,
            id: result.id,
            isHeading: true,
          });
          return;
        }

        const html = result || "";

        // Check if it's a component marker
        const componentMatch = html.match(componentRegex);
        if (componentMatch) {
          const componentName = componentMatch[1];
          componentNames.push(componentName);
          contentParts.push({
            type: "component",
            name: componentName,
          });
        } else if (html) {
          contentParts.push({
            type: "text",
            content: html,
            tag: node.type,
          });
        }
      });

      // Add processed data to article
      articleContent.contentParts = contentParts;
      articleContent.componentNames = [...new Set(componentNames)];

      return {
        response: article,
        contentParts: articleContent.contentParts,
        componentNames: articleContent.componentNames,
        contentLinks: articleContent.contentLinks,
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

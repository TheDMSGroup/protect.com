export default defineEventHandler(async (event) => {
  const { videoId } = getQuery(event);

  try {
    const data = await $fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    return {
      title: data.title,
      videoId,
    };
  } catch (err) {
    throw createError({
      statusCode: err.response?.status || 500,
      statusMessage: `Failed to fetch YouTube video title: ${err.message}`,
    });
  }
});

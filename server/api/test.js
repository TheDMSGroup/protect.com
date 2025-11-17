export default defineEventHandler(async (event) => {
  console.log("TEST API ENDPOINT CALLED");
  return {
    message: "Test endpoint working",
    timestamp: new Date().toISOString(),
  };
});

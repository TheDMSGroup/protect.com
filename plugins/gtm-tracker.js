export default defineNuxtPlugin(() => {
  const router = useRouter();
  const { proxy } = useScriptGoogleTagManager();

  // Initial page view tracking
  // proxy.dataLayer.push({
  //   event: "page_view",
  //   page_path: router.currentRoute.value.fullPath,
  // });
  // console.log("GA Event Sent:", proxy.dataLayer);

  // Track subsequent route changes
  router.afterEach((to) => {
    proxy.dataLayer.push({
      event: "page_view",
      page_path: to.fullPath,
    });
    console.log("GA Event Sent:", proxy.dataLayer);
  });
});

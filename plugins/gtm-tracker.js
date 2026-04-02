import { GTM_DEFAULT_ID } from "~/composables/useGtm";

export default defineNuxtPlugin(() => {
  const router = useRouter();
  const route = useRoute();

  if (route.meta.gtm === false) return;

  const id = typeof route.meta.gtm === "string" ? route.meta.gtm : GTM_DEFAULT_ID;
  const { proxy } = useScriptGoogleTagManager({ id });

  router.afterEach((to) => {
    if (to.meta.gtm === false) return;
    proxy.dataLayer.push({
      event: "page_view",
      page_path: to.fullPath,
    });
  });
});

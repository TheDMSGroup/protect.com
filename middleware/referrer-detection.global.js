import { useStore } from "~/stores/store";
import { getUeidByReferrer, REFERRER_MST } from "~/utils/referrer-detection";

export default defineNuxtRouteMiddleware((to) => {
  const store = useStore();
  const visitorInfoFromStore = store.visitorInfo;

  //exit early if we already have ueid and mst
  if (visitorInfoFromStore.ueid && visitorInfoFromStore.mst) {
    return;
  }
  const ueidCookie = useCookie("ueid", { maxAge: 60 * 60 }); // 1 hour
  const mstCookie = useCookie("mst", { maxAge: 60 * 60 });

  const ueidParam = to.query.ueid;
  if (ueidParam) {
    ueidCookie.value = ueidParam;
    store.setVisitorInfo({ ueid: ueidParam });
    return;
  }

  if (ueidCookie.value) {
    store.setVisitorInfo({
      ueid: ueidCookie.value,
      mst: mstCookie.value || null,
    });
    return;
  }

  const referrerParam = to.query.referrer;
  let referrer = referrerParam;

  if (!referrer) {
    const headers = useRequestHeaders(["referer"]);
    referrer = headers.referer;
  }

  if (referrer) {
    const ueid = getUeidByReferrer(referrer);
    if (ueid) {
      ueidCookie.value = ueid;
      mstCookie.value = REFERRER_MST;
      store.setVisitorInfo({ ueid, mst: REFERRER_MST });
    }
  }
});

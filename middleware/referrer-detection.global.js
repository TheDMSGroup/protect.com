import { useStore } from "~/stores/store";
import { getUeidByReferrer, REFERRER_MST } from "~/utils/referrer-detection";

// All tracking params we want to persist
const TRACKING_PARAMS = [
  'gclid', 'msclkid', 'fbc', 'fbp', 'fbclid', 'clickid', 'rtclid',
  'campaignid', 'ueid', 'variant', 'referrer', 'adgroupid', 'accountid',
  'targetid', 'gbraid', 'wbraid', 'segment',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'
];

export default defineNuxtRouteMiddleware((to) => {
  const store = useStore();
  const visitorInfoFromStore = store.visitorInfo;

  // Create cookies for all tracking params
  const cookies = {};
  TRACKING_PARAMS.forEach(param => {
    cookies[param] = useCookie(param, { maxAge: 60 * 60 }); // 1 hour
  });
  const mstCookie = useCookie("mst", { maxAge: 60 * 60 });

  // Facebook sets these cookies automatically
  const fbcCookie = useCookie("_fbc");
  const fbpCookie = useCookie("_fbp");

  // Check if we have any new params in the URL
  const visitorInfo = {};
  let hasNewParams = false;

  TRACKING_PARAMS.forEach(param => {
    const paramValue = to.query[param];
    if (paramValue) {
      cookies[param].value = paramValue;
      visitorInfo[param] = paramValue;
      hasNewParams = true;
    } else if (cookies[param].value && !visitorInfoFromStore[param]) {
      // Restore from cookie if not in store
      visitorInfo[param] = cookies[param].value;
      hasNewParams = true;
    }
  });

  // Fallback to Facebook's _fbc and _fbp cookies if not set
  if (!visitorInfo.fbc && !visitorInfoFromStore.fbc && fbcCookie.value) {
    visitorInfo.fbc = fbcCookie.value;
    hasNewParams = true;
  }
  if (!visitorInfo.fbp && !visitorInfoFromStore.fbp && fbpCookie.value) {
    visitorInfo.fbp = fbpCookie.value;
    hasNewParams = true;
  }

  // Handle mst param
  const mstParam = to.query.mst;
  if (mstParam) {
    mstCookie.value = mstParam;
    visitorInfo.mst = mstParam;
    hasNewParams = true;
  } else if (mstCookie.value && !visitorInfoFromStore.mst) {
    visitorInfo.mst = mstCookie.value;
    hasNewParams = true;
  }

  if (hasNewParams) {
    store.setVisitorInfo(visitorInfo);
    return;
  }

  // Fallback: detect referrer if no ueid
  if (!visitorInfoFromStore.ueid && !cookies.ueid.value) {
    const referrerParam = to.query.referrer;
    let referrer = referrerParam;

    if (!referrer) {
      const headers = useRequestHeaders(["referer"]);
      referrer = headers.referer;
    }

    if (referrer) {
      const ueid = getUeidByReferrer(referrer);
      if (ueid) {
        cookies.ueid.value = ueid;
        mstCookie.value = REFERRER_MST;
        store.setVisitorInfo({ ueid, mst: REFERRER_MST });
      }
    }
  }
});

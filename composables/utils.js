import { useStore } from "../stores/store";

export const preprocessTextForLinks = (fullText, linkData, className = "") => {
  if (!fullText) return "";
  if (!linkData || !Array.isArray(linkData) || linkData.length === 0) {
    return fullText;
  }
  let processedFullText = fullText;
  linkData.forEach((linkObj) => {
    let link;
    if (linkObj.text && linkObj.destination) {
      if (["mailto:", "tel:"].some((prefix) => linkObj.destination.startsWith(prefix))) {
        link = `<a href="${linkObj.destination}"${className ? ` class="${className}"` : ""}>${linkObj.text}</a>`;
      } else {
        link = `<a href="${linkObj.destination}"${className ? ` class="${className}"` : ""}>${linkObj.text}</a>`;
      }
      // Use replace with regex g flag instead of replaceAll for better compatibility
      processedFullText = processedFullText.replace(new RegExp(linkObj.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), link);
    }
  });
  return processedFullText;
};


// All tracking params to persist in redirect URLs
const TRACKING_PARAMS = [
  'gclid', 'msclkid', 'fbc', 'fbp', 'fbclid', 'clickid', 'rtclid',
  'campaignid', 'ueid', 'variant', 'referrer', 'adgroupid', 'accountid',
  'targetid', 'gbraid', 'wbraid', 'segment', 'mst',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'
];

export const generateRedirectUrl = (route, paramsToAppend) => {
  const store = useStore();

  // Append all tracking params from store if not already in paramsToAppend
  TRACKING_PARAMS.forEach(param => {
    if (store.visitorInfo?.[param] && !paramsToAppend[param]) {
      paramsToAppend[param] = store.visitorInfo[param];
    }
  });

  // Special fallback for rtclid - check multiple sources if not in store
  if (!paramsToAppend.rtclid && typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const cookieMatch = document.cookie.match(/(?:^|; )rtkclickid-store=([^;]*)/);
    const rtclid = urlParams.get('rtkclid') ||
                   sessionStorage.getItem('rtkclickid') ||
                   (cookieMatch ? decodeURIComponent(cookieMatch[1]) : null) ||
                   window.rtkClickID ||
                   window.rtCookie ||
                   null;
    if (rtclid) {
      paramsToAppend.rtclid = rtclid;
    }
  }

  //append any params we need to the current URL params - vue router is persisting params across navigations
  const params = new URLSearchParams(window.location.search);
  Object.entries(paramsToAppend).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      params.set(key, value);
    }
  });

  let url;
  const communicationProtocols = ["mailto:", "tel:"];
  // if we do not have a relative route, ensure we have a protocol
  if (!communicationProtocols.some((protocol) => route.includes(`${protocol}`))) {
    // if the route already has a protocol, use it as is
    if (route.includes("://")) {
      url = route;
    } else {
      // use browser default protocol (usually https)
      url = `//${route}`;
    }
  } else {
    // relative route
    url = route;
  }

  // Append params to the URL
  const queryString = params.toString();
  if (queryString) {
    const separator = url.includes("?") ? "&" : "?";
    url = `${url}${separator}${queryString}`;
  }

  // append params if we have any and return
  return url;
};

// ueidUrls: optional map of ueid values to URLs, e.g. { 'abc123': 'https://other.com' }
export const redirectWithParams = (route, { ...paramsToAppend }, ueidUrls = {}) => {
  const store = useStore();
  const ueid = store.visitorInfo?.ueid;
  const resolvedRoute = (ueid && ueidUrls[ueid]) ? ueidUrls[ueid] : route;

  window.open(generateRedirectUrl(resolvedRoute, paramsToAppend), "_blank");
};

export const updateMetaData = (tags = {}) => {
  Object.entries(tags).forEach(([tag, content]) => {
    const existingTag = document.querySelector(`meta[property="${tag}"]`);
    if (existingTag) {
      console.log(tag, "exists", content);
      existingTag.setAttribute("content", content);
    } else {
      const newTag = document.createElement("meta");
      newTag.setAttribute("property", tag);
      newTag.setAttribute("content", content);
      document.head.appendChild(newTag);
    }
  });
};

export const handleRoute = (route, router) => {
  // SEO updates require external links, need to check for them
  if (!route.startsWith("/")) {
    // Ensure the URL has a protocol, otherwise vue-router takes over
    const url = route.startsWith("http") ? route : `https://${route}`;
    window.location.href = url;
  } else {
    router.push(route);
  }
};

export const returnStateSlug = (stateName) => {
  if (!stateName || typeof stateName !== "string") return "";
  return stateName.toLowerCase().replace(/\s/g, "");
};

const utilsComposable = {
  methods: {
    preprocessTextForLinks,
    redirectWithParams,
    handleRoute,
    returnStateSlug,
  },
};

export default utilsComposable;

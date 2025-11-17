export const preprocessTextForLinks = (fullText, linkData) => {
  if (!fullText) return '';
  if (!linkData || !Array.isArray(linkData) || linkData.length === 0) {
    return fullText;
  }
  let processedFullText = fullText;
  linkData.forEach((linkObj) => {
    let link;
    if (linkObj.text && linkObj.destination) {
      if (['mailto:', 'tel:'].some((prefix) => linkObj.destination.startsWith(prefix))) {
        link = `<a href="${linkObj.destination}">${linkObj.text}</a>`;
      } else {
        link = `<a href="${linkObj.destination}">
                  ${linkObj.text}
                </a>`;
      }
      processedFullText = processedFullText.replaceAll(linkObj.text, link);
    }
  });
  return processedFullText;
};
export const generateRedirectUrl = (route, paramsToAppend) => {
  const params = new URLSearchParams(window.location.search);
  Object.keys(paramsToAppend).forEach((key) => {
    if (paramsToAppend[key] !== undefined && paramsToAppend[key] !== null) {
      params.set(key, paramsToAppend[key]);
    }
  });
  const paramsString = params.toString();
  let url;
  const communicationProtocols = ['mailto:', 'tel:'];
  // if we do not have a relative route, ensure we have a protocol
  if (!route.startsWith('/') && !communicationProtocols.some((protocol) => route.includes(`${protocol}`))) {
    // if the route already has a protocol, use it as is
    if (route.includes('://')) {
      url = route;
    } else {
      // use browser default protocol (usually https)
      url = `//${route}`;
    }
  } else {
    // relative route
    url = route;
  }
  // append params if we have any and return
  return `${url}${paramsString.length > 0 ? '?' : ''}${paramsString}`;
};
export const redirectWithParams = (route, { ...paramsToAppend }, router = null) => {
  const fullUrl = generateRedirectUrl(route, paramsToAppend);
  if (!route.startsWith('/')) {
    window.open(fullUrl, '_blank');
  } else {
    if (!router) {
      return;
    }
    router.push(fullUrl);
  }
};
export const updateMetaData = (tags = {}) => {
  Object.entries(tags).forEach(([tag, content]) => {
    const existingTag = document.querySelector(`meta[property="${tag}"]`);
    if (existingTag) {
      console.log(tag, 'exists', content);
      existingTag.setAttribute('content', content);
    } else {
      const newTag = document.createElement('meta');
      newTag.setAttribute('property', tag);
      newTag.setAttribute('content', content);
      document.head.appendChild(newTag);
    }
  });
};
export const handleRoute = (route, router) => {
  // SEO updates require external links, need to check for them
  if (!route.startsWith('/')) {
    // Ensure the URL has a protocol, otherwise vue-router takes over
    const url = route.startsWith('http') ? route : `https://${route}`;
    window.location.href = url;
  } else {
    router.push(route);
  }
};
export const returnStateSlug = (stateName) => {
  if (!stateName || typeof stateName !== 'string') return '';
  return stateName.toLowerCase().replace(/\s/g, '');
};
const utilsMixin = {
  methods: {
    preprocessTextForLinks,
    redirectWithParams,
    handleRoute,
    returnStateSlug,
  },
};

export default utilsMixin;

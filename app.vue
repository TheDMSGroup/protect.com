<script setup>
import { useStore } from "~/stores/store";

const store = useStore();

useHead({
  script: [
    {
      src: '/lib/geoip2.js',
      id: 'geoip2',
      async: true
    }
  ]
});

// Traffic source detection
const ORGANIC_DOMAINS = new Set([
  'aol',
  'bing',
  'baidu',
  'lycos',
  'cnn',
  'dogster',
  'duckduckgo',
  'google',
  'google-play',
  'msn.com',
  'yahoo',
]);

const LLM_DOMAINS_REGEX = /^.*ai|.*\.openai.*|.*copilot.*|.*chatgpt.*|.*gemini.*|.*gpt.*|.*neeva.*|.*writesonic.*|.*nimble.*|.*outrider.*|.*perplexity.*|.*google.*bard.*|.*bard.*google.*|.*bard.*|.*edgeservices.*|.*astastic.*|.*copy\.ai.*|.*bnngpt.*|.*gemini.*google.*$/;

function normalizeUrl(url) {
  return url
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .split(':')[0]
    .trim();
}

function getTrafficSource(referrer, urlParams = null) {
  // Check UTM params first
  if (urlParams) {
    const utmSource = urlParams.get('utm_source')?.toLowerCase();
    const utmMedium = urlParams.get('utm_medium')?.toLowerCase();

    // Social via UTM
    if (utmMedium === 'social' || ['facebook', 'twitter', 'instagram', 'linkedin', 'tiktok', 'pinterest', 'snapchat'].includes(utmSource)) {
      return 'dpbosoc_auto';
    }

    // Organic search via UTM
    if (utmMedium === 'organic') {
      return 'dpbosrc_auto';
    }
  }

  // Fall back to referrer domain matching
  if (!referrer) return null;

  const normalizedReferrer = normalizeUrl(referrer);
  const matchesDomain = (domain) => normalizedReferrer.includes(domain);

  if ([...ORGANIC_DOMAINS].some(matchesDomain)) {
    return 'dpbosrc_auto';
  }

  if (LLM_DOMAINS_REGEX.test(normalizedReferrer)) {
    return 'dpboai_auto';
  }

  return null;
}

// Run on client side only
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const trafficSource = getTrafficSource(document.referrer, urlParams);
  if (trafficSource) {
    store.setVisitorInfo({ ueid: trafficSource });
  }
});
</script>
<template>
  <div id="protectApp">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

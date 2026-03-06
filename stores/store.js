import { defineStore } from "pinia";
import { states } from "~/utils/redirect-config";

export const useStore = defineStore("store", {
  state: () => ({
    name: "",
    description: "",
    assetsBaseUrl: "/assets",
    iconsBaseUrl: "/assets/icons",
    mastodonApiKey: "d030e397-ca37-4e72-8609-05dee60b7efc",
    articles: {
      apiUrl:
        "https://us-west-2.cdn.hygraph.com/content/ckwzg7tk528a001z4e7z0bqi0/master",
      domain: "protectCom",
      articleType: "article",
      categories: [
        {
          name: "Car Insurance",
          value: "car-insurance",
        },
        {
          name: "Health Insurance",
          value: "health-insurance",
        },
        {
          name: "Home Insurance",
          value: "home-insurance",
        },
        {
          name: "Medicare",
          value: "medicare",
        },
      ],
    },
    visitorInfo: {
      zip: "",
      city: "",
      region: "",
      ueid: null,
      mst: null,
      // Tracking params
      gclid: null,
      msclkid: null,
      fbc: null,
      fbp: null,
      fbclid: null,
      clickid: null,
      rtclid: null,
      campaignid: null,
      variant: null,
      referrer: null,
      adgroupid: null,
      accountid: null,
      targetid: null,
      gbraid: null,
      wbraid: null,
      segment: null,
      // UTM params
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_content: null,
      utm_term: null,
    },
  }),

  actions: {
    setVisitorInfo(info) {
      this.visitorInfo = { ...this.visitorInfo, ...info };
    },

    getStateValueMap() {
      return states;
    },
  },
});

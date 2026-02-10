<script setup>
  import { useStore } from "~/stores/store";

  const store = useStore();

  const cityLinksLimit = 50;

  //inline composable to fetch article with caching
  async function useCityLinksFromCacheOrApi() {
    const cacheKey = `cities-top-${cityLinksLimit}`;
    console.log("🔑 Cache key:", cacheKey);

    const nuxtApp = useNuxtApp();

    const {
      data: cityListResult,
      error,
      pending,
    } = await useAsyncData(
      cacheKey,
      async () => {
        const url = `/api/city/list?limit=${cityLinksLimit}`;
        console.log("🌐 Making API request:", url);
        const result = await $fetch(url);
        return result;
      },
      {
        server: true,
        lazy: false,
        //watch: [() => route.params.slug],
        getCachedData(key) {
          const cacheHit =
            nuxtApp.payload.data[key] || nuxtApp.static.data[key];
          if (cacheHit) {
            console.log("✅ Using cached data for key:", key, cacheHit);
          }
          return cacheHit;
        },
      }
    );

    return { cityListResult, error, pending };
  }

  useSeoMeta({
    title: () => "Compare Auto Insurance Rates & Get Side-by-Side Quotes",
    description: () =>
      " Get free car insurance quotes from the top companies and compare side-by-side to find the best deals. Start saving on your monthly payment with Protect.com.",
    ogTitle: () => "Compare Auto Insurance Rates & Get Side-by-Side Quotes",
    ogDescription: () =>
      " Get free car insurance quotes from the top companies and compare side-by-side to find the best deals. Start saving on your monthly payment with Protect.com.",
    ogImage: () => "https://stage.protect.com/img/protect-share.dabdad17.jpg",
    ogType: "article",
    twitterCard: "summary_large_image",
    twitterTitle: () =>
      "Compare Auto Insurance Rates & Get Side-by-Side Quotes",
    twitterDescription: () =>
      " Get free car insurance quotes from the top companies and compare side-by-side to find the best deals. Start saving on your monthly payment with Protect.com.",
    twitterImage: () =>
      "https://stage.protect.com/img/protect-share.dabdad17.jpg",
  });
  import { buildImageUrl } from "@/composables/images.js";

  const action = computed(() => {
    let surveyUrl = "https://insure.protect.com/";
    if (store.visitorInfo?.ueid) {
      surveyUrl = surveyUrl + "?ueid=" + store.visitorInfo.ueid;
    }
    return surveyUrl;
  });

  const config = {
    carriers: [
      {
        carrierName: "Progressive",
        amBestRating: "A+",
        jdPowerRating: "3/5",
        bbbScore: "A+",
        naicScore: "1.33",
      },
      {
        carrierName: "Allstate",
        amBestRating: "A+",
        jdPowerRating: "4.1/5",
        bbbScore: "A+",
        naicScore: "2.02",
      },
      {
        carrierName: "State Farm",
        amBestRating: "A++",
        jdPowerRating: "4.2/5",
        bbbScore: "A+",
        naicScore: "1.28",
      },
      {
        carrierName: "Liberty Mutual",
        amBestRating: "A",
        jdPowerRating: "3.2/5",
        bbbScore: "A+",
        naicScore: "3.56",
      },
      {
        carrierName: "Root Insurance",
        amBestRating: "A+",
        jdPowerRating: "4.5/5",
        bbbScore: "A+",
        naicScore: "0.9",
      },
    ],
  };
</script>

<template>
  <div id="auto-insurance" class="page">
    <sub-vertical-hero
      hero-image="auto-insurance-shield.jpg"
      hero-image-alt="Woman carrying groceries out from the rear trunk of vehicle, with Protect logo sheild surrounding vehicle"
      headline="Compare rates to save on auto insurance."
      subheadline="Get the best car insurance coverage at an affordable price."
      :zipcode-url="action"
    />

    <section id="top-companies">
      <insurance-brands
        :providers-config="[
          { name: 'Progressive', src: 'provider-progressive.png' },
          { name: 'Geico', src: 'provider-geico.png' },
          { name: 'Nationwide', src: 'provider-nationwide.png' },
          { name: 'State Farm', src: 'provider-state-farm.png' },
          { name: 'Liberty Mutual Insurance', src: 'provider-liberty.png' },
        ]"
      >
        Compare top companies head-to-head and get the best rate.
      </insurance-brands>
    </section>

    <item-box-group
      first-box-text="Looking for additional coverage?"
      :items="[
        {
          value: {
            icon: 'health-insurance',
            value: 'health-insurance',
          },
          text: 'Health Insurance',
        },
        {
          value: {
            icon: 'home',
            value: 'home-insurance',
          },
          text: 'Home Insurance',
        },
      ]"
    />

    <section id="steps">
      <steps
        :steps-config="[
          { text: 'Call and speak with an agent' },
          { text: 'Review plan Options' },
          { text: 'Choose the policy that works best for you' },
        ]"
      />
    </section>

    <yellow-box-banner
      headline="Accidents happen. You don't have to compromise on auto insurance coverage to get a great rate."
      image-alt="Young driver taking a selfie in front of a vehicle that has been in an accident."
      content="If you're an experienced driver or just getting behind the wheel,
        Protect.com can help find you the best car insurance policy that has the right coverage at an affordable price.
        If you haven't gotten a new auto insurance quote in the last 6 months, you could be missing out on potential savings."
      image="selfie-crash.png"
      :lazy-image="true"
    />

    <breakpoint-image image="auto_bg.webp" />

    <testimonial
      :testimonial-config="{
        caption: 'Placeholder Caption',
        layout: 'image-right',
        image: 'man-smiling.png',
        imageColWidth: '4',
        imageWrapperClass: 'align-bottom-md',
        imageOverlap: false,
        title: 'Some things members love about Protect',
        subhead: 'They do all the hard work for you',
        quote:
          'Protect helped me gather lots of quotes from great auto insurance companies. They made the decision-making process a breeze. In less than a few minutes, I had everything I needed to make a great choice for my family!',
        byline: 'Sherry Linn, Los Angeles, CA',
      }"
    />

    <section id="company-rank">
      <b-container>
        <div class="wrapper">
          <b-row>
            <b-col cols="12" lg="6">
              <h2>How does your auto insurance company rank?</h2>
              <p>
                Protect.com ranks top auto insurance companies based on J.D.
                Power satisfaction scores plus our own Protect.com customer
                satisfaction scores comprised of multiple reviews from the auto
                insurance industry’s most trusted sources.
              </p>
            </b-col>
            <b-col cols="12" lg="6">
              <NuxtImg
                :src="buildImageUrl('company-rank-collage-auto.jpg')"
                alt="Company Rankings"
                format="webp"
                loading="lazy"
                width="582"
                height="332"
                style="height: auto"
              />
            </b-col>
            <b-col cols="12" class="feed-wrapper">
              <rating-chart
                banner-headline="Compare Over 30 Top Auto Insurance Providers Head-to-head."
                :action="action"
                :carriers="config.carriers"
              />
            </b-col>
          </b-row>
        </div>
      </b-container>
    </section>

    <section class="py-4 my-4">
      <b-container>
        <h2 class="text-center">Compare Car Insurance Quotes By State</h2>
        <p class="text-center">Select your state below to get started.</p>
        <StateAutoInsuranceUSMap />
      </b-container>
    </section>

    <section>
      <b-container>
        <h2 class="text-center">Compare Car Insurance Quotes By City</h2>
        <p class="text-center">
          Check out our top 50 cities and how they line up with National
          Averages.
        </p>
        <CityLinkList :links="links" />
      </b-container>
    </section>

    <yellow-box-banner
      headline="Compare Rates by Vehicle Make & Model"
      content="See how your specific car affects your insurance rates. Get detailed information for your make and model to find the best coverage options."
      image-alt="Ford F-150 and Toyota Camry comparison"
      image="vehicle-comparison.png"
      action="/car-insurance/rates-by-vehicle"
      action-message="Find Your Vehicle"
      image-align="right"
      :lazy-image="true"
    />
    <action-banner
      cta-type="zipcode-form"
      image_top="100"
      headline="Explore new auto insurance policy options."
      imageAlt="A mother with a baby carrier standing behind a vehicle while the father steps around the vehicle to get something in the car"
      subheadline="Discover how much you could can save on auto insurance with Protect.com."
      image="car_couple.png"
      :action="action"
      :lazy-image="true"
    />

    <BlogFeed
      :show-categories="false"
      vertical="insurance"
      :sub-verticals="['car-insurance']"
    />
    <!-- <join-newsletter /> -->
  </div>
</template>

<style lang="scss" scoped>
  h2 {
    font-size: 2.5rem;
    margin-bottom: 15px;

    @include media-breakpoint-down(md) {
      text-align: left;
      font-size: 2.3rem;
    }
    @include media-breakpoint-down(sm) {
      font-size: 2rem;
    }
  }

  #top-companies {
    position: relative;
    margin-bottom: 100px;

    @include media-breakpoint-down(sm) {
      margin-bottom: 50px;
    }

    h3 {
      margin-bottom: 45px;

      @include media-breakpoint-down(md) {
        font-size: 1.25rem;
      }
    }
    .top-companies-list {
      display: flex;
      justify-content: center;

      @include media-breakpoint-down(sm) {
        flex-wrap: wrap;
      }

      .top-company {
        border: 1px solid #999;
        color: #999;
        border-radius: 3px;
        padding: 7.5px 25px;
        margin: 0 10px 0 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        @include media-breakpoint-down(md) {
          font-size: 0.75rem;
          padding: 7.5px 20px;
        }
        @include media-breakpoint-down(sm) {
          margin: 0 10px 12.5px 10px;
        }
      }
    }
  }

  #easy-steps {
    margin-bottom: 100px;

    @include media-breakpoint-down(sm) {
      margin-bottom: 50px;
    }

    h2 {
      margin: 25px 0 50px 0;

      @include media-breakpoint-down(md) {
        margin-top: 0;
        max-width: 400px;
      }
    }
    img.steps-shape {
      width: 80%;
      margin-bottom: 25px;
    }
    .easy-step {
      @include media-breakpoint-down(md) {
        border: 1px solid #ddd;
        margin: 0 auto 25px auto;
        padding: 25px;
        border-radius: 5px;
      }
      @include media-breakpoint-down(sm) {
        max-width: 275px;
      }

      img {
        height: 125px;
        max-width: 100%;
        margin: 0 auto;
        display: block;
      }
      p {
        font-size: 1.5rem;
        max-width: 200px;
        font-weight: 400;
        margin: 0 auto;

        @include media-breakpoint-down(md) {
          font-size: 1.35rem;
        }
      }
      .step-number {
        @include media-breakpoint-down(md) {
          border: 1px solid #ddd;
          height: 60px;
          width: 60px;
          border-radius: 999px;
          display: flex !important;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
          color: #999;
          margin: 0 auto 50px auto;
        }
      }
    }
  }

  #accidents-happen {
    margin-bottom: 100px;

    @include media-breakpoint-down(sm) {
      margin-bottom: 50px;
    }

    .container {
      background-image: linear-gradient(#fafaec, #fafaec);
      background-size: 60%;
      background-repeat: no-repeat;
      background-position: right;

      @include media-breakpoint-down(md) {
        background-size: 70%;
      }
      @include media-breakpoint-down(sm) {
        background-size: 90% 80%;
        background-position: bottom;
      }
    }
    .wrapper {
      padding: 75px 50px 25px 0;

      @include media-breakpoint-down(sm) {
        padding: 25px 35px;
      }
    }
    .selfie-crash {
      display: block;
      width: 100%;
      max-width: 500px;
      margin: 50px auto 0 auto;
    }
    p {
      font-weight: 400;
      font-size: 1.5rem;

      @include media-breakpoint-down(md) {
        font-size: 1.35rem;
      }
    }
  }

  #company-rank {
    @include media-breakpoint-down(md) {
      margin-bottom: 100px;
    }

    @include media-breakpoint-down(sm) {
      margin-bottom: 50px;
    }

    .wrapper {
      background-color: #f9f9f9;
      padding: 75px;

      @include media-breakpoint-down(sm) {
        padding: 35px 15px;
      }

      p {
        font-weight: 400;
        font-size: 1.5rem;

        @include media-breakpoint-down(md) {
          font-size: 1.35rem;
        }
      }
      img {
        max-width: 100%;
      }
    }
  }
</style>

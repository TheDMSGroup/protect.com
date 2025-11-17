<script setup>
  import { buildImageUrl } from "@/composables/images.js";

  const config = {
    action: "https://insure.protect.com/",
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
      headline="Compare rates to save on auto insurance."
      subheadline="Get the best car insurance coverage at an affordable price."
      :zipcode-url="config.action"
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
      headline="Accidents happen. You don’t have to compromise on auto insurance coverage to get a great rate."
      content="If you’re an experienced driver or just getting behind the wheel,
        Protect.com can help find you the best car insurance policy that has the right coverage at an affordable price.
        If you haven’t gotten a new auto insurance quote in the last 6 months, you could be missing out on potential savings."
      image="selfie-crash.png"
    />

    <breakpoint-image image="auto_bg.jpg" />

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
                Protect.com ranks top auto insurance companies based on J.D. Power satisfaction scores plus our own Protect.com customer satisfaction
                scores comprised of multiple reviews from the auto insurance industry’s most trusted sources.
              </p>
            </b-col>
            <b-col cols="12" lg="6">
              <NuxtImg :src="buildImageUrl('company-rank-collage-auto.jpg')" alt="Company Rankings" />
            </b-col>
            <b-col cols="12" class="feed-wrapper">
              <rating-chart
                banner-headline="Compare Over 30 Top Auto Insurance Providers Head-to-head."
                :action="config.action"
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

    <action-banner
      cta-type="zipcode-form"
      image_top="100"
      headline="Explore new auto insurance policy options."
      subheadline="Discover how much you could can save on auto insurance with Protect.com."
      image="car_couple.png"
      :action="action"
    />

    <BlogFeed :show-categories="false" vertical="insurance" :sub-verticals="['auto-insurance']" />
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

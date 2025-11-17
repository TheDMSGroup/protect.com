<script setup>
  import { buildImageUrl } from "@/composables/images.js";

  // Define the zipcode URL for home insurance
  const zipcodeUrl = "https://homeinsurance.protect.com/";

  console.log("Home insurance page - zipcodeUrl:", zipcodeUrl);
</script>

<template>
  <div id="home-insurance" class="page">
    <sub-vertical-hero
      hero-image="home-insurance-shield.jpg"
      headline="Compare Home Insurance Quotes"
      subheadline="Protect your family with affordable coverage"
      :zipcode-url="zipcodeUrl"
    />

    <section id="top-companies">
      <insurance-brands
        :providers-config="[
          { name: 'Farmers', src: 'provider-farmers.png' },
          { name: 'Allstate', src: 'provider-allstate.png' },
          { name: 'American Family Insurance', src: 'provider-american-family-insurance.png' },
          { name: 'State Farm', src: 'provider-state-farm.png' },
          { name: 'Liberty Mutual Insurance', src: 'provider-liberty.png' },
        ]"
      >
        Compare top companies head-to-head and get the best rate.
      </insurance-brands>
    </section>

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
      headline="Safeguard your sanctuary with a comprehensive home insurance policy."
      content="Don't compromise on coverage when shopping for homeowners insurance.
        Find the right policy that fits your unique home and budget. Shop and compare rates now."
      image="gardening-lady.png"
    />

    <breakpoint-image image="homeowners_bg.jpg" />

    <testimonial
      :testimonial-config="{
        caption: 'Placeholder Caption',
        layout: 'image-right',
        image: 'woman-smiling.png',
        imageColWidth: '5',
        imageOverlap: false,
        imageWrapperClass: 'align-bottom-md',
        title: 'Some things members love about Protect',
        subhead: 'They do all the hard work for you',
        quote:
          'Protect helped me gather lots of quotes from great home insurance companies. They made the decision-making process a breeze. In less than a few minutes, I had everything I needed to make a great choice for my family!',
        byline: 'Sherry Linn, Los Angeles, CA',
      }"
    />

    <section id="company-rank">
      <b-container>
        <div class="wrapper">
          <b-row>
            <b-col cols="12" lg="6">
              <h2>Compare top insurance companies head-to-head and save.</h2>
              <p>
                Protect helps you find amazing rates and coverage from the nations top life insurance providers. Our carriers rank highly with J.D
                Power satisfaction, hold A+ BBB ratings and are recognized by the NAIC, the insurance industries most trusted consumer advocates.
              </p>
            </b-col>
            <b-col cols="12" lg="6">
              <NuxtImg :src="buildImageUrl('company-rank-collage-home.jpg')" />
            </b-col>
            <b-col cols="12" class="feed-wrapper">
              <rating-chart banner-headline="Compare Over 30 Top Home Insurance Providers Head-to-head." :action="action" :carriers="carriers" />
            </b-col>
          </b-row>
        </div>
      </b-container>
    </section>

    <action-banner
      cta-type="zipcode-form"
      image_top="100"
      headline="Explore new policy options"
      subheadline="Discover how much you could save with Protect. "
      image="pet-family.png"
      :action="action"
    />

    <BlogFeed :show-categories="false" vertical="insurance" :sub-verticals="['home-insurance']" />
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
  #testimonials:has(.no-overlap)::after {
    height: 100%;
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

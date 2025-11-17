<script setup>
  import { buildImageUrl } from "@/composables/images.js";

  const zipCodeUrl = "https://health.protect.com/";
</script>

<template>
  <div id="health-insurance" class="page">
    <sub-vertical-hero
      hero-image="health-insurance-shield.jpg"
      headline="Compare Health Insurance Quotes"
      subheadline="Protect your family with affordable coverage"
      :zipcode-url="zipCodeUrl"
    />

    <section id="top-companies">
      <insurance-brands
        :providers-config="[
          { name: 'Cigna', src: 'provider-cigna.png' },
          { name: 'Humana', src: 'provider-humana.png' },
          { name: 'AmBetter', src: 'ambetter-logo.png' },
          { name: 'aetna', src: 'provider-aetna.png' },
          { name: 'Molina', src: 'molina-logo.svg' },
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
      headline="Find a healthy balance of coverage and savings when you shop & compare with Protect."
      content="Protect can help you find affordable health insurance that fits your unique needs and budget.
        Compare plans with no commitment and discover how much you could be
        saving by getting quotes from multiple top health insurance providers. "
      image="yoga.png"
    />

    <breakpoint-image image="health_bg.jpg" />

    <testimonial
      :testimonial-config="{
        caption: 'Placeholder Caption',
        layout: 'image-left',
        image: 'friendly-lady.png',
        imageColWidth: '3',
        title: 'Some things members love about Protect',
        subhead: 'They do all the hard work for you',
        quote:
          'Protect helped me gather lots of quotes from great healthcare companies. They made the decision-making process a breeze. In less than a few minutes, I had everything I needed to make a great choice for my family!',
        byline: 'Sherry Linn, Los Angeles, CA',
      }"
    />

    <!--<section id="company-rank">
        <b-container>
          <div class="wrapper">
            <b-row>
              <b-col cols="12" lg="6">
                <h2>Compare top insurance companies head-to-head and save.</h2>
                <p>
                  Protect helps you find amazing rates  and coverage from the nations top life insurance providers.
                  Our carriers rank highly with J.D Power satisfaction, hold A+ BBB ratings and are recognized by the NAIC,
                  the insurance industries most trusted consumer advocates.
                </p>
              </b-col>
              <b-col cols="12" lg="6">
                <img  src="../assets/company-rank-collage-health.jpg">
              </b-col>
              <b-col cols="12" class="feed-wrapper">
                <LincxFeed key="health-insurance" :config="{dataZoneId: 'vyd8tz', style: 'default'}"></LincxFeed>
              </b-col>
            </b-row>
          </div>
        </b-container>
      </section>-->

    <section id="company-rank">
      <b-container>
        <div class="wrapper">
          <b-row>
            <b-col cols="12" lg="6">
              <h2>How does your ahealth insurance company rank?</h2>
              <p>
                Protect.com ranks top health insurance companies based on J.D. Power satisfaction scores plus our own Protect.com customer
                satisfaction scores comprised of multiple reviews from the health insurance industry's most trusted sources.
              </p>
            </b-col>
            <b-col cols="12" lg="6">
              <NuxtImg :src="buildImageUrl('company-rank-collage-health.jpg')" />
            </b-col>
            <b-col cols="12" class="feed-wrapper">
              <rating-chart
                banner-headline="Compare Top Healthcare Insurance Providers and Plans Head-to-head."
                :action="action"
                :carriers="carriers"
              />
            </b-col>
          </b-row>
        </div>
      </b-container>
    </section>

    <section>
      <action-banner
        cta-type="zipcode-form"
        image_top="125"
        headline="Explore new policy options"
        subheadline="Discover how much you could save with Protect. "
        image="doctor-patient.png"
        :action="action"
      />
    </section>
    <BlogFeed :show-categories="false" vertical="insurance" :sub-verticals="['health-insurance']" />
    <!--<join-newsletter />-->
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

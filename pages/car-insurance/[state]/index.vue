<script setup>
import { states, getOfficialSlug } from '~/utils/redirect-config'

const route = useRoute()
const stateSlug = route.params.state

// Get official slug (handles variations)
const officialSlug = getOfficialSlug(stateSlug)

// Find state from redirect-config
const stateFromConfig = states.find(s => s.slug === officialSlug)

if (!stateFromConfig) {
  throw createError({
    statusCode: 404,
    statusMessage: 'State not found'
  })
}

// Fetch state data from Google Sheets
const { data: stateData } = await useFetch('/api/sheets/states', {
  query: { slug: stateFromConfig.name.toLowerCase() }
})

// If no data in sheets, use fallback from config
const stateName = stateData.value?.State || stateFromConfig.name
const stateAbbr = stateFromConfig.abbreviation

// SEO Meta
useSeoMeta({
  title: stateData.value?.['Title Tag'] || `Get Cheap Car Insurance in ${stateName} | Compare Quotes | Protect.com`,
  description: stateData.value?.['Meta Description'] || `Find the cheapest full-coverage or liability only car insurance in ${stateName}. Compare multiple quotes side-by-side & save.`
})
</script>

<template>
  <div class="state-page">
    <section class="hero">
      <b-container>
        <h1>Car Insurance in {{ stateName }}</h1>
        <p class="lead">
          {{ stateData?.['Meta Description'] || `Find the cheapest full-coverage or liability only car insurance in ${stateName}. Compare multiple quotes side-by-side & save.` }}
        </p>
        <NuxtLink to="https://insure.protect.com" class="cta-button">
          Compare Quotes in {{ stateName }}
        </NuxtLink>
      </b-container>
    </section>

    <section v-if="stateData" class="content">
      <b-container>
        <h2>Why Compare Car Insurance in {{ stateName }}?</h2>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="icon">
              <i class="bi bi-graph-up" />
            </div>
            <h3>Compare Rates</h3>
            <p>Get quotes from multiple insurers side-by-side to find the best rates in {{ stateName }}.</p>
          </div>
          <div class="benefit-card">
            <div class="icon">
              <i class="bi bi-cash-coin" />
            </div>
            <h3>Save Money</h3>
            <p>Residents of {{ stateName }} can save hundreds by comparing insurance quotes.</p>
          </div>
          <div class="benefit-card">
            <div class="icon">
              <i class="bi bi-shield-check" />
            </div>
            <h3>Stay Protected</h3>
            <p>Find the right coverage for your needs and {{ stateName }} requirements.</p>
          </div>
        </div>

        <div class="license-plate-section">
          <h2>Start Saving on {{ stateName }} Car Insurance</h2>
          <div class="plate-cta">
            <p>Get your personalized quote today</p>
            <NuxtLink to="https://insure.protect.com" class="cta-button secondary">
              Get Free Quote
            </NuxtLink>
          </div>
        </div>
      </b-container>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../scss/variables';

.state-page {
  .hero {
    background: linear-gradient(135deg, $blue 0%, lighten($blue, 15%) 100%);
    color: white;
    padding: 80px 0;
    text-align: center;

    h1 {
      font-size: 3rem;
      margin-bottom: 1.5rem;
      font-weight: 700;

      @include media-breakpoint-down(md) {
        font-size: 2.25rem;
      }
    }

    .lead {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .cta-button {
    background: $green;
    color: white;
    padding: 1rem 2.5rem;
    border: none;
    border-radius: 6px;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: background 0.3s;

    &:hover {
      background: darken($green, 10%);
      color: white;
    }

    &.secondary {
      background: $blue;

      &:hover {
        background: darken($blue, 10%);
      }
    }
  }

  .content {
    padding: 60px 0;

    h2 {
      font-size: 2.25rem;
      color: $blue;
      margin-bottom: 2rem;
      text-align: center;
    }
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .benefit-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    text-align: center;

    .icon {
      font-size: 3rem;
      color: $green;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.5rem;
      color: $blue;
      margin-bottom: 1rem;
    }

    p {
      color: $gray-dark;
      line-height: 1.6;
    }
  }

  .license-plate-section {
    background: $gray-lighter;
    padding: 3rem;
    border-radius: 12px;
    text-align: center;

    h2 {
      margin-bottom: 1rem;
    }

    .plate-cta {
      p {
        font-size: 1.125rem;
        color: $gray-dark;
        margin-bottom: 1.5rem;
      }
    }
  }
}
</style>

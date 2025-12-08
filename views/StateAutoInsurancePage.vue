<template>
  <div class="state-insurance-page">
    <div v-if="loading" class="loading">
      <div class="container">
        <div class="loading-spinner"></div>
        <p>Loading state insurance information...</p>
      </div>
    </div>
    <div v-else-if="error" class="error">
      <div class="container">
        <h1>State Not Found</h1>
        <p>We couldn't find insurance information for the requested state.</p>
        <router-link to="/" class="btn btn-primary">Return to Home Page</router-link>
      </div>
    </div>

    <div v-else-if="stateData && stateData.state">
      <!-- State Hero Section -->
      <!-- Hero Section - Header matching screenshots -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <!-- Left Content -->
            <div class="hero-left">
              <h1>{{ stateData.state }} Car Insurance</h1>
              <p class="hero-subtitle">
                Find some of the best car insurance quotes in the {{ stateData.nickname }}!
              </p>

              <!-- Desktop Quote Form -->
              <div class="desktop-quote-form">
                <form @submit.prevent="getQuotes" class="quote-form-inline">
                  <div class="form-row">
                    <IconsGeoPin class="left-icon" />
                    <input type="text" v-model="zipcode" placeholder="enter zipcode" class="zipcode-input"
                      maxlength="5">
                    <button type="submit" class="compare-btn">COMPARE QUOTES</button>
                  </div>
                  <p class="form-disclaimer">
                    <img src="/assets/shield-icon-small.png" alt="shield icon"> No spam, just quotes.
                  </p>
                </form>
              </div>
            </div>
            <!-- Right Content - Provider Cards -->
            <StatePageComponentsHeroProviderCards :stateData="stateData" :zipcode="zipcode" />
          </div>
        </div>
      </section>
      <StatePageComponentsInsuranceOverview :stateData="stateData" />
      <!-- CTA Section -->
      <StatePageComponentsCtaSection :stateData="stateData" :zipcode="zipcode" />
      <!-- Money Saving Tips Section -->
       <StatePageComponentsMoneySavingTips :stateData="stateData" :zipcode="zipcode" />
      <!-- Explore CTA Section -->
      <StatePageComponentsJumpLinks :stateData="stateData" :zipcode="zipcode" />
      <!-- FAQ Section -->
      <Faq :stateData="stateData" :faq="stateData.faqs ? stateData.faqs : defaultFaqs" />
      <!-- How Protect.com Works Section -->
       <StatePageComponentsHowItWorks :stateData="stateData" :zipcode="zipcode" />
      <!-- Auto Rate Calculator Section -->
      <div class="calculator-section">
        <LazyAutoRateCalculator :componentProps="{ zipcode: zipcode }" />
      </div>
      <section class="methodology">
        <div class="container">
          <div class="section-header">
            <h3>Methodology & Disclosures</h3>
          </div>
          <div>
            <p>Minimum car insurance rates by state provided by <a
                href="https://finance.yahoo.com/personal-finance/insurance/article/state-minimum-car-insurance-233457321.html"
                target="_blank"
                rel="noopener noreferrer">Yahoo Finance</a>. Average full coverage car insurance rates
              by state provided by <a href="https://www.bankrate.com/insurance/car/states/"
                target="_blank"
                rel="noopener noreferrer">Bankrate</a>. National average car insurance costs by age provided by <a
                href="https://wallethub.com/edu/ci/average-car-insurance-rates-by-age/69321"
                target="_blank"
                rel="noopener noreferrer">WalletHub</a>.</p>
            <p>Car insurance rates vary by geographic region, number of drivers, vehicles, driving record, and many
              other factors. For the purposes of this site and the rates you see, the standard profile has been applied:
            </p>
            <p>40 year old single driver, 2023 Toyota Camry, good credit score, clean driving record and commutes 5
              days. Rates also assume bundling and paperless billing discounts.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from '../stores/store';

const store = useStore();

const props = defineProps({
  topic: {
    type: String,
    required: true
  },
  title: String,
  description: String,
  dataZoneId: String
});

// Reactive zipcode variable
const zipcode = ref('');

// import axios from 'axios';
import '../scss/stateautoinsurance.scss';

const stateInsuranceStats = [
  {
    state: 'Alabama',
    stateAbbreviation: 'AL',
    nickname: 'Yellowhammer State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'At-fault',
    avgAnnualCost: '$2,079',
    avgMonthlyCost: '$42',
    avgAnnualMinCost: '$501',
    age16Cost: '$3,012',
    age25Cost: '$737',
    age45Cost: '$577',
    age65Cost: '$623',
  },
  {
    state: 'Alaska',
    stateAbbreviation: 'AK',
    nickname: 'The Last Frontier',
    bodilyInjuryPerPerson: '$50,000',
    bodilyInjuryPerAccident: '$100,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '50/100/25',
    faultType: 'At-fault',
    avgAnnualCost: '$2,402',
    avgMonthlyCost: '$44',
    avgAnnualMinCost: '$523',
    age16Cost: '$2,363',
    age25Cost: '$567',
    age45Cost: '$470',
    age65Cost: '$503',
  },
  {
    state: 'Arizona',
    stateAbbreviation: 'AZ',
    nickname: 'Grand Canyon State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$15,000',
    combinedSplitLimit: '25/50/15',
    faultType: 'At-fault',
    avgAnnualCost: '$2,739',
    avgMonthlyCost: '$68',
    avgAnnualMinCost: '$818',
    age16Cost: '$4,152',
    age25Cost: '$903',
    age45Cost: '$720',
    age65Cost: '$754',
  },
  {
    state: 'Arkansas',
    stateAbbreviation: 'AR',
    nickname: 'Natural State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'At-fault',
    avgAnnualCost: '$2,489',
    avgMonthlyCost: '$42',
    avgAnnualMinCost: '$502',
    age16Cost: '$2,980',
    age25Cost: '$773',
    age45Cost: '$591',
    age65Cost: '$588',
  },
  {
    state: 'California',
    stateAbbreviation: 'CA',
    nickname: 'Golden State',
    bodilyInjuryPerPerson: '$30,000',
    bodilyInjuryPerAccident: '$60,000',
    propertyDamage: '$15,000',
    combinedSplitLimit: '30/60/15',
    faultType: 'At-fault',
    avgAnnualCost: '$2,935',
    avgMonthlyCost: '$70',
    avgAnnualMinCost: '$844',
    age16Cost: '$2,534',
    age25Cost: '$900',
    age45Cost: '$717',
    age65Cost: '$732',
  },
  {
    state: 'Colorado',
    stateAbbreviation: 'CO',
    nickname: 'Centennial State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$15,000',
    combinedSplitLimit: '25/50/15',
    faultType: 'At-fault',
    avgAnnualCost: '$3,212',
    avgMonthlyCost: '$49',
    avgAnnualMinCost: '$587',
    age16Cost: '$3,601',
    age25Cost: '$747',
    age45Cost: '$606',
    age65Cost: '$622',
  },
  {
    state: 'Connecticut',
    stateAbbreviation: 'CT',
    nickname: 'Constitution State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'At-fault',
    avgAnnualCost: '$2,668',
    avgMonthlyCost: '$85',
    avgAnnualMinCost: '$1,025',
    age16Cost: '$5,837',
    age25Cost: '$1,296',
    age45Cost: '$1,086',
    age65Cost: '$1,058',
  },
  {
    state: 'Delaware',
    stateAbbreviation: 'DE',
    nickname: 'First State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'At-fault',
    avgAnnualCost: '$2,893',
    avgMonthlyCost: '$89',
    avgAnnualMinCost: '$1,062',
    age16Cost: '$4,949',
    age25Cost: '$1,116',
    age45Cost: '$927',
    age65Cost: '$900',
  },
  {
    state: 'Florida',
    stateAbbreviation: 'FL',
    nickname: 'Sunshine State',
    bodilyInjuryPerPerson: '$10,000',
    bodilyInjuryPerAccident: '$20,000',
    propertyDamage: '$10,000',
    combinedSplitLimit: '10/20/10',
    faultType: 'No-fault',
    avgAnnualCost: '$4,210',
    avgMonthlyCost: '$95',
    avgAnnualMinCost: '$1,136',
    age16Cost: '$5,301',
    age25Cost: '$1,440',
    age45Cost: '$1,242',
    age65Cost: '$1,199',
  },
  {
    state: 'Georgia',
    stateAbbreviation: 'GA',
    nickname: 'Peach State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'At-fault',
    avgAnnualCost: '$2,967',
    avgMonthlyCost: '$88',
    avgAnnualMinCost: '$1,050',
    age16Cost: '$4,508',
    age25Cost: '$1,112',
    age45Cost: '$877',
    age65Cost: '$874',
  },
  {
    state: 'Hawaii',
    stateAbbreviation: 'HI',
    nickname: 'Aloha State',
    bodilyInjuryPerPerson: '$20,000',
    bodilyInjuryPerAccident: '$40,000',
    propertyDamage: '$10,000',
    combinedSplitLimit: '20/40/10',
    faultType: 'No-fault',
    avgAnnualCost: '$1,705',
    avgMonthlyCost: '$34',
    avgAnnualMinCost: '$403',
    age16Cost: '$493',
    age25Cost: '$432',
    age45Cost: '$432',
    age65Cost: '$432',
  },
  {
    state: 'Idaho',
    stateAbbreviation: 'ID',
    nickname: 'Gem State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$15,000',
    combinedSplitLimit: '25/50/15',
    faultType: 'At-fault',
    avgAnnualCost: '$1,473',
    avgMonthlyCost: '$31',
    avgAnnualMinCost: '$369',
    age16Cost: '$2,071',
    age25Cost: '$484',
    age45Cost: '$374',
    age65Cost: '$372',
  },
  {
    state: 'Illinois',
    stateAbbreviation: 'IL',
    nickname: 'Prairie State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$20,000',
    combinedSplitLimit: '25/50/20',
    faultType: 'At-fault',
    avgAnnualCost: '$2,442',
    avgMonthlyCost: '$56',
    avgAnnualMinCost: '$673',
    age16Cost: '$3,145',
    age25Cost: '$750',
    age45Cost: '$592',
    age65Cost: '$611',
  },
  {
    state: 'Indiana',
    stateAbbreviation: 'IN',
    nickname: 'Hoosier State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'At-fault',
    avgAnnualCost: '$1,751',
    avgMonthlyCost: '$37',
    avgAnnualMinCost: '$445',
    age16Cost: '$2,056',
    age25Cost: '$533',
    age45Cost: '$422',
    age65Cost: '$445',
  },
  {
    state: 'Iowa',
    stateAbbreviation: 'IA',
    nickname: 'Hawkeye State',
    bodilyInjuryPerPerson: '$20,000',
    bodilyInjuryPerAccident: '$40,000',
    propertyDamage: '$15,000',
    combinedSplitLimit: '20/40/15',
    faultType: 'At-fault',
    avgAnnualCost: '$1,758',
    avgMonthlyCost: '$37',
    avgAnnualMinCost: '$445',
    age16Cost: '$1,416',
    age25Cost: '$383',
    age45Cost: '$294',
    age65Cost: '$294',
  },
  {
    state: 'Kansas',
    stateAbbreviation: 'KS',
    nickname: 'Sunflower State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'No-fault',
    avgAnnualCost: '$2,016',
    avgMonthlyCost: '$43',
    avgAnnualMinCost: '$516',
    age16Cost: '$2,405',
    age25Cost: '$683',
    age45Cost: '$565',
    age65Cost: '$564',
  },
  {
    state: 'Kentucky',
    stateAbbreviation: 'KY',
    nickname: 'Bluegrass State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'No-fault',
    avgAnnualCost: '$2,499',
    avgMonthlyCost: '$41',
    avgAnnualMinCost: '$493',
    age16Cost: '$3,736',
    age25Cost: '$1,020',
    age45Cost: '$827',
    age65Cost: '$796',
  },
  {
    state: 'Louisiana',
    stateAbbreviation: 'LA',
    nickname: 'Pelican State',
    bodilyInjuryPerPerson: '$15,000',
    bodilyInjuryPerAccident: '$30,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '15/30/25',
    faultType: 'At-fault',
    avgAnnualCost: '$3,459',
    avgMonthlyCost: '$93',
    avgAnnualMinCost: '$1,116',
    age16Cost: '$6,488',
    age25Cost: '$1,449',
    age45Cost: '$1,175',
    age65Cost: '$1,276',
  },
  {
    state: 'Maine',
    stateAbbreviation: 'ME',
    nickname: 'Pine Tree State',
    bodilyInjuryPerPerson: '$50,000',
    bodilyInjuryPerAccident: '$100,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '50/100/25',
    faultType: 'At-fault',
    avgAnnualCost: '$1,258',
    avgMonthlyCost: '$33',
    avgAnnualMinCost: '$396',
    age16Cost: '$1,906',
    age25Cost: '$556',
    age45Cost: '$427',
    age65Cost: '$414',
  },
  {
    state: 'Maryland',
    stateAbbreviation: 'MD',
    nickname: 'Old Line State',
    bodilyInjuryPerPerson: '$30,000',
    bodilyInjuryPerAccident: '$60,000',
    propertyDamage: '$15,000',
    combinedSplitLimit: '30/60/15',
    faultType: 'At-fault',
    avgAnnualCost: '$2,235',
    avgMonthlyCost: '$60',
    avgAnnualMinCost: '$720',
    age16Cost: '$4,319',
    age25Cost: '$1,225',
    age45Cost: '$1,038',
    age65Cost: '$1,108',
  },
  {
    state: 'Massachusetts',
    stateAbbreviation: 'MA',
    nickname: 'Bay State',
    bodilyInjuryPerPerson: '$20,000',
    bodilyInjuryPerAccident: '$40,000',
    propertyDamage: '$5,000',
    combinedSplitLimit: '20/40/5',
    faultType: 'No-fault',
    avgAnnualCost: '$2,300',
    avgMonthlyCost: '$63',
    avgAnnualMinCost: '$756',
    age16Cost: '$2,808',
    age25Cost: '$729',
    age45Cost: '$647',
    age65Cost: '$552',
  },
  {
    state: 'Michigan',
    stateAbbreviation: 'MI',
    nickname: 'Wolverine State',
    bodilyInjuryPerPerson: '$50,000',
    bodilyInjuryPerAccident: '$100,000',
    propertyDamage: '$10,000',
    combinedSplitLimit: '50/100/10',
    faultType: 'No-fault',
    avgAnnualCost: '$2,500',
    avgMonthlyCost: '$70',
    avgAnnualMinCost: '$840',
    age16Cost: '$4,704',
    age25Cost: '$1,392',
    age45Cost: '$1,300',
    age65Cost: '$1,305',
  },
  {
    state: 'Minnesota',
    stateAbbreviation: 'MN',
    nickname: 'North Star State',
    bodilyInjuryPerPerson: '$30,000',
    bodilyInjuryPerAccident: '$60,000',
    propertyDamage: '$10,000',
    combinedSplitLimit: '30/60/10',
    faultType: 'No-fault',
    avgAnnualCost: '$1,950',
    avgMonthlyCost: '$53',
    avgAnnualMinCost: '$636',
    age16Cost: '$2,333',
    age25Cost: '$825',
    age45Cost: '$698',
    age65Cost: '$667',
  },
  {
    state: 'Mississippi',
    stateAbbreviation: 'MS',
    nickname: 'Magnolia State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'At-fault',
    avgAnnualCost: '$2,000',
    avgMonthlyCost: '$55',
    avgAnnualMinCost: '$660',
    age16Cost: '$2,501',
    age25Cost: '$672',
    age45Cost: '$508',
    age65Cost: '$501',
  },
  {
    state: 'Missouri',
    stateAbbreviation: 'MO',
    nickname: 'Show-Me State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'At-fault',
    avgAnnualCost: '$2,100',
    avgMonthlyCost: '$58',
    avgAnnualMinCost: '$696',
    age16Cost: '$3,247',
    age25Cost: '$825',
    age45Cost: '$651',
    age65Cost: '$647',
  },
  {
    state: 'Montana',
    stateAbbreviation: 'MT',
    nickname: 'Treasure State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$20,000',
    combinedSplitLimit: '25/50/20',
    faultType: 'At-fault',
    avgAnnualCost: '$2,300',
    avgMonthlyCost: '$63',
    avgAnnualMinCost: '$756',
    age16Cost: '$2,468',
    age25Cost: '$506',
    age45Cost: '$423',
    age65Cost: '$428',
  },
  {
    state: 'Nebraska',
    stateAbbreviation: 'NE',
    nickname: 'Cornhusker State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'At-fault',
    avgAnnualCost: '$2,100',
    avgMonthlyCost: '$58',
    avgAnnualMinCost: '$696',
    age16Cost: '$2,209',
    age25Cost: '$561',
    age45Cost: '$437',
    age65Cost: '$433',
  },
  {
    state: 'Nevada',
    stateAbbreviation: 'NV',
    nickname: 'Silver State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$20,000',
    combinedSplitLimit: '25/50/20',
    faultType: 'At-fault',
    avgAnnualCost: '$2,500',
    avgMonthlyCost: '$92',
    avgAnnualMinCost: '$1,104',
    age16Cost: '$2,500',
    age25Cost: '$700',
    age45Cost: '$600',
    age65Cost: '$600',
  },
  {
    state: 'New Hampshire',
    stateAbbreviation: 'NH',
    nickname: 'Granite State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'At-fault',
    avgAnnualCost: '$1,500',
    avgMonthlyCost: '$42',
    avgAnnualMinCost: '$504',
    age16Cost: '$1,500',
    age25Cost: '$400',
    age45Cost: '$300',
    age65Cost: '$300',
  },
  {
    state: 'New Jersey',
    stateAbbreviation: 'NJ',
    nickname: 'Garden State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'No-fault',
    avgAnnualCost: '$2,400',
    avgMonthlyCost: '$67',
    avgAnnualMinCost: '$804',
    age16Cost: '$2,400',
    age25Cost: '$700',
    age45Cost: '$600',
    age65Cost: '$600',
  },
  {
    state: 'New Mexico',
    stateAbbreviation: 'NM',
    nickname: 'Land of Enchantment',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$10,000',
    combinedSplitLimit: '25/50/10',
    faultType: 'At-fault',
    avgAnnualCost: '$1,800',
    avgMonthlyCost: '$50',
    avgAnnualMinCost: '$600',
    age16Cost: '$1,800',
    age25Cost: '$500',
    age45Cost: '$400',
    age65Cost: '$400',
  },
  {
    state: 'New York',
    stateAbbreviation: 'NY',
    nickname: 'Empire State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$10,000',
    combinedSplitLimit: '25/50/10',
    faultType: 'No-fault',
    avgAnnualCost: '$2,800',
    avgMonthlyCost: '$77',
    avgAnnualMinCost: '$924',
    age16Cost: '$3,000',
    age25Cost: '$800',
    age45Cost: '$700',
    age65Cost: '$700',
  },
  {
    state: 'North Carolina',
    stateAbbreviation: 'NC',
    nickname: 'Tar Heel State',
    bodilyInjuryPerPerson: '$30,000',
    bodilyInjuryPerAccident: '$60,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '30/60/25',
    faultType: 'At-fault',
    avgAnnualCost: '$1,800',
    avgMonthlyCost: '$46',
    avgAnnualMinCost: '$552',
    age16Cost: '$2,000',
    age25Cost: '$600',
    age45Cost: '$500',
    age65Cost: '$500',
  },
  {
    state: 'North Dakota',
    stateAbbreviation: 'ND',
    nickname: 'Peace Garden State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'No-fault',
    avgAnnualCost: '$1,500',
    avgMonthlyCost: '$41',
    avgAnnualMinCost: '$492',
    age16Cost: '$1,500',
    age25Cost: '$400',
    age45Cost: '$300',
    age65Cost: '$300',
  },
  {
    state: 'Ohio',
    stateAbbreviation: 'OH',
    nickname: 'Buckeye State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'At-fault',
    avgAnnualCost: '$1,800',
    avgMonthlyCost: '$50',
    avgAnnualMinCost: '$600',
    age16Cost: '$2,000',
    age25Cost: '$600',
    age45Cost: '$500',
    age65Cost: '$500',
  },
  {
    state: 'Oklahoma',
    stateAbbreviation: 'OK',
    nickname: 'Sooner State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'At-fault',
    avgAnnualCost: '$2,000',
    avgMonthlyCost: '$47',
    avgAnnualMinCost: '$564',
    age16Cost: '$2,000',
    age25Cost: '$600',
    age45Cost: '$500',
    age65Cost: '$500',
  },
  {
    state: 'Oregon',
    stateAbbreviation: 'OR',
    nickname: 'Beaver State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$20,000',
    combinedSplitLimit: '25/50/20',
    faultType: 'At-fault',
    avgAnnualCost: '$2,200',
    avgMonthlyCost: '$61',
    avgAnnualMinCost: '$732',
    age16Cost: '$2,200',
    age25Cost: '$700',
    age45Cost: '$600',
    age65Cost: '$600',
  },
  {
    state: 'Pennsylvania',
    stateAbbreviation: 'PA',
    nickname: 'Keystone State',
    bodilyInjuryPerPerson: '$15,000',
    bodilyInjuryPerAccident: '$30,000',
    propertyDamage: '$5,000',
    combinedSplitLimit: '15/30/5',
    faultType: 'No-fault',
    avgAnnualCost: '$2,100',
    avgMonthlyCost: '$58',
    avgAnnualMinCost: '$696',
    age16Cost: '$2,100',
    age25Cost: '$650',
    age45Cost: '$550',
    age65Cost: '$550',
  },
  {
    state: 'Rhode Island',
    stateAbbreviation: 'RI',
    nickname: 'Ocean State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'At-fault',
    avgAnnualCost: '$2,500',
    avgMonthlyCost: '$70',
    avgAnnualMinCost: '$840',
    age16Cost: '$2,500',
    age25Cost: '$700',
    age45Cost: '$600',
    age65Cost: '$600',
  },
  {
    state: 'South Carolina',
    stateAbbreviation: 'SC',
    nickname: 'Palmetto State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'At-fault',
    avgAnnualCost: '$2,000',
    avgMonthlyCost: '$52',
    avgAnnualMinCost: '$625',
    age16Cost: '$2,000',
    age25Cost: '$600',
    age45Cost: '$500',
    age65Cost: '$500',
  },
  {
    state: 'South Dakota',
    stateAbbreviation: 'SD',
    nickname: 'Mount Rushmore State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'At-fault',
    avgAnnualCost: '$1,800',
    avgMonthlyCost: '$49',
    avgAnnualMinCost: '$588',
    age16Cost: '$1,800',
    age25Cost: '$500',
    age45Cost: '$400',
    age65Cost: '$400',
  },
  {
    state: 'Tennessee',
    stateAbbreviation: 'TN',
    nickname: 'Volunteer State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'At-fault',
    avgAnnualCost: '$2,000',
    avgMonthlyCost: '$55',
    avgAnnualMinCost: '$660',
    age16Cost: '$2,000',
    age25Cost: '$600',
    age45Cost: '$500',
    age65Cost: '$500',
  },
  {
    state: 'Texas',
    stateAbbreviation: 'TX',
    nickname: 'Lone Star State',
    bodilyInjuryPerPerson: '$30,000',
    bodilyInjuryPerAccident: '$60,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '30/60/25',
    faultType: 'At-fault',
    avgAnnualCost: '$2,500',
    avgMonthlyCost: '$70',
    avgAnnualMinCost: '$840',
    age16Cost: '$2,500',
    age25Cost: '$700',
    age45Cost: '$600',
    age65Cost: '$600',
  },
  {
    state: 'Utah',
    stateAbbreviation: 'UT',
    nickname: 'Beehive State',
    bodilyInjuryPerPerson: '$30,000',
    bodilyInjuryPerAccident: '$65,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '30/65/25',
    faultType: 'No-fault',
    avgAnnualCost: '$2,000',
    avgMonthlyCost: '$55',
    avgAnnualMinCost: '$660',
    age16Cost: '$2,000',
    age25Cost: '$600',
    age45Cost: '$500',
    age65Cost: '$500',
  },
  {
    state: 'Vermont',
    stateAbbreviation: 'VT',
    nickname: 'Green Mountain State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$10,000',
    combinedSplitLimit: '25/50/10',
    faultType: 'At-fault',
    avgAnnualCost: '$1,500',
    avgMonthlyCost: '$42',
    avgAnnualMinCost: '$504',
    age16Cost: '$1,500',
    age25Cost: '$400',
    age45Cost: '$300',
    age65Cost: '$300',
  },
  {
    state: 'Virginia',
    stateAbbreviation: 'VA',
    nickname: 'Old Dominion',
    bodilyInjuryPerPerson: '$50,000',
    bodilyInjuryPerAccident: '$100,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '50/100/25',
    faultType: 'At-fault',
    avgAnnualCost: '$2,000',
    avgMonthlyCost: '$55',
    avgAnnualMinCost: '$660',
    age16Cost: '$2,000',
    age25Cost: '$600',
    age45Cost: '$500',
    age65Cost: '$500',
  },
  {
    state: 'Washington',
    stateAbbreviation: 'WA',
    nickname: 'Evergreen State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$10,000',
    combinedSplitLimit: '25/50/10',
    faultType: 'At-fault',
    avgAnnualCost: '$2,200',
    avgMonthlyCost: '$48',
    avgAnnualMinCost: '$577',
    age16Cost: '$2,200',
    age25Cost: '$700',
    age45Cost: '$600',
    age65Cost: '$600',
  },
  {
    state: 'West Virginia',
    stateAbbreviation: 'WV',
    nickname: 'Mountain State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'At-fault',
    avgAnnualCost: '$1,800',
    avgMonthlyCost: '$50',
    avgAnnualMinCost: '$600',
    age16Cost: '$1,800',
    age25Cost: '$500',
    age45Cost: '$400',
    age65Cost: '$400',
  },
  {
    state: 'Wisconsin',
    stateAbbreviation: 'WI',
    nickname: 'Badger State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$10,000',
    combinedSplitLimit: '25/50/10',
    faultType: 'At-fault',
    avgAnnualCost: '$1,700',
    avgMonthlyCost: '$47',
    avgAnnualMinCost: '$564',
    age16Cost: '$1,700',
    age25Cost: '$500',
    age45Cost: '$400',
    age65Cost: '$400',
  },
  {
    state: 'Wyoming',
    stateAbbreviation: 'WY',
    nickname: 'Equality State',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    faultType: 'At-fault',
    avgAnnualCost: '$1,800',
    avgMonthlyCost: '$50',
    avgAnnualMinCost: '$600',
    age16Cost: '$1,404',
    age25Cost: '$339',
    age45Cost: '$291',
    age65Cost: '$292',
  },
  {
    state: 'USA',
    stateAbbreviation: 'the U.S.',
    nickname: 'Land of the Free',
    bodilyInjuryPerPerson: '$25,000',
    bodilyInjuryPerAccident: '$50,000',
    propertyDamage: '$25,000',
    combinedSplitLimit: '25/50/25',
    avgAnnualCost: '$1,682',
    avgMonthlyCost: '$129',
    avgAnnualMinCost: '$1,548',
    age16Cost: '$4,130',
    age25Cost: '$1,820',
    age45Cost: '$1,212',
    age65Cost: '$1,500',
    jumpLink: 'Finding the right auto insurance goes beyond just choosing the cheapest option. We look at the full picture—balancing affordability, coverage options, and each provider’s reputation. Our focus is on trusted insurers, like Progressive, Geico, and State Farm, known for reliable customer service and strong financial stability, so you get more than a great rate—you get peace of mind when it matters most. Compare quotes with Protect today to see which providers across the U.S. offer the best fit for your vehicle and budget.',
    faqs: [
      {
        question: 'What is the minimum auto insurance required in the U.S.?',
        answer: 'Each state sets its own minimum auto insurance requirements, but most require liability coverage to help pay for injuries or property damage you cause to others. Many states follow minimums around 25/50/25 — meaning $25,000 for bodily injury per person, $50,000 per accident, and $25,000 for property damage. Check your state’s specific requirements before purchasing coverage.',
      },
      {
        question: 'How much does auto insurance cost in the U.S.?',
        answer: 'The average annual cost of auto insurance in the U.S. is about $1,682, though this can vary widely depending on your state, age, driving record, vehicle type, and the level of coverage you choose. Comparing multiple quotes is the best way to find a policy that fits your budget.',
      },
      {
        question: 'What factors affect my car insurance rates?',
        answer: 'Your rates are influenced by factors such as your driving record, age, location, vehicle type, credit score, and coverage selections. Drivers with a clean record and good credit typically pay less, while younger or high-risk drivers may see higher premiums.',
      },

      {
        question: 'How often should I shop for car insurance?',
        answer: 'It’s a good idea to compare auto insurance rates 1-2 times a year or after major life events such as moving, buying a new car, or getting married. Shopping regularly helps ensure you’re always getting the best available rate and coverage for your needs.',
      },
    ],
  },
];

const allStateData = null;
const error = false;
// props: ['topic', 'title', 'description', 'dataZoneId'],
// created() {
const loading = computed(() => {
  return !stateInsuranceStats;
});
const stateData = computed(() => {
  if (!props.topic) {
    return null;
  }

  console.log(props.topic);
  console.log('props?', props);
  const normalizedTopic = props.topic.toLowerCase().replace(/[-\s]/g, '');
  const stateStatInfo = stateInsuranceStats.filter((state) =>
    state.state.toLowerCase().replace(/[-\s]/g, '') === normalizedTopic
  )[0];

  if (!stateStatInfo) {
    return null;
  }

  Object.keys(stateStatInfo)
    .filter((key) => key.includes('Cost'))
    .forEach((key) => {
      stateStatInfo[key] = parseCurrency(stateStatInfo[key]);
    });
  return stateStatInfo;
});



const defaultFaqs = computed(() => {
  const state = stateData.value;
  if (!state) return [];

  return [
    {
      question: `What is the minimum auto insurance required in ${state.state}?`,
      answer: `${state.state} requires minimum liability coverage of ${state.combinedSplitLimit}. This means ${state.bodilyInjuryPerPerson} for bodily injury per person, ${state.bodilyInjuryPerAccident} per accident, and ${state.propertyDamage} for property damage.`,
    },
    {
      question: `How much does auto insurance cost in ${state.state}?`,
      answer: `The average annual cost of auto insurance in ${state.state} is ${formatCurrency(state.avgAnnualCost)}. However, rates vary significantly based on factors like age, driving record, location, and coverage levels.`,
    },
    {
      question: `Is ${state.state} a fault or no-fault state?`,
      answer: `${state.state} is ${state?.faultType?.toLowerCase()} state. This affects how insurance claimsare handled after an accident.`,
    },
    {
      question: `What factors affect my insurance rates in ${state.state}?`,
      answer: 'Insurance rates are influenced by your driving record, age, location, vehicle type, credit score, coverage levels, and available discounts. Young drivers typically pay more, while experienced drivers with clean records get better rates.',
    },
    {
      question: 'How often should I shop for auto insurance?',
      answer: `It's recommended to compare auto insurance rates annually or whenever you have a major life change (moving,
            new car, marriage, etc.). This ensures you're getting the best available rates.`,
    },
  ];
});
const formatCurrency = function (value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value);
};
const getQuotes = function () {
  if (zipcode.value.length === 5) {
    redirectWithParams('https://insure.protect.com', { zipcode: zipcode.value });
  }
};
const parseCurrency = function(value) {
  if (!value) return 0;
  // If already a number, return it
  if (typeof value === 'number') return value;
  // Remove $ and commas, convert to number
  return parseInt(String(value).replace(/[$,]/g, ''), 10) || 0;
};

// Set page meta for SEO with state-specific license plate as share image
const getLicensePlateUrl = (stateName) => {
  if (!stateName) return 'https://protect.com/img/protect-share.jpg';
  const slug = stateName.replace(/\s/g, '').toLowerCase();
  return `https://dev.protect.com/assets/states/license-plates/${slug}.jpg`;
};

useSeoMeta({
  title: () => stateData.value ? `${stateData.value.state} Car Insurance - Compare Quotes | Protect.com` : 'Car Insurance - Compare Quotes | Protect.com',
  description: () => stateData.value
    ? `Compare car insurance quotes in ${stateData.value.state}. Average annual cost: ${formatCurrency(stateData.value.avgAnnualCost)}. Find the best rates in the ${stateData.value.nickname}.`
    : 'Compare car insurance quotes from top providers. Save money with Protect.com.',
  ogTitle: () => stateData.value ? `${stateData.value.state} Car Insurance - Compare Quotes` : 'Car Insurance - Compare Quotes',
  ogDescription: () => stateData.value
    ? `Find the best car insurance rates in ${stateData.value.state}. Average cost: ${formatCurrency(stateData.value.avgAnnualCost)}/year.`
    : 'Compare car insurance quotes from top providers.',
  ogImage: () => getLicensePlateUrl(stateData.value?.state),
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterImage: () => getLicensePlateUrl(stateData.value?.state),
});

// Mounted lifecycle hook
onMounted(() => {
  // Get zipcode from store if available
  if (store.visitorInfo.zip) {
    zipcode.value = store.visitorInfo.zip;
  }
});
</script>

<style lang="scss" scoped>
@import '../scss/variables';
@import '../scss/stateautoinsurance.scss';

.state-insurance-page,
.loading,
.error {
}

.loading {
  top: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--border-color);
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto var(--spacing-md) auto;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}

.calculator-section {
  padding: var(--spacing-xl) 0;
  background-color: var(--surface-light);
}

.error {
  top: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;

  h1 {
    margin-bottom: var(--spacing-md);
  }

  p {
    margin-bottom: var(--spacing-lg);
    color: var(--text-secondary);
  }
}

.left-icon {
  position: absolute;
  padding-left: 15px;
  margin-top: 15px;
  vertical-align: middle;
}

.desktop-quote-form {
  display: flex;
  flex-direction: column;
}

.methodology {
  margin: 50px;

  @include mobile {
    margin-bottom: 20px;
  }
  p {
    font-size: 1em;
  }
}
// Container custom styles
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

</style>

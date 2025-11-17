<template>
  <div class="insurance-calculator-wide">
    <!-- Header -->
    <div class="widget-header">
      <h2 class="widget-title">Auto Insurance Rate Calculator 📱</h2>
      <p class="widget-subtitle">Answer 6 quick questions to get your personalized estimate</p>
    </div>

    <!-- Progress -->
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
      <div class="progress-text">{{ completedQuestions }}/6 Complete</div>
    </div>

    <div class="calculator-layout">
      <transition name="fade-slide" mode="out-in">
        <!-- Left Side: Questions -->
        <div class="questions-panel" v-if="!showResults" key="questions-panel">
          <!-- Row 1: Multiple Vehicles + Incidents -->
          <div class="question-row">
            <div class="question-block">
              <label class="question-label">
                <span class="question-number">1</span>
                Multiple vehicles?
              </label>
              <div class="toggle-group">
                <button
                  class="toggle-btn"
                  :class="{ active: multipleVehicles === true }"
                  @click="multipleVehicles = true"
                >
                  Yes
                </button>
                <button
                  class="toggle-btn"
                  :class="{ active: multipleVehicles === false }"
                  @click="multipleVehicles = false"
                >
                  No
                </button>
              </div>
            </div>

            <div class="question-block">
              <label class="question-label">
                <span class="question-number">2</span>
                Any incidents (3 years)?
              </label>
              <div class="toggle-group">
                <button
                  class="toggle-btn"
                  :class="{ active: hasIncidents === true }"
                  @click="hasIncidents = true"
                >
                  Yes
                </button>
                <button
                  class="toggle-btn"
                  :class="{ active: hasIncidents === false }"
                  @click="hasIncidents = false"
                >
                  No
                </button>
              </div>
            </div>
          </div>

          <!-- Row 2: Age + Zip Code -->
          <div class="question-row">
            <div class="question-block">
              <label class="question-label" for="age-input">
                <span class="question-number">3</span>
                Your age
              </label>
              <input
                id="age-input"
                type="number"
                class="compact-input"
                placeholder="Enter your age"
                min="16"
                max="100"
                v-model.number="age"
              >
            </div>

            <div class="question-block">
              <label class="question-label" for="zip-input">
                <span class="question-number">4</span>
                Zip code
              </label>
              <div class="input-with-state">
                <input
                  id="zip-input"
                  type="text"
                  class="compact-input"
                  placeholder="Enter zip code"
                  maxlength="5"
                  v-model="zipCode"
                  @input="detectState"
                >
                <span v-if="detectedState" class="state-indicator">{{ detectedState }}</span>
              </div>
            </div>
          </div>

          <!-- Row 3: Credit Score + Homeowner -->
          <div class="question-row">
            <div class="question-block">
              <label class="question-label" for="credit-select">
                <span class="question-number">5</span>
                Credit score range
              </label>
              <select
                id="credit-select"
                class="compact-select"
                v-model="creditScore"
              >
                <option value="">Select range</option>
                <option value="excellent">Excellent (750+)</option>
                <option value="good">Good (700-749)</option>
                <option value="fair">Fair (640-699)</option>
                <option value="poor">Poor (&lt;640)</option>
              </select>
            </div>

            <div class="question-block">
              <label class="question-label">
                <span class="question-number">6</span>
                Are you a homeowner?
              </label>
              <div class="toggle-group">
                <button
                  class="toggle-btn"
                  :class="{ active: isHomeowner === true }"
                  @click="isHomeowner = true"
                >
                  Yes
                </button>
                <button
                  class="toggle-btn"
                  :class="{ active: isHomeowner === false }"
                  @click="isHomeowner = false"
                >
                  No
                </button>
              </div>
            </div>
          </div>

          <!-- Calculate Button -->
          <button
            class="calculate-button"
            :class="{ ready: isFormComplete, calculating: isCalculating}"
            :disabled="!isFormComplete"
            @click="calculateRate"
          >
            <span v-if="!isCalculating">
              {{ isFormComplete ? 'Calculate My Rate' : `Complete ${6 - completedQuestions} more questions` }}
            </span>
            <span v-else class="calculating-text">
              <div class="mini-spinner"></div>
              Calculating your rate...
            </span>
          </button>
        </div>
              <!-- Right Side: Results -->
        <div class="results-panel" v-else key="results-panel">
          <div class="results-placeholder" v-if="!showResults">
            <div class="placeholder-icon">📊</div>
            <h3>Your Rate Estimate</h3>
            <p>Complete the questions to see your personalized insurance rate</p>
            <div class="progress-indicator">
              <div class="progress-ring" :style="{ '--progress': progressPercentage + '%' }">
                <span class="progress-number">{{ Math.round(progressPercentage) }}%</span>
              </div>
            </div>
          </div>

          <div v-else class="results-display">
            <div class="results-header">
              <h3>Your Estimated Rate</h3>
              <div class="confidence-badge">Based on your profile</div>
            </div>

            <div class="rate-showcase">
              <div class="monthly-rate">
                <span class="rate-range">
                  ${{ monthlyRangeLow }}-${{ monthlyRangeHigh }}
                </span>
                <span class="rate-period">/month</span>
              </div>
              <div class="annual-rate">
                ${{ annualRangeLow.toLocaleString() }}-${{ annualRangeHigh.toLocaleString() }} annually
              </div>
            </div>

            <div v-if="totalDiscount > 0" class="savings-highlight">
              <div class="savings-icon">💰</div>
              <div class="savings-text">
                <span class="savings-amount">Save up to ${{ Math.round(baseRate * totalDiscount / 12) }}/month</span>
                <span class="savings-desc">with available discounts</span>
              </div>
            </div>

            <!-- Rate Breakdown
            <div class="breakdown-section">
              <h4 class="breakdown-title">Rate Breakdown</h4>
              <div class="breakdown-list">
                <div class="breakdown-item base">
                  <span class="breakdown-label">Base rate ({{ detectedState }})</span>
                  <span class="breakdown-value">${{ Math.round(baseRate/12) }}/mo</span>
                </div>

                <div v-if="multipleVehicles" class="breakdown-item discount">
                  <span class="breakdown-label">Multi-vehicle discount</span>
                  <span class="breakdown-value">-10%</span>
                </div>

                <div v-if="hasIncidents" class="breakdown-item penalty">
                  <span class="breakdown-label">Incident penalty</span>
                  <span class="breakdown-value">+35%</span>
                </div>

                <div v-if="age < 25" class="breakdown-item penalty">
                  <span class="breakdown-label">Young driver surcharge</span>
                  <span class="breakdown-value">+40%</span>
                </div>

                <div v-if="age > 65" class="breakdown-item penalty">
                  <span class="breakdown-label">Senior adjustment</span>
                  <span class="breakdown-value">+15%</span>
                </div>

                <div v-if="creditScore === 'excellent'" class="breakdown-item discount">
                  <span class="breakdown-label">Excellent credit discount</span>
                  <span class="breakdown-value">-15%</span>
                </div>

                <div v-if="creditScore === 'good'" class="breakdown-item discount">
                  <span class="breakdown-label">Good credit discount</span>
                  <span class="breakdown-value">-5%</span>
                </div>

                <div v-if="creditScore === 'poor'" class="breakdown-item penalty">
                  <span class="breakdown-label">Credit adjustment</span>
                  <span class="breakdown-value">+25%</span>
                </div>

                <div v-if="isHomeowner" class="breakdown-item discount">
                  <span class="breakdown-label">Homeowner bundle discount</span>
                  <span class="breakdown-value">-15%</span>
                </div>
              </div>
            </div> -->

            <div class="cta-section">
              <button class="cta-primary" @click="goToQuote()">Get Official Quote <externalLink/></button>
              <button class="cta-secondary" @click="resetCalculator">Start Over</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import externalLink from '../assets/icons/external-link.vue';
import { redirectWithParams } from '../mixins/utilsMixin';

export default {
  name: 'InsuranceCalculatorWide',
  components: {
    externalLink,
  },
  props: {
    componentProps: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      multipleVehicles: null,
      hasIncidents: null,
      age: null,
      zipCode: '',
      creditScore: '',
      isHomeowner: null,
      detectedState: '',
      baseRate: 0,
      showResults: false,
      calculatedRate: 0,
      isCalculating: false,

      // State insurance rates data
      stateRates: {
        Alabama: 1739,
        Alaska: 1468,
        Arizona: 1678,
        Arkansas: 1872,
        California: 2291,
        Colorado: 2040,
        Connecticut: 1905,
        Delaware: 2137,
        Florida: 2560,
        Georgia: 1897,
        Hawaii: 1336,
        Idaho: 1272,
        Illinois: 1501,
        Indiana: 1442,
        Iowa: 1390,
        Kansas: 1718,
        Kentucky: 2301,
        Louisiana: 2839,
        Maine: 1128,
        Maryland: 1741,
        Massachusetts: 1626,
        Michigan: 2639,
        Minnesota: 1777,
        Mississippi: 1678,
        Missouri: 1931,
        Montana: 1781,
        Nebraska: 1675,
        Nevada: 1961,
        'New Hampshire': 1368,
        'New Jersey': 1905,
        'New Mexico': 1649,
        'New York': 1898,
        'North Carolina': 1410,
        'North Dakota': 1442,
        Ohio: 1354,
        Oklahoma: 1918,
        Oregon: 1457,
        Pennsylvania: 1759,
        'Rhode Island': 1828,
        'South Carolina': 1731,
        'South Dakota': 1441,
        Tennessee: 1712,
        Texas: 1990,
        Utah: 1668,
        Vermont: 1373,
        Virginia: 1504,
        Washington: 1569,
        'West Virginia': 1955,
        Wisconsin: 1542,
        Wyoming: 1442,
      },

      // ZIP code to state mapping
      zipToState: {
        '350-369': 'Alabama',
        '995-999': 'Alaska',
        '850-865': 'Arizona',
        '716-729': 'Arkansas',
        '900-961': 'California',
        '800-816': 'Colorado',
        '060-069': 'Connecticut',
        '197-199': 'Delaware',
        '320-349': 'Florida',
        '300-319': 'Georgia',
        '967-968': 'Hawaii',
        '832-838': 'Idaho',
        '600-629': 'Illinois',
        '460-479': 'Indiana',
        '500-528': 'Iowa',
        '660-679': 'Kansas',
        '400-427': 'Kentucky',
        '700-714': 'Louisiana',
        '039-049': 'Maine',
        '206-219': 'Maryland',
        '010-027': 'Massachusetts',
        '480-499': 'Michigan',
        '550-567': 'Minnesota',
        '386-397': 'Mississippi',
        '630-658': 'Missouri',
        '590-599': 'Montana',
        '680-693': 'Nebraska',
        '890-898': 'Nevada',
        '030-038': 'New Hampshire',
        '070-089': 'New Jersey',
        '870-884': 'New Mexico',
        '100-149': 'New York',
        '270-289': 'North Carolina',
        '580-588': 'North Dakota',
        '430-458': 'Ohio',
        '730-749': 'Oklahoma',
        '970-979': 'Oregon',
        '150-196': 'Pennsylvania',
        '028-029': 'Rhode Island',
        '290-299': 'South Carolina',
        '570-577': 'South Dakota',
        '370-385': 'Tennessee',
        '750-799': 'Texas',
        '840-847': 'Utah',
        '050-059': 'Vermont',
        '220-246': 'Virginia',
        '980-994': 'Washington',
        '247-268': 'West Virginia',
        '530-549': 'Wisconsin',
        '820-831': 'Wyoming',
      },
    };
  },
  computed: {
    isFormComplete() {
      return this.multipleVehicles !== null
             && this.hasIncidents !== null
             && this.age > 0
             && this.zipCode.length === 5
             && this.creditScore !== ''
             && this.isHomeowner !== null
             && this.detectedState !== '';
    },

    completedQuestions() {
      let completed = 0;
      if (this.multipleVehicles !== null) completed++;
      if (this.hasIncidents !== null) completed++;
      if (this.age > 0) completed++;
      if (this.zipCode.length === 5 && this.detectedState) completed++;
      if (this.creditScore !== '') completed++;
      if (this.isHomeowner !== null) completed++;
      return completed;
    },

    progressPercentage() {
      return (this.completedQuestions / 6) * 100;
    },

    monthlyRangeLow() {
      return Math.round((this.calculatedRate - 120) / 12);
    },

    monthlyRangeHigh() {
      return Math.round((this.calculatedRate + 240) / 12);
    },

    annualRangeLow() {
      return this.calculatedRate - 120;
    },

    annualRangeHigh() {
      return this.calculatedRate + 240;
    },

    totalDiscount() {
      let discount = 0;
      if (this.multipleVehicles) discount += 0.10;
      if (this.creditScore === 'excellent') discount += 0.15;
      if (this.creditScore === 'good') discount += 0.05;
      if (this.isHomeowner) discount += 0.15;
      return discount;
    },
  },
  methods: {
    mapUserInfo() {
      const info = {
        zipcode: this.zipCode,
        homeowner: this.isHomeowner,
        bundle: this.isHomeowner,
        second_vehicle: this.multipleVehicles,
      };
      Object.keys(this.componentProps).forEach((key) => {
        info[key] = this.componentProps[key];
      });
      return info;
    },
    goToQuote() {
      this.mapUserInfo();
      redirectWithParams('insure.protect.com', this.mapUserInfo());
    },
    detectState() {
      if (this.zipCode.length >= 3) {
        const zip3 = this.zipCode.substring(0, 3);

        const foundEntry = Object.entries(this.zipToState).find(([range]) => {
          const [start, end] = range.split('-').map(Number);
          const zipNum = parseInt(zip3, 10);

          return zipNum >= start && zipNum <= end;
        });

        if (foundEntry) {
          this.detectedState = foundEntry[1];
          this.baseRate = this.stateRates[foundEntry[1]];
          return;
        }
      }

      if (this.zipCode.length === 5) {
        this.detectedState = 'National Average';
        this.baseRate = 1700;
      }
    },

    async calculateRate() {
      this.isCalculating = true;

      await new Promise((resolve) => setTimeout(resolve, 1500));

      let multiplier = 1;

      if (this.multipleVehicles) multiplier -= 0.10;
      if (this.hasIncidents) multiplier += 0.35;

      if (this.age < 25) multiplier += 0.40;
      else if (this.age > 65) multiplier += 0.15;

      switch (this.creditScore) {
        case 'excellent': multiplier -= 0.15; break;
        case 'good': multiplier -= 0.05; break;
        case 'poor': multiplier += 0.25; break;
        default: break;
      }

      if (this.isHomeowner) multiplier -= 0.15;

      this.calculatedRate = Math.round(this.baseRate * multiplier);
      this.isCalculating = false;
      this.showResults = true;
    },

    resetCalculator() {
      this.multipleVehicles = null;
      this.hasIncidents = null;
      this.age = null;
      this.zipCode = '';
      this.creditScore = '';
      this.isHomeowner = null;
      this.detectedState = '';
      this.baseRate = 0;
      this.showResults = false;
      this.calculatedRate = 0;
      this.isCalculating = false;
    },
  },
};
</script>

<style scoped>

.insurance-calculator-wide {
  max-width: 900px;
  margin: auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

/* Header */
.widget-header {
  color: white;
  padding: 32px 40px;
  text-align: center;
}

.widget-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.widget-subtitle {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
}

/* Progress */
.progress-bar {
  position: relative;
  height: 6px;
  background: #f1f5f9;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00d4aa, #667eea);
  transition: width 0.4s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  background: #f9f9f9;
  border: 1px solid #667eea;
  padding: 2px 6px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.10);
}

/* Layout */
.calculator-layout {
  min-height: 500px;
}

.questions-panel {
  padding: 32px 40px;
  border-right: 1px solid #e2e8f0;
}

.results-panel {
  padding: 32px;
  background: #f8fafc;
}

/* Questions */
.question-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 24px;
}

.question-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.question-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
}

.question-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: #667eea;
  color: white;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 700;
}

/* Toggle Buttons */
.toggle-group {
  display: flex;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.toggle-btn {
  flex: 1;
  padding: 10px 16px;
  border: none;
  background: white;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.toggle-btn:first-child {
  border-right: 1px solid #e2e8f0;
}

.toggle-btn:hover {
  background: #f8fafc;
}

.toggle-btn.active {
  background: #667eea;
  color: white;
}

/* Input Fields */
.compact-input {
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
  width: 100%;
}

.compact-input:focus {
  outline: none;
  border-color: #667eea;
}

.compact-select {
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s ease;
  width: 100%;
}

.compact-select:focus {
  outline: none;
  border-color: #667eea;
}

.input-with-state {
  position: relative;
}

.state-indicator {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.8rem;
  color: #667eea;
  font-weight: 600;
  pointer-events: none;
}

/* Calculate Button */
.calculate-button {
  width: 100%;
  padding: 16px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 24px;
  background: #f1f5f9;
  color: #64748b;
}

.calculate-button.complete {
  background: #f1f5f9;
  color: #64748b;
}
.calculate-button.ready {
  background: #667eea;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
}

.calculate-button.ready:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.calculate-button.calculating {
  background: #667eea;
  color: white;
}

.calculating-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.mini-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Results Panel */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.results-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  color: #64748b;
}

.placeholder-icon {
  font-size: 3rem;
  margin-bottom: 16px;
  opacity: 0.5;
}

.results-placeholder h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #374151;
}

.results-placeholder p {
  font-size: 0.95rem;
  margin-bottom: 24px;
  line-height: 1.5;
}

.progress-indicator {
  margin-top: 20px;
}

.progress-ring {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: conic-gradient(#667eea 0deg, #667eea calc(var(--progress) * 3.6deg), #e2e8f0 calc(var(--progress) * 3.6deg), #e2e8f0 360deg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-ring::before {
  content: '';
  position: absolute;
  width: 60px;
  height: 60px;
  background: #f8fafc;
  border-radius: 50%;
}

.progress-number {
  position: relative;
  font-size: 1rem;
  font-weight: 700;
  color: #667eea;
}

/* Results Display */
.results-display {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.results-header {
  text-align: center;
  margin-bottom: 24px;
}

.results-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 8px;
}

.confidence-badge {
  display: inline-block;
  padding: 4px 12px;
  background: #e0f2fe;
  color: #0369a1;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.rate-showcase {
  text-align: center;
  margin-bottom: 24px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.monthly-rate {
  margin-bottom: 8px;
}

.rate-range {
  font-size: 2.5rem;
  font-weight: 900;
  color: #0f172a;
  line-height: 1;
}

.rate-period {
  font-size: 1.2rem;
  color: #64748b;
  margin-left: 4px;
}

.annual-rate {
  font-size: 0.95rem;
  color: #64748b;
}

.savings-highlight {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #ecfdf5, #d1fae5);
  border: 1px solid #86efac;
  border-radius: 12px;
  margin-bottom: 24px;
}

.savings-icon {
  font-size: 1.5rem;
}

.savings-text {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.savings-amount {
  font-weight: 700;
  color: #166534;
  font-size: 1.1rem;
}

.savings-desc {
  font-size: 0.85rem;
  color: #16a34a;
}

/* Breakdown */
.breakdown-section {
  flex: 1;
  margin-bottom: 24px;
}

.breakdown-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
}

.breakdown-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
  font-size: 0.85rem;
}

.breakdown-item.base {
  font-weight: 600;
  color: #374151;
}

.breakdown-item.discount {
  color: #059669;
  background: #ecfdf5;
}

.breakdown-item.penalty {
  color: #dc2626;
  background: #fef2f2;
}

/* CTA Section */
.cta-section {
  display: flex;
  gap: 12px;
}

.cta-primary {
  flex: 2;
  padding: 14px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.cta-primary:hover {
  background: #5a67d8;
}

.cta-secondary {
  flex: 1;
  padding: 14px 20px;
  background: white;
  color: #64748b;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cta-secondary:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}

/* Responsive */
@media (max-width: 1024px) {
  .calculator-layout {
    grid-template-columns: 1fr;
  }

  .results-panel {
    border-top: 1px solid #e2e8f0;
  }

  .question-row {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .widget-header {
    padding: 24px 20px;
  }

  .questions-panel {
    padding: 24px 20px;
  }

  .results-panel {
    padding: 24px 20px;
  }

  .widget-title {
    font-size: 1.5rem;
  }
}
</style>

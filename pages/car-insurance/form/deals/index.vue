<script setup>
import { redirectWithParams } from '~/composables/utils'

definePageMeta({
  layout: false,
  gtm: false,
})

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;600;700&display=swap' },
  ],
  script: [
    { src: 'https://rttracking.protect.com/uniclick.js?attribution=lastpaid&cookiedomain=protect.com&cookieduration=90&defaultcampaignid=68c9bcd22af551454ef88733&regviewonce=false', async: true },
  ],
})

const { proxy: ga } = useScriptGoogleAnalytics({ id: 'G-NGMYQLELL2' }, { trigger: 'onNuxtReady' })

const route = useRoute()
const ga4SessionId = ref(null)

const getGA4SessionId = () => {
  const match = document.cookie.match(/(^| )_ga_NGMYQLELL2=([^;]+)/)
  if (match) {
    const sessionIdMatch = decodeURIComponent(match[2]).match(/[\.\$]s([\d]+)/)
    return sessionIdMatch ? sessionIdMatch[1] : null
  }
  return null
}

onMounted(() => {
  ga.gtag('event', 'landing')

  const sid = getGA4SessionId()
  if (sid) {
    ga4SessionId.value = sid
  } else {
    let attempts = 0
    const poll = setInterval(() => {
      attempts++
      const sid = getGA4SessionId()
      if (sid) {
        ga4SessionId.value = sid
        clearInterval(poll)
      } else if (attempts > 30) {
        clearInterval(poll)
      }
    }, 100)
  }

})

const selectInsured = (value) => {
  redirectWithParams('https://deals.protect.com', {
    ...route.query,
    insured: value,
    ...(ga4SessionId.value && { ga_session: ga4SessionId.value }),
  })
}
</script>

<template>
  <div class="page">

    <!-- Header -->
    <header class="regionHeader">
      <div class="container-fluid">
        <div class="headhold">
          <div class="logohold">
            <img
              src="https://product.impressure.io/build/images/protect_logo_blue.svg"
              alt="Protect Logo"
              width="130"
              height="30"
            />
          </div>
        </div>
      </div>
    </header>

    <!-- Main -->
    <div class="regionMain">
      <div class="container-fluid">
        <div class="stack">

          <!-- Progress Bar -->
          <div class="progress-bar" id="progressBar">

            <div class="step active" data-step="1">
              <div class="step-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg" data-testid="start-nav-icon">
                  <path d="M7.49999 9.99999L9.16666 11.6667L12.9167 7.91666M14.9176 4.16541C15.0892 4.58043 15.4186 4.91032 15.8334 5.08255L17.2877 5.68497C17.7027 5.85689 18.0325 6.18665 18.2044 6.60171C18.3763 7.01676 18.3763 7.48311 18.2044 7.89816L17.6024 9.35149C17.4304 9.76673 17.4302 10.2336 17.603 10.6486L18.2039 12.1015C18.2891 12.3071 18.333 12.5274 18.333 12.7499C18.3331 12.9725 18.2893 13.1928 18.2041 13.3984C18.1189 13.604 17.9941 13.7908 17.8367 13.9482C17.6793 14.1055 17.4925 14.2303 17.2869 14.3154L15.8336 14.9174C15.4186 15.089 15.0887 15.4184 14.9165 15.8331L14.3141 17.2875C14.1422 17.7026 13.8125 18.0323 13.3974 18.2042C12.9824 18.3762 12.516 18.3762 12.101 18.2042L10.6477 17.6023C10.2327 17.4308 9.76651 17.4311 9.35172 17.6032L7.8974 18.2048C7.48259 18.3763 7.01667 18.3762 6.60196 18.2044C6.18726 18.0326 5.8577 17.7032 5.68567 17.2886L5.08309 15.8338C4.91149 15.4188 4.58211 15.0889 4.16736 14.9167L2.71304 14.3143C2.29819 14.1424 1.96854 13.8129 1.79656 13.398C1.62458 12.9832 1.62435 12.5171 1.79591 12.1021L2.39788 10.6488C2.56937 10.2337 2.56902 9.76753 2.3969 9.35273L1.7958 7.89731C1.71058 7.69174 1.66669 7.47139 1.66666 7.24885C1.66662 7.02631 1.71043 6.80595 1.79559 6.60035C1.88075 6.39475 2.00559 6.20795 2.16296 6.05062C2.32034 5.89328 2.50718 5.76851 2.71279 5.68341L4.16607 5.08142C4.58072 4.90997 4.91039 4.58099 5.08274 4.1667L5.68514 2.71233C5.85706 2.29728 6.1868 1.96752 6.60184 1.7956C7.01688 1.62368 7.48321 1.62368 7.89825 1.7956L9.35153 2.39759C9.76658 2.56908 10.2327 2.56873 10.6475 2.39661L12.1025 1.79653C12.5174 1.62471 12.9837 1.62474 13.3986 1.79663C13.8136 1.96852 14.1433 2.29818 14.3152 2.71313L14.9178 4.16793L14.9176 4.16541Z"/>
                </svg>
              </div>
            </div>

            <div class="connector"><div class="connector-fill" style="width: 25%;"></div></div>

            <div class="step" data-step="2">
              <div class="step-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" data-testid="cars-nav-icon">
                  <path d="M17.0084 3.7183C16.7443 2.99546 16.2646 2.37114 15.6342 1.92972C15.0037 1.4883 14.253 1.25105 13.4834 1.25005H7.18342C6.41383 1.25105 5.6631 1.4883 5.03269 1.92972C4.40228 2.37114 3.92258 2.99546 3.65842 3.7183L1.63342 9.28855C1.43426 9.83715 1.33273 10.4164 1.33342 11V11.75C1.33476 12.3296 1.471 12.901 1.73135 13.4188C1.9917 13.9366 2.36901 14.3868 2.83342 14.7335C2.83342 14.7395 2.83342 14.744 2.83342 14.75V16.25C2.83342 16.8468 3.07048 17.4191 3.49243 17.841C3.91439 18.263 4.48669 18.5 5.08342 18.5C5.68016 18.5 6.25246 18.263 6.67441 17.841C7.09637 17.4191 7.33342 16.8468 7.33342 16.25V15.5H13.3334V16.25C13.3334 16.8468 13.5705 17.4191 13.9924 17.841C14.4144 18.263 14.9867 18.5 15.5834 18.5C16.1802 18.5 16.7525 18.263 17.1744 17.841C17.5964 17.4191 17.8334 16.8468 17.8334 16.25V14.75C17.8334 14.744 17.8334 14.7395 17.8334 14.7335C18.2978 14.3868 18.6751 13.9366 18.9355 13.4188C19.1958 12.901 19.3321 12.3296 19.3334 11.75V11C19.3342 10.4166 19.2326 9.83763 19.0334 9.2893L17.0084 3.7183ZM5.06992 4.2313C5.2285 3.79792 5.51613 3.42358 5.89403 3.15873C6.27193 2.89387 6.72195 2.75124 7.18342 2.75005H13.4834C13.9452 2.75093 14.3955 2.89342 14.7737 3.1583C15.1519 3.42317 15.4398 3.79768 15.5984 4.2313L17.2394 8.75005H3.42667L5.06992 4.2313ZM5.83342 16.25C5.83342 16.449 5.75441 16.6397 5.61375 16.7804C5.4731 16.921 5.28234 17 5.08342 17C4.88451 17 4.69375 16.921 4.55309 16.7804C4.41244 16.6397 4.33342 16.449 4.33342 16.25V15.425C4.58027 15.4752 4.83154 15.5003 5.08342 15.5H5.83342V16.25ZM16.3334 16.25C16.3334 16.449 16.2544 16.6397 16.1138 16.7804C15.9731 16.921 15.7823 17 15.5834 17C15.3845 17 15.1937 16.921 15.0531 16.7804C14.9124 16.6397 14.8334 16.449 14.8334 16.25V15.5H15.5834C15.8353 15.5003 16.0866 15.4752 16.3334 15.425V16.25ZM17.8334 11.75C17.8334 12.3468 17.5964 12.9191 17.1744 13.341C16.7525 13.763 16.1802 14 15.5834 14H5.08342C4.48669 14 3.91439 13.763 3.49243 13.341C3.07048 12.9191 2.83342 12.3468 2.83342 11.75V11C2.83648 10.7475 2.86691 10.496 2.92417 10.25H4.33342V11C4.33342 11.199 4.41244 11.3897 4.55309 11.5304C4.69375 11.671 4.88451 11.75 5.08342 11.75C5.28234 11.75 5.4731 11.671 5.61375 11.5304C5.75441 11.3897 5.83342 11.199 5.83342 11V10.25H14.8334V11C14.8334 11.199 14.9124 11.3897 15.0531 11.5304C15.1937 11.671 15.3845 11.75 15.5834 11.75C15.7823 11.75 15.9731 11.671 16.1138 11.5304C16.2544 11.3897 16.3334 11.199 16.3334 11V10.25H17.7427C17.8 10.496 17.8304 10.7475 17.8334 11V11.75Z"/>
                </svg>
              </div>
            </div>

            <div class="connector"><div class="connector-fill"></div></div>

            <div class="step" data-step="3">
              <div class="step-icon">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" data-testid="drivers-nav-icon">
                  <path d="M17.5 18.375C17.5 17.1539 17.5 16.5433 17.3493 16.0465C17.01 14.9279 16.1346 14.0525 15.016 13.7132C14.5192 13.5625 13.9086 13.5625 12.6875 13.5625H8.3125C7.09138 13.5625 6.48082 13.5625 5.984 13.7132C4.8654 14.0525 3.99004 14.9279 3.65071 16.0465C3.5 16.5433 3.5 17.1539 3.5 18.375M14.4375 6.5625C14.4375 8.73712 12.6746 10.5 10.5 10.5C8.32538 10.5 6.5625 8.73712 6.5625 6.5625C6.5625 4.38788 8.32538 2.625 10.5 2.625C12.6746 2.625 14.4375 4.38788 14.4375 6.5625Z"/>
                </svg>
              </div>
            </div>

            <div class="connector"><div class="connector-fill"></div></div>

            <div class="step" data-step="4">
              <div class="step-icon">
                <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                  <rect x="12" y="24" width="28" height="20" rx="3" stroke="currentColor" stroke-width="3.5" fill="none"/>
                  <path d="M18 24v-6a8 8 0 1116 0v6" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" fill="none"/>
                  <circle cx="26" cy="34" r="2.5" fill="currentColor"/>
                </svg>
              </div>
            </div>

          </div>

          <!-- Heading -->
          <div class="section">
            <h2 class="main-heading">Are you currently insured?</h2>
          </div>

          <!-- Form -->
          <div class="section">
            <form>
              <div class="radioButtons">
                <label @click="selectInsured('yes')">
                  <span class="radio-material">
                    <input name="insured" type="radio" value="Yes" />
                  </span>
                  <span class="label__text">Yes</span>
                </label>
                <label @click="selectInsured('no')">
                  <span class="radio-material">
                    <input name="insured" type="radio" value="No" />
                  </span>
                  <span class="label__text">No</span>
                </label>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="regionFooter">
      <div class="container-fluid">
        <div id="footer-disclaimer">
          <p id="info">
            <a href="https://dmsunsub.io/" target="_blank" rel="noopener">Do Not Sell Or Share My Personal Information</a>
          </p>
          <p>
            Protect.com |
            <a href="https://easy.protect.com/privacy.php" target="_blank" rel="noopener">Privacy Policy</a> |
            <a href="https://easy.protect.com/terms.php" target="_blank" rel="noopener">Terms Of Use</a> |
            <a href="https://easy.protect.com/california.php" target="_blank" rel="noopener">California Privacy Notice</a>
          </p>
          <p>
            Advertised rates vary by individual factors (history, location, vehicle) and may not be available to all. Protect.com® is an online marketplace, not a licensed insurer or agency. We do not provide quotes or represent specific carriers; we connect you with licensed local agents to obtain quotes. We are not responsible for the actions of third-party providers. All trademarks are property of their respective owners. Protect.com® is a registered trademark of Digital Media Solutions, LLC. © 2026 All rights reserved.
          </p>
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page {
  --mainFont: "Google Sans Flex", sans-serif;
  --grayBackground: #f8f9f9;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.87);
  background: var(--grayBackground);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  line-height: 20px;
}

.container-fluid {
  width: 100%;
  padding: 0 15px;
}

/* Header */
.regionHeader {
  min-height: 66px;
  background: var(--grayBackground);
  border-bottom: 1px solid #ddd;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.headhold {
  display: flex;
  align-items: center;
  max-width: 970px;
  margin: 0 auto;
  height: 66px;
}

.logohold img {
  width: 130px;
  height: auto;
  display: block;
}

/* Main */
.regionMain {
  flex: 1;
  background: var(--grayBackground);
  padding-bottom: 100px;
}

.stack {
  width: 690px;
  max-width: 100%;
  margin: 0 auto;
}

.section {
  padding: 0;
  margin: 5px 0 15px;
}

/* Progress Bar */
.progress-bar {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 420px;
  padding: 32px 0;
  gap: 10px;
  margin: 0 auto;
}

.step {
  display: flex;
}

.step-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-icon svg {
  width: 100%;
  height: 100%;
  color: #c0c4cc;
  transition: color 0.4s ease;
}

.step.active .step-icon svg,
.step.completed .step-icon svg {
  color: #4cbfa6;
}

.connector {
  flex: 1;
  height: 2px;
  background: #e0e2e7;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
}

.connector-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0%;
  background: #4cbfa6;
  border-radius: 3px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Heading */
.main-heading {
  font-size: 32px;
  color: #333;
  font-family: var(--mainFont);
  font-weight: 600;
  margin: 5px auto 20px;
  padding: 5px 0;
  position: relative;
  line-height: 1.2;
}

/* Form */
form {
  width: 670px;
  max-width: 100%;
  margin: 0 auto 20px;
}

.radioButtons {
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 670px;
  max-width: 100%;
}

.radioButtons label {
  display: block;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    rgba(24, 26, 27, 0.03) 0px 1px 2px 0px,
    rgba(24, 26, 27, 0.06) 0px 2px 6px 0px;
  font-size: 1.1em;
  padding: 20px;
  border: 1px solid #d7d7d7;
  text-align: left;
  cursor: pointer;
  transition: border 0.15s, box-shadow 0.15s;
  color: #222;
  line-height: 20px;
}

.radioButtons label:hover {
  border: 1px solid #aaa;
}

.radio-material {
  display: none;
}

.label__text {
  display: block;
  font-size: 1.1em;
  color: #222;
}

/* Footer */
.regionFooter {
  background: var(--grayBackground);
  font-size: 16px;
  color: #333;
}

.regionFooter .container-fluid {
  max-width: 100%;
  padding: 0 15px 24px;
}

#footer-disclaimer {
  max-width: 1170px;
  margin: 50px auto 0;
  text-align: center;
  font-size: 13px;
  color: #888;
}

#footer-disclaimer p {
  margin-bottom: 5px;
  line-height: 1.5;
}

.regionFooter a {
  color: #888;
  text-decoration: none;
}

.regionFooter a:hover {
  text-decoration: underline;
}

/* Progress Container (percentage bar) */
#progress-container {
  background: #f5f8f7;
  border-radius: 50px;
  height: 1.1em;
  border: 1px solid #efefef;
  box-shadow: none !important;
  margin: 10px auto;
  width: 100%;
}

.progress .progress-bar {
  background: #66c296;
  height: 1em;
}

.progress-left {
  height: 1.1em;
  display: inline-block;
  border-radius: 50px;
  background: #66c296;
  position: relative;
  top: -1px;
}

/* Mobile */
@media screen and (max-width: 768px) {
  .main-heading {
    font-weight: 700;
    font-size: 1.3em;
  }

  .radioButtons,
  form {
    width: 100%;
  }

  #progress-container {
    margin: 20px auto;
    width: 90%;
  }
}
</style>

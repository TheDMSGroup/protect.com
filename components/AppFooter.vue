<template>
  <footer class="footer">
    <div class="container">
      <div class="row footer-columns">
        <div class="footer-column">
          <div class="logo">
            <NuxtImg alt="Protect logo" src="/assets/protect_logo_tm.svg" />
          </div>
          <ul>
            <li><NuxtLink to="/car-insurance">Auto Insurance</NuxtLink></li>
            <!--<li><NuxtLink to="/insurance/life">Life Insurance</NuxtLink></li>-->
            <li><NuxtLink to="/health-insurance">Health Insurance</NuxtLink></li>
            <!-- <li><NuxtLink to="/insurance/medicare">Medicare</NuxtLink></li> -->
            <li><NuxtLink to="/home-insurance">Home Insurance</NuxtLink></li>
          </ul>
        </div>
        <!--<div class="footer-column">
          <h5>
            <router-link to="/mortgage">Mortgage Policies</router-link>
          </h5>
          <ul>
            <li><router-link to="/mortgage/refinance">Refinance Home</router-link></li>
            <li><router-link to="/mortgage/purchase">Purchase Home</router-link></li>
          </ul>
          <h5 style="margin-top: 15px;">
            <router-link to="/home-security">Home Security Policies</router-link>
          </h5>
          <ul>
            <li><router-link to="/home-security/monitored-security">Monitored Security</router-link></li>
            <li><router-link to="/home-security/diy-home-security">Self-Monitored</router-link></li>
          </ul>
        </div>
        <div class="footer-column">
          <h5>
            <router-link to="/identity">Identity Policies</router-link>
          </h5>
          <ul>
            <li><router-link to="/identity/antivirus-protection">Antivirus Protection</router-link></li>
            <li><router-link to="/identity/identity-monitoring">Identity Monitoring</router-link></li>
          </ul>
        </div>-->

        <!-- <div class="footer-column">
          <div class="footer-section">
            <h5>Marketing</h5>
            <ul>
              <li><router-link to="/advertisers">Advetisers</router-link></li>
              <li><router-link to="/publishers">Publishers</router-link></li>
            </ul>
          </div>
          <div class="footer-section">
            <h5>About Us</h5>
            <ul>
              <li><router-link to="/who-we-are">Who We Are</router-link></li>
              <li><router-link to="/our-products">Our Products</router-link></li>
              <li><router-link to="/press">Press</router-link></li>
            </ul>
          </div>
        </div>

        <div class="footer-column">
          <div class="footer-section">
            <h5>Articles</h5>
            <ul>
              <li>Latest</li>
              <li>Popular</li>
              <li>How-Tos</li>
              <li>Reviews</li>
            </ul>
          </div>
          <div class="footer-section">
            <h5>Account</h5>
            <ul>
              <li>Log in</li>
              <li>Sign Up</li>
              <li>Settings</li>
            </ul>
          </div>
        </div> -->
      </div>
      <div class="row footer-columns">
        <div class="privacy-policies">
          <p>
            <a href="https://dmsunsub.io/" target="_blank">Do Not Sell Or Share My Personal Information</a> |
            <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink> | <NuxtLink to="/terms">Terms Of Use</NuxtLink> |
            <NuxtLink to="/privacy-notice">California Privacy Notice</NuxtLink>
          </p>
          <p>
            The specified use of this site is to accurately match users to the auto insurance companies to best meet their needs. We do not provide
            insurance and we do not represent any specific insurance provider or automobile makes and/or models. Auto Insurance is a top online
            insurance marketplaces that connects consumers with multiple insurance companies and local agents across the United States. We are not an
            insurance company or agency and we are not directly affiliated with any particular insurance company. If you do not receive a quote from a
            specific company you were searching for, we recommend contacting that company directly so you can compare the quotes you receive from us
            with one from them. All trademarks and copyrights are the property of their respective owners. Protect.com® and its logos are trademarks
            or registered trademarks of SchoolAdvisor, LLC. Digital Media Solutions, LLC. All rights reserved. 4800 140th Ave N. Ste 101, Clearwater,
            FL 33762.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
  .footer {
    width: 100%;
    text-align: left;
    padding: 5em 0 6em;
    min-height: 587px;

    a {
      &:hover {
        color: #040f22;
        text-decoration: none;
      }
    }

    @include media-breakpoint-down(sm) {
      padding: 3em 1em;
    }

    .footer-columns {
      display: flex;
      padding-bottom: 15px;

      @include media-breakpoint-down(sm) {
        flex-wrap: wrap;
        border: 0;
        padding-bottom: 0;
      }

      .footer-column {
        width: 25%;

        @include media-breakpoint-down(md) {
          width: 50%;
        }
        @include media-breakpoint-down(sm) {
          width: 100%;
        }

        .logo {
          margin-bottom: 1em;

          img {
            max-width: 120px;
          }
        }

        .address {
          p {
            margin: 0;

            @include media-breakpoint-down(md) {
              font-size: 1em;
            }
          }
        }

        .footer-links {
          margin-top: 1.5em;

          @include media-breakpoint-down(sm) {
            margin-top: 1em;
          }
        }

        h5,
        h5 a {
          font-weight: 800;
          color: #666;

          @include media-breakpoint-down(md) {
            margin-top: 1.25em;
          }
          @include media-breakpoint-down(sm) {
            font-size: 1.4em;
            color: $blue;
          }
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-section {
          min-height: 180px;

          @include media-breakpoint-down(sm) {
            min-height: initial;
          }
        }
      }
      .privacy-policies {
        padding-top: 30px;
        p {
          font-size: 12px;
          text-align: center;
        }
      }
    }
  }
</style>

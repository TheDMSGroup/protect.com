<template>
  <div class="join-newsletter">
    <div class="container">
      <div class="row join-newsletter-content">
        <div class="col-sm-12 col-md-12 col-lg-6 join-newsletter-left">
          <h2>Subscribe to Protect.com</h2>
          <h3>
            Receive tips and expert advice to help you save when you protect the things that matter most.
          </h3>
        </div>
        <div class="join-newsletter-right">
          <!-- TO DO: style form -->
          <form class="join-newsletter-form" v-if="!this.submitComplete" @submit.prevent>
            <inputs
            :value="emailaddress"
            :state="true"
            :valid="validateEmail()"
            @input="set('emailaddress', $event)"
            @keyup.enter="submit"
            :config="{
              label: 'Enter Email Address',
              invalidFeedback: 'Please input an email address',
              noCheckMark: true,
              name: 'newsletter-email'
              }"></inputs>
            <b-buttons class="" :disabled="!validateEmail()" :config="{ click: submit, size: 'lg', variant: 'primary',
            label:'SUBSCRIBE NOW', icon:'arrow-right-short'}"></b-buttons>
          </form>
          <div
            v-if="submitClicked || submitComplete"
            class="response">
            <div class="join-newsletter-thanks" v-if="submitClicked">
              <p>Processing...</p>
            </div>
            <div class="join-newsletter-thanks" v-else-if="submitComplete">
              <p>You have subscribed!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Inputs from './Inputs/Main.vue';
import BButtons from './Buttons/Main.vue';

export default {
  name: 'JoinNewsletter',
  components: {
    Inputs, BButtons,
  },
  data() {
    return {
      emailaddress: '',
      submitClicked: false,
      submitComplete: false,
      baseURL: (process.env.NODE_ENV === 'development') ? 'https://stage-api.protect.com' : 'https://api.protect.com',
    };
  },
  methods: {
    async sendySubscribe() {
      await axios({
        method: 'get',
        url: `${this.baseUrl}/newsletter/subscribe/?email=${this.emailaddress}`,
      });
      this.formSubmitted();
    },
    formSubmitted() {
      this.submitClicked = false;
      this.submitComplete = true;
      this.emailaddress = '';
    },
    set(field, value) {
      this[field] = value;
    },
    submit() {
      this.submitComplete = false;
      this.submitClicked = true;
      this.sendySubscribe();
    },
    validateEmail() {
      if (this.emailaddress) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.emailaddress);
      }
      return false;
    },
  },
};
</script>

<style lang="scss">

.join-newsletter {
  width: 100%;
  text-align: left;
  background-color: $green-light;
  padding: 4em 0;

  label[for='newsletter-email'] {
    left: 15px;
  }
  @include media-breakpoint-down(sm) {
    padding: 2em 1em;
  }

  .join-newsletter-content {
    display: flex;
    padding-right: 1em;

    @include media-breakpoint-down(md) {
      justify-content: space-between;
    }

    @include media-breakpoint-down(sm) {
      flex-wrap: wrap;
    }

    .join-newsletter-left {
      width: 50%;

      @include media-breakpoint-down(md) {
        width: 30%;
        margin-bottom: 1.5em;
      }

      @include media-breakpoint-down(sm) {
        width: 100%;
      }

      h2 {
        color: $blue-light;
        font-size: 2.8em;
      }

      h3 {
        color: $gray-dark;
        font-size: 28px;
      }
    }
  }

  .join-newsletter-right {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @include media-breakpoint-down(md) {
      padding: 0 15px;
      width: 100%;

      .inputs-wrapper {
        width: 70%;
      }
    }
    .inputs-wrapper {
      @include media-breakpoint-down(sm) {
        width: 100%;
      }
    }

    .response {
      height: 50px;
      width: 100%;
    }

    .join-newsletter-thanks {
      padding-top: 1em;

      p {
        font-size: 12px;
      }
    }
    .join-newsletter-form {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      width: 100%;

      #newsletter-email {
        border-radius: 0.3rem;
        width: 350px;

        @include media-breakpoint-down(lg) {
          width: auto;
        }
      }

      button {
        height: 80px;
        padding: 1em 1.2em;
        margin-left: 1em;

        @include media-breakpoint-down(xl) {
          font-size: 1rem;
        }
        @include media-breakpoint-down(sm) {
          margin: 1em 0;
          width: 100%;
        }
      }

      .valid {
        @include media-breakpoint-down(sm) {
          width: 100%;
        }
      }

      span {
        @include media-breakpoint-down(sm) {
          width: 100%;
        }
      }
    }
  }
}
</style>

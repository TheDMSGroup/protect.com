<template>
  <div class="input-quote-ad">
    <div
    class="ad">
      <div class="ad-header">
        <img class="pick-logo" v-if="logoPath(pick[0].logo)" :src="logoPath(pick[0].logo)" />
        <div class="header-input">
          <label>Enter Zip Code</label>
          <input placeholder="Zip Code" />
          <span class="go" @click="goTo(pick[0].target)">
            <b-buttons
              :config="{
                size: 'md',
                variant: 'primary',
                label: 'GET STARTED',
                icon: 'arrow-right-short',
              }">
            </b-buttons>
          </span>
        </div>
      </div>
      <div class="pick-body">
        <div class="pick-body-left">
          <p class="top-pick-description">{{pick[0].description}}</p>
          <p class="top-pick-description-secondary">{{pick[0].descriptionSecondary}}</p>
        </div>
        <div class="pick-body-right">
          <img class="pick-logo" v-if="logoPath(pick[0].image)" :src="logoPath(pick[0].image)" />
        </div>
      </div>
    </div>
    <p class="sponsored-listings">sponsored listings</p>
  </div>
</template>
<script>
import viewMixin from '../../default/mixins/viewMixin';
import BButtons from './Buttons/Main.vue';

export default {
  mixins: [viewMixin],
  components: { BButtons },
  name: 'InputQuoteAd',
  props: {
    pick: Array,
  },
  data() {
    return {
      site_name: this.$store.state.site_name,
    };
  },
  methods: {
    getBackground(path) {
      const option = {};
      if (this.backgroundPath(path)) {
        option.background = 'url(' + this.backgroundPath(path) + ') no-repeat 0 bottom / 100% auto';
        return option;
      }
      return false;
    },
    backgroundPath(path) {
      if (typeof path !== 'undefined') {
        return require('./VerticalSubsection/images/' + path);
      }

      return false;
    },
    logoPath(logo) {
      return require('./VerticalSubsection/images/' + logo);
    },
  },
  mounted() {},
  created() {},
};
</script>
<style lang="scss">

.subsection-toppick-button {
  button.btn.btn-primary {
    font-weight: bold;
    padding: 15px 15px 15px 25px;
    .button-icon {
      padding-top: 0px;
    }
  }
}
</style>
<style lang="scss" scoped>

.input-quote-ad {
  @include media-breakpoint-down(md) {
    display: none;
  }

  .ad {
    box-shadow: 5px 1px 20px 0px rgba(0, 0, 0, 0.05);
    position: relative;
    border-radius: 5px;
    border: 1px solid #cccccc;
    padding: 25px;
    margin-bottom: 10px;

    .ad-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5em;

      @include media-breakpoint-down(xl) {
        flex-direction: column;
      }

      .pick-logo {
        width: 200px;
      }

      .header-input {
        padding-top: 1em;

        @include media-breakpoint-down(xl) {
          margin-top: 1em;
        }

        label {
          position: absolute;
          top: 17px;
          font-size: 0.875em;
          color: $gray-dark;

          @include media-breakpoint-down(xl) {
            top: 84px;
          }
        }

        input {
          width: 120px;
          height: 40px;
          box-shadow: 0 0 16px -5px rgba(0,0,0,.18);
          border: 1px solid #ced4da;
          outline: none;
          margin-right: 0.5em;
          border-radius: 4px;
          padding: 6px;

          @include media-breakpoint-down(xl) {
            margin-top: 0.5em;
          }
        }
      }
    }

    .pick-body {
      display: flex;

      .pick-body-left {
        width: 50%;

        .top-pick-description {
          font-size: 18px;
          color: $gray;
          padding-top: 10px;
        }

        .top-pick-description-secondary {
          font-size: 18px;
          color: $gray;
          padding-top: 10px;
          margin-bottom: 0;
        }
      }

      .pick-body-right {
        width: 50%;

        img {
          width: 100%;
        }
      }
    }
  }

  .sponsored-listings {
    font-size: 12px;
    color: #999999;
    text-align: right;
  }
}
</style>

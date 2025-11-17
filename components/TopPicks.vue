<template>
  <div class="toppick-container">
    <p class="top-pick-header">
      {{ headline + (picks.length > 1 ? 'S' : '') }}
    </p>
    <div
    class="toppick-pick"
    v-bind:class="{ 'tall-pick': getBackground(pick.background), 'short-pick': !getBackground(pick.background) }"
    v-for="pick in picks" v-bind:key="pick.description"
    v-bind:style="getBackground(pick.background)"
    @click="goTo(pick.target)">
      <img class="pick-logo" v-if="logoPath(pick.logo)" :src="logoPath(pick.logo)" />
      <p class="top-pick-description">{{pick.description}}</p>
      <div class="subsection-toppick-button" v-if="getBackground(pick.background)">
        <b-buttons
          :config="{
            size: 'sm',
            variant: 'primary',
            label: 'GET STARTED',
            icon: 'arrow-right-short',
          }">
        </b-buttons>
      </div>
      <div v-else class="subsection-toppick-link">
        <a>GET A QUOTE</a>
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
  name: 'TopPicks',
  props: ['title', 'description', 'dataZoneId', 'picks', 'topPickHeadline'],
  data() {
    return {
      site_name: this.$store.state.site_name,
    };
  },
  computed: {
    headline() {
      if (typeof this.topPickHeadline !== 'undefined') {
        return this.topPickHeadline;
      }
      return 'OUR TOP PICK';
    },
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

.toppick-container {
  font-family: 'Nunito Sans', sans-serif;
  text-align: left;
  &:hover {
    cursor: pointer;
  }
  .toppick-pick {
    box-shadow: 5px 1px 20px 0px rgba(0, 0, 0, 0.05);
    position: relative;
    &.tall-pick {
      min-height: 400px;

      @include media-breakpoint-down(md) {
        min-height: 600px;
      }
      @include media-breakpoint-down(sm) {
        min-height: 475px;
      }
    }
    &.short-pick {
      padding: 22px 22px 5px;
      p {
        max-width: 75%;
        font-size: 18px;
        line-height: normal;
      }
    }
    border-radius: 5px;
    border: 1px solid #cccccc;
    padding: 25px;
    margin-bottom: 10px;

    .pick-logo {
      max-width: 125px;

      @include media-breakpoint-down(xl) {
        max-width: 100px;
      }
    }
    .top-pick-description {
      font-size: 18px;
      color: $gray;
      padding-top: 10px;
    }
  }
  .subsection-toppick-button {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  .subsection-toppick-link {
    position: absolute;
    top: 20px;
    right: 20px;
    color: #66c296;
    border-bottom: 2px solid #66c296;
    font-size: 12px;

    @include media-breakpoint-between(lg, lg) {
      font-size: 8px;
    }
    a {
      color: #66c296;
      font-weight: bold;
    }
  }
  .sponsored-listings {
    font-size: 12px;
    color: #999999;
    text-align: right;
  }
  .top-pick-header {
    font-size: 18px;
    font-weight: bold;
    color: #12316b;
    margin-bottom: 5px;
  }
}
</style>

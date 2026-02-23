<script setup>
  import { iconLoader } from "~/composables/icons.js";

  const props = defineProps({
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
    value: {
      type: String,
      required: false,
      default: null,
    },
  });

  const hovered = ref(false);
  const iconComponentName = iconLoader(props?.icon || null);
</script>

<template>
  <span @mouseover="hovered = true" @mouseleave="hovered = false">
    <router-link :to="value ? '/' + value : ''" class="item-box" :class="{ noicon: !value }">
      <span class="row">
        <div class="button-label">
          <component class="button-label-icon" v-if="iconComponentName" :is="iconComponentName" />
          <div class="button-label-empty" v-else></div>
          <p>{{ text }}</p>
        </div>
        <div class="button-label-indicator">
          <div v-if="value">
            <svg viewBox="0 0 100 100" class="button-icon">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#d9d9d9" stroke-width="3" />
              <circle v-if="hovered" cx="50" cy="50" r="24" fill="#d9d9d9" stroke="none" />
            </svg>
          </div>
        </div>
      </span>
    </router-link>
  </span>
</template>

<style lang="scss" scoped>
  .item-box {
    display: block;
    padding: 10px;
    border: 1px solid #d9d9d9;
    box-shadow: 0px 0px 16px -5px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    margin-bottom: 25px;
    height: auto;

    &:hover {
      text-decoration: none;
    }
    .elixr-icon {
      width: 50px;
      height: 50px;
      fill: #4153b3;
      margin: 0 0 10px;
    }
    p {
      font-weight: 700;
      color: $blue;
      padding: 0;
      margin-bottom: 0;
    }
    &.noicon {
      background: #3b54bb;
      .row {
        align-items: center;
        display: flex;
        justify-content: bottom;
        padding: 0 10px;
        min-height: 120px;

        @include media-breakpoint-down(md) {
          .button-label p {
            max-width: 100%;
          }
          min-height: 60px;
        }
        .button-label {
          flex-direction: column;
          display: flex;

          .button-label-empty {
            flex-grow: 1;
          }
          p {
            padding: 0 0 0 10px;
            color: white;
            max-width: 60%;
          }
        }

      }
    }
    .row {
      padding: 0 25px;
      height: 100%;
      flex-wrap: nowrap;
      margin: 0;
      .button-label,
      .button-label-indicator {
        padding: 0;
        width: auto;
      }
      .button-label {
        flex-grow: 12;
        padding: 0 5px 0 0;
        p {
          max-width: 40%;
        }

        @include media-breakpoint-down(md) {
          display: flex;
          flex-direction: row;
          gap: 10px;
          align-items: center;
          p {
            max-width: 60%;
          }
        }
      }
      .button-label-indicator {
        display: flex;
        align-items: center;
        margin-left: -20px;
        flex-grow: 0.1;
        svg {
          color: #d9d9d9;
          width: 100%;
          max-height: 30px;
        }
      }
    }
  }
</style>

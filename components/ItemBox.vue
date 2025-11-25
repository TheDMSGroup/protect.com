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
    },
    value: {
      type: String,
      required: false,
    },
  });

  console.log(props);
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
          <h4>{{ text }}</h4>
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
    height: 144px;

    &:hover {
      text-decoration: none;
    }
    .elixr-icon {
      width: 50px;
      height: 50px;
      fill: #4153b3;
      margin: 10px 0;
    }
    h4 {
      font-size: 18px;
      padding: 0;
    }
    &.noicon {
      background: #3b54bb;
      .row {
        display: flex;
        justify-content: bottom;
        padding: 0 10px;
        min-height: 120px;
        .button-label {
          flex-direction: column;
          display: flex;
          .button-label-empty {
            flex-grow: 1;
          }
          h4 {
            padding: 0 0 0 10px;
            color: white;
          }
        }
      }
    }
    .row {
      padding: 0 25px;
      height: 100%;
      flex-wrap: nowrap;
      .button-label,
      .button-label-indicator {
        padding: 0;
      }
      .button-label {
        flex-grow: 12;
        padding: 0 5px 0 0;
        h4 {
          max-width: 40%;
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

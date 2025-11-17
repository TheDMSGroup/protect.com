<script setup>
const props = defineProps({
  firstBoxText: {
    type: String,
    default: "",
  },
  items: {
    type: Array,
    required: true,
  },
});

const { firstBoxText, items } = props;

const dynamicClass = computed(() => {
  let numberOfItems = items.length;
  if (firstBoxText && firstBoxText.length > 1) {
    numberOfItems++;
  }
  return `item-width-${numberOfItems}`;
});

const colWidth = computed(() => {
  let numberOfItems = items.length;
  if (firstBoxText && firstBoxText.length > 1) {
    numberOfItems++;
  }
  return Math.floor(12 / numberOfItems);
});
</script>

<template>
  <div class="item_box_group">
    <b-container :class="dynamicClass">
      <b-row>
        <b-col :cols="colWidth" class="type_box" v-if="firstBoxText">
          <item-box :text="firstBoxText" class="nonclick" />
        </b-col>
        <b-col
          :cols="colWidth"
          class="type_box"
          v-for="(option, key) in items"
          :key="key"
        >
          <item-box
            :text="option.text"
            :icon="option.value.icon"
            :value="option.value.value"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="scss" scoped>
.item_box_group {
  margin-top: 50px;
  margin-bottom: 50px;

  .nonclick {
    pointer-events: none;
    cursor: initial;
  }

  @include media-breakpoint-down(md) {
    margin-top: 25px;
    margin-bottom: 50px;

    .type_box {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }

  @include media-breakpoint-down(sm) {
    .type_box {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }

  &.item-width-6 {
    @include media-breakpoint-down(xl) {
      .type_box {
        flex: 0 0 33.333333%;
        max-width: 33.333333%;
      }
    }
  }
}
</style>

<script setup>
  import { computed } from "vue";
  import { useStore } from "@/stores/store.js";

  // Props
  const props = defineProps({
    currentPage: {
      type: Number,
      required: true,
    }, // current page number
    totalPages: {
      type: Number,
      required: true,
    }, // total number of pages
  });

  // Store
  const store = useStore();

  // Computed properties
  /*
  length of range between first ... and second ...
*/
  const middleRangeLength = computed(() => {
    let middleRangeLength = 7;

    if (store.isMobile) {
      middleRangeLength = 3;
    }
    return middleRangeLength;
  });

  /*
  buffer between current page and both ...
*/
  const buffer = computed(() => {
    return (middleRangeLength.value - 1) / 2;
  });

  /*
  range before first ...
*/
  const beginningRange = computed(() => {
    return props.currentPage <= middleRangeLength.value;
  });

  /*
  range after second ...
*/
  const endingRange = computed(() => {
    return props.currentPage >= props.totalPages - middleRangeLength.value;
  });

  /*
  range between first ... and second ...
*/
  const middlePageNumberRange = computed(() => {
    const numberRange = [];
    let start = 2;
    let ending = middleRangeLength.value;

    // If not beginning of range
    if (!beginningRange.value) {
      start = props.currentPage - buffer.value;
    }
    // If range ending
    if (endingRange.value) {
      start = props.totalPages - middleRangeLength.value;

      if (props.totalPages - middleRangeLength.value < 2) {
        start = 2;
        ending = middleRangeLength.value - 1;
      }
    }
    // If total pages is lower or equal to middle range length
    if (props.totalPages <= middleRangeLength.value) {
      start = 2;
      ending = props.totalPages - 2;
    }

    for (let i = start; i < start + ending; i++) {
      numberRange.push(i);
    }

    return numberRange;
  });

  /*
  determine if prev button should be disabled
*/
  const prevButtonDisabled = computed(() => {
    return props.currentPage === 1;
  });

  /*
  determine if next button should be disabled
*/
  const nextButtonDisabled = computed(() => {
    return props.currentPage === props.totalPages;
  });

  // Methods
  /*
  is this the current page
*/
  const isSelected = (pageNum) => {
    return pageNum === props.currentPage;
  };

  //emit event to articles feed on navigation
  const emit = defineEmits(["navigate:page"]);

  const handleNavigation = (pageNumber) => {
    emit("navigate:page", pageNumber);
  };
</script>

<template lang="html">
  <div class="pagination-wrapper">
    <button class="pg-btn" name="previous" type="button" :disabled="prevButtonDisabled" @click="handleNavigation(currentPage - 1)">‹</button>

    <div class="page-list">
      <button class="pg-btn" type="button" :disabled="isSelected(1)" @click="handleNavigation(1)">1</button>
      <button v-if="!beginningRange" class="pg-btn" type="button" disabled>...</button>

      <button
        v-for="pageNumber in middlePageNumberRange"
        :key="pageNumber"
        class="pg-btn"
        type="button"
        :disabled="isSelected(pageNumber)"
        @click="handleNavigation(pageNumber)"
      >
        {{ pageNumber }}
      </button>
      <button v-if="!endingRange" class="pg-btn" type="button" disabled>...</button>

      <button class="pg-btn" type="button" :disabled="isSelected(totalPages)" @click="handleNavigation(totalPages)">
        {{ totalPages }}
      </button>
    </div>

    <button class="pg-btn" name="next" type="button" :disabled="nextButtonDisabled" @click="handleNavigation(currentPage + 1)">›</button>
  </div>
</template>

<style lang="scss" scoped>
  .pagination-wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 25px;
    justify-content: center;
    align-items: center;

    .page-list {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }

    .pg-btn {
      display: block;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: 0;
      padding: 0px 10px;
      cursor: pointer;
      background: #fff;
      font-weight: 600;
      color: $blue-light;
      background-color: $white;
      outline: none;
      height: 30px;

      @media (max-width: 600px) {
        font-size: 0.75rem;
      }

      &:disabled,
      &[disabled="disabled"],
      &[disabled="true"] {
        cursor: default;
        color: $white;
        background: $blue-light;
      }
      &[name="previous"] {
        border: 0;
        background-color: $white;
        color: $blue-light;
        font-size: 18px;
        border: 1px solid $blue-light;
        margin-right: 14px;
      }
      &[name="next"] {
        border: 0;
        background-color: $white;
        color: $blue-light;
        font-size: 18px;
        border: 1px solid $blue-light;
        margin-left: 14px;
      }
    }
  }
</style>

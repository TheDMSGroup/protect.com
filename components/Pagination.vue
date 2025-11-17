<template lang="html">
  <div class="pagination-wrapper">
    <button
      class="pg-btn"
      name="previous"
      type="button"
      :disabled="prevButtonDisabled"
      @click="navMethod(currentPage - 1)">‹</button>

    <div class="page-list">

      <button
        class="pg-btn"
        type="button"
        @click="navMethod(1)"
        :disabled="isSelected(1)">
        1
      </button>
      <button
        v-if="!beginningRange"
        class="pg-btn"
        type="button"
        disabled>
        ...
      </button>

      <button
        class="pg-btn"
        type="button"
        v-for="pageNumber in middlePageNumberRange"
        :key="pageNumber"
        @click="navMethod(pageNumber)"
        :disabled="isSelected(pageNumber)">
        {{ pageNumber }}
      </button>
      <button
        v-if="!endingRange"
        class="pg-btn"
        type="button"
        disabled>
        ...
      </button>

      <button
        class="pg-btn"
        type="button"
        @click="navMethod(totalPages)"
        :disabled="isSelected(totalPages)">
        {{ totalPages }}
      </button>
    </div>

    <button
      class="pg-btn"
      name="next"
      type="button"
      :disabled="nextButtonDisabled"
      @click="navMethod(currentPage + 1)">›</button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: Number, // current page number
    totalPages: Number, // total number of pages
    navMethod: Function, // function that navigates to page n, needs to take page number as argument
  },
  computed: {
    /*
      range before first ...
    */
    beginningRange() {
      return this.currentPage <= this.middleRangeLength;
    },
    /*
      range after second ...
    */
    endingRange() {
      return this.currentPage >= (this.totalPages - this.middleRangeLength);
    },
    /*
      buffer between current page and both ...
    */
    buffer() {
      return (this.middleRangeLength - 1) / 2;
    },
    /*
      length of range between first ... and second ...
    */
    middleRangeLength() {
      let middleRangeLength = 7;

      if (this.$store.state.isMobile) {
        middleRangeLength = 3;
      }
      return middleRangeLength;
    },
    /*
      range between first ... and second ...
    */
    middlePageNumberRange() {
      const numberRange = [];
      let start = 2;
      let ending = this.middleRangeLength;

      // If not beginning of range
      if (!this.beginningRange) {
        start = this.currentPage - this.buffer;
      }
      // If range ending
      if (this.endingRange) {
        start = this.totalPages - this.middleRangeLength;

        if (this.totalPages - this.middleRangeLength < 2) {
          start = 2;
          ending = this.middleRangeLength - 1;
        }
      }
      // If total pages is lower or equal to middle range length
      if (this.totalPages <= this.middleRangeLength) {
        start = 2;
        ending = this.totalPages - 2;
      }

      for (let i = start; i < start + ending; i++) {
        numberRange.push(i);
      }

      return numberRange;
    },
    /*
      determine if prev button should be disabled
    */
    prevButtonDisabled() {
      return this.currentPage === 1;
    },
    /*
      determine if next button should be disabled
    */
    nextButtonDisabled() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    /*
      is this the current page
    */
    isSelected(pageNum) {
      return pageNum === this.currentPage;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

.pagination-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 25px;

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
      font-size: .75rem;
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

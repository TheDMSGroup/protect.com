<template>
  <ul ref="tabList">
    <li v-for="(tab, index) in tabs" :key="tab.name" :ref="(el) => setTabRef(el, index)" :class="{ active: tab.target === activeTab }">
      <button @click="$emit('update:activeTab', tab.target)">{{ tab.label }}</button>
    </li>
    <span class="indicator" :style="{ left: indicatorLeft, width: indicatorWidth }" />
  </ul>
</template>

<script setup>
  const props = defineProps({
    tabs: {
      type: Array,
      required: true,
    },
    activeTab: {
      type: String,
      required: true,
    },
    previousTab: {
      type: String,
      required: true,
    },
  });

  defineEmits(["update:activeTab"]);

  const tabRefs = ref([]);
  const tabList = ref(null);
  const indicatorLeft = ref("0px");
  const indicatorWidth = ref("0px");

  const setTabRef = (el, index) => {
    if (el) {
      tabRefs.value[index] = el;
    }
  };

  const updateIndicator = (activeTab) => {
    const tabIndex = props.tabs.findIndex((tab) => tab.target === activeTab);
    const activeElement = tabRefs.value[tabIndex];

    if (activeElement) {
      indicatorLeft.value = activeElement.offsetLeft + "px";
      indicatorWidth.value = activeElement.offsetWidth + "px";
    }
  };

  // Watch for active tab changes
  watch(
    () => props.activeTab,
    (newTab) => {
      updateIndicator(newTab);
    }
  );

  // Initialize on mount
  onMounted(() => {
    updateIndicator(props.activeTab);
  });
</script>

<style scoped lang="scss">
  ul {
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    gap: 1rem;
    padding: 0;
    border-bottom: 2px solid #e5e7eb;
    position: relative;

    @include media-breakpoint-down(md) {
      overflow-x: auto;
      scrollbar-width: thin;
      -ms-overflow-style: auto;
      border-bottom: 0;
      padding-bottom: 12px;
    }

    .indicator {
      position: absolute;
      bottom: 0;
      display: block;
      height: 4px;
      transition: left 0.3s ease, width 0.3s ease;
      background-color: $blue;

      @include media-breakpoint-down(md) {
        bottom: 12px;
      }
    }
  }

  li {
    cursor: pointer;
    padding: 0.5rem 1rem;

    @include media-breakpoint-down(md) {
      font-size: 0.875rem;
      padding: 0.5rem;
      min-width: 100px;
    }
    &.active {
      font-weight: bold;
      color: $blue;
    }
  }
  button {
    background: none;
    border: none;
    font: inherit;
    cursor: pointer;
    padding: 0;
    color: inherit;
  }
</style>

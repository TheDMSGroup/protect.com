<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Select Option",
  },
  options: {
    type: Array,
    required: true,
    // Each option should have: { label: string, to: string }
  },
});

const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const arrowPosition = computed(() => {
  return showDropdown.value ? "up" : "down";
});

// Close dropdown when clicking outside
const dropdownRef = ref(null);

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div ref="dropdownRef" class="select-dropdown">
    <div class="select-header" @click="toggleDropdown">
      <span class="select-title">{{ title }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.32 10.74" :class="arrowPosition">
        <g>
          <g id="icons">
            <path
              class="down-arrow-gray"
              d="M17.7.68A2.16,2.16,0,0,0,14.62.61c-.74.67-1.48,
            1.36-2.2,2S10.75,4.2,9.9,5l-.72.65,0,0-.3-.25L8.42,5,7,3.67c-1.08-1-2.2-2-3.32-3.06A2.16,
            2.16,0,0,0,.62.68,2.16,2.16,0,0,0,.71,3.8c2.41,2.26,4.65,4.33,6.85,6.32a2.56,2.56,0,0,0,
            1.23.58,2.85,2.85,0,0,0,.41,0,1.8,1.8,0,0,0,.73-.15,2.4,2.4,0,0,0,.83-.47c2.2-2,4.44-4.06,
            6.85-6.32A2.16,2.16,0,0,0,17.7.68Z"
            />
          </g>
        </g>
      </svg>
    </div>
    <transition name="slide-fade">
      <div v-if="showDropdown" class="dropdown-options">
        <NuxtLink
          v-for="option in options"
          :key="option.to"
          :to="option.to"
          class="dropdown-option"
        >
          {{ option.label }}
        </NuxtLink>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.select-dropdown {
  min-width: 260px;
  position: relative;

  @include media-breakpoint-down(sm) {
    width: 100%;
  }

  .select-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem 0;

    .select-title {
      color: $blue;
      font-weight: 600;
      padding-right: 1rem;
    }

    svg {
      fill: #999999;
      width: 15px;
      transition: transform 0.2s;

      &.up {
        transform: rotate(180deg);
      }
    }
  }

  .dropdown-options {
    position: absolute;
    right: 0;
    top: 100%;
    min-width: 260px;
    max-height: 300px;
    overflow-y: auto;
    background: white;
    border: 1px solid $gray-light;
    border-top: 2px solid $blue;
    border-radius: 0 0 4px 4px;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    @include media-breakpoint-down(sm) {
      width: 100%;
      left: 0;
      right: 0;
    }

    .dropdown-option {
      display: block;
      padding: 0.75rem 1rem;
      color: $blue;
      text-decoration: none;
      border-bottom: 1px solid $gray-light;
      transition: background 0.2s;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: $gray-lighter;
      }
    }
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

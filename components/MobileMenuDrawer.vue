<template>
  <aside class="drawer-nav-secondary" :ref="id" :id="id" v-if="item.children && item.children.length > 0">
    <button @click="toggle(id)" class="close-menu">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.45 12.6">
        <path d="M.09,6.51l6,6a.29.29,0,0,0,.42,0l1-1a.27.27,0,0,0,
        .09-.21.29.29,0,0,0-.09-.21L3.62,7.28H14.15a.29.29,0,0,0,.3-.3V5.62a.3.3,
        0,0,0-.3-.3H3.62L7.47,1.47a.27.27,0,0,0,.09-.21.27.27,0,0,
        0-.09-.21l-1-1a.29.29,0,0,0-.42,0l-6,6A.29.29,0,0,0,.09,6.51Z"/>
      </svg>
      {{ title }}
    </button>
    <div
      v-for="(itemTwo, index) in item.children"
      :key="itemTwo.title"
      :item="item"
      class="item"
    >
      <button
        @click="toggleMobileMenuSecondary(itemTwo.children ? `mmt${index}` : itemTwo.link)"
        class="next-level">
        {{ itemTwo.title }}
        <svg v-if="itemTwo.children" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.74 18.32" class="right-arrow">
          <g>
            <path d="M.68.62A2.16,2.16,0,0,0,.61,3.7c.67.74,1.36,
            1.48,2,2.2S4.2,7.57,5,8.42l.65.72,0,0-.25.3L5,9.9l-1.3,1.4c-1,
            1.08-2,2.2-3.06,3.32A2.16,2.16,0,0,0,.68,17.7a2.16,2.16,0,0,0,
            3.12-.09C6.06,15.2,8.13,13,10.12,10.76a2.56,2.56,0,0,0,.58-1.23,
            3,3,0,0,0,0-.41,1.8,1.8,0,0,0-.15-.73,2.4,2.4,0,0,0-.47-.83C8.13,
            5.36,6.06,3.12,3.8.71A2.16,2.16,0,0,0,.68.62Z" />
          </g>
        </svg>
      </button>
      <MobileMenuDrawer
        v-if="itemTwo.children"
        :item="itemTwo"
        :title="itemTwo.title"
        :id="`mmt${index}`"
        :ref="`mmt${index}`"
        :toggleMobileMenuSecondary="toggleMobileMenuSecondary">
      </MobileMenuDrawer>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'MobileMenuDrawer',
  props: {
    item: Object,
    toggleMobileMenuSecondary: Function,
    id: String,
    title: String,
  },
  methods: {
    toggle(id) {
      this.$refs[id].classList.remove('openUp');
    },
  },
};
</script>

<style lang="scss" scoped>

aside.drawer-nav-secondary {
  transition: 0.9s all;
  max-width: 768px;
  background: $white;
  position: fixed;
  height: 100vh;
  transform: translateX(100%);
  overflow: hidden;
  width: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  background-color: #f6faff;
  z-index: -9999;
  opacity: 0;

  nav {
    display: flex;
    flex-direction: column;
  }

  &.openUp {
    transform: translateX(0);
    transition: 0.6s all;
    opacity: 1;
    z-index: 99999;
  }

  .close-menu {
    background-color: $white;
    outline: none;
    border: 0;
    font-weight: 600;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1em;
    height: 64px;

    svg {
      fill: $blue;
      width: 16px;
      margin-right: 1em;
    }
  }

  .item {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    height: 46px;

    &:last-child {
      border-bottom: 1px solid #efefef;
    }

    .next-level {
      padding: 0.6em 1em;
      background-color: #f6faff;
      outline: none;
      border: 0;
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .right-arrow {
        width: 8px;
        fill: $blue;
      }
    }
  }
}
</style>

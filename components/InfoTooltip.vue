<template lang="html">
  <div class="tool-tip">
    <svg :id="target" class="info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    <span class="tooltip-text">{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: 'InfoTooltip',
  props: ['message', 'target'],
};
</script>

<style lang="scss" scoped>
.tool-tip {
  display: inline-block;
  margin-left: 5px;
  position: relative;
  cursor: pointer;

  @include media-breakpoint-down(xs) {
    margin: 0;
  }

  .info-icon {
    display: inline-block;
    width: 18px;
    height: 18px;
    color: #666;
    transition: color 0.2s ease;
  }

  &:hover .info-icon {
    color: #333;
  }

  .tooltip-text {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 12px 16px;
    border-radius: 4px;
    font-size: 13px;
    line-height: 1.5;
    width: 300px;
    text-align: left;
    word-wrap: break-word;
    white-space: normal;
    z-index: 1000;
    margin-bottom: 8px;
    transition: opacity 0.2s ease, visibility 0.2s ease;

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 6px;
      border-style: solid;
      border-color: #333 transparent transparent transparent;
    }
  }

  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
}
</style>

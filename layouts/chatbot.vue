<template>
  <div class="chatbot-layout">
    <main class="chatbot-main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.chatbot-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
}

.chatbot-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>

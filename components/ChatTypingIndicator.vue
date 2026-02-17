<template>
  <div class="typing-indicator">
    <div class="typing-bubble">
      <span class="typing-dots">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </span>
    </div>
  </div>
</template>

<script setup>
// No props or logic needed - purely visual component
</script>

<style scoped>
.typing-indicator {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: flex-start;
}

.typing-bubble {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #f0f0f0;
  border-radius: 1rem;
  border-bottom-left-radius: 0.25rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.typing-dots {
  display: flex;
  gap: 0.25rem;
}

.typing-dots .dot {
  width: 0.375rem;
  height: 0.375rem;
  background-color: #9ca3af;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.typing-dots .dot:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-dots .dot:nth-child(2) {
  animation-delay: -0.16s;
}

.typing-dots .dot:nth-child(3) {
  animation-delay: 0s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>

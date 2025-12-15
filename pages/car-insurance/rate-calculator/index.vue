<script setup>
useSeoMeta({
  title: 'Auto Insurance Rate Calculator - Get Your Personalized Quote | Protect.com',
  description: 'Use our Auto Insurance Rate Calculator to get a personalized estimate based on your profile. Answer 6 quick questions and see how much you could save on car insurance today!',
  ogTitle: 'Auto Insurance Rate Calculator - Get Your Personalized Quote',
  ogDescription: 'Answer 6 quick questions and see how much you could save on car insurance today!',
});
</script>

<template>
  <div class="auto-rate-calculator">
    <b-container :class="['py-5']">
      <AutoRateCalculator />
    </b-container>
  </div>
</template>

<style scoped>
  .auto-rate-calculator {
    background: #f9f9f9;
  }
</style>

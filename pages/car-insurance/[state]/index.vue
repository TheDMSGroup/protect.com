<template>
  <div>
    <h1>Car Insurance in {{ $route.params.state }}</h1>
    <p>Welcome to our car insurance page!</p>
  </div>
</template>

<script setup>
  // Page meta
  definePageMeta({
    title: "Car Insurance",
  });
</script>

<style scoped>
  h1 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  p {
    color: #7f8c8d;
  }
</style>

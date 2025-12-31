<template>
  <div></div>
</template>

<script setup>
  definePageMeta({
    middleware: defineNuxtRouteMiddleware(() => {
      return navigateTo("/car-insurance/discounts/bundle", { redirectCode: 303 });
    }),
  });
</script>

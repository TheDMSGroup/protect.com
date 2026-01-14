<template>
  <div>
    <nav aria-label="Breadcrumb">
      <NuxtLink to="/car-insurance/vehicles">Vehicles</NuxtLink>
      <span> / </span>
      <span>{{ formattedMake }}</span>
    </nav>
    <h1>{{ formattedMake }} Car Insurance</h1>
    <p>Find car insurance rates for {{ formattedMake }} vehicles.</p>
  </div>
</template>

<script setup>
import { isValidMake, getMakeName } from "~/data/vehicles";

const route = useRoute();
const make = route.params.make;

if (!isValidMake(make)) {
  navigateTo("/car-insurance/vehicles");
}

const formattedMake = computed(() => getMakeName(make));

definePageMeta({
  title: "Car Insurance by Make",
});
</script>

<template>
  <div>
    <nav aria-label="Breadcrumb">
      <NuxtLink to="/car-insurance/vehicles">Vehicles</NuxtLink>
      <span> / </span>
      <NuxtLink :to="`/car-insurance/vehicles/${make}`">{{ formattedMake }}</NuxtLink>
      <span> / </span>
      <span>{{ formattedModel }}</span>
    </nav>
    <h1>{{ formattedMake }} {{ formattedModel }} Car Insurance</h1>
    <p>Find car insurance rates for the {{ formattedMake }} {{ formattedModel }}.</p>
  </div>
</template>

<script setup>
import { isValidMake, isValidModel, getMakeName } from "~/data/vehicles";

const route = useRoute();
const make = route.params.make;
const model = route.params.model;

if (!isValidMake(make)) {
  navigateTo("/car-insurance/vehicles");
} else if (!isValidModel(make, model)) {
  navigateTo(`/car-insurance/vehicles/${make}`);
}

const formattedMake = computed(() => getMakeName(make));

const formattedModel = computed(() => {
  return model.charAt(0).toUpperCase() + model.slice(1);
});

definePageMeta({
  title: "Car Insurance by Make and Model",
});
</script>

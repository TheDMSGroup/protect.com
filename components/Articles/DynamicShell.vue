<template>
  <div>
    <div v-for="(part, index) in props.content" :key="index" class="my-3">
      <template v-if="part.type === 'text'">
        <div v-html="part.content" />
      </template>
      <template v-else-if="part.type === 'component' && loadedComponents[part.name]">
        <component :is="loadedComponents[part.name]" v-bind="componentProps[part.name] || {}" />
      </template>
    </div>
  </div>
</template>

<script setup>
  import { useArticleComponentLoader } from "~/composables/useArticleComponentLoader.js";

  const props = defineProps({
    content: {
      type: Array,
      required: true,
    },
    componentNames: {
      type: Array,
      default: () => [],
    },
  });
  // Store loaded components - load immediately for SSR
  const loadedComponents = ref({});

  // Inline composable to load components synchronously on both server and client
  const useDynamicComponents = async () => {
    const promises = props.componentNames.map(async (componentName) => {
      if (!loadedComponents.value[componentName]) {
        try {
          const component = await useArticleComponentLoader(componentName);
          loadedComponents.value[componentName] = component;
          console.log(`✅ Loaded component: ${componentName}`);
        } catch (error) {
          console.error(`❌ Failed to load ${componentName}:`, error);
        }
      }
    });

    await Promise.all(promises);
  };
  await useDynamicComponents();

  function generateComponentProps(componentName) {
    // Add component-specific props
    if (componentName === "Faq") {
      return {
        faq: [
          {
            question: "What is Protect.com?",
            answer:
              "Protect.com is your one-stop destination for discovering savings on car insurance. We built this site to help people compare different quotes from top providers without having to fill out dozens of forms. We show you providers that we think offer you the lowest rates based on your vehicle and lifecycle, taking the guesswork out of the auto insurance buying process.",
          },
          {
            question: "How did we gather this info?",
            answer:
              "Protect.com is your one-stop destination for discovering savings on car insurance. We built this site to help people compare different quotes from top providers without having to fill out dozens of forms. We show you providers that we think offer you the lowest rates based on your vehicle and lifecycle, taking the guesswork out of the auto insurance buying process.",
          },
        ],
      };
    }
  }

  const componentProps = computed(() => {
    const propsMap = {};
    props.componentNames.forEach((componentName) => {
      propsMap[componentName] = generateComponentProps(componentName);
    });
    return propsMap;
  });

  console.log("Component Props:", componentProps.value);
</script>

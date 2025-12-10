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
    components: {
      type: Array,
      default: () => [],
    },
  });
  // Store loaded components - load immediately for SSR
  const loadedComponents = ref({});

  // Inline composable to load components synchronously on both server and client
  const useDynamicComponents = async () => {
    const promises = props.components.map(async (component) => {
      console.log(`Attempting to load component: ${component.name}`);
      if (!loadedComponents.value[component.name]) {
        try {
          const componentRef = await useArticleComponentLoader(component.name);
          loadedComponents.value[component.name] = componentRef;
          console.log(`✅ Loaded component: ${component.name}`);
        } catch (error) {
          console.error(`❌ Failed to load ${component.name}:`, error);
        }
      }
    });

    await Promise.all(promises);
  };
  await useDynamicComponents();

  console.log("Loaded Components:", loadedComponents.value);

  function generateComponentProps(componentName) {
    // Add component-specific props
    switch (componentName) {
      case "Faq":
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
      case "ZipCodeForm":
        return {
          action: "insure.protect.com",
        };
      default:
        return {};
    }
  }

  const componentProps = computed(() => {
    const propsMap = {};
    props.components.forEach((component) => {
      // Generate fallback props if no props are provided
      if (Object.keys(component.props).length === 0) {
        propsMap[component.name] = generateComponentProps(component.name);
      } else {
        // use props passed down
        propsMap[component.name] = component.props;
      }
    });
    return propsMap;
  });
</script>

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
  //use shallowRef so we don't have deep reactivity on each components, only on the top level object
  const loadedComponents = shallowRef({});

  // Inline composable to load components synchronously on both server and client
  const useDynamicComponents = async () => {
    const promises = props.components.map(async (component) => {
      console.log(`Attempting to load component: ${component.name}`);
      if (!loadedComponents.value[component.name]) {
        try {
          const componentRef = await useArticleComponentLoader(component.name);
          loadedComponents.value[component.name] = componentRef;
        } catch (error) {
          console.error(`❌ Failed to load ${component.name}:`, error);
        }
      }
    });

    await Promise.all(promises);
  };
  await useDynamicComponents();

  const componentProps = computed(() => {
    const propsMap = {};
    props.components.forEach((component) => {
      //no need to set fallbacks here, they are handled during parsing in /server/api/article/index.js
      propsMap[component.name] = component.componentProps;
    });
    return propsMap;
  });
</script>

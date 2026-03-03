<template>
  <div
    v-for="(part, index) in props.content"
    :key="index"
    class="my-3 article-content"
  >
    <template v-if="part.type === 'text'">
      <div v-html="part.content" />
    </template>
    <template
      v-else-if="part.type === 'component' && loadedComponents[part.name]"
    >
      <component
        :is="loadedComponents[part.name]"
        v-bind="componentProps[part.name] || {}"
      />
    </template>
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

  console.log("DynamicShell received components:", props.components);

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

<style scoped>
  .article-content {
    margin-bottom: 1em;
    padding-right: 1.5em;

    div {
      font-size: 1.2rem;
      line-height: 1.6;
    }

    code {
      white-space: pre-wrap;
    }

    table {
      width: 100%;
      max-width: 100%;
      margin-bottom: 1rem;
      background-color: transparent;

      td,
      th {
        padding: 0.75rem;
        vertical-align: top;
        border-top: 1px solid #dee2e6;
      }
      thead th {
        vertical-align: bottom;
        border-bottom: 2px solid #dee2e6;
      }
    }

    img {
      width: 100%;
      height: auto;
    }

    iframe {
      width: 100%;
      height: 400px;
    }
  }
</style>

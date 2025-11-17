//Nuxt composable to dynamically load icons using component :is attribute
//import composable into any component using dynamic icons

import { defineAsyncComponent } from "vue";

export function iconLoader(name) {
  if (!name) {
    console.warn("Icon name not specified, if this is intended behavior, disregard");
    return;
  }
  try {
    console.log("Loading icon component:", name);
    const dynamicComponent = defineAsyncComponent(async () => {
      try {
        const component = await import(`~/components/Icons/${name}.vue`);
        console.log(`✅ Successfully loaded icon: ${name}`);
        return component;
      } catch (error) {
        console.error(`❌ Error loading icon component "${name}":`, error);
        console.error("Is the icon properly named and located in ~/components/?");

        // Return a fallback component instead of throwing
        return {
          template: `
            <div class="icon-error" style="color: red; font-size: 12px; padding: 4px; border: 1px solid red; background: #ffe6e6;">
              ❌ Icon "${name}" not found
            </div>
          `,
        };
      }
    });

    return dynamicComponent;
  } catch (error) {
    console.error(`❌ Fatal error in iconLoader for "${name}":`, error);

    // Return a simple fallback component
    return {
      template: `
        <div class="icon-error" style="color: red; font-size: 12px; padding: 4px;">
          ❌ Icon system error
        </div>
      `,
    };
  }
}

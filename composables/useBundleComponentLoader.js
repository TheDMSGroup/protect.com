// Component registry for SSR-compatible dynamic imports
// All components must be registered here to be included in server payload

const bundleComponentRegistry = {
  // Bundle components
  AutoHomeBundleForm: () => import("~/components/Bundles/AutoHomeBundleForm.vue"),

  // Add more components as needed
  // ExampleComponent: () => import('~/components/ExampleComponent.vue'),
};

export async function useBundleComponentLoader(name) {
  if (!name) {
    console.warn("Bundle component name not specified");
    return null;
  }

  if (!bundleComponentRegistry[name]) {
    console.error(`Component "${name}" not found in registry`);
    return {
      name: "ComponentError",
      template: `
        <div class="component-error" style="color: red; font-size: 12px; padding: 4px; border: 1px solid red; background: #ffe6e6;">
          ❌ Component "${name}" not found
        </div>
      `,
    };
  }

  try {
    const component = await bundleComponentRegistry[name]();
    return component.default || component;
  } catch (error) {
    console.error(`Error loading component "${name}":`, error);
    return {
      name: "ComponentError",
      template: `
        <div class="component-error" style="color: red; font-size: 12px; padding: 4px; border: 1px solid red; background: #ffe6e6;">
          ❌ Failed to load component "${name}"
        </div>
      `,
    };
  }
}

export { bundleComponentRegistry };

const iconMixin = {
  data() {
    return {
      iconComponentName: null,
      iconsLoaded: {},
      componentName: this.$options.name,
    };
  },
  async mounted() {
    // Load the main icon for this select
    console.log(this.componentName, this);
    if (this.currentIcon) {
      await this.loadIcon(this.currentIcon);
    }
  },
  computed: {
    currentIcon() {
      switch (this.componentName) {
        case "Selects":
        case "Inputs":
          return this.selected && this.selected.value
            ? this.selected.value.icon
            : this.config.icon;
        default:
          return this.icon;
      }
    },
    currentIconLoaded() {
      return this.iconsLoaded[this.currentIcon];
    },
  },
  watch: {
    currentIcon: {
      immediate: true,
      async handler(newIcon) {
        if (newIcon) {
          await this.loadIcon(newIcon);
        }
      },
    },
  },
  methods: {
    async loadIcon(iconName) {
      if (!iconName || this.iconsLoaded[iconName]) {
        return;
      }

      try {
        let iconModule;

        // Dynamic conditional imports - webpack will only bundle what's actually used
        switch (iconName) {
          case "car-icon":
          case "car":
            iconModule = await import("../public/assets/icons/car.vue");
            break;
          case "home-icon":
          case "home":
            iconModule = await import("../public/assets/icons/home.vue");
            break;
          case "scales-icon":
          case "scales":
            iconModule = await import("../public/assets/icons/scales.vue");
            break;
          case "warranty-icon":
          case "warranty":
            iconModule = await import("../public/assets/icons/warranty.vue");
            break;
          case "home-warranty-icon":
          case "home-warranty":
            iconModule = await import(
              "../public/assets/icons/home-warranty.vue"
            );
            break;
          case "identity-icon":
          case "identity-monitoring":
            iconModule = await import(
              "../public/assets/icons/identity-monitoring.vue"
            );
            break;
          case "antivirus-icon":
          case "antivirus-protection":
            iconModule = await import(
              "../public/assets/icons/antivirus-protection.vue"
            );
            break;
          case "life-insurance-icon":
          case "life-insurance":
            iconModule = await import(
              "../public/assets/icons/life-insurance.vue"
            );
            break;
          case "health-insurance-icon":
          case "health-insurance":
            iconModule = await import(
              "../public/assets/icons/health-insurance.vue"
            );
            break;
          case "pet-insurance-icon":
          case "pet-insurance":
            iconModule = await import(
              "../public/assets/icons/pet-insurance.vue"
            );
            break;
          case "burial-insurance-icon":
          case "burial-insurance":
            iconModule = await import(
              "../public/assets/icons/burial-insurance.vue"
            );
            break;
          case "monitored-security-icon":
          case "monitored-security":
            iconModule = await import(
              "../public/assets/icons/monitored-security.vue"
            );
            break;
          case "diy-home-security-icon":
          case "diy-home-security":
            iconModule = await import(
              "../public/assets/icons/diy-home-security.vue"
            );
            break;
          case "bank-icon":
          case "bank":
            iconModule = await import("../public/assets/icons/bank.vue");
            break;
          case "percent-rotate-icon":
          case "percent-rotate":
            iconModule = await import(
              "../public/assets/icons/percent-rotate.vue"
            );
            break;
          case "arrow-down-icon":
          case "arrow-down":
            iconModule = await import("../public/assets/icons/arrow-down.vue");
            break;
          case "auto-warranty":
            iconModule = await import(
              "../public/assets/icons/auto-warranty.vue"
            );
            break;
          case "check-mark":
            iconModule = await import("../public/assets/icons/check-mark.vue");
            break;
          case "external-link":
            iconModule = await import(
              "../public/assets/icons/external-link.vue"
            );
            break;
          case "geo-pin":
            iconModule = await import("../public/assets/icons/geo-pin.vue");
            break;
          case "geo":
            iconModule = await import("../public/assets/icons/geo.vue");
            break;
          case "identity":
            iconModule = await import("../public/assets/icons/identity.vue");
            break;
          case "protect-shield":
            iconModule = await import(
              "../public/assets/icons/protect-shield.vue"
            );
            break;
          case "rightalign":
            iconModule = await import("../public/assets/icons/rightalign.vue");
            break;
          case "search":
            iconModule = await import("../public/assets/icons/search.vue");
            break;
          case "stars":
            iconModule = await import("../public/assets/icons/stars.vue");
            break;
          default:
            console.warn(`Icon not found in registry: ${iconName}`);
            return;
        }

        if (iconModule) {
          this.$options.components[iconName] = iconModule.default || iconModule;
          this.$set(this.iconsLoaded, iconName, true);
          this.$set(this, "iconComponentName", iconName);
          console.log(`Loaded icon: ${iconName}`);
        }
      } catch (error) {
        console.warn(`Failed to load icon: ${iconName}`, error);
      }
    },
  },
};

export default iconMixin;

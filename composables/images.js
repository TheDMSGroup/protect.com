import { useStore } from "@/stores/store.js";

export function buildImageUrl(imagePath, icon = false) {
  const store = useStore();
  if (!imagePath) {
    console.warn("Image path not specified, returning empty string");
    return "";
  }
  if (icon) {
    const iconsBaseUrl = store.iconsBaseUrl;
    return `${iconsBaseUrl}/${imagePath}`;
  }
  const assetsBaseUrl = store.assetsBaseUrl;
  return `${assetsBaseUrl}/${imagePath}`;
}

export default defineNuxtPlugin(() => {
  // Make store globally available
  const store = useStore();

  return {
    provide: {
      store,
    },
  };
});

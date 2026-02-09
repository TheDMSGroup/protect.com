<template>
  <div>
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
  //no index all pages in the /lp dir
  useHead({
    meta: [
      {
        name: "robots",
        content: "noindex,nofollow",
      },
    ],
  });
</script>

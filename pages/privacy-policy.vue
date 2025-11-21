<template lang="html">
  <div class="container">
    <h1 legal-element="title"></h1>
    <main legal-element="content"></main>
  </div>
</template>

<script>
export default {
  mounted() {
    const graphScript = document.createElement('script');
    graphScript.setAttribute('src', '//distro.quick-cdn.com/build/compliance/legal-page-injector.js');
    graphScript.setAttribute('page', 'generic-privacy-policy');
    graphScript.setAttribute('brand', 'protect');
    document.head.appendChild(graphScript);
  },
};
</script>
<style scoped lang="scss">
  h1 {
    margin-top: 1em;
  }
  h2 {
    font-size: 40px;
    strong {
      font-weight: 500;
    }
  }
  p {
    font-size: 1em;
  }
</style>

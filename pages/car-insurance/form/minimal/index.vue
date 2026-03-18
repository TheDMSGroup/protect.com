<script setup>
// Example minimal form - replace with your actual implementation
definePageMeta({
  layout: 'chatbot'
})
</script>

<template>
  <div class="minimal-form">
    <div class="form-container">
      <h1>Minimal Form</h1>
      <p>This is a minimal form variant. Replace this with your actual form implementation.</p>

      <!-- Add your form content here -->
      <div class="form-content">
        <p>Form fields go here...</p>
      </div>
    </div>

    <AppFooter :minimal="true" />
  </div>
</template>

<style scoped>
.minimal-form {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafb;
}

.form-container {
  flex: 1;
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.form-content {
  margin-top: 2rem;
}
</style>

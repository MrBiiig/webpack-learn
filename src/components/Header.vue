<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const title = ref('Welcome to My App');
    return { title };
  },
};
</script>

<style scoped>
header {
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: center;
}
</style>

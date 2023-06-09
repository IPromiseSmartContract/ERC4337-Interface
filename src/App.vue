<script setup lang="ts">
import Home from "./pages/Home.vue";
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <Home />
</template>

<style scoped></style>

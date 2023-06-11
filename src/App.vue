<script setup lang="ts">
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";
import NavBar from "./components/NavBar.vue";

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <!-- Navbar -->
  <NavBar></NavBar>
  <main>
    <router-view />
  </main>
</template>

<style scoped></style>

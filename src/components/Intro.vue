<script setup lang="ts">
const emit = defineEmits(["toggle-modal"]);
function toggleModal() {
  emit("toggle-modal");
}
</script>
<template>
  <div class="py-48 text-center">
    <h1
      class="text-4xl font-bold tracking-tight text-white sm:text-6xl gradient-text"
    >
      ERC 4337
    </h1>
    <p class="mt-4 text-xl gradient-text">Account Abstraction</p>
    <div>
      <div class="mt-10">
        <a
          @click="toggleModal"
          href="#"
          class="erc4337 inline-block rounded-md border border-transparent px-5 py-4 text-center font-medium hover:bg-indigo-700 text-2xl"
        >
          New User Operation
        </a>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
    <div
      class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4"
    >
      <div>
        <div class="text-xl font-medium text-black">ChitChat</div>
        <p class="text-gray-500">You have a new message!</p>
      </div>
    </div>

    <div
      class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4"
    >
      <div>
        <div class="text-xl font-medium text-black">ChitChat</div>
        <p class="text-gray-500">You have a new message!</p>
      </div>
    </div>

    <div
      class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4"
    >
      <div>
        <div class="text-xl font-medium text-black">ChitChat</div>
        <p class="text-gray-500">You have a new message!</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.gradient-text {
  background: linear-gradient(270deg, #b273fa, #65ffa5);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
.erc4337 {
  background: linear-gradient(270deg, #b273fa, #65ffa5);
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
  color: white;
}
</style>

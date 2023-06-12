<script setup lang="ts">
import WalletBtn from "./WalletModal.vue";
</script>
<template>
  <!-- Navbar -->
  <nav class="fixed top-0 z-50 w-full bg-zinc-900 border-b border-gray-200">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="grid grid-cols-3 items-center justify-between">
        <div class="col-span-1 items-center justify-start">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
        </div>

        <div class="flex col-span-1 items-center justify-center">
          <a href="#" class="">
            <span
              class="self-center text-md font-semibold sm:text-xl whitespace-nowrap text-white erc4337"
              >ERC.4337</span
            >
          </a>
        </div>
        <div class="flex col-span-1 justify-end items-center">
          <div class="flex items-center ml-3">
            <WalletBtn></WalletBtn>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

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

.erc4337 {
  background: linear-gradient(270deg, #b273fa, #65ffa5);
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import UserOpModal from "./UserOpModal.vue";
import { useWalletStore } from "../stores/wallet.ts";
import { computed } from "@vue/reactivity";
const showAccountModal = ref(false);
const walletStore = useWalletStore();
const loading = ref(false);
const generateWallet = async () => {
  await walletStore.generateAA({
    withPM: false,
    dryRun: false,
  });
};
const walletStorePrivateKey = computed({
  get: () => {
    console.log("wallet: ", walletStore.$state);
    return walletStore.privateKey;
  },
  set: async (privateKey) => {
    walletStore.setState({
      privateKey,
    });
  },
});
const createAAByPkey = async () => {
  loading.value = true;
  await walletStore.setAA(walletStorePrivateKey.value!, {
    withPM: false,
    dryRun: false,
  });
  showAccountModal.value = false;
  loading.value = false;
};
const showPrivateKey = ref(false);
const togglePrivateKeyVisibility = () => {
  showPrivateKey.value = !showPrivateKey.value;
};
</script>
<template>
  <button
    type="button"
    @click="() => (showAccountModal = !showAccountModal)"
    class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
  >
    <svg
      aria-hidden="true"
      class="w-4 h-4 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      ></path>
    </svg>
    Connect
  </button>

  <!-- Main modal -->
  <UserOpModal
    :open="showAccountModal"
    :loading="loading"
    @toggle-modal="() => (showAccountModal = false)"
    @confirm-modal="createAAByPkey()"
  >
    <div class="flex flex-col gap-2">
      <p class="text-xl font-bold">Account</p>
      <form>
        <div class="flex flex-wrapjustify-center items-center">
          <div class="flex-grow relative z-0 mb-6 group mt-8">
            <input
              v-model="walletStorePrivateKey"
              :type="showPrivateKey ? 'text' : 'password'"
              name="address"
              id="address"
              class="block w-full py-2.5 px-0 text-xs text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-300 truncate"
              placeholder=""
              required
            />
            <label
              for="address"
              class="font-medium text-lg absolute text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0]"
              >Private Key</label
            >
          </div>
          <!-- Add a button to toggle the visibility of the private key -->
          <button
            type="button"
            class="hover:text-green-300 px-3 text-sm inset-y-0 right-0 pr-3 items-center"
            @click.prevent="togglePrivateKeyVisibility"
          >
            <span v-if="showPrivateKey">Hide</span>
            <span v-else>Show</span>
          </button>
        </div>
        <div class="flex justify-center">
          <button
            type="button"
            class="col-auto text-sm inline-flex w-full justify-center rounded-md bg-blue-300 px-3 py-2 font-semibold text-black shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            @click="generateWallet"
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  </UserOpModal>
</template>

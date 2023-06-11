<template>
  <div class="py-2 px-10">
    <div class="text-xl mt-10 mb-4 min-w-0 truncate">Account Information</div>
    <ul role="list">
      <li v-for="person in account.aaAcounts" :key="person.address">
        <div
          class="flex grow lg:flex-row flex-col justify-between items-center mb-6"
        >
          <div
            class="flex grow lg:flex-row flex-col justify-between items-center gap-6 py-5 bg-zinc-800 p-6 my-2 rounded-lg"
          >
            <div class="flex gap-x-4 justify-center items-center">
              <div class="flex flex-col gap-3">
                <div class="flex gap-2">
                  <p class="mr-3 text-xl font-semibold leading-6 text-white">
                    {{ person.role }}
                  </p>
                  <span
                    v-for="token in person.tokens"
                    class="inline-flex items-center rounded-md bg-zinc-300 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                    >{{ token }}</span
                  >
                </div>
                <p
                  class="mt-1 truncate text-xs leading-5 text-white bg-zinc-700 opacity-90 rounded-lg px-2"
                >
                  {{ person.address }}
                </p>
              </div>
            </div>
            <div class="flex md:flex-row flex-col gap-6">
              <div class="flex gap-x-6 justify-center items-center">
                <div class="flex flex-col justify-center items-center gap-2">
                  <p class="text-md leading-6 s-white">Balance</p>
                  <p class="text-xl leading-6 text-white">
                    {{ person.balance }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex flex-initial flex-row md:flex-col w-48 justify-center items-center gap-3 ml-4"
          >
            <div class="flex justify-center gap-2">
              <button
                @click="showOperationModal(person)"
                type="button"
                class="px-4 py-2 focus:outline-none text-black bg-purple-300 hover:bg-purple-800 hover:text-white focus:ring-4 focus:ring-purple-300 font-extrabold rounded-lg text-sm"
              >
                Withdraw
              </button>
              <button
                @click="showOperationModal(person)"
                type="button"
                class="px-4 py-2 focus:outline-none text-black bg-blue-300 hover:bg-blue-800 hover:text-white focus:ring-4 focus:ring-blue-300 font-extrabold rounded-lg text-sm"
              >
                Deposit
              </button>
            </div>
            <button
              @click="showOperationModal(person)"
              type="button"
              class="w-full px-4 py-2 focus:outline-none text-white bg-zinc-800 hover:bg-zinc-300 hover:text-black focus:ring-4 focus:ring-zinc-300 font-extrabold rounded-lg text-sm"
            >
              More
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <UserOpModal
    :open="selectedAcount?.role === 'Paymaster'"
    @toggle-modal="() => (selectedAcount = undefined)"
    @confirm-modal=""
  >
    <div class="flex flex-col gap-2">
      <p class="text-xl font-bold">Pay master</p>
      <form>
        <div class="relative z-0 mb-6 group mt-8">
          <input
            type="address"
            name="address"
            id="address"
            class="block py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder=""
            required
          />
          <label
            for="address"
            class="font-medium text-lg absolute text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0]"
            >Stake ether</label
          >
        </div>

        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 mb-6 group">
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-white dark:text-white"
              >Add token</label
            >
            <select
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option v-for="opt in assetOptions" :value="opt.value">
                {{ opt.text }}
              </option>
            </select>
          </div>
          <div class="relative z-0 mb-6 group mt-6">
            <input
              type="numeric"
              name="amount"
              id="amount"
              class="block py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder=" "
              required
            />
            <label
              for="amount"
              class="font-medium text-lg absolute text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0]"
              >Amount
            </label>
          </div>
        </div>
        <div class="relative z-0 mb-6 group">
          <input
            type="address"
            name="floating_email"
            id="floating_email"
            class="block mt-10 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder=" "
            required
            disabled
          />
          <label
            for="floating_email"
            class="font-medium text-lg absolute text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0]"
            >Asset address</label
          >
        </div>
      </form>
    </div>
  </UserOpModal>
  <UserOpModal
    :open="selectedAcount?.role === 'User'"
    @toggle-modal="() => (selectedAcount = undefined)"
    @confirm-modal=""
  >
    <div>user</div>
  </UserOpModal>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { EOAAccount } from "../types";
import UserOpModal from "./UserOpModal.vue";
import { AAAcount } from "../types";
const assetOptions = [
  { value: "ETH is not ERC20 token (no address)", text: "ETH" },
  { value: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", text: "USDC" },
  { value: "0xdac17f958d2ee523a2206206994597c13d831ec7", text: "USDT" },
  { value: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", text: "wBTC" },
];
const account: EOAAccount = reactive({
  address: "0xCcc140109c31280221F35F61A0DB16853d930453",
  balance: 100.09,
  aaAcounts: [
    {
      address: "0xf6fbbFC3C1eCe8Ef1D6Ee5F5F28702037875d470",
      role: "Paymaster",
      balance: 100.22,
      tokens: ["wBTC", "AAVE", "MPC", "DAI"],
    },
    {
      address: "0xCcc140109c31280221F35F61A0DB16853d930453",
      role: "Paymaster",
      balance: 66.21,
      tokens: ["CCBA", "SP", "MPC"],
    },
    {
      address: "0x92c25894B20b9055FA407006B6e43Fc8F666a354",
      role: "User",
      balance: 10.254,
    },
  ],
});
var selectedAcount = ref<AAAcount>();
const showOperationModal = (account: AAAcount) => {
  selectedAcount.value = account;
};
// const paymasterAccount = computed(() => {
//   account.aaAcounts.filter((aaAccout) => aaAccout.role === "Paymaster");
// });
// const userAccount = computed(() => {
//   account.aaAcounts.filter((aaAccout) => aaAccout.role === "User");
// });
</script>

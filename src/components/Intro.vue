<template>
  <div class="container px-60 py-4">
    <div
      class="flex md:flex-row flex-col justify-between items-center mb-8 gap-8 px-3"
    >
      <button
        type="button"
        class="w-52 h-24 focus:outline-none text-black bg-purple-300 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-extrabold rounded-lg text-xl"
      >
        Create AA Wallet
        <p class="text-xs mt-2">Account abstraction</p>
      </button>
      <button
        type="button"
        class="w-52 h-24 focus:outline-none text-black bg-orange-300 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-extrabold rounded-lg text-xl"
      >
        Pay to Earn
        <p class="text-xs mt-2">Create a paymaster account</p>
      </button>
      <button
        type="button"
        class="w-52 h-24 focus:outline-none text-black bg-blue-300 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-extrabold rounded-lg text-xl"
      >
        Bundler Project
        <p class="text-xs mt-2">Clone our implementation</p>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { EOAAccount } from "../types.js";
import UserOpModal from "./UserOpModal.vue";
import { AAAcount } from "../types.js";
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

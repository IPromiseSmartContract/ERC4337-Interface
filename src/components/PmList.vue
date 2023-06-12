<!-- Pay master list -->
<template>
  <div class="container px-60 py-4">
    <ul role="list" class="divide-y divide-zinc-500">
      <li v-for="person in paymaster" :key="person.address">
        <div
          class="flex md:flex-row flex-col justify-between items-center gap-6 bg-zinc-800 p-6 py-5 my-2 rounded-lg"
        >
          <div class="flex gap-x-4 items-center">
            <img
              class="h-14 flex-none object-cover rounded-full"
              :src="person.imageUrl"
              alt=""
            />
            <div class="flex gap-x-4">
              <div class="min-w-0 flex flex-col gap-3">
                <p class="text-xl font-semibold leading-6 text-white-900">
                  {{ person.name }}
                </p>
                <p
                  class="mt-1 w-36 truncate text-xs leading-5 text-zinc-900 bg-white opacity-90 rounded-lg px-2"
                >
                  {{ person.address }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex gap-x-6 justify-center items-center">
            <div class="flex flex-col justify-center items-center gap-2">
              <p class="text-md leading-6 text-white-900">Staked</p>
              <p class="text-xl leading-6 text-white-900">
                {{ person.stakedEther }}
              </p>
            </div>
            <div class="flex flex-col justify-center items-center gap-2">
              <p class="text-md leading-6 text-white-900">Finished</p>
              <p class="text-xl leading-6 text-white-900">
                {{ person.finishedTxCount }}
              </p>
            </div>
          </div>
          <div class="flex md:flex-row flex-col gap-6">
            <div class="flex flex-col items-center justify-center gap-4">
              <div class="">
                <!-- <label
                for="price"
                class="block text-sm font-medium leading-6 text-white-900"
                >Pay to use</label
              > -->
                <div class="relative mt-2 rounded-md shadow-sm">
                  <div
                    class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                  >
                    <span class="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    class="block w-48 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.00"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center">
                    <label for="currency" class="sr-only">Currency</label>
                    <select
                      id="currency"
                      name="currency"
                      class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    >
                      <option>USDC</option>
                      <option>DAI</option>
                      <option>wBTC</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="flex w-full justify-between">
                <button
                  type="button"
                  class="focus:outline-none text-black bg-purple-300 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-extrabold rounded-lg text-sm px-3 py-1"
                >
                  Withdraw
                </button>
                <button
                  type="button"
                  class="focus:outline-none text-black bg-blue-300 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-extrabold rounded-lg text-sm px-3 py-1"
                >
                  Deposit
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
const paymaster = reactive([
  {
    name: "IPromise Pay",
    address: "0x92c25894B20b9055FA407006B6e43Fc8F666a354",
    creater: "0x92c25894B20b9055FA407006B6e43Fc8F666a354",
    stakedEther: 5.3,
    finishedTxCount: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Alice Pay",
    address: "0x92c25894B20b9055FA407006B6e43Fc8F666a354",
    creater: "0x92c25894B20b9055FA407006B6e43Fc8F666a354",
    stakedEther: 7.29,
    finishedTxCount: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Bob Pay",
    address: "0x92c25894B20b9055FA407006B6e43Fc8F666a354",
    creater: "0x92c25894B20b9055FA407006B6e43Fc8F666a354",
    stakedEther: 7.29,
    finishedTxCount: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
]);
</script>

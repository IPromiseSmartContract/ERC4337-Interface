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
        <div class="flex flex-col items-center justify-center space-y-4">
            <div>
                <button
                    @click="generateWallet"
                    class="px-4 py-2 bg-blue-500 text-white"
                >
                    Generate Wallet
                </button>
                <div class="flex mt-2 space-x-2">
                    <input
                        v-model="signingKey"
                        type="text"
                        placeholder="Signing key"
                        class="border p-1"
                    />
                    <button
                        @click="setWallet"
                        class="px-4 py-2 bg-green-500 text-white"
                    >
                        Set Private Key
                    </button>
                </div>
            </div>
            <div>
                <div class="flex space-x-2">
                    <input
                        v-model="to"
                        type="text"
                        placeholder="To"
                        class="border p-1"
                    />
                    <input
                        v-model="amount"
                        type="text"
                        placeholder="Amount"
                        class="border p-1"
                    />
                </div>
                <button
                    @click="transfer"
                    class="px-4 py-2 mt-2 bg-red-500 text-white"
                >
                    Transfer
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useWalletStore } from "../stores/wallet"

// 使用你的 wallet store
const walletStore = useWalletStore()

const signingKey = ref("")
const to = ref("")
const amount = ref("")

const generateWallet = async () => {
    await walletStore.generateAA({
        withPM: false,
        dryRun: false,
    })
}
const setWallet = async () => {
    await walletStore.setAA(signingKey.value, {
        withPM: false,
        dryRun: false,
    })
}
const transfer = async () => {
    if (!walletStore.privateKey) {
        alert("Please generate or set wallet first")
        return
    }
    await walletStore.transfer("0xCcc140109c31280221F35F61A0DB16853d930453", "0.02", {
        withPM: false,
        dryRun: false,
    })
}
</script>

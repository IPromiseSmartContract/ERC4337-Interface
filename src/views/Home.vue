<script setup lang="ts">
import { reactive, ref } from "vue";
import SideBar from "../components/SideBar.vue";
// import UserOp from "../components/UserOp.vue";
import UserOpModal from "../components/UserOpModal.vue";
import PmList from "../components/PmList.vue";
import { Page, UserOpInfo } from "../types";
import Account from "../components/AAAccount.vue";
import { useWalletStore } from "../stores/wallet";
import Intro from "../components/Intro.vue";
import { ethers } from "ethers";
enum USER_OP {
  NONE,
  SEND_ASSET,
  CONTRACT_TX,
}
enum MODAL_TYPE {
  NONE,
  OPTION,
  TX_INFO,
  GAS_SETTING,
}
// Asset
const assetOptions = [
  { value: "MATIC is not ERC20 token (no address)", text: "MATIC" },
  { value: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", text: "USDC" },
  { value: "0xdac17f958d2ee523a2206206994597c13d831ec7", text: "USDT" },
  { value: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", text: "wBTC" },
];
// Paymaster
const payMasterOptions = [
  { value: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", text: "Promise Pay" },
  { value: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", text: "Alice Pay" },
  { value: "0xdac17f958d2ee523a2206206994597c13d831ec7", text: "Bob Pay" },
];

const userOpInfo: UserOpInfo = reactive({
  fromAddr: undefined,
  toAddr: undefined,
  assetType: "MATIC is not ERC20 token (no address)",
  amount: undefined,
  paymaster: undefined,
  callGasLimit: undefined,
  preVerificationGasLimit: undefined,
  VerificationGasLimit: undefined,
  maxFeePerGas: undefined,
  maxPriorityFeePerGas: undefined,
});
// Modal
const showModal = ref(MODAL_TYPE.NONE);
const showOps = ref(USER_OP.SEND_ASSET);
const loading = ref(false);
const disableAdvanceOpt = ref(true);
function toggleModal(modal: MODAL_TYPE) {
  showModal.value = showModal.value === modal ? MODAL_TYPE.NONE : modal;
}

function changeOp(opType: USER_OP) {
  toggleModal(MODAL_TYPE.OPTION);
  showModal.value = MODAL_TYPE.TX_INFO;
  switch (opType) {
    case USER_OP.SEND_ASSET:
      showOps.value = USER_OP.SEND_ASSET;
      break;
    case USER_OP.CONTRACT_TX:
      showOps.value = USER_OP.CONTRACT_TX;
      break;
    default:
      showOps.value = USER_OP.NONE;
      break;
  }
}
const confirmTxInfo = async () => {
  loading.value = true;
  await buildUserOp();
  loading.value = false;
  toggleModal(MODAL_TYPE.TX_INFO);
  showModal.value = MODAL_TYPE.GAS_SETTING;
};
// Page Control
const currentPage = ref<Page>("Home");
function togglePage(page: Page) {
  currentPage.value = page;
}
// 使用你的 wallet store
const walletStore = useWalletStore();
const buildUserOp = async () => {
  if (!walletStore.privateKey) {
    alert("Please generate or set wallet first");
    return;
  }
  if (!userOpInfo.toAddr) {
    alert("Please input receiver address");
    return;
  }
  if (!userOpInfo.amount) {
    alert("Please input amount");
    return;
  }
  const op = await walletStore.buildTransfer(
    userOpInfo.toAddr,
    userOpInfo.amount,
    {
      withPM: false,
      dryRun: true,
    }
  );
  userOpInfo.callGasLimit = ethers.BigNumber.from(op.callGasLimit);
  userOpInfo.verificationGasLimit = ethers.BigNumber.from(
    op.verificationGasLimit
  );
  userOpInfo.preVerificationGas = ethers.BigNumber.from(op.preVerificationGas);
  userOpInfo.maxFeePerGas = ethers.BigNumber.from(op.maxFeePerGas);
  userOpInfo.maxPriorityFeePerGas = ethers.BigNumber.from(
    op.maxPriorityFeePerGas
  );
  alert("Build user op success!");
};
const showStatus = ref(false);
const txhash = ref("");
const transfer = async () => {
  if (!walletStore.privateKey) {
    alert("Please generate or set wallet first");
    return;
  }
  if (!userOpInfo.toAddr) {
    alert("Please input receiver address");
    return;
  }
  if (!userOpInfo.amount) {
    alert("Please input amount");
    return;
  }
  const txhash_ = await walletStore.transfer(
    userOpInfo.toAddr,
    userOpInfo.amount,
    {
      withPM: false,
      dryRun: false,
    }
  );
  if (txhash_) {
    txhash.value = txhash_;
  } else {
    alert("Transfer failed");
  }
};
const sendUserOp = async () => {
  loading.value = true;
  await transfer();
  loading.value = false;
  toggleModal(MODAL_TYPE.GAS_SETTING);
  showStatus.value = true;
};
</script>
<template>
  <div
    v-if="showStatus"
    class="fixed z-40 inset-0 overflow-y-auto shadow-xl transition-all"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    <div class="flex items-center justify-center min-h-screen">
      <div
        class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
      >
        <div>
          <h3
            class="text-lg leading-6 font-medium text-gray-900"
            id="modal-title"
          >
            Success!
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">Your operation was successful.</p>
          </div>
        </div>
        <div class="flex flex-auto gap-4 mt-10">
          <button
            class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-300 text-base font-medium text-black hover:text-white hover:bg-green-700"
          >
            <a :href="`https://mumbai.polygonscan.com/tx/${txhash}`">
              Transaction detail
            </a>
          </button>
          <button
            @click="showStatus = false"
            class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-gray-300 text-base font-medium text-black hover:bg-gray-700 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Sidebar -->
  <SideBar @toggle-page="togglePage"></SideBar>
  <div class="p-4 sm:ml-64">
    <div class="p-4 rounded-lg mt-14">
      <Intro
        @toggle-modal="toggleModal(MODAL_TYPE.OPTION)"
        v-if="currentPage === 'Home'"
      ></Intro>
      <Account v-if="currentPage === 'Account'"></Account>
      <PmList v-if="currentPage === 'Paymaster'"></PmList>
    </div>

    <UserOpModal
      :loading="loading"
      :open="showModal === MODAL_TYPE.OPTION"
      @toggle-modal="toggleModal(MODAL_TYPE.OPTION)"
      @confirm-modal="changeOp(showOps)"
    >
      <div class="flex flex-col gap-8">
        <div class="flex justify-between items-center">
          <p class="text-xl font-bold">Let's do something.</p>
          <span
            class="inline-flex items-center rounded-md bg-purple-200 px-2 py-1 text-xs font-medium text-purple-700"
            >Polygon</span
          >
        </div>
        <div class="flex flex-row w-full justify-center gap-4">
          <button
            @click="showOps = USER_OP.SEND_ASSET"
            type="button"
            class="pay-btn"
          >
            Send Assets
          </button>

          <button
            @click="showOps = USER_OP.CONTRACT_TX"
            type="button"
            class="pay-btn"
          >
            Contract Interaction
          </button>
        </div>
      </div>
    </UserOpModal>
    <UserOpModal
      :loading="loading"
      :open="showModal === MODAL_TYPE.TX_INFO"
      @toggle-modal="toggleModal(MODAL_TYPE.TX_INFO)"
      @confirm-modal="confirmTxInfo"
    >
      <div v-if="showOps === USER_OP.SEND_ASSET" class="flex flex-col gap-2">
        <p class="text-xl font-bold">Detail of Transaction</p>
        <form>
          <div class="relative z-0 w-full mb-6 group mt-8">
            <input
              v-model="userOpInfo.toAddr"
              type="address"
              name="address"
              id="address"
              class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder=""
              required
            />
            <label
              for="address"
              class="font-medium text-lg absolute text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0]"
              >Recipient address</label
            >
          </div>

          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-6 group">
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-white dark:text-white"
                >Asset type</label
              >
              <select
                v-model="userOpInfo.assetType"
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option v-for="opt in assetOptions" :value="opt.value">
                  {{ opt.text }}
                </option>
              </select>
            </div>
            <div class="relative z-0 w-full mb-6 group mt-6">
              <input
                v-model="userOpInfo.amount"
                type="numeric"
                name="amount"
                id="amount"
                class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
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
          <div class="relative z-0 w-full mb-6 group">
            <input
              v-model="userOpInfo.assetType"
              type="address"
              name="floating_email"
              id="floating_email"
              class="block mt-10 py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
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
      :loading="loading"
      :open="showModal === MODAL_TYPE.GAS_SETTING"
      @toggle-modal="toggleModal(MODAL_TYPE.GAS_SETTING)"
      @confirm-modal="sendUserOp"
    >
      <div>
        <p class="text-xl font-bold">Choose who to pay gas</p>
        <div class="flex mt-8 gap-8 justify-center">
          <button
            v-for="opt in payMasterOptions"
            @click="userOpInfo.paymaster = opt.value"
            class="pay-btn"
          >
            {{ opt.text }}
          </button>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="userOpInfo.paymaster"
            type="email"
            name="floating_email"
            id="floating_email"
            class="block mt-10 py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            class="font-medium text-lg absolute text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0]"
            >Paymaster address</label
          >
        </div>
        <div class="flex mt-10 justify-center">
          <button
            class="pay-solid-btn"
            @click="disableAdvanceOpt = !disableAdvanceOpt"
          >
            Custom option
          </button>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="userOpInfo.callGasLimit"
            :class="[disableAdvanceOpt ? 'border-b-0' : 'border-b-2']"
            type="email"
            name="floating_email"
            id="floating_email"
            class="block mt-10 py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder=" "
            required
            :disabled="disableAdvanceOpt"
          />
          <label
            for="floating_email"
            class="font-medium text-lg absolute text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0]"
            >Call Gas Limit</label
          >
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="userOpInfo.preVerificationGas"
            :class="[disableAdvanceOpt ? 'border-b-0' : 'border-b-2']"
            type="email"
            name="floating_email"
            id="floating_email"
            class="block mt-10 py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder=" "
            required
            :disabled="disableAdvanceOpt"
          />
          <label
            for="floating_email"
            class="font-medium text-lg absolute text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0]"
            >Pre-Verification Gas Limit</label
          >
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="userOpInfo.verificationGasLimit"
            :class="[disableAdvanceOpt ? 'border-b-0' : 'border-b-2']"
            type="email"
            name="floating_email"
            id="floating_email"
            class="block mt-10 py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder=" "
            required
            :disabled="disableAdvanceOpt"
          />
          <label
            for="floating_email"
            class="font-medium text-lg absolute text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0]"
            >Verification Gas Limit</label
          >
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="userOpInfo.maxFeePerGas"
            :class="[disableAdvanceOpt ? 'border-b-0' : 'border-b-2']"
            type="email"
            name="floating_email"
            id="floating_email"
            class="block mt-10 py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder=" "
            required
            :disabled="disableAdvanceOpt"
          />
          <label
            for="floating_email"
            class="font-medium text-lg absolute text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0]"
            >Max Fee Per Gas</label
          >
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            v-model="userOpInfo.maxPriorityFeePerGas"
            type="email"
            :class="[disableAdvanceOpt ? 'border-b-0' : 'border-b-2']"
            name="floating_email"
            id="floating_email"
            class="block mt-10 py-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder=" "
            required
            :disabled="disableAdvanceOpt"
          />
          <label
            for="floating_email"
            class="font-medium text-lg absolute text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0]"
            >Max Priority Fee Per Gas</label
          >
        </div>
      </div>
    </UserOpModal>
  </div>
</template>

<style scoped>
.pay-btn {
  @apply text-green-300 hover:text-white border border-green-300 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:bg-green-300;
}
.pay-solid-btn {
  @apply bg-green-300  hover:bg-green-700 text-black font-bold py-0 px-4 rounded-full;
}
</style>

<script setup lang="ts">
import { reactive, ref } from "vue";
import SideBar from "../components/SideBar.vue";
// import UserOp from "../components/UserOp.vue";
import UserOpModal from "../components/UserOpModal.vue";
import PmList from "../components/PmList.vue";
import { Page, UserOpInfo } from "../types";
import Account from "../components/AAAccount.vue";
import Intro from "../components/Intro.vue";
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
  { value: "ETH is not ERC20 token (no address)", text: "ETH" },
  { value: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", text: "USDC" },
  { value: "0xdac17f958d2ee523a2206206994597c13d831ec7", text: "USDT" },
  { value: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", text: "wBTC" },
];
// Paymaster
const payMasterOptions = [
  { value: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", text: "MaxPay" },
  { value: "0xdac17f958d2ee523a2206206994597c13d831ec7", text: "AlanPay" },
  { value: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", text: "支付宝" },
];

const userOpInfo: UserOpInfo = reactive({
  fromAddr: undefined,
  toAddr: undefined,
  assetType: "ETH is not ERC20 token (no address)",
  amount: undefined,
  paymaster: undefined,
  callGasLimit: 20000,
  preVerificationGasLimit: 30000,
  VerificationGasLimit: 25000,
  maxFeePerGas: 10000,
  maxPriorityFeePerGas: 200000,
});
// Modal
const showModal = ref(MODAL_TYPE.NONE);
const showOps = ref(USER_OP.SEND_ASSET);
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
function confirmTxInfo() {
  toggleModal(MODAL_TYPE.TX_INFO);
  showModal.value = MODAL_TYPE.GAS_SETTING;
}
// Page Control
const currentPage = ref<Page>("Home");
function togglePage(page: Page) {
  currentPage.value = page;
}
</script>
<template>
  <!-- Sidebar -->
  <SideBar
    @toggle-modal="toggleModal(MODAL_TYPE.OPTION)"
    @toggle-page="togglePage"
  ></SideBar>
  <div class="p-4 sm:ml-64">
    <div class="p-4 rounded-lg mt-14">
      <Intro v-if="currentPage === 'Home'"></Intro>
      <Account v-if="currentPage === 'Account'"></Account>
      <PmList v-if="currentPage === 'Paymaster'"></PmList>
    </div>

    <UserOpModal
      :open="showModal === MODAL_TYPE.OPTION"
      @toggle-modal="toggleModal(MODAL_TYPE.OPTION)"
      @confirm-modal="changeOp(showOps)"
    >
      <div class="flex flex-col gap-2">
        <p class="text-xl font-bold">Let's do something.</p>
        <p class="text-xl text-gray-400 dark:text-gray-500"></p>
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
      :open="showModal === MODAL_TYPE.GAS_SETTING"
      @toggle-modal="toggleModal(MODAL_TYPE.GAS_SETTING)"
      @confirm-modal="toggleModal(MODAL_TYPE.GAS_SETTING)"
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
            v-model="userOpInfo.preVerificationGasLimit"
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
            v-model="userOpInfo.VerificationGasLimit"
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

<template>
  <div v-if="walletAddress === null">
    <button
      @click="connectWallet()"
      class="inline-flex px-4 py-2 font-medium 
    tracking-wide text-white 
    capitalize transition-colors duration-200 transform 
    bg-green-400 
    rounded-md 
    hover:bg-green-500 
    focus:outline-none focus:bg-green-500"
    >
      CONNECT WALLET
    </button>
  </div>
  <div v-else>
    <div
      class="relative inline-flex items-center bg-gray-800 leading-none ${props.textColor} rounded-full p-2 shadow text-teal text-sm"
    >
      <span
        class="inline-flex bg-gray-700 text-white rounded-full h-6 px-3 justify-center items-center"
      >
        {{ walletBalance }}
      </span>
      <span class="inline-flex px-2 text-gray-200"> {{ walletAddress }} </span>
      <span class="inline-flex pr-2 text-gray-200"
        ><i
          :class="chevronType"
          class="fas text-green-300 cursor-pointer"
          @click="this.showDropdown = !this.showDropdown"
        ></i
      ></span>

      <ProfileMenu :showDropdown="this.showDropdown" />
    </div>
  </div>
</template>

<script>
import ProfileMenu from "./ProfileMenu.vue";
import walletController from "../../controllers/walletController";

export default {
  name: "ConnectWallet",
  components: {
    ProfileMenu,
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {
    chevronType() {
      let chevron;

      if (!this.showDropdown) {
        chevron = "fa-chevron-down";
      } else {
        chevron = "fa-chevron-up";
      }

      return chevron;
    },
    walletAddress() {
      let walletAddress = this.$store.state.wallet.address;

      if (walletAddress !== null) {
        walletAddress = walletAddress.substring(0, 7) + "...";
      } else {
        walletAddress = null;
      }

      return walletAddress;
    },
    walletBalance() {
      const walletBalance = `${this.$store.state.wallet.balance} BNB`;

      return walletBalance;
    },
  },
  methods: {
    async connectWallet() {
      await walletController.connectWallet();
    },
  },
};
</script>

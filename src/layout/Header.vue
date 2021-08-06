<template>
  <header class="text-gray-300 body-font bg-gray-500">
    <div
      class="container mx-auto flex flex-wrap p-5 flex-row items-center sm:flex-nowrap justify-between"
    >
      <div class="flex items-center">
        <div>
          <Logo :text="true" :class="'w-10 h-10'" :url="'/'" />
        </div>
        <div class="ml-4">
          <TokenPrice />
        </div>
      </div>

      <!-- NAVIGATION -->
      <Navigation />

      <!-- WALLET CONNECT BTN -->
      <ConnectWallet class="hidden md:block" />
    </div>
  </header>
</template>

<script>
import Logo from "../components/Logo.vue";
import ConnectWallet from "../components/Header/ConntectWallet.vue";
import Navigation from "../components/Header/Navigation.vue";
import TokenPrice from "../components/Header/TokenPrice.vue";

import walletController from "../controllers/walletController";
import tokenController from "../controllers/tokenController";
import pancakeNewPairController from "../controllers/pancakeNewPair";

import config from "../helpers/config";

export default {
  name: "Header",
  components: {
    Logo,
    ConnectWallet,
    Navigation,
    TokenPrice,
  },
  methods: {
    async getTPlanetBalance() {
      const amount = await tokenController.getTokenAmount(
        this.$store.state.wallet.address,
        config.tokenAddress
      );

      return amount;
    },
  },
  async mounted() {
    if (this.$store.state.wallet.address !== null) {
      walletController.loadWalletTokens();
    }
    await pancakeNewPairController.getNewPairs();
  },
};
</script>

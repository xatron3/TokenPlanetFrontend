<template>
  <header class="text-gray-300 body-font bg-gray-500">
    <div
      class="container mx-auto flex flex-wrap p-5 flex-row items-center sm:flex-nowrap justify-between"
    >
      <Logo />

      <!-- NAVIGATION -->
      <Navigation />

      <!-- WALLET CONNECT BTN -->
      <ConnectWallet class="hidden md:block" />
    </div>
  </header>
</template>

<script>
import Logo from "../components/Logo.vue";
import ConnectWallet from "../components/ConntectWallet.vue";
import Navigation from "../components/Navigation.vue";
import walletController from "../controllers/walletController";
import pancakeNewPairController from "../controllers/pancakeNewPair";

export default {
  name: "Header",
  components: {
    Logo,
    ConnectWallet,
    Navigation,
  },
  async mounted() {
    if (this.$store.state.wallet.address !== null) {
      await walletController.loadWalletTokens();
    }
    await pancakeNewPairController.getNewPairs();
  },
};
</script>

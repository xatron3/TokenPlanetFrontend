<template>
  <h2 class="text-3xl text-white mb-4">WALLET OVERVIEW</h2>
  <div class="grid grid-cols-12 gap-x-4 text-center text-white">
    <div
      class="col-span-4 bg-gray-800 rounded-lg flex flex-col justify-center px-1 py-3"
    >
      <div>{{ walletValue }}</div>
      <div class="text-xs text-yellow-200">Wallet Balance</div>
    </div>
    <div
      class="col-span-4 bg-gray-800 rounded-lg flex flex-col justify-center px-1 py-3"
    >
      <div>{{ tokensOwnedAmount }}</div>
      <div class="text-xs text-yellow-200">Tokens Owned</div>
    </div>
    <div
      class="col-span-4 bg-gray-800 rounded-lg flex flex-col justify-center px-1 py-3"
    >
      <div>{{ formattedTPlanetBalance }}</div>
      <div class="text-xs text-yellow-200">TPlanet Balance</div>
    </div>
  </div>
</template>

<script>
import numeral from "numeral";

export default {
  name: "WalletOverview",
  methods: {},
  data() {},
  computed: {
    walletValue() {
      return numeral(this.$store.state.wallet.value).format("$0,0[.]00");
    },
    tokensOwnedAmount() {
      return this.$store.state.wallet.tokens.length;
    },
    formattedTPlanetBalance() {
      return numeral(this.$store.state.wallet.tPlanetBalance).format("0,0");
    },
  },
  async mounted() {},
};
</script>

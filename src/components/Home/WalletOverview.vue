<template>
  <h2 class="text-3xl text-white mb-4">WALLET OVERVIEW</h2>
  <div class="grid grid-cols-12 gap-x-4 text-center text-gray-200">
    <div
      class="col-span-4 bg-gray-900 rounded-lg flex flex-col justify-center px-1 py-3"
    >
      <div>{{ walletValue }}</div>
      <div class="text-xs">Wallet Balance</div>
    </div>
    <div
      class="col-span-4 bg-gray-900 rounded-lg flex flex-col justify-center px-1 py-3"
    >
      <div>{{ tokensOwnedAmount }}</div>
      <div class="text-xs">Tokens Owned</div>
    </div>
    <div
      class="col-span-4 bg-gray-900 rounded-lg flex flex-col justify-center px-1 py-3"
    >
      <div>0</div>
      <div class="text-xs">TPlanet Balance</div>
    </div>
  </div>
</template>

<script>
import numeral from "numeral";

export default {
  name: "WalletOverview",
  methods: {},
  computed: {
    walletValue() {
      return numeral(this.$store.state.wallet.value).format("$0,0[.]00");
    },
    tokensOwnedAmount() {
      return this.$store.state.wallet.tokens.length;
    },
  },
  mounted() {},
};
</script>

<template>
  <div class="grid grid-cols-12 gap-x-4 mt-12">
    <div class="col-span-12 md:col-span-8">
      <WalletOverview />

      <div
        class="grid grid-cols-12 gap-x-4 mt-2 px-4 py-3 text-center text-gray-200"
      >
        <div class="col-span-1"></div>
        <div class="col-span-3 text-left">TOKEN INFO</div>
        <div class="col-span-2 text-left">USEFUL LINKS</div>
        <div class="col-span-3">TOKEN PRICE</div>
        <div class="col-span-3 cursor-pointer" @click="sort('value')">
          YOUR BALANCE
        </div>
      </div>
      <div v-if="tokensOwnedAmount !== 0">
        <TokenListItem
          v-for="tokenAddress in tokensOwned"
          :key="tokenAddress.address"
          :tokenAddress="tokenAddress.address"
        />
      </div>
    </div>

    <div class="col-span-12 md:col-span-4">
      <h2 class="text-3xl text-white">NEW TOKENS</h2>
      <span class="text-sm text-gray-300"
        >New listed tokens on PancakeSwap</span
      >
      <div v-if="newPairsAmount !== 0">
        <NewPairListItem
          v-for="tokenAddress in newPairAddresses"
          :key="tokenAddress"
          :tokenAddress="tokenAddress"
        />
      </div>

      <div>
        <button
          class="inline-flex px-4 py-2 font-medium 
      tracking-wide text-white 
      text-sm
      mt-2
      capitalize transition-colors duration-200 transform 
      bg-green-400 
      rounded-md 
      hover:bg-green-500 
      focus:outline-none focus:bg-green-500"
        >
          DETAILED LIST
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TokenListItem from "../components/TokenListItem.vue";
import WalletOverview from "../components/Home/WalletOverview.vue";
import NewPairListItem from "../components/NewPairListItem.vue";
import helpers from "../helpers/helpers";

export default {
  name: "Home",
  components: {
    TokenListItem,
    NewPairListItem,
    WalletOverview,
  },
  data() {
    return {
      sorter: null,
    };
  },
  computed: {
    tokensOwned() {
      return this.$store.state.wallet.tokens;
    },
    newPairsAmount() {
      return this.$store.state.newPairAddresses.length;
    },
    newPairAddresses() {
      const newPairs = this.$store.state.newPairAddresses;
      const newList = newPairs.reverse();

      return newList.slice(0, 10);
    },
  },
  methods: {
    sort(type) {
      switch (type) {
        case "value":
          if (this.sorter === null) {
            this.sorter = "-value";
          } else {
            if (this.sorter === "-value") {
              this.sorter = "value";
            } else {
              this.sorter = "-value";
            }
          }

          this.tokensOwned.sort(helpers.dynamicSort(this.sorter));
          break;
      }
    },
  },
};
</script>

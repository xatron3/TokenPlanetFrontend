<template>
  <div class="grid grid-cols-12 gap-x-4 mt-12">
    <div class="col-span-8">
      <h2 class="text-3xl text-white mb-4">WALLET OVERVIEW</h2>
      <div class="grid grid-cols-12 gap-x-4 text-center text-gray-200">
        <div class="col-span-4 bg-gray-900 rounded-lg p-4">
          <div>{{ walletValue }}</div>
          <div>Wallet Balance</div>
        </div>
        <div class="col-span-4 bg-gray-900 rounded-lg p-4">
          <div>{{ tokensOwnedAmount }}</div>
          <div>Tokens Owned</div>
        </div>
        <div class="col-span-4 bg-gray-900 rounded-lg p-4">
          <div>0</div>
          <div>Defi Tokens</div>
        </div>
      </div>
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
          v-for="tokenAddress in ownedTokens"
          :key="tokenAddress.address"
          :tokenAddress="tokenAddress.address"
        />
      </div>
    </div>

    <div class="col-span-4">
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
import NewPairListItem from "../components/NewPairListItem.vue";
import numeral from "numeral";
import helpers from "../helpers/helpers";

export default {
  name: "Home",
  components: {
    TokenListItem,
    NewPairListItem,
  },
  data() {
    return {
      ownedTokens: [],
      sorter: null,
    };
  },
  computed: {
    walletValue() {
      return numeral(this.$store.state.wallet.value).format("$0,0[.]00");
    },
    tokensOwnedAmount() {
      return this.$store.state.wallet.tokens.length;
    },
    newPairsAmount() {
      return this.$store.state.newPairAddresses.length;
    },
    newPairAddresses() {
      const newPairs = this.$store.state.newPairAddresses;
      const newList = newPairs.slice(0, 10);

      return newList.reverse();
    },
  },
  mounted() {
    this.ownedTokens = this.$store.state.wallet.tokens;
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

          this.ownedTokens.sort(helpers.dynamicSort(this.sorter));
          break;
      }
    },
  },
};
</script>

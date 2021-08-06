<template>
  <div v-if="this.loaded.tokenInfo" class=" mt-12">
    <div class="flex items-center mb-4">
      <h1 class="text-4xl text-white">{{ tokenName }}</h1>

      <div class="ml-4 flex">
        <a :href="poocoinUrl" target="_BLANK"
          ><img src="@/assets/images/logos/poocoin.png" class="w-7 h-7 mr-2"
        /></a>
        <a :href="bscScanUrl" target="_BLANK"
          ><img src="@/assets/images/logos/bscscan.png" class="w-7 h-7"
        /></a>
      </div>
    </div>
    <TokenOverview :tokenAddress="this.tokenAddress" />
    <div class="grid grid-cols-12 gap-x-4"></div>
  </div>
</template>

<script>
import TokenOverview from "../components/Token/TokenOverview.vue";

import TokenController from "../controllers/tokenController";
import numeral from "numeral";

export default {
  name: "Home",
  components: { TokenOverview },
  data() {
    return {
      tokenAddress: null,
      loaded: {
        tokenInfo: false,
        price: false,
      },
      tokenInformation: {},
    };
  },
  computed: {
    bscScanUrl() {
      return `https://bscscan.com/token/${this.tokenAddress}`;
    },
    poocoinUrl() {
      return `https://poocoin.app/tokens/${this.tokenAddress}`;
    },
    pancakeSwapUrl() {
      return `https://exchange.pancakeswap.finance/#/swap?outputCurrency=${this.tokenAddress}`;
    },
    tokenName() {
      return `${this.tokenInformation["name"]} (${this.tokenInformation["symbol"]})`;
    },
    usdPrice() {
      const usdPrice = parseFloat(this.tokenInformation["usdPrice"]);

      if (usdPrice > 1) {
        return numeral(usdPrice).format("$0,0[.]00");
      } else {
        return `$${usdPrice.toFixed(10)}`;
      }
    },
  },
  async mounted() {
    this.tokenAddress = this.$route.params.address;
    await this.getTokenData();
    await this.getTokenPrice();
  },
  methods: {
    async getTokenData() {
      // Load Token data
      const data = await TokenController.getTokenInformation(this.tokenAddress);
      this.tokenInformation["name"] = data.name;
      this.tokenInformation["symbol"] = data.symbol;
      this.tokenInformation["totalSupply"] = data.totalSupply;
      console.log(this.tokenInformation);
      this.loaded.tokenInfo = true;
    },
    async getTokenPrice() {
      const price = await TokenController.getTokenPrice(this.tokenAddress);

      this.tokenInformation["usdPrice"] = price.usdPrice;
      this.loaded.price = true;
    },
  },
};
</script>

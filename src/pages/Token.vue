<template>
  <div v-if="this.loaded.tokenInfo" class=" mt-12">
    <h1 class="text-4xl text-white">{{ tokenName }}</h1>
    <span class="text-yellow-200" v-if="this.loaded.price">{{ usdPrice }}</span>
    <div class="grid grid-cols-12 gap-x-4"></div>
  </div>
</template>

<script>
import TokenController from "../controllers/tokenController";
import numeral from "numeral";

export default {
  name: "Home",
  components: {},
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

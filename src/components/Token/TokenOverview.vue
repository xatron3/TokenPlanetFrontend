<template>
  <div class="grid grid-cols-12 gap-x-4 text-center text-gray-200">
    <div
      class="col-span-4 bg-gray-900 rounded-lg flex flex-col justify-center px-1 py-3"
    >
      <div v-if="this.price !== null">{{ formattedPrice }}</div>
      <div v-else>Loading....</div>
      <div class="text-xs">Price</div>
    </div>
    <div
      class="col-span-4 bg-gray-900 rounded-lg flex flex-col justify-center px-1 py-3"
    >
      <div v-if="this.circulatingSupply !== null">
        {{ formattedCirculatingSupply }}
      </div>
      <div v-else>Loading....</div>
      <div class="text-xs">Circulating Supply</div>
    </div>
    <div
      class="col-span-4 bg-gray-900 rounded-lg flex flex-col justify-center px-1 py-3"
    >
      <div v-if="this.price !== null && this.circulatingSupply !== null">
        {{ formattedMarketcap }}
      </div>
      <div v-else>Loading....</div>
      <div class="text-xs">Marketcap</div>
    </div>
  </div>
</template>

<script>
import tokenController from "../../controllers/tokenController";
import numeral from "numeral";

export default {
  name: "TokenOverview",
  data() {
    return {
      circulatingSupply: null,
      price: null,
    };
  },
  props: {
    tokenAddress: String,
  },
  methods: {
    async getCirculatingSupply() {
      return await tokenController.getCirculatingSupply(this.tokenAddress);
    },
    async getPrice() {
      const price = await tokenController.getTokenPrice(this.tokenAddress);

      return price.usdPrice;
    },
    getMarketCap() {
      const marketcap = this.circulatingSupply * this.price;

      return marketcap;
    },
  },
  computed: {
    formattedCirculatingSupply() {
      const supply = this.circulatingSupply;

      return numeral(supply).format("0,0");
    },
    formattedPrice() {
      return `$${this.price}`;
    },
    formattedMarketcap() {
      const marketcap = this.getMarketCap();

      return numeral(marketcap).format("$0,0[.]00");
    },
  },
  async mounted() {
    this.circulatingSupply = await this.getCirculatingSupply();
    this.price = await this.getPrice();
  },
};
</script>

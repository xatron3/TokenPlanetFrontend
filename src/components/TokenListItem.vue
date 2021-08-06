<template>
  <div
    class="shadow select-none bg-gray-700 dark:bg-gray-800 rounded-md items-center p-4 grid-cols-12 grid w-full mb-3"
    v-if="this.loaded.data && this.isOwned"
  >
    <div class="col-span-1">
      <router-link :to="`/token/${tokenAddress}`" class="block relative">
        <img
          alt="profil"
          :src="this.tokenData.logo"
          class="mx-auto object-cover rounded-full h-10 w-10"
        />
      </router-link>
    </div>
    <div class="col-span-3 pl-1">
      <router-link
        :to="`/token/${tokenAddress}`"
        class="font-medium text-md text-green-300 dark:text-white"
      >
        {{ this.tokenData.name }}
      </router-link>
      <div class=" dark:text-gray-200 text-sm text-gray-200">
        {{ this.tokenData.symbol }}
      </div>
    </div>

    <div class="col-span-2 pl-1">
      <a :href="bscScanUrl" target="_BLANK" class="w-6 inline-block mr-2"
        ><img src="@/assets/images/logos/bscscan.png" class="w-6"
      /></a>
      <a :href="dexToolsUrl" target="_BLANK" class="w-6 inline-block mr-2"
        ><img src="@/assets/images/logos/poocoin.png" class="w-6"
      /></a>
      <a :href="pancakeSwapUrl" target="_BLANK" class="w-6 inline-block"
        ><img src="@/assets/images/logos/pancakeswap-cake-logo.png" class="w-6"
      /></a>
    </div>

    <div class="col-span-3 text-center">
      <div v-if="this.loaded.price">
        <div class="text-green-200 text-sm ">
          {{ usdPriceFormatted }}
        </div>
      </div>
    </div>

    <div class="col-span-3 text-center">
      <div v-if="this.loaded.price">
        <div class="text-gray-200 text-sm ">
          {{ tokenAmount }}
        </div>
        <div class="text-yellow-200 text-xs ">
          {{ tokenBnbValue }} ({{ tokenUsdValue }})
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numeral from "numeral";
import TokenController from "../controllers/tokenController";

export default {
  name: "TokenListItem",
  props: {
    tokenAddress: String,
  },
  data() {
    return {
      loaded: {
        data: false,
        price: false,
      },
      isOwned: false,
      tokenData: {},
    };
  },
  computed: {
    bscScanUrl() {
      return `https://bscscan.com/token/${this.tokenAddress}`;
    },
    dexToolsUrl() {
      return `https://poocoin.app/tokens/${this.tokenAddress}`;
    },
    pancakeSwapUrl() {
      return `https://exchange.pancakeswap.finance/#/swap?outputCurrency=${this.tokenAddress}`;
    },
    usdPriceFormatted() {
      const tokenPrice = parseFloat(this.tokenData.usdPrice).toFixed(8);
      let price;

      if (tokenPrice < 1) {
        price = `$${tokenPrice}`;
      } else {
        price = numeral(tokenPrice).format("$0,0[.]00");
      }

      return price;
    },
    bnbPriceFormatted() {
      const tokenPrice = parseFloat(this.tokenData.bnbPrice).toFixed(10);

      return `${tokenPrice} BNB`;
    },
    tokenAmount() {
      return numeral(this.tokenData["amount"]).format("0,0.00");
    },
    tokenUsdValue() {
      const value =
        parseFloat(this.tokenData["amount"]) *
        parseFloat(this.tokenData.usdPrice);

      return numeral(value).format("$0,0[.]00");
    },

    tokenBnbValue() {
      const value =
        parseFloat(this.tokenData["amount"]) *
        parseFloat(this.tokenData.bnbPrice);

      return `${numeral(value).format("0,0[.]00")} BNB`;
    },
  },
  async mounted() {
    await this.getTokenAmount();

    if (this.isOwned) {
      // Load Token data
      const data = await TokenController.getTokenInformation(this.tokenAddress);

      this.tokenData["logo"] = await TokenController.getTokenLogo(
        this.tokenAddress
      );

      this.tokenData["name"] = data.name;
      this.tokenData["symbol"] = data.symbol;

      this.loaded.data = true;

      // Load price info
      const price = await TokenController.getTokenPrice(this.tokenAddress);

      this.tokenData["usdPrice"] = price.usdPrice;
      this.tokenData["bnbPrice"] = price.bnbPrice;

      this.loaded.price = true;
    }
  },
  methods: {
    async getTokenAmount() {
      const amount = await TokenController.getTokenAmount(
        this.$store.state.wallet.address,
        this.tokenAddress
      );

      if (parseFloat(amount) > 0) {
        this.isOwned = true;
      } else {
        this.isOwned = false;
      }

      this.tokenData["amount"] = amount;
    },
  },
};
</script>

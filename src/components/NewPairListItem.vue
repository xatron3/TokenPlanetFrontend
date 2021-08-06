<template>
  <div
    class="grid grid-cols-12 gap-x-4 mt-2text-gray-200 text-sm bg-gray-700 rounded-sm mb-1 p-1"
    v-if="this.gotLiqudity"
  >
    <div class="col-span-5 text-green-300 overflow-hidden">
      <router-link :to="`/token/${this.tokenAddress}`">
        {{ tokenInformation["name"] }}
      </router-link>
    </div>
    <div class="col-span-4 text-yellow-200">
      {{ bnbAmount }}
      <span class="text-green-500">{{ lpIncreasePrecentage }}</span>
    </div>
    <div class="col-span-3">
      <a :href="bscScanUrl" target="_BLANK" class="w-4 inline-block mr-2"
        ><img src="@/assets/images/logos/bscscan.png" class="w-4"
      /></a>
      <a :href="poocoinUrl" target="_BLANK" class="w-4 inline-block mr-2"
        ><img src="@/assets/images/logos/poocoin.png" class="w-4"
      /></a>
      <a :href="pancakeSwapUrl" target="_BLANK" class="w-4 inline-block"
        ><img src="@/assets/images/logos/pancakeswap-cake-logo.png" class="w-4"
      /></a>
    </div>
  </div>
</template>

<script>
import tokenController from "../controllers/tokenController";

export default {
  name: "NewPairListItem",
  props: {
    tokenAddress: String,
  },
  data() {
    return {
      tokenInformation: {},
      gotLiqudity: false,
    };
  },
  computed: {
    lpIncreasePrecentage() {
      const startAmount = parseFloat(this.tokenInformation["BNBStartAmount"]);
      const currentAmount = parseFloat(this.tokenInformation["BNBAmount"]);

      return `${parseFloat((currentAmount / startAmount) * 100).toFixed(2)}%`;
    },
    bnbAmount() {
      return `C: ${this.tokenInformation["BNBAmount"]} S: ${this.tokenInformation["BNBStartAmount"]}`;
    },
    bscScanUrl() {
      return `https://bscscan.com/token/${this.tokenAddress}`;
    },
    poocoinUrl() {
      return `https://poocoin.app/tokens/${this.tokenAddress}`;
    },
    pancakeSwapUrl() {
      return `https://exchange.pancakeswap.finance/#/swap?outputCurrency=${this.tokenAddress}`;
    },
  },
  async created() {
    const lpData = await tokenController.getPancakeLP(this.tokenAddress);
    let BNBAmount = 0;

    if (lpData.V2PancakeLP !== null) {
      BNBAmount = parseFloat(lpData.V2PancakeLP.bnbAmount);
    } else {
      BNBAmount = 0;
    }

    if (BNBAmount > 0) {
      const data = await tokenController.getTokenInformation(this.tokenAddress);

      this.tokenInformation["name"] = data.name;
      this.tokenInformation["symbol"] = data.symbol;
      this.tokenInformation["BNBStartAmount"] = BNBAmount;
      this.tokenInformation["BNBAmount"] = BNBAmount;
      this.gotLiqudity = true;
    } else {
      this.gotLiqudity = false;
    }

    this.refreshLP();
  },
  methods: {
    async refreshLP() {
      if (this.gotLiqudity) {
        setInterval(async () => {
          const lpData = await tokenController.getPancakeLP(this.tokenAddress);
          const BNBAmount = parseFloat(lpData.V2PancakeLP.bnbAmount);
          this.tokenInformation["BNBAmount"] = BNBAmount;
        }, 4000);
      }
      // } else {
      //   setInterval(async () => {
      //     const lpData = await tokenController.getPancakeLP(this.tokenAddress);
      //     const BNBAmount = parseFloat(lpData.V2PancakeLP.bnbAmount);
      //     if (BNBAmount > 0) {
      //       const data = await tokenController.getTokenInformation(
      //         this.tokenAddress
      //       );

      //       this.tokenInformation["name"] = data.name;
      //       this.tokenInformation["symbol"] = data.symbol;
      //       this.tokenInformation["BNBStartAmount"] = BNBAmount;
      //       this.tokenInformation["BNBAmount"] = BNBAmount;
      //       this.gotLiqudity = true;
      //     }
      //   }, 20000);
      // }
    },
  },
};
</script>

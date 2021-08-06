<template>
  <div>
    <h3 class="text-lg text-green-300 my-2">Sustainability Tracker</h3>
    <div class="grid grid-cols-3 gap-6">
      <div class="text-center bg-gray-900 rounded-md p-2">
        <span class="text-sm">{{ this.bnbBalance }}</span>
        <div class="text-yellow-200">Buy Back Amount</div>
      </div>
      <div class="text-center bg-gray-900 rounded-md p-2">
        <span class="text-sm">{{ stakedCake }}</span>
        <div class="text-yellow-200">$CAKE Staked</div>
      </div>
      <div class="text-center bg-gray-900 rounded-md p-2">
        <span class="text-sm">{{ pendingDividends }}</span>
        <div class="text-yellow-200">Pending Dividends</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ethers } from "ethers";
import pancakeStakeAbi from "../../abis/PancakeSwapStaking";
import tokenController from "../../controllers/tokenController";
import contracts from "../../helpers/contracts";
import helpers from "../../helpers/helpers";

export default {
  name: "Sustainability",
  data() {
    return {
      marketingAddress: "0x4E2270F5fc29D25622b6504ec29717006F1a837E",
      bnbBalance: null,
      cakeBalance: null,
      pendingCake: null,
      cakePrice: null,
    };
  },
  methods: {
    async getCakePrice() {
      const price = await tokenController.getTokenPrice(contracts.Cake);

      this.cakePrice = price.usdPrice;
    },
    async getCakeAmount() {
      const stakeContract = new ethers.Contract(
        contracts.PancakeSwapStaking,
        pancakeStakeAbi,
        this.$store.state.provider
      );

      const stakedAmount = await stakeContract.userInfo(
        0,
        this.marketingAddress
      );

      const formattedCake = ethers.utils.formatUnits(stakedAmount[0], "ether");

      this.cakeBalance = helpers.formatNumber(formattedCake, 2);
    },
    async getPendingCake() {
      const stakeContract = new ethers.Contract(
        contracts.PancakeSwapStaking,
        pancakeStakeAbi,
        this.$store.state.provider
      );

      const cakeAmount = await stakeContract.pendingCake(
        0,
        this.marketingAddress
      );

      const formattedCake = ethers.utils.formatUnits(cakeAmount, "ether");

      this.pendingCake = helpers.formatNumber(formattedCake, 2);
    },
    async getBnbAmount() {
      const balance = await this.$store.state.provider.getBalance(
        "0x4E2270F5fc29D25622b6504ec29717006F1a837E"
      );

      const formattedBalance = ethers.utils.formatUnits(balance, "ether") / 3;

      this.bnbBalance = `${parseFloat(formattedBalance).toFixed(2)} BNB`;
    },
  },
  computed: {
    pendingDividends() {
      const value = parseFloat(this.pendingCake) * parseFloat(this.cakePrice);

      return `${this.pendingCake} CAKE ($${value.toFixed(2)})`;
    },
    stakedCake() {
      const value = parseFloat(this.cakeBalance) * parseFloat(this.cakePrice);

      return `${this.cakeBalance} CAKE ($${value.toFixed(2)})`;
    },
  },
  async mounted() {
    await this.getBnbAmount();
    await this.getCakePrice();
    await this.getCakeAmount();
    await this.getPendingCake();

    setInterval(async () => {
      await this.getPendingCake();
    }, 20000);
  },
};
</script>

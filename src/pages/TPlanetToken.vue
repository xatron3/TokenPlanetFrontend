<template>
  <div class="mt-12">
    <div class="mb-4">
      <div class="flex items-center mb-4">
        <h1 class="text-green-300 text-4xl text-center ">
          $TPlanet Overview
        </h1>

        <div class="ml-4 flex">
          <a
            href="https://pancakeswap.finance/swap#/swap?outputCurrency=0x7b96c3d618eff0a8808f098260a9a51f901f0d0b"
            target="_BLANK"
            class="px-4 py-2 font-medium 
              tracking-wide text-white 
              text-base
              mt-2
              transition-colors duration-200 transform 
              bg-green-700 
              rounded-md
              flex
              items-center
              mr-2
              hover:bg-green-800 
              focus:outline-none focus:bg-green-500"
          >
            <i class="fas fa-exchange-alt mr-2"></i>
            Trade
          </a>

          <a
            href="https://poocoin.app/tokens/0x7b96c3d618eff0a8808f098260a9a51f901f0d0b"
            target="_BLANK"
            class="px-4 py-2 font-medium 
              tracking-wide text-white 
              text-base
              mt-2
              transition-colors duration-200 transform 
              bg-yellow-700 
              rounded-md
              flex
              items-center
              hover:bg-yellow-800 
              focus:outline-none focus:bg-yellow-500"
          >
            <i class="far fa-chart-bar mr-2"></i>
            Chart
          </a>
        </div>
      </div>
      <TokenOverview :tokenAddress="this.tokenAddress" />
    </div>

    <div class="grid grid-cols-12 gap-x-8 text-white">
      <div class="col-span-12 md:col-span-6">
        <h2 class="text-green-300 text-3xl text-center mb-4">
          Token Information
        </h2>
        <div>
          <p>
            Token Planet (TPlanet) serves as a utility token for the Token
            Planet platform. Users will be required to hold a certain amount of
            tokens to obtain a premium membership. Different levels of
            membership will unlock features on tokenplanet.app and also give
            other benefits.
          </p>

          <h3 class="text-lg text-green-300 mt-2">Quick Information</h3>
          <table class="table-auto">
            <tr>
              <td class="p-2 text-yellow-300">Total Supply</td>
              <td class="p-2">100,000,000</td>
            </tr>
            <tr>
              <td class="p-2 text-yellow-300">Token Name</td>
              <td class="p-2">Token Planet</td>
            </tr>
            <tr>
              <td class="p-2 text-yellow-300">Token Symbol</td>
              <td class="p-2">TPlanet</td>
            </tr>
            <tr>
              <td class="pt-2 px-2 text-yellow-300">Initial Distribution:</td>
              <td class="pt-2 px-2">5% Team Wallet</td>
            </tr>
            <tr>
              <td class="px-2 text-yellow-300"></td>
              <td class="px-2">5% Burned</td>
            </tr>
            <tr>
              <td class="px-2 pb-2 text-yellow-300"></td>
              <td class="px-2 pb-2">90% Pancake Swap Liquidity</td>
            </tr>
            <tr>
              <td class="p-2 text-yellow-300">Initial Listing Liquidity</td>
              <td class="p-2">90,000,000 TPlanet - 2 BNB</td>
            </tr>
            <tr>
              <td class="p-2 text-yellow-300">Contract Address</td>
              <td class="p-2">0x7b96c3d618eff0a8808f098260a9a51f901f0d0b</td>
            </tr>
            <tr>
              <td class="p-2 text-yellow-300">Liquidity Lock</td>
              <td class="p-2">
                <a
                  target="_BLANK"
                  href="https://dxsale.app/app/v2_9/dxlockview?id=0&add=0x5DaDE8Cb65e613ffAB53e55D2E39e7F4b812d1D8&type=lplock&chain=BSC"
                  >DXSale Locker</a
                >
              </td>
            </tr>
          </table>

          <h3 class="text-lg text-green-300 mt-2">Transactions Fees</h3>
          <p>
            Each transaction of TPlanet is taxed to both reward our holders and
            also help sustain and further develop our products. We have a 5%
            sustainability fee that goes to pay for services, developers and
            other stuff, 5% that goes to locked liquidity making the token less
            volatile and lastly a 2% reflection fee that will go to all the
            holders. The 2% reflection fee will help to burn tokens since one of
            the TPlanet holders is the burn address.
          </p>
        </div>
      </div>
      <div class="col-span-12 md:col-span-6 mt-4 md:mt-0">
        <h2 class="text-green-300 text-3xl text-center mb-4">
          Sustainability
        </h2>
        <p>
          We are looking to help sustain the token with revenue from our
          products as well as some new more long term ideas that we are looking
          to try out. Percentage of all revenue we make on our platform will go
          to buyback TPlanet in times of need, in times where we don’t need to
          buy back tokens we will invest in different farming tokens that will
          help us expand our ammunition to buy back tokens in the future.
        </p>
        <p class="mt-4">
          Let's say we have invested in 100 CAKE that we stake on Pancake Swap.
          From this we will be rewarded with some amount of CAKE each day that
          could be used to buy back TPlanet. This way we will have external
          sources that help us sustain the project even in times when things
          don’t look too bright!
        </p>

        <Sustainability />
      </div>
    </div>
  </div>
</template>

<script>
import Sustainability from "../components/TPlanet/Sustainability.vue";
import TokenOverview from "../components/Token/TokenOverview.vue";

import config from "../helpers/config";

export default {
  name: "TPlanetToken",
  methods: {},
  data() {
    return {
      tokenAddress: config.tokenAddress,
    };
  },
  computed: {},
  components: {
    TokenOverview,
    Sustainability,
  },
  async mounted() {},
};
</script>

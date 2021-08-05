<template>
  <div class="mt-12">
    <div class="mb-4">
      <h1 class="text-green-300 text-4xl text-center mb-4">
        $TPlanet Overview
      </h1>
      <TokenOverview />
    </div>

    <div class="grid grid-cols-12 gap-x-8 text-gray-200">
      <div class="col-span-12 md:col-span-6">
        <h2 class="text-gray-300 text-3xl text-center mb-4">
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
        <h2 class="text-gray-300 text-3xl text-center mb-4">
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
      </div>
    </div>
  </div>
</template>

<script>
import TokenOverview from "../components/TPlanet/TokenOverview.vue";

export default {
  name: "TPlanetToken",
  methods: {},
  computed: {},
  components: {
    TokenOverview,
  },
  async mounted() {},
};
</script>

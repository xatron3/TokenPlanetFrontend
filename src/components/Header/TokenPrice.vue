<template>
  <div
    class="inline-flex items-center bg-gray-800 leading-none ${props.textColor} rounded-full py-2 px-4 shadow text-teal text-sm"
  >
    <Logo :text="false" :class="'w-4 h-4'" :url="'/tplanet-token'" />
    <router-link to="/tplanet-token" class="ml-2" v-if="this.price !== null">{{
      tokenPrice
    }}</router-link>
    <span class="ml-2" v-else>...</span>
  </div>
</template>

<script>
import Logo from "../Logo.vue";
import priceController from "../../controllers/priceController";
import config from "../../helpers/config";

export default {
  name: "TokenPrice",
  methods: {
    async getTokenPrice() {
      const price = await priceController.getPrice(config.tokenAddress);

      this.price = price;
    },
  },
  data() {
    return {
      price: null,
    };
  },
  components: {
    Logo,
  },
  computed: {
    tokenPrice() {
      return `$${this.price}`;
    },
  },
  async mounted() {
    await this.getTokenPrice();
    setInterval(async () => {
      await this.getTokenPrice();
    }, 5000);
  },
};
</script>

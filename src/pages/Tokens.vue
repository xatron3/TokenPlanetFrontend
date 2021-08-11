<template>
  <div class=" mt-12">
    <h1 class="text-green-300 text-center text-4xl">Listed Tokens</h1>
  </div>
</template>

<script>
import config from "../helpers/config";
import axios from "axios";

export default {
  name: "Tokens",
  components: {},
  data() {},
  computed: {},
  async mounted() {
    console.log(await this.getAllTokens());
  },
  methods: {
    async getAllTokens() {
      const url = `${config.apiUrl}/tokens`;

      const tokens = await axios.get(url);

      console.log(tokens.data);
    },
  },
};
</script>

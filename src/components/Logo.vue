<template>
  <router-link
    :to="this.url"
    class="flex title-font font-medium items-center text-gray-900 md:mb-0"
  >
    <img src="@/assets/images/logo.png" :class="this.class" />
    <span class="ml-3 text-xl text-white" v-if="text">Token Planet</span>
  </router-link>
</template>

<script>
export default {
  name: "Logo",
  props: {
    text: Boolean,
    class: String,
    url: String,
  },
  methods: {},
  mounted() {},
};
</script>

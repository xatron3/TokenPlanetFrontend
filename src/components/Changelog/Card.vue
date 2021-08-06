<template>
  <div>
    <h1 class="text-green-300 text-2xl">{{ this.title }}</h1>
    <div class="text-gray-200" v-html="this.desc"></div>
  </div>
</template>

<script>
export default {
  name: "Card",
  methods: {},
  props: {
    title: String,
    desc: String,
  },
  mounted() {},
};
</script>

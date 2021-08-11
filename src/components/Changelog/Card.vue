<template>
  <div>
    <h1 class="text-green-300 text-2xl">{{ this.title }}</h1>
    <div class="text-white" v-html="this.desc"></div>
    <hr class="border-green-200 my-3" />
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

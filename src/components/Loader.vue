<template>
  <div class="container-height flex items-center">
    <div
      class="w-full h-36 z-50 overflow-hidden flex flex-col items-center justify-center"
    >
      <div
        class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
      ></div>
      <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  methods: {},
  mounted() {},
};
</script>

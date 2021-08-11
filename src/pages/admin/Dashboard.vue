<template>
  <div class="mt-12">
    <h1 class="text-green-300 text-4xl text-center">
      Adminpanel
    </h1>

    <div class="grid grid-cols-3 gap-x-4 mt-2 px-4 py-3 text-center">
      <router-link
        to="/admin/add-token"
        class="bg-gray-800 rounded-lg py-8 text-white"
      >
        <div>
          <i class="fas fa-plus text-lg text-green-400"></i>
        </div>
        <div>Add New Token</div>
      </router-link>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {},
  mounted() {},
};
</script>

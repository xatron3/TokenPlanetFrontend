<template>
  <div
    class="origin-top-right absolute left-2 top-8 w-48 rounded-md shadow-lg p-3 bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="user-menu-button"
    tabindex="-1"
    v-if="this.showDropdown"
  >
    <div class="text-center mb-1">{{ membership }}</div>
    <div class="text-center text-yellow-200">ACCOUNT STATUS</div>
    <hr class="my-2" />

    <router-link
      to="/admin"
      class="text-center w-full block"
      v-if="this.isAdmin"
      >Adminpanel</router-link
    >
  </div>
</template>

<script>
import walletController from "../../controllers/walletController";

export default {
  name: "ProfileMenu",
  methods: {},
  props: {
    showDropdown: Boolean,
  },
  computed: {
    isAdmin() {
      const isAdmin = this.$store.state.wallet.isAdmin;

      return isAdmin;
    },
    membership() {
      const membershipId = this.$store.state.wallet.membership;
      const membership = walletController.getTPlanetMembershipById(
        membershipId
      );

      return membership;
    },
  },
  mounted() {},
};
</script>

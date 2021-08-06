<template>
  <div
    class="md:flex md:ml-auto md:mr-auto flex-wrap items-center text-base justify-center nav"
  >
    <nav class="hidden md:block">
      <router-link
        to="/"
        class="mr-5 px-3 py-1.5 text-gray-100 hover:text-gray-400"
        >Home</router-link
      >
      <router-link
        to="/tokens"
        class="mr-5 px-3 py-1.5 text-gray-100 hover:text-gray-400"
        >Tokens</router-link
      >
      <router-link
        to="/tplanet-token"
        class="mr-5 px-3 py-1.5 rounded-3xl bg-green-500 text-gray-800 hover:text-gray-700"
        >$TPlanet</router-link
      >
    </nav>
    <div>
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="inline-block md:hidden w-8 h-8 bg-gray-900 rounded-sm text-gray-300 p-1"
      >
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>

      <nav
        class="absolute md:hidden md:relative top-16 left-0 md:top-0 z-20 flex-col md:flex-row md:space-x-6 font-semibold w-full md:w-auto bg-gray-900 shadow-md rounded-md p-4"
        :class="{ flex: mobileMenuOpen, hidden: !mobileMenuOpen }"
      >
        <div>
          <ConnectWallet />
        </div>
        <hr class="my-3" />
        <router-link
          to="/"
          class="mr-5 hover:text-gray-400 p-2 hover:bg-gray-700 rounded-sm"
          @click="mobileMenuOpen = false"
          >Home</router-link
        >
        <router-link
          to="/tokens"
          class="mr-5 hover:text-gray-400 p-2 hover:bg-gray-700 rounded-sm"
          @click="mobileMenuOpen = false"
          >Tokens</router-link
        >
      </nav>
    </div>
  </div>
</template>

<script>
import ConnectWallet from "./ConntectWallet.vue";

export default {
  name: "Navigation",
  methods: {},
  components: {
    ConnectWallet,
  },
  data() {
    return {
      mobileMenuOpen: false,
    };
  },
};
</script>

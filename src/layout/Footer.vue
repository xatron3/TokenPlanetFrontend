<template>
  <footer class="text-gray-600 body-font bg-gray-700 w-full mt-20">
    <div class="container px-5 py-14 mx-auto">
      <div class="flex flex-wrap md:text-left text-center order-first">
        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2
            class="title-font font-medium text-green-300 tracking-widest text-sm mb-3"
          >
            USEFUL LINKS
          </h2>
          <nav class="list-none mb-10">
            <li>
              <router-link to="/" class="text-gray-200 hover:text-gray-400"
                >Get started</router-link
              >
            </li>
            <li>
              <router-link
                to="/tplanet-token"
                class="text-gray-200 hover:text-gray-400"
                >$TPlanet</router-link
              >
            </li>
          </nav>
        </div>
        <div class="lg:w-1/4 md:w-1/2 w-full px-4"></div>
        <div class="lg:w-1/4 md:w-1/2 w-full px-4"></div>
        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2
            class="title-font font-medium text-green-300 tracking-widest text-sm mb-3"
          >
            INFOBOX
          </h2>
        </div>
      </div>
    </div>
    <div class="bg-gray-900">
      <div
        class="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col"
      >
        <p class="text-sm text-gray-100 sm:ml-6 sm:mt-0 mt-4">
          © {{ currentYear }} Token Planet
        </p>
        <span
          class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start"
        >
          <div>
            <a
              href="https://twitter.com/TokenPlanet_BSC"
              class="mr-2 "
              target="_BLANK"
            >
              <i class="fab fa-twitter hover:text-blue-400 fa-lg"></i>
            </a>
            <a href="https://t.me/TokenPlanetBSC" target="_BLANK">
              <i class="fab fa-telegram-plane hover:text-blue-600 fa-lg"></i>
            </a>
          </div>
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  components: {},
  computed: {
    currentYear() {
      const date = new Date();

      const year = date.getFullYear();

      return year;
    },
  },
};
</script>

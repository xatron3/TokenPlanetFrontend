<template>
  <div v-if="this.$store.state.provider !== null">
    <Header />
    <div class="max-w-screen-xl m-auto px-2 relative container-height">
      <router-view />
    </div>
    <Footer />
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script>
import Header from "./layout/Header.vue";
import Footer from "./layout/Footer.vue";
import Loader from "./components/Loader.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Loader,
  },
  mounted() {},
};
</script>

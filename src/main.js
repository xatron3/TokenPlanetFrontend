import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

import "./index.css";

const app = createApp(App);

router.beforeEach((to) => {
  document.title = `Token Planet - ${to.name}`;
});

app.use(store);

app.mount("#app");

window.addEventListener("load", () => {
  require("./helpers/ethers");

  app.use(router);
});

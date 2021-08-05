import { createWebHistory, createRouter } from "vue-router";

// Public Pages
import Home from "@/pages/Home.vue";
import Token from "@/pages/Token.vue";
import Tokens from "@/pages/Tokens.vue";
// General Pages
import NotFound from "@/pages/general/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/token/:address",
    name: "Token",
    component: Token,
  },
  {
    path: "/tokens",
    name: "Tokens",
    component: Tokens,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

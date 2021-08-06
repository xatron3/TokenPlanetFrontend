import { createWebHistory, createRouter } from "vue-router";

// Middleware
import admin from "./middleware/admin";

// Public Pages
import Home from "@/pages/Home.vue";
import Token from "@/pages/Token.vue";
import Tokens from "@/pages/Tokens.vue";
import TPlanetToken from "@/pages/TPlanetToken.vue";

// Admin pages
import Dashboard from "@/pages/admin/Dashboard.vue";

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
    path: "/tplanet-token",
    name: "$TPlanet",
    component: TPlanetToken,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Dashboard,
    beforeEnter: admin,
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

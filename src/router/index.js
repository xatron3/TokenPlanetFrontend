import { createWebHistory, createRouter } from "vue-router";

// Middleware
import admin from "./middleware/admin";

// Public Pages
import Home from "@/pages/Home.vue";
import Token from "@/pages/Token.vue";
import Changelog from "@/pages/Changelog.vue";
import Tokens from "@/pages/Tokens.vue";
import TPlanetToken from "@/pages/TPlanetToken.vue";

// Admin pages
import Dashboard from "@/pages/admin/Dashboard.vue";
import AddToken from "@/pages/admin/AddToken.vue";

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
    path: "/changelog",
    name: "Changelog",
    component: Changelog,
  },
  {
    path: "/tplanet-token",
    name: "$TPlanet",
    component: TPlanetToken,
  },
  {
    path: "/admin",
    name: "Admin",
    beforeEnter: admin,
    component: Dashboard,
  },
  {
    path: "/admin/add-token",
    name: "Add Token",
    // beforeEnter: admin,
    component: AddToken,
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

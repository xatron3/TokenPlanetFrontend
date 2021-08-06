import store from "../../store/store";

// src/middleware/auth.js
export default function admin(to, from, next) {
  if (!store.state.wallet.isAdmin) {
    next("/");
  }

  next();
}

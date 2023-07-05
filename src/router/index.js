import { createRouter, createWebHistory } from "vue-router";
import ViewLogin from "../views/Login.vue";
import ViewProfile from "../views/Profile.vue";

const routes = [
  {
    path: "/",
    name: "Profile",
    component: ViewProfile,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: ViewLogin,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;

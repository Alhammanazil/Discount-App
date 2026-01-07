import { createRouter, createWebHistory } from "vue-router";
import DiscountListPage from "../pages/DiscountListPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: DiscountListPage,
  },
  {
    path: "/diskon",
    name: "Diskon",
    component: DiscountListPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const Home = () => import(/* webpackChunkName: "home" */ '@src/views/home.vue');
const Products = () => import(/* webpackChunkName: "products" */ '@src/views/products.vue');
const Err = () => import(/* webpackChunkName: "err" */ '@src/views/err.vue');

const routes = [
  {path: "/home", name: "home", component: Home},
  {path: "/products", name: "products", component: Products},
  {path: "/err", name: "err", component: Err},
];

const createRouter = () => new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes
});

const router = createRouter();

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router;

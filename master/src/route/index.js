import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const Err = () => import(/* webpackChunkName: "err" */ '@src/views/err.vue');

const routes = [
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

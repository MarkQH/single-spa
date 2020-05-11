const index = () => import(/* webpackChunkName: "index" */ '@src/views/index.vue');
const info = () => import(/* webpackChunkName: "info" */ '@src/views/info/index.vue');
const detail = () => import(/* webpackChunkName: "detail" */ '@src/views/detail/index.vue');

const routes = [
  {path: "/", name: "首页", component: index},
  {path: "/list", name: "列表页", component: info},
  {path: "/detail", name: "详情页", component: detail},
];

export default routes;

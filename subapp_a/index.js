import "./public-path";
import Vue from 'vue';
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "@src/route";
import store from "@src/store";
import routeMatch from "./auth/route-match"; // 导入路由匹配文件路径函数
import { getMenuApi } from "@src/api/commonApi";
// 开发环境导入api mock数据;
import { mockXHR } from './mock';
mockXHR()

Vue.config.productionTip = false;
let router = null;
let instance = null;

// 判断是否是在qiankun环境下
const __qiankun__ = window.__POWERED_BY_QIANKUN__;

export async function bootstrap({ utils, emitFnc, pager, actions }) {
  /**
   * 下发一些列主应用参数
   */
  // 把工具函数挂在在Vue的$mainUtils对象上
  Vue.prototype.$emitUtils = utils;
  // 挂载子应用向主应用通信功能
  Object.keys(emitFnc).forEach(i => {
    Vue.prototype[i] = emitFnc[i];
  });
  // 在子应用注册呼机，提供子应用间通信功能
  pager.subscribe(v => {
    console.log(`监听到子应用${v.from}发来的消息`, v);
  });
  Vue.prototype.$pager = pager;
  // 注册官方通信方法
  /**
   * actions.onGlobalStateChange((state, prev) => console.log(`子应用subapp-ui监听到来自${state.from}发来消息：`, state, prev)); 
   */
  Vue.prototype.$actions = actions;
};

export async function mount({ storeData = {}, ROUTES, routerBase, state} = {} ) {
  router = new VueRouter({
    base: __qiankun__ ? routerBase : "/",
    mode: "history",
    routes: __qiankun__ ? routeMatch(ROUTES, routerBase) : routes
  });

  instance = new Vue({
    router,
    store,
    render: h => h(App, {
      props: {...storeData, ...state }
    })
  }).$mount("#app");
};

export async function unmount() {
  instance.$destory();
  instance = null;
  router = null;
};

// 单独开发环境
__qiankun__ || mount();

  





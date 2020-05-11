import Vue from 'vue';
import App from "./App.vue";
import VueRouter from "vue-router";
import store from "@src/store";
import selfRoutes from "@src/route";
import routeMatch from "@src/route/routes-match";
import appStore from "@src/utils/app-store";

// 判断是否是乾坤环境
const __qiankun__ = window.__POWERED_BY_QIANKUN__;
let router = null;
let instance = null;

const lifeCycle = () => {
  return {
    async bootstrap(props) {
      console.log('获取主应用的传值', props);
      const { libs, emits, pager } = props;
      const { goTo } = libs;
      /**
       * @name 下发一些列主应用参数
       */
      // 把工具函数挂在在Vue的$mainUtils对象上
      Vue.prototype.$goTo = goTo;
      // 挂载子应用向主应用通信功能
      Object.keys(emits).forEach(i => {
        Vue.prototype[i] = emits[i];
      });
     

      // /**
      //  * @name 自定义通信方法
      //  */
      // pager.subscribe(v => {
      //   console.log(`监听到子应用${v.from}发来的消息`, v);
      // });
      // Vue.prototype.$pager = pager;
    },
    async mount(props) {
      //注册官方通信方法
      appStore(props);
      // 注册微应用实例化函数
      render(props);
    },
    async unmount(props) {
      instance.$destroy();
      instance = null;
      router = null;
    }
  }
}

const render = ({ storeData = {}, routes, routerBase, state} = {}) => {
  router = new VueRouter({
    base: __qiankun__ ? routerBase : "/",
    mode: "history",
    routes: __qiankun__ ? routeMatch(routes, routerBase) : selfRoutes
  });

  instance = new Vue({
    router,
    store,
    render: h => h(App, {
      props: {...storeData, ...state }
    })
  }).$mount("#app");
};

export { lifeCycle, render };
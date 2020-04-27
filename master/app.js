import Vue from 'vue';
import App from "./app.vue";
import router from "@src/route";
import store from "@src/store";
import { getMenuApi } from "@src/api/commonApi";
// 开发环境导入api mock数据;
import { mockXHR } from './mock';
mockXHR()
// 导入乾坤函数
import {
  registerMicroApps, // 注册子应用方法
  setDefaultMountApp, // 设默认启用的子应用
  runAfterFirstMounted, // 首个子应用加载完毕回调
  start, // 启动qiankun
  addGlobalUncaughtErrorHandler, // 添加全局未捕获异常处理器
  initGlobalState, // 官方应用间通信
} from "qiankun";

// 路由监听函数
import { genActiveRule } from '@src/utils';

/**
 * 主应用下发公共资源给子应用
 */

// 导入主应用UI库
//  import LibraryUI from './src/lib/ui';
// 导入主应用工具类库
import LibraryJS from '@src/lib/js';
// 导入主应用需要响应下发的emit事件函数
import * as childEmit from '@src/utils/childEmit';
// 导入应用间通信工具：呼机
import pager from '@src/utils/pager';
// 定义传入的子应用的数据
const payload = {
  storeData: store.getters, // 从主应用仓库读取的数据
  utils: LibraryJS, // 派发给子应用的工具类库
  emitFnc: childEmit, // 从主应用下发emit函数来收集子应用的数据
  pager, // 子应用相互间通信的工具
  state: {
    message: '老大在呼叫小弟',
    date: new Date(),
  },
  // components: LibraryUI, // 派发的可复用组件
};

// 主应用注册呼机
pager.subscribe(v => {
  console.log(`监听到子应用${v.form}发来的消息`, v);
  store.dispatch('app/setToken', v.token);
});

// 在主应用注册官方通信方案
const actions = initGlobalState(payload.state);
// 注册消息监听函数
actions.onGlobalStateChange((state, prev) => console.log(`主应用应用监听到来自${state.from}发来消息：`, state, prev));

new Vue({
  el: "#app",
  router,
  store,
  render(h) {
    return h(App);
  }
})

// 获取app注册表
getMenuApi()
  .then(({ data }) => {
    if(data.code === 200) {
      const _res = data.data || [];
      // 处理菜单
      store.dispatch('menu/setUserMenu', _res);
      if(_res.length === 0) {
        console.log('没有注册的子应用');
        return false;
      };
      let apps = [];
      let defaultApp = null;
      _res.forEach(i => {
        apps.push({
          name: i.module,
          entry: i.entry,
          container: '#apps-view',
          activeRule: genActiveRule(i.routerBase),
          props: {...payload, routes: i.children, routeBase: i.routeBase, actions}
        });
        if(i.defaultRegister) defaultApp = i.routerBase;
      });
      // 注册子应用
      registerMicroApps(apps, {
        beforeLoad: [
          app => {
            console.log('before load', app);
          }
        ],
        beforeMount: [
          app => {
            console.log('before mount', app);
          }
        ],
        afterUnmount: [
          app => {
            console.log('after unload', app);
          }
        ]
      });
      // 设置默认子应用
      if(!defaultApp) defaultApp = _res[0].routeBase;
      setDefaultMountApp(defaultApp);
      // 首个子应用加载完毕之后的回调
      runAfterFirstMounted(app => {
        console.log(app);
      });
      start({prefetch: true});
      // 设置全局未捕获异常处理器
      addGlobalUncaughtErrorHandler(event => console.log(event));
    };
  });
  





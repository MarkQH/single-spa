import Vue from "vue"
import router from '@src/route'
import store from '@src/store'
import App from './App.vue'

export function vueRender() {
  Vue.config.productionTip = false;
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
  return;
};
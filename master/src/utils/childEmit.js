/**
 * @name 用于emit触发主应用事件的函数
 */

 import store from "@src/store";
 
function changeDataMsg(val) {
  store.dispatch('send-data/changeMsg', val)
}

export {
  changeDataMsg
}
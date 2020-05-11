import store from "@src/store";

/**
 * @name 声明一个常量准备将props内的部分内容储存起来
 */
const STORE = {};

/**
 * @name 启动qiankun应用间通信机制
 * @param {Object} props 官方通信函数
 */
const appStore = props => {
  /**
   * @name 监听应用间通信，并存入store
   */
  props.onGlobalStateChange(
    (value, prev) => {
      console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev)
      store.dispatch('appstore/setMsg', value.msg)
    },
    true
  );
  props.setGlobalState({
    ignore: props.name,
    msg: `来自${props.name}动态设定的消息`,
  });

  /**
   * @name 将你需要的数据存起来，供下面setState方法使用
   */
  STORE.setGlobalState = props.setGlobalState;
  STORE.name = props.name;
};

/**
 * @name 全局setState方法，修改的内容将通知所有微应用
 * @param {Object} data 按照你设定的内容格式数据 
 */
const setState = (data) => {
  STORE.setGlobalState({
    ignore: STORE.name,
    ...data
  })
}

export {
  setState
}
export default appStore;


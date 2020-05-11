<template lang='pug'>
  #subapp.sub-container
    .warp
      section
        button(@click="jump") 跳转到B应用
        button(@click="broadcast") 向所有应用广播
      section
        router-link.link(to="/") A首页
        router-link.link(to="/info") A信息页
        router-link.link(to="/detail") A详情页
      <router-view/>
</template>

<script>
import { setState } from "@src/utils/appStore";
export default {
  name: "rootView",
  components: {

  },
  props: {

  },
  data(){
    return {

    }
  },
  methods: {
    jump() {
      this.$goTo('/b');
    },
    broadcast() {
      setState({
        msg: '我是来自应用A的信息'
      })
    }
  }
};
</script>

<style lang="less" scoped>
#subapp{
  width: 100%;
  height: 400px;
  background-color: cornflowerblue;
  .link{
    color: #fff;
  }
}
</style>

<template lang='pug'>
  #subapp.sub-container
    .warp
      section
        button(@click="jump") 跳转到A应用
</template>

<script>
export default {
  name: "rootView",
  components: {

  },
  props: {

  },
  data() {
    return {

    }
  },
  methods: {
    jump() {
      this.$goTo('/a');
    }
  }
};
</script>

<style lang="less" scoped>
#subapp{
  width: 100%;
  height: 400px;
  background-color: darkseagreen;
}
</style>

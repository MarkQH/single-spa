<!--  -->
<template lang='pug'>
  div.contrainer
</template>

<script>
import Header from '@components/header.vue';
import Footer from '@components/footer.vue';
export default {
  props() {},
  data() {
    return {

    }
  },
  computed: {

  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    handle() {
      console.log('+++');
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>
<style lang="less" scoped>

</style>
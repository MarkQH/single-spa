<template lang="pug">
  .layout
    Header
    #subapp-view
    Footer
</template>

<script>
import Header from '@components/header.vue';
import Footer from '@components/footer.vue';
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {

    }
  },
  mounted() {

  }
}
</script>
<style lang='less' scoped>
/* @import url(); 引入css类 */

</style>
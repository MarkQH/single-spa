<template lang='pug'>
  div(id="root", class="main-container")
    Layout
</template>

<script>
import Layout from '@components/layout.vue';

export default {
  name: "rootView",
  components: {
    Layout
  },
  props: {

  }
};
</script>

<style lang="less" scoped>
#apps-view{
  width: 600px;
}
</style>

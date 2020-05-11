<template lang="pug">
  .container
    .a 我是A的详情{{msg}}
</template>
<script>
export default {
  name: 'detail',
  data() {
    return {
      msg: 'xxoo'
    }
  }
}
</script>
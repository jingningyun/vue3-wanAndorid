<script setup lang='ts'>
definePage({
  name: 'web',
  meta: {
    level: 2,
  },
})
const params = history.state.params
/**
 * const url = router.params.url
 * 接受不到，从Vue Router的2022-8-22 这次更新后，我们使用上面的方式在新页面无法获取
 * https://juejin.cn/post/7222862599851638841
 */
</script>

<template>
  <NavBar :title="params.title" />
  <Container class="container">
    <iframe
      :src="params.url" width="100%" height="100%" frameborder="0"
    />
  </Container>
</template>

<style scoped>
.container {
  padding-right: 0 !important;
  padding-left: 0 !important;
}
</style>

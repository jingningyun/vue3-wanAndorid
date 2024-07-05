<script setup lang='ts'>
const active = ref(0)
const route = useRoute()

const display = computed(() => {
  if (route.meta.level && route.meta.level !== 2)
    return true
  return false
})
</script>

<template>
  <van-tabbar v-show="display" v-model="active" route active-color="#34D399">
    <van-tabbar-item replace to="/">
      <span>首页</span>
      <template #icon>
        <div class="i-carbon:home" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item replace to="/search">
      <span>热点</span>
      <template #icon>
        <div class="i-carbon:location-current" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item replace to="/tree">
      <span>体系</span>
      <template #icon>
        <div class="i-carbon:container-services" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item replace to="/me">
      <span>我的</span>
      <template #icon>
        <div class="i-carbon:user" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>

</style>

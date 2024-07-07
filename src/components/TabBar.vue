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
  <VanTabbar v-show="display" v-model="active" route active-color="#34D399">
    <VanTabbarItem replace to="/">
      <span>首页</span>
      <template #icon>
        <div class="i-carbon:home" />
      </template>
    </VanTabbarItem>

    <VanTabbarItem replace to="/search">
      <span>热点</span>
      <template #icon>
        <div class="i-carbon:location-current" />
      </template>
    </VanTabbarItem>

    <VanTabbarItem replace to="/tree">
      <span>体系</span>
      <template #icon>
        <div class="i-carbon:container-services" />
      </template>
    </VanTabbarItem>

    <VanTabbarItem replace to="/me">
      <span>我的</span>
      <template #icon>
        <div class="i-carbon:user" />
      </template>
    </VanTabbarItem>
  </VanTabbar>
</template>

<style scoped>

</style>

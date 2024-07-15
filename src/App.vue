<script setup lang="ts">

</script>

<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive include="tree" :max="4">
      <component :is="Component" :key="route.name" />
    </keep-alive>
  </router-view>
  <TabBar />
</template>

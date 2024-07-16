<script setup lang="ts">
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive include="Home,Search,Tree" :max="4">
      <component :is="Component" :key="route.name" />
    </keep-alive>
  </router-view>
  <TabBar />
</template>

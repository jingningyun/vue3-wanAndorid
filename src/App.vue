<script setup lang="ts">

</script>

<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" :key="route.name" />
  </router-view>
  <TabBar />
</template>

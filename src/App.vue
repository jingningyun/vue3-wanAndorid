<script setup lang="ts">

</script>

<template>
  <NavBar />
  <router-view v-slot="{ Component, route }">
    <component :is="Component" :key="route.name" />
  </router-view>
  <TabBar />
</template>

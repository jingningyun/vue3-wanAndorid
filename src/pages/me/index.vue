<script setup lang='ts'>
import { useUserStore } from '@/stores'

definePage({
  name: 'me',
  meta: {
    level: 1,
  },
})
const userInfo = useUserStore()
</script>

<template>
  <div>{{ userInfo.username }}</div>
</template>

<style scoped>

</style>

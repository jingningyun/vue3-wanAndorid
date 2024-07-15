<script setup lang='ts'>
import { useTreeStore } from '@/stores'

definePage({
  name: 'treeDetail',
  meta: {
    level: 2,
  },
})
const active = ref(0)
const treeStore = useTreeStore()
const name = treeStore.name
const childrens = treeStore.children
</script>

<template>
  <NavBar :title="name" />
  <Container>
    <van-tabs v-model:active="active" color="emerald">
      <van-tab v-for="children in childrens" :key="children.id" :title="children.name">
        {{ children.name }}
      </van-tab>
    </van-tabs>
  </Container>
</template>

<style scoped>

</style>

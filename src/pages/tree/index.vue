<script setup lang='ts'>
import { getTreeList } from '@/api/tree'
import { useTreeStore } from '@/stores'
import type { treeResult, treeResultItem } from '@/api/tree/typing'

definePage({
  name: 'tree',
  meta: {
    level: 1,
    keepAlive: true,
  },
})

const router = useRouter()
const treeStore = useTreeStore()
const treeList = ref([])

onMounted(() => {
  getTreeList().then((res) => {
    treeList.value = res.data
  })
})

function getTreeDes(children: Array<treeResultItem>): string {
  const str = children.map(item => item.name).join(' ')
  return str
}

function goDetail(item: treeResult) {
  treeStore.name = item.name
  treeStore.children = item.children
  router.push({ name: 'treeDetail' })
}
</script>

<script lang='ts'>
export default {
  name: 'Tree',
}
</script>

<template>
  <Container class="container">
    <div v-for="item in treeList" :key="item.id" class="tree-item" flex flex-center flex-row @click="goDetail(item)">
      <div flex-grow-1 pr-30>
        <div font-size-16>
          {{ item.name }}
        </div>
        <div w-full p-2 font-size-12 font-400>
          {{ getTreeDes(item.children) }}
        </div>
      </div>
      <div h-full>
        <div class="i-carbon:chevron-right" font-size-25 />
      </div>
    </div>
  </Container>
</template>

<style scoped>
.container {
  padding: 0px !important;
  padding-bottom: 50px !important;
  background-color: #f5f5f5;

  .tree-item {
    margin: 10px;
    padding: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 10px;
  }
}
</style>

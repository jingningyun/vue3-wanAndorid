<script setup lang='ts'>
import { cancelCollectArticlet, collectList } from '@/api/collect'
import type { collectResult } from '@/api/collect/typing'

definePage({
  name: 'collect',
  meta: {
    level: 2,
    title: '我的收藏',
  },
})
const router = useRouter()
const refreshing = ref(false)
const collects = ref<collectResult[]>([])
const page = ref(0)
const loading = ref(false)
const finished = ref(false)

function onRefresh() {
  refreshing.value = false
  collects.value = []
  page.value = 0
  loading.value = false
  finished.value = false
  getCollectList()
}

function getCollectList() {
  collectList(page.value).then((res) => {
    if (collects.value.length === res.data.total) {
      loading.value = false
      finished.value = true
      return
    }
    const length = res.data.datas.length
    for (let i = 0; i < length; i++) {
      collects.value.push(res.data.datas[i])
    }
    loading.value = false
    /**
     *  判断是否加载完毕
     *  如果当前页数等于总页数，则表示加载完毕
     */
    if (res.data.pageCount === res.data.curPage) {
      finished.value = true
    }
  })
}

function onLoad() {
  getCollectList()
  page.value++
}

function goToUrl(title: string, url: string) {
  const params = { url, title }
  router.push({ name: 'web', state: { params } })
}

// 加收藏
function handelCollectArticlet(collect: collectResult) {
  cancelCollectArticlet(collect.id).then((res) => {
    if (res.errorCode === 0) {
      collects.value = collects.value.filter(item => item.id !== collect.id)
    }
  })
}
</script>

<template>
  <NavBar title="我的收藏" />
  <Container>
    <VanPullRefresh v-model="refreshing" @refresh="onRefresh">
      <!-- 文章列表 -->
      <VanList
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <VanCell v-for="collect in collects" :key="collect.id" @click="goToUrl(collect.title, collect.link)">
          <div w-full flex-auto text-left>
            <span w-full text-black>{{ collect.title }}</span>
            <div w-full font-size-12 font-200>
              <span text-emerald>作者: {{ collect.author ? collect.author : "佚名" }}</span>
              <span pl-10 text-emerald>时间: {{ collect.niceDate ? collect.niceDate : "未知" }}</span>

              <div class="i-carbon:favorite-filled" color="#ff0000" pos-absolute bottom-10 right-10 h-16 w-16 @click.stop="handelCollectArticlet(collect)" />
            </div>
          </div>
        </VanCell>
      </VanList>
    </vanpullrefresh>
  </Container>
</template>

<style scoped>

</style>

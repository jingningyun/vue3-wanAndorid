<script setup lang='ts'>
import { useTreeStore } from '@/stores'
import { getTreeArticleApi } from '@/api/tree'

definePage({
  name: 'treeDetail',
  meta: {
    level: 2,
  },
})
const active = ref(0)
const treeStore = useTreeStore()
const name = treeStore.name
// 体系下的小标题
const childrens = treeStore.children

const router = useRouter()
// 获取小标题的文章
const articles = ref([])
const refreshing = ref(false)
const page = ref(0)
const loading = ref(false)
const finished = ref(false)

function onRefresh() {
  refreshing.value = false
  page.value = 0
  articles.value = []
  loading.value = false
  finished.value = false

  getTreeArticle(page.value, childrens[active.value].id)
}

function getTreeArticle(page: number, id: number) {
  getTreeArticleApi(page, id).then((res) => {
    if (articles.value.length === res.data.total) {
      loading.value = false
      finished.value = true
      return
    }
    const length = res.data.datas.length
    for (let i = 0; i < length; i++) {
      articles.value.push(res.data.datas[i])
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
  getTreeArticle(page.value, childrens[active.value].id)
  page.value++
}

function goToUrl(title: string, url: string) {
  const params = { url, title }
  router.push({ name: 'web', state: { params } })
}

function onClickTab() {
  onRefresh()
}
</script>

<template>
  <NavBar :title="name" />
  <Container>
    <!-- 头部标签 -->
    <van-tabs v-model:active="active" color="emerald" class="tabs-title" @click-tab="onClickTab">
      <van-tab v-for="children in childrens" :key="children.id" :title="children.name" />
    </van-tabs>

    <!-- 文章列表 -->
    <VanPullRefresh v-model="refreshing" @refresh="onRefresh">
      <VanList
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <VanCell v-for="article in articles" :key="article.id" @click="goToUrl(article.title, article.link)">
          <div w-full flex-auto text-left>
            <span w-full text-black>{{ article.title }}</span>
            <div w-full font-size-12 font-200>
              <span text-emerald>作者: {{ article.author ? article.author : "佚名" }}</span>
              <span pl-10 text-emerald>时间: {{ article.niceDate ? article.niceDate : "未知" }}</span>

              <div class="i-carbon:chevron-right" pos-absolute bottom-10 right-10 h-16 w-16 />
            </div>
          </div>
        </VanCell>
      </VanList>
    </VanPullRefresh>
  </Container>
</template>

<style scoped>
.tabs-title {
  position: sticky;
  top: 0;
  padding-bottom: 5px;
  background-color: #fff;
  z-index: 999;
}
</style>

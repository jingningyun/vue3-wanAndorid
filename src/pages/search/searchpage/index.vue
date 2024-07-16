<script setup lang='ts'>
import { getSearchApi } from '@/api/search'

definePage({
  name: 'searchpage',
  meta: {
    level: 2,
  },
})

const router = useRouter()
const page = ref(0)
const searckKey = ref('')
searckKey.value = router.currentRoute.value.query.searchKey as string

// 获取小标题的文章
const articles = ref([])
const refreshing = ref(false)
const loading = ref(false)
const finished = ref(false)

function onRefresh() {
  refreshing.value = false
  page.value = 0
  articles.value = []
  loading.value = false
  finished.value = false
  getSearch()
}

function getSearch() {
  getSearchApi(page.value, searckKey.value).then((res) => {
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
  getSearch()
  page.value++
}

function goToUrl(title: string, url: string) {
  const params = { url, title }
  router.push({ name: 'web', state: { params } })
}
</script>

<template>
  <Container class="container">
    <!-- title -->
    <div class="title-wrap" h-46 flex-center bg-white>
      <i h-46 flex-center class="van-badge__wrapper van-icon van-icon-arrow-left van-nav-bar__arrow" color="#34d39980" @click="router.back()" />
      <van-field
        v-model="searckKey" placeholder="请输入" rows="1"
        autosize @keydown.enter="onRefresh"
      />
      <van-button type="success" size="mini" class="search-btn" plain hairline w-56 @click="onRefresh">
        搜索
      </van-button>
    </div>

    <VanPullRefresh v-model="refreshing" @refresh="onRefresh">
      <!-- 文章列表 -->
      <VanList
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <VanCell v-for="article in articles" :key="article.id" @click="goToUrl(article.title, article.link)">
          <div w-full flex-auto text-left>
            <span w-full text-black class="article-title">{{ article.title }}</span>
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

<style scoped lang="less">
.title-wrap {
  position: sticky;
  top: 0;
  padding-bottom: 5px;
  background-color: #fff;
  z-index: 999;
  .van-icon {
    padding: 0 var(--van-padding-md);
  }
  .search-btn {
    margin-right: var(--van-padding-md);
  }
  .title-content {
    text-transform: capitalize;
    font-size: 17px;
    font-weight: 600;
  }
}
.container {
  padding-top: 0px !important;
  background-color: #f5f5f5;
}
</style>

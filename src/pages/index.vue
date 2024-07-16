<script setup lang='ts'>
import { getArticlet, getBanner } from '@/api/home'
import { cancelCollectArticlet, collectArticlet } from '@/api/collect'
import type { articletResult, bannerResult } from '@/api/home/typing'
import { useUserStore } from '@/stores'

const userStore = useUserStore()

const router = useRouter()
/**
 * 轮播图
 */
const banners = ref<bannerResult[]>()

const articlets = ref<articletResult[]>([])

const refreshing = ref(false)
const loading = ref(false)
const finished = ref(false)
const page = ref(0)

definePage({
  name: 'home',
  meta: {
    level: 1,
  },
})

onMounted(() => {
  loadBanners()
})

/**
 * 下拉刷新
 */
function onRefresh() {
  // 重置控制数据
  refreshing.value = false
  page.value = 0
  loading.value = false
  finished.value = false
  articlets.value = []
  loadBanners()

  loadArticlets()
}

/**
 * 加载更多
 */
function onLoad() {
  loadArticlets()
  // 因为初次默认执行了一次，所有后面加为下一次
  page.value++
}

/**
 * 加载轮播图
 */
function loadBanners() {
  getBanner().then((res) => {
    banners.value = res.data
  })
}

/**
 * 获取文章列表
 */
function loadArticlets() {
  getArticlet(page.value).then((res) => {
    const length = res.data.datas.length
    for (let i = 0; i < length; i++) {
      articlets.value.push(res.data.datas[i])
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

// 加收藏
function handelCollectArticlet(articlet: articletResult) {
  if (userStore.id) {
    if (articlet.collect) {
      cancelCollectArticlet(articlet.id).then(() => {
        articlet.collect = !articlet.collect
      })
    }
    else {
      collectArticlet(articlet.id).then(() => {
        articlet.collect = !articlet.collect
      })
    }
  }
  else {
    router.push({ name: 'login' })
  }
}

function goToUrl(title: string, url: string) {
  // 跳转
  /**
   * router.push({ name: 'web', params: { url } })
   * 接受不到，从Vue Router的2022-8-22 这次更新后，我们使用上面的方式在新页面无法获取
   * https://juejin.cn/post/7222862599851638841
   */
  const params = { url, title }
  router.push({ name: 'web', state: { params } })
}
</script>

<script lang= 'ts'>
/**
 * 因为 setup的语法糖，不能在里面定义name，定义的话不生效
 * https://blog.csdn.net/qq_41839808/article/details/128923264
 */

export default defineComponent({
  name: 'Home',
})
</script>

<template>
  <Container class="container" pb-52>
    <VanPullRefresh v-model="refreshing" @refresh="onRefresh">
      <!-- 首页轮播 -->
      <VanSwipe type="mask" :autoplay="3000" h-200 w-full>
        <VanSwipeItem v-for="(banner) in banners" :key="banner.id" @click="goToUrl(banner.title, banner.url)">
          <span pos-absolute bottom-0 left-0 w-full bg-black bg-op-50 p-5 font-size-12 font-300 backdrop-blur-2 color="#fff">{{ banner.title }}</span>
          <img v-lazy="banner.imagePath" h-full w-full>
        </VanSwipeItem>
      </VanSwipe>

      <!-- 文章列表 -->
      <VanList
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <VanCell v-for="articlet in articlets" :key="articlet.id" @click="goToUrl(articlet.title, articlet.link)">
          <div w-full flex-auto text-left>
            <span w-full text-black>{{ articlet.title }}</span>
            <div w-full font-size-12 font-200>
              <span text-emerald>作者: {{ articlet.author ? articlet.author : "佚名" }}</span>
              <span pl-10 text-emerald>分类: {{ articlet.superChapterName ? articlet.superChapterName : "未知" }}</span>
              <span pl-10 text-emerald>时间: {{ articlet.niceShareDate ? articlet.niceShareDate : "未知" }}</span>

              <div class="i-carbon:favorite-filled" :color=" articlet.collect ? '#ff0000' : '#999'" pos-absolute bottom-10 right-10 h-16 w-16 @click.stop="handelCollectArticlet(articlet)" />
            </div>
          </div>
        </VanCell>
      </VanList>
    </VanPullRefresh>
  </Container>
</template>

<style scoped lang='less'>
.container {
  padding-top: 0 !important;
  padding-right: 0 !important;
  padding-left: 0 !important;
}
</style>

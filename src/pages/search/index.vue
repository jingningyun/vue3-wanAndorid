<script setup lang='ts'>
import { getFriendApi, getHotkeyApi } from '@/api/search'

definePage({
  name: 'search',
  meta: {
    level: 1,
  },
})

const router = useRouter()

const hotkeys = ref([])
const friends = ref([])

onMounted(() => {
  getHotkeyApi().then((res) => {
    hotkeys.value = res.data
  })
  getFriendApi().then((res) => {
    friends.value = res.data
    friends.value = friends.value.slice(0, 24)
  })
})

function doSearch(searchKey: string) {
  // console.dir(searchKey)

  router.push({ name: 'searchpage', query: { searchKey } })
}

function goToUrl(title: string, url: string) {
  const params = { url, title }
  router.push({ name: 'web', state: { params } })
}
</script>

<script lang='ts'>
export default {
  name: 'Search',
}
</script>

<template>
  <Container class="container">
    <!-- 自动生成的VanRow 不可用，垃圾 -->
    <van-row b-b-black pl-10 pr-10 pt-10>
      <van-col span="22" font-size-16 font-500>
        搜索热点
      </van-col>
      <van-col span="2" h-full @click="doSearch('')">
        <div font-size-22 font-700 class="i-carbon:search" />
      </van-col>
    </van-row>

    <van-row justify="center" :gutter="[0, 10]" mt-10>
      <van-col v-for="hotkey in hotkeys" :key="hotkey.id" span="8" pb-10 pl-10 pr-10 pt-10 font-size-12 color-dark font-500>
        <span bg-white pb-10 pl-10 pr-10 pt-10 class="hotkey-context" @click="doSearch(hotkey.name)">
          {{ hotkey.name }}
        </span>
      </van-col>
    </van-row>

    <div b-b-black pl-10 pr-10 pt-10 font-size-16 font-500>
      搜索网址
    </div>
    <van-row justify="center" :gutter="[0, 10]" mt-10>
      <van-col v-for="friend in friends" :key="friend.id" span="8" pb-10 pl-10 pr-10 pt-10 font-size-12 color-dark font-500>
        <span bg-white pb-10 pl-10 pr-10 pt-10 class="hotkey-context" @click="goToUrl(friend.name, friend.link)">
          {{ friend.name }}
        </span>
      </van-col>
    </van-row>
  </Container>
</template>

<style scoped lang="less">
.container {
  padding-top: 0px !important;
  padding-bottom: 50px !important;
  background-color: #f5f5f5;

  .hotkey-context {
    white-space: nowrap;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-overflow: ellipsis;
  }
}
</style>

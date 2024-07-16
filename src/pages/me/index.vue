<script setup lang='ts'>
import { useUserStore } from '@/stores'

definePage({
  name: 'me',
  meta: {
    level: 1,
  },
})
const userInfo = useUserStore()
const router = useRouter()

function logou() {
  userInfo.logout()
  router.replace('/')
}
const show = ref(false)
function showPopup() {
  console.log('showPopup')

  show.value = true
}
</script>

<template>
  <Container class="container" flex flex-col pb-52>
    <div flex-center flex-grow-1 flex-col bg-emerald>
      <img src="@/assets/logo.svg" class="header-img" h-60 w-60 object-contain>
      <div mt-10 font-size-18 color-white font-500>
        {{ userInfo.username }}
      </div>
    </div>

    <div w-full flex flex-grow-2 flex-col pb-20 pl-20 pr-20 bg="#f5f5f5">
      <div class="menu-list" mb-20 mt-20 flex flex-col gap-10 pb-10 pt-10>
        <div class="menu-item" flex flex-row border-b="0.1px solid #cccccc50" pb-18 @click="router.push('/me/collect')">
          <span flex-grow-1>我的收藏</span>
          <div class="i-carbon:chevron-right" />
        </div>
        <div class="menu-item" flex flex-row pb-8 @click="showPopup">
          <span flex-grow-1>关于我们</span>
          <div class="i-carbon:chevron-right" />
        </div>
      </div>

      <VanButton type="success" w-full font-bold btn @click="logou()">
        退出登录
      </VanButton>
    </div>

    <!-- 圆角弹窗（居中） -->
    <van-popup v-model:show="show" round :style="{ padding: '20px' }" closeable>
      <h3>网站内容</h3>
      <p class="about-p">
        本网站每天新增20~30篇优质文章，并加入到现有分类中，力求整理出一份优质而又详尽的知识体系，闲暇时间不妨上来学习下知识；除此以外，并为大家提供平时开发过程中常用的工具以及常用的网址导航。
      </p>
      <p class="about-p">
        原网址:
        <a href="https://www.wanandroid.com/" target="_blank">玩Android</a>
      </p>
      <h3>源码位置</h3>
      <p class="about-p">
        本项目开源，如果你发现任何错误，不要犹豫，马上点击<a href="https://github.com/jingningyun/vue3-wanAndorid" target="_blank">GitHub</a>，在上面发起<b>issue</b>或者提交<b>pull request</b>。
      </p>
    </van-popup>
  </Container>
</template>

<style scoped leng="less">
.container {
  padding-top: 0 !important;
  padding-right: 0 !important;
  padding-left: 0 !important;

  .header-img {
    filter: brightness(0) invert(1);
    border: 2px solid #fbfbfb;
    border-radius: 50%;
    padding: 10px;
  }

  .menu-list {
    background: #fff;
    border-radius: 10px;
    .menu-item {
      font-size: 16px;
      color: #999999;
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 8px;
    }
  }

  .about-p {
    text-indent: 2em;
    line-height: 1.5;
  }
}
</style>

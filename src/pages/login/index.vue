<script setup lang='ts'>
import { showLoadingToast, showNotify } from 'vant'
import { useUserStore } from '@/stores'

definePage({
  name: 'login',
  meta: {
    level: 2,
  },
})
const store = useUserStore()
const router = useRouter()
const uName = ref('')
const pWord = ref('')
const reWord = ref('') // again
const disLogin = ref(true)
const modeLogin = ref(true)
const errMsg = ref('')

watch([uName, pWord, reWord], ([newUName, newPWord, newReWord]) => {
  if (modeLogin.value) {
    disLogin.value = !(newUName && newPWord)
  }
  else {
    disLogin.value = !(newUName && newPWord && newReWord)
  }
})

watch([pWord, reWord], ([newPWord, newReWord]) => {
  if (!newPWord || !newReWord) {
    errMsg.value = ''
  }
  else {
    if (newReWord !== newPWord) {
      errMsg.value = '两次密码不一致'
    }
    else {
      errMsg.value = ''
    }
  }
})

/**
 * 切换模式
 */
function toggleModeLogin() {
  modeLogin.value = !modeLogin.value
  resetState()
}

/**
 * 重置状态
 */
function resetState() {
  uName.value = ''
  pWord.value = ''
  reWord.value = ''
  errMsg.value = ''
}

function handleBack() {
  if (router.getRoutes.length === 0) {
    router.push({ name: 'home' })
    return
  }
  router.back()
}

/**
 * 登录或者注册
 */
function handleLoginRegister() {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
  })
  errMsg.value = ''
  if (modeLogin.value) {
    // 登录
    store.login(uName.value, pWord.value).then(() => {
      const to = history.state.to
      router.replace(to)
    }).catch((err) => {
      errMsg.value = err
    })
  }
  else {
    // 注册
    store.register(uName.value, pWord.value, reWord.value).then(() => {
      modeLogin.value = true
      showNotify({ type: 'success', message: '注册成功' })
      resetState()
    }).catch((err) => {
      errMsg.value = err
    })
  }
}
</script>

<template>
  <Container flex flex-col bg-emerald bg-op-50>
    <div font-size-25 text-white font-bold class="i-carbon:arrow-left" @click="handleBack" />

    <div w-full flex-center flex-grow-1>
      <img src="@/assets/logo.svg" h-30 w-30 class="animate-bounce" object-contain>
      <span pl-10 font-size-35 color-white font-500>
        玩Android
      </span>
    </div>

    <div flex-grow-2>
      <van-cell-group inset>
        <van-field v-model="uName" label="用户名" placeholder="请输入用户名" />
        <van-field v-model="pWord" type="password" label="密码" placeholder="请输入密码" />
        <van-field v-show="!modeLogin" v-model="reWord" type="password" label="确认密码" placeholder="请再次输入密码" />
        <div v-show="errMsg" pos-absolute right-35 line-clamp-1 mt-5 max-w-200 font-size-13 text-red-6>
          {{ errMsg }}
        </div>
      </van-cell-group>
      <div mt-30 w-full flex pl-15 pr-15>
        <VanButton type="success" plain flex-grow-1 text-white color="#34D39980" font-bold :disabled="disLogin" @click="handleLoginRegister()">
          {{ modeLogin ? '登录' : '注册' }}
        </VanButton>
      </div>
      <div pos-absolute right-30 mt-10 font-size-13 text-white font-400 @click="toggleModeLogin()">
        {{ modeLogin ? '去注册' : '去登录' }}
      </div>
    </div>
  </Container>
</template>

<style scoped>
.animate-bounce {
  filter: brightness(0) invert(1);
  /* fill: #42b983; */
  /* #34D399 */
}
</style>

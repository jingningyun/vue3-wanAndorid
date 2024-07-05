import { defineStore } from 'pinia'
import { loginApi, registerApi } from '@/api/user'

export const useUserStore = defineStore('userInfo', () => {
  const id = ref()
  const token = ref()
  const username = ref()
  const nickname = ref()

  // 登录
  const login = (uName: string, uPwd: string) => {
    return new Promise((resolve, reject) => {
      loginApi(uName, uPwd).then((res) => {
        if (res.errorCode === 0) {
          id.value = res.data.id
          token.value = res.data.token
          username.value = res.data.username
          nickname.value = res.data.nickname
          resolve(res.data.errorMsg)
        }
        else {
          reject(res.errorMsg)
        }
        resolve('')
      }).catch((err) => {
        reject(err.message)
      })
    })
  }

  // 注册
  const register = (uName: string, uPwd: string, rePwd: string) => {
    return new Promise((resolve, reject) => {
      registerApi(uName, uPwd, rePwd).then((res) => {
        if (res.errorCode === 0) {
          userInfo.value = res.data
          resolve(res.data.errorMsg)
        }
        else {
          reject(res.errorMsg)
        }
      }).catch((err) => {
        reject(err.message)
      })
    })
  }

  return {
    id,
    token,
    username,
    nickname,
    login,
    register,
  }
}, {
  persist: true,
})

import type { AxiosPromise } from 'axios'
import request from '@/utils/request'

/**
 * 登录
 * @param username 用户名
 * @param password 密码
 * @returns
 */
export function loginApi(username: string, password: string): AxiosPromise {
  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)
  return request({
    url: 'api/user/login',
    method: 'post',
    data: formData,
  })
}

/**
 * 注册
 * @param username 用户名
 * @param password 密码
 */
export function registerApi(username: string, password: string, repassword: string): AxiosPromise {
  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)
  formData.append('repassword', repassword)
  return request({
    url: 'api/user/register',
    method: 'post',
    data: formData,
  })
}

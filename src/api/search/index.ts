import type { AxiosPromise } from 'axios'
import request from '@/utils/request'

export async function getHotkeyApi(): AxiosPromise<any> {
  return request({
    url: '/api/hotkey/json',
    method: 'get',
  })
}

/**
 * 常用网站
 * https://www.wanandroid.com/friend/json
 * @returns
 */
export async function getFriendApi(): AxiosPromise<any> {
  return request({
    url: '/api/friend/json',
    method: 'get',
  })
}

export async function getSearchApi(page: number, searchKey: string): AxiosPromise<any> {
  const formData = new FormData()
  formData.append('k', searchKey)
  return request({
    url: `/api/article/query/${page}/json`,
    method: 'post',
    data: formData,
  })
}

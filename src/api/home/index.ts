import type { AxiosPromise } from 'axios'
import request from '@/utils/request'

export async function getBanner(): AxiosPromise<any> {
  return request({
    url: '/api/banner/json',
    method: 'get',
  })
}

// 文章列表
export async function getArticlet(page: number): AxiosPromise<any> {
  return request({
    url: `/api/article/list/${page}/json`,
    method: 'get',
  })
}

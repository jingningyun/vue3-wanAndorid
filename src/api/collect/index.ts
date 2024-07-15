import type { AxiosPromise } from 'axios'
import request from '@/utils/request'

// 收藏文章
export async function collectArticlet(id: number): AxiosPromise<any> {
  return request({
    url: `/api/lg/collect/${id}/json`,
    method: 'post',
  })
}

// 取消收藏文章
export async function cancelCollectArticlet(id: number): AxiosPromise<any> {
  return request({
    url: `/api/lg/uncollect_originId/${id}/json`,
    method: 'post',
  })
}

// 收藏列表
export async function collectList(page: number): AxiosPromise<any> {
  return request({
    url: `/api/lg/collect/list/${page}/json`,
    method: 'get',
  })
}

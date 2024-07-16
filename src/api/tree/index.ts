import type { AxiosPromise } from 'axios'
import request from '@/utils/request'

// 获取体系列表
export async function getTreeList(): AxiosPromise<any> {
  return request({
    url: '/api/tree/json',
    method: 'get',
  })
}

// 获取体系下的文章
export async function getTreeArticleApi(page: number, id: number): AxiosPromise<any> {
  return request({
    url: `/api/article/list/${page}/json?cid=${id}`,
    method: 'get',
  })
}

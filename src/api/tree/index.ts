import type { AxiosPromise } from 'axios'
import request from '@/utils/request'

// 获取体系列表
export function getTreeList(): AxiosPromise<any> {
  return request({
    url: '/api/tree/json',
    method: 'get',
  })
}

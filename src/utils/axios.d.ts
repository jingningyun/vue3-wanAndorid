import type { AxiosRequestConfig } from 'axios'
import axios, { Axios, AxiosResponse } from 'axios'

declare module 'axios' {
  interface AxiosResponse<T = any> {
    // 这个地方放属性
    errorCode: number
    errorMsg: string
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance
}

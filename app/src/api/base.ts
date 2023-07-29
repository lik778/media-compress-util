import axios, { AxiosResponse, AxiosError } from 'axios'
import { config } from '@/assets/js/const'
import { ServiceResponse } from '@/interface/request'

const request = axios.create({
  baseURL: config.baseURL,
  timeout: 30000,
  // responseType: 'json'
  // withCredentials: true
})



request.interceptors.response.use((res: AxiosResponse) => {
  return Promise.resolve(res.data)
}, (err: AxiosError) => {
  if(err.response) {
    return Promise.reject('请求错误')
  }
  if(err.request) {
    return Promise.reject('网络异常，请检查后重试')
  }

  return Promise.reject(err)
})


export const requestGet = <T>(url: string, params: any = {}, headers: any = {}): Promise<ServiceResponse<T>> => {
  return request.get(url, { params, headers })
}

export const requestPost = <T>(url: string, data: any = {}, headers: any = {}): Promise<ServiceResponse<T>> => {
  return request.post(url, { ...data }, { headers })
}



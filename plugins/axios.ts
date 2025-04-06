/*
 * File: axios.ts                                                              *
 * Project: nuxt-app                                                           *
 * Created Date: Th Aug 2024                                                   *
 * Author: Yuzhe Shi                                                           *
 * -----                                                                       *
 * Last Modified: Thu Aug 29 2024                                              *
 * Modified By: Yuzhe Shi                                                      *
 * -----                                                                       *
 * Copyright (c) 2024 Nanjing University of Information Science & Technology   *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date      	By	Comments                                                     *
 * ----------	---	---------------------------------------------------------    *
 */



import { client } from '../generated/services.gen'
import axios from 'axios'
export default defineNuxtPlugin((nuxtApp) => {
  const { getToken, clearToken, hasToken } = useAuth()

  client.setConfig({
    baseURL: '/api',
  })

  client.instance.interceptors.request.use(
    (config: any) => {
      if (hasToken()) {
        config.headers.set('Authorization', `Bearer ${getToken()}`)
      }
      return config
    },
    (error: any) => {
      return Promise.reject(error)
    },
  )

  client.instance.interceptors.response.use(
    (response: any) => {
      return response
    },
    (error: { response: { status: number; data: { message?: string } } }) => {
      const toast = useToast()

      if (error.response?.status === 401) {
        // 清除过期的令牌
        clearToken()
        // 获取当前路径并编码
        const currentPath = encodeURIComponent(window.location.pathname + window.location.search)
        // 重定向到登录页面，并带上重定向参数
        window.location.href = `/login?redirect=${currentPath}`
      } else {
        // 处理其他错误
        const errorMessage = error.response?.data?.message || 'An error occurred'
        toast.add({
          title: 'Error',
          description: errorMessage,
          color: 'red',
          timeout: 3000
        })
      }
      return Promise.reject(error)
    },
  )

  const http = axios.create({
    baseURL: '/api',
  })

  http.interceptors.request.use(
    (config: any) => {
      if (hasToken()) {
        config.headers.set('Authorization', `Bearer ${getToken()}`)
      }
      return config
    },
    (error: any) => {
      return Promise.reject(error)
    },
  )

  // 为 http 实例也添加相同的响应拦截器
  http.interceptors.response.use(
    (response: any) => {
      return response
    },
    (error: { response: { status: number; data: { message?: string } } }) => {
      const toast = useToast()

      if (error.response?.status === 401) {
        clearToken()
        const currentPath = encodeURIComponent(window.location.pathname + window.location.search)
        window.location.href = `/login?redirect=${currentPath}`
      } else {
        const errorMessage = error.response?.data?.message || 'An error occurred'
        toast.add({
          title: 'Error',
          description: errorMessage,
          color: 'red',
          timeout: 3000
        })
      }
      return Promise.reject(error)
    },
  )

  nuxtApp.provide('axios', client)
  nuxtApp.provide('http', http)
})

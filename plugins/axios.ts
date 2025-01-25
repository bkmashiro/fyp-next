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
    (error: { response: { status: number } }) => {
      if (error.response.status === 401) {
        // 清除过期的令牌并重定向到登录页面
        clearToken()
        window.location.href = '/login'
      }
      return Promise.reject(error)
    },
  )

  nuxtApp.provide('axios', client)
})

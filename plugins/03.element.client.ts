/*
 * File: element.ts                                                            *
 * Project: nuxt-app                                                           *
 * Created Date: Th Aug 2024                                                   *
 * Author: Yuzhe Shi                                                           *
 * -----                                                                       *
 * Last Modified: Tue Sep 03 2024                                              *
 * Modified By: Yuzhe Shi                                                      *
 * -----                                                                       *
 * Copyright (c) 2024 Nanjing University of Information Science & Technology   *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date      	By	Comments                                                     *
 * ----------	---	---------------------------------------------------------    *
 */

import ElementPlus, { ID_INJECTION_KEY } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import { FastCrud, uiContext, useTypes } from '@fast-crud/fast-crud'
import ui from '@fast-crud/ui-element'
import { FcComponentsFcTest } from '#components'
import { FsExtendsUploader } from '@fast-crud/fast-extends'
import '@fast-crud/fast-extends/dist/style.css'
import { FileService } from '~/generated'
import { Buffer } from 'buffer'
globalThis.Buffer = Buffer
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElementPlus, { size: 'small', locale: zhCn })
  nuxtApp.vueApp.provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 10000),
    current: 0,
  })

  // 先安装ui
  nuxtApp.vueApp.use(ui)
  // 然后安装FastCrud
  nuxtApp.vueApp.use(FastCrud, {
    // 此处配置公共的dictRequest（字典请求）
    async dictRequest({ dict }) {
      throw new Error('请配置字典请求')
    },
    //公共crud配置
    commonOptions() {
      return {
        request: {
          //接口请求配置
          //你项目后台接口大概率与fast-crud所需要的返回结构不一致，所以需要配置此项
          //请参考文档http://fast-crud.docmirror.cn/api/crud-options/request.html
          transformQuery: ({ page, form, sort }) => {
            //转换为你pageRequest所需要的请求参数结构
            // return { page, form, sort };
            // console.log('page', page)
            // console.log('form', form)
            // console.log('sort', sort)

            let req = {
              query: {},
            } as any
            const query = req.query
            if (page && page.pageSize && page.currentPage) {
              query['offset'] = (page.currentPage - 1) * page.pageSize
              query['page'] = page.currentPage
              query['limit'] = page.pageSize

              console.log('q', req)
            }

            if (form) {
              query['s'] = form
            }

            if (sort && sort.prop && sort.order) {
              query['sort'] = `${sort.prop}${sort.order.toUpperCase()}`
            }

            return req
          },

          transformRes: ({ res }) => {
            console.log('res', res)
            return {
              records: res.data,
              currentPage: res.page,
              pageSize: res.pageSize,
              total: res.total,
            }
          },
        },
      }
    },
  })

  const ctx = uiContext.get()
  nuxtApp.vueApp.component('fc-components-fc-test', FcComponentsFcTest)
  nuxtApp.vueApp.use(FsExtendsUploader, {
    defaultType: 'form',
    form: {
      successHandle(ret) {
        //处理后端返回，转化为组件所需要的格式：{url:xxxx,key:xxx}
        return ret.data
      },
      action: undefined,
      name: 'file',
      headers: {},
      data: {},
      async uploadRequest({ file, action }) {
        // client.post({
        //   url: action || '/file/upload',
        //   data: file,
        // })
        const formData = new FormData()
        formData.append('file', file)
        return await FileService.uploadFile({
          env: { FormData },
          // @ts-ignore
          body: formData,
        })
      },
    },
    async buildKey(context) {
      const { fileName } = context
      // 文件key的构建规则
      const date = new Date()
      const fileType = context.fileType ?? 'file'
      const keepName = context.keepName ?? false
      let ext = ''
      if (keepName) {
        ext = '/' + fileName
      } else {
        if (fileName.lastIndexOf('.') >= 0) {
          ext = fileName.substring(fileName.lastIndexOf('.'))
        }
      }

      return (
        fileType +
        '/' +
        date.getFullYear() +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getDate() +
        '/' +
        Math.floor(Math.random() * 100000000000000) +
        ext
      )
    },
  })

  // install Fast CRUD custom components
  const { addTypes } = useTypes()
  addTypes({
    // raster: {
    //   //如果与官方字段类型同名，将会覆盖官方的字段类型
    //   form: { component: { name: 'fc-components-fc-test' } },
    // },
    raster: {
      form: {
        component: {
          name: 'fs-file-uploader',
          listType: ctx.upload.typeImageCard,
          accept: '.png,.jpeg,.jpg,.ico,.bmp,.gif,.webp,.svg',
        },
        // [ctx.formItem.rules]: [
        //   {
        //     validator: AllUploadSuccessValidator(),
        //     message: 'fs.extends.fileUploader.hasUploading',
        //     trigger: 'blur',
        //   },
        // ],
      },
    },
  })
})
function AllUploadSuccessValidator() {
  return true
}

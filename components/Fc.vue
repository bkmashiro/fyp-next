<template>
  <div class="relative">
    <fs-page>
      <fs-crud ref="crudRef" v-bind="crudBinding" />
    </fs-page>
  </div>
</template>

<script lang="ts" setup>
// var _ = require('lodash');
// import _ from 'lodash';
import { cloneDeepWith, isObject } from 'lodash-es';
import { dict } from '@fast-crud/fast-crud';

const props = defineProps({
  bind: {
    type: String,
    required: true,
  },
});

// const dictify = (input: any) => _.cloneDeepWith(input, (value: any) => {
//   //@ts-ignore
//   if (_.isObject(value) && value.__make_dict) {
//     //@ts-ignore
//     return dict(value.__make_dict);
//   }
// });

const dictify = (input: any) => cloneDeepWith(input, (value: any) => {
  //@ts-ignore
  if (isObject(value) && value.__make_dict) {
    //@ts-ignore
    return dict(value.__make_dict);
  }
});

const isClient = ref(false);
let FsPage: any;
let FsCrud: any;
let FsFormProvider: any;

//@ts-ignore
if (import.meta.env.SSR === false) {
  // 仅在客户端环境下执行
  isClient.value = true;
  import('@fast-crud/fast-crud').then(module => {
    FsPage = module.FsPage;
    FsCrud = module.FsCrud;
    FsFormProvider = module.FsFormProvider;
  });
}

const crudBinding = ref();
const crudRef = ref();
const context: any = {}; // 变量上下文，传给 createCrudOptions 的额外参数（可以任意命名，任意多个）
const { useFs } = await import('@fast-crud/fast-crud');

const createCrudOptions = async function () {
  const { crud, dict } = (await FceService.getDict({ path: { entity: props.bind!.toLowerCase() } })).data as any
  console.log('dict', dict)
  const request = {
    addRequest: async (params: any) => {
      console.log('params', params)
      return (await client.post({
        body: params.form,
        url: crud.read as string,
        headers: {
          'Content-Type': 'application/json',
        },
      })).data
    },
    pageRequest: async (params: any) => {
      console.log('params', params)

      return (await client.get({
        url: crud.read as string,
        ...params
      })).data
    },
    editRequest: async (params: any) => {
      return (await client.put({
        url: crud.read as string,
        body: params.form,
        headers: {
          'Content-Type': 'application/json',
        },
      })).data
    },
    delRequest: async (params: any) => {
      return (await client.delete({
        url: crud.read as string,
        ...params, headers: {
          'Content-Type': 'application/json',
        },
      })).data
    },
  };

  return {
    crudOptions: {
      request,
      columns: dictify(dict),
    },
  };
};


const { crudExpose } = await useFs({ //XXX do not remove `await`
  crudBinding,
  crudRef,
  createCrudOptions,
  context,
});

onMounted(() => {
  if (props.bind) { //TODO check if props.bind is a valid entity
    crudExpose.doRefresh()
  }
})

</script>

<style scoped></style>

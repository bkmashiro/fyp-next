<template>
  <div>
    <geo-raster :wkb="wkbstr" />
    <!-- <img :src="base64" alt="raster" /> -->
  </div>
</template>

<script lang="ts" setup>
const wkb = ref<undefined | ArrayBuffer>(undefined)
const wkbstr = ref<undefined | string>(undefined)
const base64 = ref<string | undefined>(undefined)
// const arrayToU8Array = (array: number[]) => new Uint8Array(array)
// const arrayToArrayBuffer = (array: number[]) => arrayToU8Array(array).buffer
onMounted(async () => {
  // wkbstr.value = await (await TestRasterService.find({ path: { id: 3, type: 'wkb' } })).data?.wkb as string
  // console.log(wkbstr)
  // wkb.value = 
  // const base64str =
  //   (await TestRasterService.find({ path: { id: 3, type: 'base64' } })).data?.base64

  // base64.value = `data:image/png;base64,${base64str}`
  wkbstr.value = '0103000000010000000500000054E3A59BC4602540643BDF4F8D1739C05C8FC2F5284C4140EC51B81E852B34C0D578E926316843406F1283C0CAD141C01B2FDD2406012B40A4703D0AD79343C054E3A59BC4602540643BDF4F8D1739C0'
})

</script>

<style></style>
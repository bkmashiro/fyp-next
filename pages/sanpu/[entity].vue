<template>
  <div>
    <Fc v-if="entity" :bind="entity"></Fc>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

const entity = ref<string | null>(null)

onMounted(() => {
  entity.value = Array.isArray(route.params.entity) ? route.params.entity[0] : route.params.entity
})
</script>

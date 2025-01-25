<template>
  <div>
    <p class="bold">Avaliable Faster CRUD Entities:</p>
    <div v-for="e in entities">
      <NuxtLink :to="`sanpu/${e}`">
        {{ e }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const entities = ref<string[]>([])

onMounted(async () => {
  entities.value = (await FceService.getAll()).data as string[]
})
</script>
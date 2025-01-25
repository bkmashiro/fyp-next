<template>
  <div>
    <input v-model="userInput" />
  </div>
</template>

<script lang="ts" setup>
// const props = defineProps<{
//   modelValue?: any
// }>()

// const emit = defineEmits()

const userInput = defineModel<string>('modelValue')


console.log(userInput)
</script>

<style></style>
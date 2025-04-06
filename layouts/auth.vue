<template>
  <div class="min-h-screen bg-gray-50">
    <slot />
  </div>
</template>

<script setup>
// 设置页面标题
useHead({
  title: 'Authentication',
  meta: [
    { name: 'description', content: 'Authentication pages' }
  ]
})
</script> 
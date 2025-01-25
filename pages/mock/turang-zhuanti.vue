<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- 页面的标题 -->
    <h1 class="text-4xl font-bold text-center mb-8">土壤专题图</h1>

    <!-- 介绍文本 -->
    <div class="mb-8 text-lg text-center">
      <!-- <p>本页面展示土壤农业利用适应性评价图和耕地质量等级评价图。</p> -->
      <p>土地利用规划图</p>
    </div>

    <!-- 土地利用规划图 -->
    <div class="flex justify-center mb-8">
      <img src="~/assets/soil-plan.png" alt="土地利用规划图" class="rounded-lg shadow-lg max-w-full h-auto" />
    </div>

    <!-- 土壤利用评价 -->
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold mb-4">土壤农业利用适应性评价</h2>
      <p class="text-lg text-gray-600 mb-2">
        该图展示了不同土壤类型在农业生产中的适应性，为农业规划和土壤管理提供指导。
      </p>
      <p class="text-lg text-gray-600 mb-4">
        通过评估土壤的性质，可以优化作物选择和耕作方式，提高农业生产效率。
      </p>

      <h2 class="text-2xl font-semibold mb-4">耕地质量等级评价</h2>
      <p class="text-lg text-gray-600">
        本图评估了耕地的质量等级，帮助了解耕地的生产潜力和可持续性，推动科学的耕地管理。
      </p>
    </div>
  </div>
</template>

<script setup>
// 在这里可以添加任何需要的逻辑
</script>

<style scoped>
/* 自定义样式可以在这里添加 */
</style>

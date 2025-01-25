<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- 页面的标题 -->
    <h1 class="text-4xl font-bold text-center mb-8">土壤类型分布图</h1>

    <!-- 地图部分 -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">南京六合区龙池街道土壤类型分布</h2>
      <div class="relative">
        <!-- Placeholder for map -->
        <div class="bg-gray-300 h-96 rounded-lg flex items-center justify-center mb-4">
          <img src="~/assets/soil-type.png" class="h-full w-full object-contain">
          <!-- <span class="text-gray-500">[土壤类型地图占位符]</span> -->
        </div>

        <!-- 图例部分 -->
        <div class="absolute top-4 right-4 bg-white p-4 shadow-lg rounded-lg">
          <h3 class="font-semibold mb-2">图例</h3>
          <div class="flex items-center mb-2">
            <div class="w-4 h-4 bg-green-500 mr-2"></div>
            <span>水稻土</span>
          </div>
          <div class="flex items-center mb-2">
            <div class="w-4 h-4 bg-yellow-500 mr-2"></div>
            <span>砂土</span>
          </div>
          <div class="flex items-center mb-2">
            <div class="w-4 h-4 bg-blue-500 mr-2"></div>
            <span>壤土</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 bg-red-500 mr-2"></div>
            <span>黏土</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 土壤类型数据 -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-semibold mb-4">土壤类型信息</h2>
      <div class="grid grid-cols-2 gap-4">
        <!-- 样本1 -->
        <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
          <p><span class="font-semibold">位置:</span> 南京六合区龙池街道 - 样点1</p>
          <p><span class="font-semibold">土壤类型:</span> 水稻土</p>
        </div>

        <!-- 样本2 -->
        <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
          <p><span class="font-semibold">位置:</span> 南京六合区龙池街道 - 样点2</p>
          <p><span class="font-semibold">土壤类型:</span> 砂土</p>
        </div>

        <!-- 样本3 -->
        <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
          <p><span class="font-semibold">位置:</span> 南京六合区龙池街道 - 样点3</p>
          <p><span class="font-semibold">土壤类型:</span> 壤土</p>
        </div>

        <!-- 样本4 -->
        <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
          <p><span class="font-semibold">位置:</span> 南京六合区龙池街道 - 样点4</p>
          <p><span class="font-semibold">土壤类型:</span> 黏土</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 如果需要，可以在此添加动态加载土壤类型地图的逻辑
</script>

<style scoped>
/* 如果有自定义样式需求可以在这里添加 */
</style>

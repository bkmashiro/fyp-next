<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- 页面的标题 -->
    <h1 class="text-4xl font-bold text-center mb-8">土壤样点图</h1>

    <!-- 样点基本信息 -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">采样点信息</h2>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p><span class="font-semibold">采样编号:</span> 320116007A112002</p>
          <p><span class="font-semibold">位置:</span> 南京六合区龙池街道</p>
          <p><span class="font-semibold">经度:</span> 118.848, <span class="font-semibold">纬度:</span> 32.368</p>
        </div>
        <div>
          <!-- Placeholder for map -->
          <div class="bg-gray-300 h-40 rounded-lg flex items-center justify-center of-hidden">
            <img src="~/assets/nanjing-longchi.png" class="h-full w-full object-contain">
            <!-- <span class="text-gray-500">[地图占位符]</span> -->
          </div>
        </div>
      </div>
    </div>

    <!-- 表层样点信息展示 -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">表层样点信息</h2>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p><span class="font-semibold">土壤类型:</span> 水稻土</p>
          <p><span class="font-semibold">灌溉条件:</span> 良好</p>
          <p><span class="font-semibold">地形状况:</span> 平整</p>
        </div>
        <div>
          <!-- Placeholder for surface sample image -->
          <div class="bg-gray-300 h-40 rounded-lg flex items-center justify-center">
            <img src="~/assets/shuidao-tu.jfif" class="h-full w-full object-contain">
            <!-- <span class="text-gray-500">[表层样品图片占位符]</span> -->
          </div>
        </div>
      </div>
    </div>

    <!-- 剖面样点信息展示 -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">剖面样点信息</h2>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p><span class="font-semibold">剖面调查:</span> 样品调查记录</p>
          <p><span class="font-semibold">土壤类型:</span> 水稻土</p>
          <p><span class="font-semibold">灌溉条件:</span> 良好</p>
          <p><span class="font-semibold">地形状况:</span> 平整</p>
        </div>
        <div>
          <!-- Placeholder for profile sample image -->
          <div class="bg-gray-300 h-40 rounded-lg flex items-center justify-center">
            <img src="~/assets/shuidao-tu-poumian.jfif" class="h-full w-full object-contain">
            <!-- <span class="text-gray-500">[剖面样品图片占位符]</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 如果你需要动态加载数据，可以在这里处理API请求等逻辑
</script>

<style scoped>
/* 如果需要自定义样式 */
</style>

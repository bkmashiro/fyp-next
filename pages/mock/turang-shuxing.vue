<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- 页面的标题 -->
    <h1 class="text-4xl font-bold text-center mb-8">土壤属性图</h1>

    <!-- 土壤属性概览 -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4">土壤属性概览</h2>
      <div class="grid grid-cols-2 gap-4">
        <!-- 酸碱度 (pH) 图 -->
        <div class="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h3 class="text-xl font-semibold mb-4">酸碱度 (pH)</h3>
          <!-- Placeholder for pH chart -->
          <div class="bg-gray-300 h-48 rounded-lg flex items-center justify-center">
            <!-- <span class="text-gray-500">[酸碱度图占位符]</span> -->
            <img src="~/assets/chemical.png"
                 class="h-full w-full object-contain">
          </div>
        </div>

        <!-- 土壤有机质含量图 -->
        <div class="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h3 class="text-xl font-semibold mb-4">土壤有机质含量</h3>
          <!-- Placeholder for Organic Matter chart -->
          <div class="bg-gray-300 h-48 rounded-lg flex items-center justify-center">
            <!-- <span class="text-gray-500">[有机质含量图占位符]</span> -->
            <img src="~/assets/youji.png"
                 class="h-full w-full object-contain">
          </div>
        </div>

        <!-- 土壤全氮含量图 -->
        <div class="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h3 class="text-xl font-semibold mb-4">土壤全氮含量</h3>
          <!-- Placeholder for Total Nitrogen chart -->
          <div class="bg-gray-300 h-48 rounded-lg flex items-center justify-center">
            <!-- <span class="text-gray-500">[全氮含量图占位符]</span> -->
            <img src="~/assets/ca.png"
                 class="h-full w-full object-contain">
          </div>
        </div>
      </div>
    </div>

    <!-- 具体属性数据表 -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-semibold mb-4">具体属性数据</h2>
      <table class="table-auto w-full">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-4 py-2">采样编号</th>
            <th class="px-4 py-2">酸碱度 (pH)</th>
            <th class="px-4 py-2">有机质含量</th>
            <th class="px-4 py-2">全氮含量</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border px-4 py-2">320116007A112002</td>
            <td class="border px-4 py-2">6.5</td>
            <td class="border px-4 py-2">3.1%</td>
            <td class="border px-4 py-2">0.15%</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">320116007A112003</td>
            <td class="border px-4 py-2">7.1</td>
            <td class="border px-4 py-2">2.8%</td>
            <td class="border px-4 py-2">0.12%</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">320116007A112004</td>
            <td class="border px-4 py-2">6.8</td>
            <td class="border px-4 py-2">3.4%</td>
            <td class="border px-4 py-2">0.18%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// 你可以在此添加逻辑，例如动态加载数据，使用Chart.js或ECharts绘制图表
</script>

<style scoped>
/* 如果需要额外的自定义样式，可以在这里编写 */
</style>

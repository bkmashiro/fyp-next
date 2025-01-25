<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- 页面的标题 -->
    <h1 class="text-4xl font-bold text-center mb-8">土壤数据查询系统</h1>

    <!-- 菜单项 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <router-link to="/mock/turang-yangdian" append
                   class="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
        <h2 class="text-2xl font-semibold mb-4">土壤样点图</h2>
        <p class="text-lg text-gray-600">展示样点的相关数据与条件</p>
      </router-link>

      <router-link to="/mock/turang-leixing" append
                   class="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
        <h2 class="text-2xl font-semibold mb-4">土壤类型图</h2>
        <p class="text-lg text-gray-600">用不同颜色标注土壤类型分布</p>
      </router-link>

      <router-link to="/mock/turang-shuxing" append
                   class="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
        <h2 class="text-2xl font-semibold mb-4">土壤属性图</h2>
        <p class="text-lg text-gray-600">展示酸碱度、土壤有机质等属性</p>
      </router-link>

      <router-link to="/mock/turang-zhuanti" append
                   class="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
        <h2 class="text-2xl font-semibold mb-4">土壤专题图</h2>
        <p class="text-lg text-gray-600">展示土壤农业利用适应性评价图、耕地质量等级评价图等</p>
      </router-link>

      <router-link to="/mock/sousuo" append
                   class="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
        <h2 class="text-2xl font-semibold mb-4">搜索功能</h2>
        <p class="text-lg text-gray-600">搜索样品信息台账</p>
      </router-link>

      <router-link to="/mock/shuju-chaxun"
                   class="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
        <h2 class="text-2xl font-semibold mb-4">数据查询功能</h2>
        <p class="text-lg text-gray-600">查询调查采样单位信息</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
// 在这里可以添加任何需要的逻辑
</script>

<style scoped>
/* 自定义样式可以在这里添加 */
</style>

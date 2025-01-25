<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- 页面的标题 -->
    <h1 class="text-4xl font-bold text-center mb-8">单位信息查询</h1>

    <!-- 查询表单 -->
    <div class="max-w-lg mx-auto mb-8">
      <label for="unit-type"
             class="block text-lg font-semibold mb-2">请选择单位类型:</label>
      <select v-model="selectedUnitType"
              @change="filterUnits"
              id="unit-type"
              class="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">所有单位</option>
        <option value="sampling">采样单位</option>
        <option value="preparation">样品制备单位</option>
        <option value="circulation">样品流转单位</option>
        <option value="testing">样品检测单位</option>
        <option value="quality">质量控制单位</option>
      </select>
    </div>

    <!-- 单位信息展示 -->
    <div v-if="filteredUnits.length"
         class="space-y-8">
      <div v-for="unit in filteredUnits"
           :key="unit.id"
           class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold">{{ unit.name }}</h2>
        <p class="mt-4 text-lg">{{ unit.description }}</p>
      </div>
    </div>

    <!-- 如果没有查询结果 -->
    <div v-else
         class="text-center text-gray-500 text-lg">
      没有找到符合条件的单位信息。
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 单位数据
const units = [
  { id: 1, type: 'sampling', name: '南京速度科技公司', description: '调查采样单位，负责样品采集工作。' },
  { id: 2, type: 'preparation', name: '苏州实朴检测公司', description: '样品制备单位，负责样品的制备与初步处理。' },
  { id: 3, type: 'circulation', name: '南京速度科技公司', description: '样品流转单位，负责样品的物流与运输工作。' },
  { id: 4, type: 'testing', name: '苏州实朴检测技术公司', description: '样品检测单位，负责样品的质量检测与分析。' },
  { id: 5, type: 'quality', name: '江苏农科院', description: '质量控制单位，负责对样品质量进行全面控制和评估。' }
]

// 当前选择的单位类型
const selectedUnitType = ref('')

// 过滤后的单位
const filteredUnits = ref(units)

// 根据选择的单位类型筛选单位
const filterUnits = () => {
  if (selectedUnitType.value) {
    filteredUnits.value = units.filter(unit => unit.type === selectedUnitType.value)
  } else {
    filteredUnits.value = units
  }
}
</script>

<style scoped>
/* 自定义样式可以在这里添加 */
</style>

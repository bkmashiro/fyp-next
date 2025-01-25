<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- 页面的标题 -->
    <h1 class="text-4xl font-bold text-center mb-8">样品信息搜索</h1>

    <!-- 搜索框 -->
    <div class="max-w-lg mx-auto mb-8">
      <input v-model="searchTerm"
             @input="filterResults"
             type="text"
             placeholder="搜索表层样品、剖面样品等..."
             class="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <!-- 搜索结果 -->
    <div class="space-y-8">
      <!-- 表层样品搜索结果 -->
      <div v-if="filteredSurfaceSamples.length">
        <h2 class="text-2xl font-semibold mb-4">表层样品</h2>
        <table class="table-auto w-full mb-8">
          <thead>
            <tr class="bg-gray-200">
              <th class="px-4 py-2">经纬度</th>
              <th class="px-4 py-2">地点名称</th>
              <th class="px-4 py-2">土壤名称</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sample in filteredSurfaceSamples"
                :key="sample.id">
              <td class="border px-4 py-2">{{ sample.coordinates }}</td>
              <td class="border px-4 py-2">{{ sample.locationName }}</td>
              <td class="border px-4 py-2">{{ sample.soilType }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 剖面样品搜索结果 -->
      <div v-if="filteredProfileSamples.length">
        <h2 class="text-2xl font-semibold mb-4">剖面样品</h2>
        <table class="table-auto w-full mb-8">
          <thead>
            <tr class="bg-gray-200">
              <th class="px-4 py-2">经纬度</th>
              <th class="px-4 py-2">镇村组名称</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sample in filteredProfileSamples"
                :key="sample.id">
              <td class="border px-4 py-2">{{ sample.coordinates }}</td>
              <td class="border px-4 py-2">{{ sample.townVillageGroup }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 水稳性大团聚体样品搜索结果 -->
      <div v-if="filteredWaterStableSamples.length">
        <h2 class="text-2xl font-semibold mb-4">水稳性大团聚体样品</h2>
        <table class="table-auto w-full mb-8">
          <thead>
            <tr class="bg-gray-200">
              <th class="px-4 py-2">粒径范围</th>
              <th class="px-4 py-2">含量 (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sample in filteredWaterStableSamples"
                :key="sample.id">
              <td class="border px-4 py-2">{{ sample.sizeRange }}</td>
              <td class="border px-4 py-2">{{ sample.percentage }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 土壤容重样品搜索结果 -->
      <div v-if="filteredBulkDensitySamples.length">
        <h2 class="text-2xl font-semibold mb-4">土壤容重样品</h2>
        <table class="table-auto w-full">
          <thead>
            <tr class="bg-gray-200">
              <th class="px-4 py-2">土壤容重 (g/cm³)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sample in filteredBulkDensitySamples"
                :key="sample.id">
              <td class="border px-4 py-2">{{ sample.bulkDensity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 样本数据
const surfaceSamples = [
  { id: 1, coordinates: '31.9737° N, 118.8413° E', locationName: '南京六合区龙池街道', soilType: '水稻土' },
  { id: 2, coordinates: '31.9750° N, 118.8450° E', locationName: '南京六合区', soilType: '黄棕壤' }
]

const profileSamples = [
  { id: 1, coordinates: '31.9737° N, 118.8413° E', townVillageGroup: '六合镇村组A' },
  { id: 2, coordinates: '31.9750° N, 118.8450° E', townVillageGroup: '龙池街道B' }
]

const waterStableSamples = [
  { id: 1, sizeRange: '0.25-1 mm', percentage: 28 },
  { id: 2, sizeRange: '1-2 mm', percentage: 34 },
  { id: 3, sizeRange: '>2 mm', percentage: 29 }
]

const bulkDensitySamples = [
  { id: 1, bulkDensity: '1.36 g/cm³' },
  { id: 2, bulkDensity: '1.40 g/cm³' }
]

// 搜索与筛选
const searchTerm = ref('')
const filteredSurfaceSamples = ref(surfaceSamples)
const filteredProfileSamples = ref(profileSamples)
const filteredWaterStableSamples = ref(waterStableSamples)
const filteredBulkDensitySamples = ref(bulkDensitySamples)

// 筛选逻辑
const filterResults = () => {
  const term = searchTerm.value.toLowerCase()
  filteredSurfaceSamples.value = surfaceSamples.filter(sample =>
    sample.soilType.toLowerCase().includes(term) ||
    sample.locationName.toLowerCase().includes(term)
  )
  filteredProfileSamples.value = profileSamples.filter(sample =>
    sample.townVillageGroup.toLowerCase().includes(term)
  )
  filteredWaterStableSamples.value = waterStableSamples.filter(sample =>
    sample.sizeRange.toLowerCase().includes(term)
  )
  filteredBulkDensitySamples.value = bulkDensitySamples.filter(sample =>
    sample.bulkDensity.toLowerCase().includes(term)
  )
}
</script>

<style scoped>
/* 你可以在这里添加自定义样式 */
</style>

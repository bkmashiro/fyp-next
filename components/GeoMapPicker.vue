<template>
  <div class="space-y-4">
    <div ref="mapContainer" class="w-full h-[300px] rounded-lg map-container"></div>
    <div class="flex justify-between items-center">
      <div class="text-sm text-gray-600">
        <p>Lat: {{ selectedPosition[1].toFixed(6) }}°</p>
        <p>Lng: {{ selectedPosition[0].toFixed(6) }}°</p>
      </div>
      <UButton
        color="primary"
        size="sm"
        @click="confirmSelection"
      >
        确认位置
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps<{
  initialPosition?: [number, number]
}>()

const emit = defineEmits<{
  (e: 'select', position: [number, number]): void
}>()

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let marker: L.Marker | null = null

const selectedPosition = ref<[number, number]>(
  props.initialPosition || [116.4074, 39.9042]
)

// 初始化地图
const initMap = () => {
  if (!mapContainer.value) return

  map = L.map(mapContainer.value).setView(selectedPosition.value, 15)
  
  // 添加地图图层
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  // 添加标记
  addMarker()

  // 监听点击事件
  map.on('click', (e) => {
    selectedPosition.value = [e.latlng.lng, e.latlng.lat]
    updateMarker()
  })
}

// 添加标记
const addMarker = () => {
  if (!map) return

  const icon = L.divIcon({
    className: 'custom-marker',
    html: `<div class="w-6 h-6 rounded-full flex items-center justify-center bg-primary-500 text-white text-xs">📍</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  })

  marker = L.marker([selectedPosition.value[1], selectedPosition.value[0]], { icon }).addTo(map)
}

// 更新标记位置
const updateMarker = () => {
  if (!marker || !map) return
  marker.setLatLng([selectedPosition.value[1], selectedPosition.value[0]])
}

// 确认选择
const confirmSelection = () => {
  emit('select', selectedPosition.value)
}

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style>
.custom-marker {
  background: none;
  border: none;
}

.map-container {
  position: relative;
  z-index: 1;
}

:deep(.leaflet-container) {
  z-index: 1;
}

:deep(.leaflet-pane) {
  z-index: 1;
}
</style> 
<template>
  <div class="space-y-4">
    <div ref="mapContainer"
         class="w-full h-[300px] rounded-lg map-container"></div>
    <div class="flex justify-between items-center">
      <div class="text-sm text-gray-600">
        <p>Lat: {{ selectedPosition[1].toFixed(6) }}°</p>
        <p>Lng: {{ selectedPosition[0].toFixed(6) }}°</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ref, onMounted, onUnmounted } from 'vue'
import { useMapPickerStore } from '~/stores/mapPicker'

const props = withDefaults(defineProps<{
  lat?: number
  lng?: number
  altitude?: number
  initialPosition?: {
    lat: number
    lng: number
  }
}>(), {
  lat: 0,
  lng: 0,
  altitude: 0
})

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let marker: L.Marker | null = null

const selectedPosition = ref<[number, number]>(
  [
    props.initialPosition?.lng || props.lng,
    props.initialPosition?.lat || props.lat
  ]
)

const mapPickerStore = useMapPickerStore()

// 初始化地图
const initMap = () => {
  if (!mapContainer.value) return

  map = L.map(mapContainer.value).setView(
    props.initialPosition
      ? [props.initialPosition.lat, props.initialPosition.lng]
      : [props.lat, props.lng],
    15
  )

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
    // 直接更新 store
    mapPickerStore.setSelectedPosition({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      altitude: props.altitude
    })
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
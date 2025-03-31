<template>
  <div ref="mapContainer" class="w-full h-[400px] rounded-lg"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface GeoObject {
  type: string
  anchor: {
    coordinates: number[]
  }
  anchor_latitude: number
  metadata: string | null
  id?: string
}

interface Bounds {
  minLat: number
  maxLat: number
  minLon: number
  maxLon: number
}

const props = defineProps<{
  objects: GeoObject[]
  center?: [number, number]
  zoom?: number
  type?: string
}>()

const emit = defineEmits<{
  (e: 'bounds-change', bounds: Bounds): void
}>()

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let markers: L.Marker[] = []

// 自定义图标
const createIcon = (type: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="w-6 h-6 rounded-full flex items-center justify-center ${
      type === 'GeoImage' ? 'bg-blue-500' : 'bg-green-500'
    } text-white text-xs">${type === 'GeoImage' ? '📷' : '💬'}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  })
}

// 初始化地图
const initMap = () => {
  if (!mapContainer.value) return

  // 获取第一个对象的坐标作为中心点
  const firstObject = props.objects[0]
  const defaultCenter: [number, number] = firstObject 
    ? [firstObject.anchor.coordinates[1], firstObject.anchor.coordinates[0]]
    : props.center || [39.9042, 116.4074]
  const defaultZoom = props.zoom || 15

  map = L.map(mapContainer.value).setView(defaultCenter, defaultZoom)
  
  // 添加地图图层
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  // 添加标记
  addMarkers()

  // 监听地图边界变化
  map.on('moveend', () => {
    const bounds = map?.getBounds()
    if (bounds) {
      emit('bounds-change', {
        minLat: bounds.getSouth(),
        maxLat: bounds.getNorth(),
        minLon: bounds.getWest(),
        maxLon: bounds.getEast()
      })
    }
  })
}

// 添加标记
const addMarkers = () => {
  if (!map) return

  // 清除现有标记
  markers.forEach(marker => marker.remove())
  markers = []

  if (props.objects.length === 0) return

  props.objects.forEach(obj => {
    const coordinates = obj.anchor.coordinates
    if (!coordinates || coordinates.length < 2) return

    const marker = L.marker([coordinates[1], coordinates[0]], {
      icon: createIcon(obj.type)
    }).addTo(map)

    // 添加弹出窗口
    const popupContent = `
      <div class="p-2">
        <p class="font-semibold">${obj.type}</p>
        <p class="text-sm text-gray-600">Altitude: ${obj.anchor_latitude.toFixed(2)}m</p>
        ${obj.metadata ? `<p class="text-sm mt-2">${obj.metadata}</p>` : ''}
      </div>
    `
    marker.bindPopup(popupContent)

    markers.push(marker)
  })
}

// 监听对象变化
watch(() => props.objects, () => {
  addMarkers()
}, { deep: true })

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
</style> 
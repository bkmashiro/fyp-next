<template>
  <div ref="mapContainer" class="w-full h-[400px] rounded-lg"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapMarker {
  position: [number, number]
  icon: string
  content: string
}

interface Bounds {
  minLat: number
  maxLat: number
  minLon: number
  maxLon: number
}

const props = defineProps<{
  markers: MapMarker[]
  center?: [number, number]
  zoom?: number
}>()

const emit = defineEmits<{
  (e: 'bounds-change', bounds: Bounds): void
}>()

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let markers: L.Marker[] = []

// 暴露地图实例
defineExpose({
  setView: (latlng: [number, number], zoom: number) => {
    if (map) {
      map.setView(latlng, zoom)
    }
  }
})

// 初始化地图
const initMap = () => {
  if (!mapContainer.value) return

  const defaultCenter: [number, number] = props.markers[0]?.position || props.center || [39.9042, 116.4074]
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
        minLat: Math.max(-90, bounds.getSouth()),
        maxLat: Math.min(90, bounds.getNorth()),
        minLon: Math.max(-180, bounds.getWest()),
        maxLon: Math.min(180, bounds.getEast())
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
  if (!props.markers) return
  if (props.markers.length === 0) return

  props.markers.forEach(marker => {
    const leafletMarker = L.marker(marker.position, {
      icon: L.divIcon({
        className: 'custom-marker',
        html: marker.icon,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })
    }).addTo(map!)

    leafletMarker.bindPopup(marker.content)
    markers.push(leafletMarker)
  })
}

// 监听标记变化
watch(() => props.markers, () => {
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
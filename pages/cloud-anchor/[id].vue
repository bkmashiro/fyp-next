<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Cloud Anchor Detail</h1>
    <div v-if="cloudAnchor">
      <UCard class="mb-6">
        <div class="p-4">
          <h2 class="text-2xl font-bold mb-4">Anchor Details</h2>

          <!-- Map View -->
          <div class="border rounded-lg p-4 mb-4">
            <h3 class="text-lg font-semibold mb-3">Map View</h3>
            <GeoMap 
              ref="mapRef"
              :markers="mapObjects"
              :center="mapCenter"
              :zoom="15"
            />
          </div>

          <!-- Basic Info -->
          <div class="space-y-6">
            <!-- Anchor Information -->
            <div class="border rounded-lg p-4">
              <h3 class="text-lg font-semibold mb-3">Anchor Information</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-600">ID</p>
                  <p>{{ cloudAnchor.id }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Cloud Anchor ID</p>
                  <p>{{ cloudAnchor.cloudAnchorId }}</p>
                </div>
              </div>
            </div>

            <!-- Position Information -->
            <div class="border rounded-lg p-4">
              <h3 class="text-lg font-semibold mb-3">Position Information</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-600">Longitude</p>
                  <p>{{ getCoordinates(cloudAnchor.anchor)[0].toFixed(6) }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Latitude</p>
                  <p>{{ getCoordinates(cloudAnchor.anchor)[1].toFixed(6) }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Altitude</p>
                  <p>{{ cloudAnchor.altitude.toFixed(6) }}</p>
                </div>
              </div>
            </div>

            <!-- Associated Geo Objects -->
            <div class="border rounded-lg p-4">
              <h3 class="text-lg font-semibold mb-3">Associated Geo Objects</h3>
              <div v-if="cloudAnchor.geoObjects && cloudAnchor.geoObjects.length > 0" class="space-y-4">
                <div v-for="obj in cloudAnchor.geoObjects" :key="obj.type + obj.createdAt" class="border rounded p-3">
                  <div class="flex justify-between items-start">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <UBadge :color="obj.type === 'GeoImage' ? 'blue' : 'green'">
                          {{ obj.type }}
                        </UBadge>
                        <span class="text-sm text-gray-600">Created: {{ formatDate(obj.createdAt) }}</span>
                      </div>
                      <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p class="text-gray-600">Position</p>
                          <button 
                            @click="focusOnObject(obj)"
                            class="text-blue-600 hover:underline text-left"
                          >
                            <p>Lat: {{ getCoordinates((obj as any).position)[1].toFixed(6) }}°</p>
                            <p>Lng: {{ getCoordinates((obj as any).position)[0].toFixed(6) }}°</p>
                            <p>Alt: {{ (obj as any).altitude.toFixed(2) }}m</p>
                          </button>
                        </div>
                        <div>
                          <p class="text-gray-600">Relative Position</p>
                          <p>X: {{ getCoordinates(obj.relPosition)[0].toFixed(6) }}</p>
                          <p>Y: {{ getCoordinates(obj.relPosition)[1].toFixed(6) }}</p>
                          <p>Alt: {{ obj.relAltitude.toFixed(6) }}</p>
                        </div>
                      </div>
                      <div v-if="obj.type === 'GeoComment' && obj.metadata" class="mt-2">
                        <p class="text-gray-600">Comment</p>
                        <p>{{ (obj as any).text }}</p>
                      </div>
                    </div>
                    <div class="flex flex-col gap-2">
                      <UButton type="primary" size="sm" @click="viewGeoObject(obj)">
                        View Details
                      </UButton>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-center py-4 text-gray-500">
                No associated geo objects found
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
    <div v-else class="text-center py-8">
      <p>Loading anchor details...</p>
    </div>
    <UButton type="default" @click="goBack" class="mt-4">
      Back to Anchors
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { CloudAnchorService, type CloudAnchor, type GeoObject } from '~/generated'
import Id from '../comment/[id].vue'
import GeoMap from '~/components/GeoMap.vue'

interface MapInstance {
  setView: (latlng: [number, number], zoom: number) => void
}

const route = useRoute()
const router = useRouter()
const cloudAnchor = ref<CloudAnchor | null>(null)
const mapRef = ref<MapInstance | null>(null)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const getCoordinates = (obj: { [key: string]: unknown }): number[] => {
  return (obj.coordinates as number[]) || [0, 0]
}

// 计算地图中心点
const mapCenter = computed(() => {
  if (!cloudAnchor.value) return [39.9042, 116.4074] as [number, number]
  const coords = getCoordinates(cloudAnchor.value.anchor)
  return [coords[1], coords[0]] as [number, number]
})

// 转换对象为地图可用的格式
const mapObjects = computed(() => {
  if (!cloudAnchor.value?.geoObjects) return []
  
  // 首先添加锚点本身
  const anchorCoords = getCoordinates(cloudAnchor.value.anchor)
  const markers = [{
    position: [anchorCoords[1], anchorCoords[0]] as [number, number],
    icon: `<div class="w-6 h-6 rounded-full flex items-center justify-center bg-purple-500 text-white text-xs">📍</div>`,
    content: `
      <div class="p-2">
        <p class="font-semibold">Cloud Anchor</p>
        <p class="text-sm text-gray-600">Altitude: ${cloudAnchor.value.altitude.toFixed(2)}m</p>
        <p class="text-sm text-gray-600">ID: ${cloudAnchor.value.cloudAnchorId}</p>
      </div>
    `
  }]

  // 然后添加关联物体
  const objectMarkers = cloudAnchor.value.geoObjects.map(obj => {
    const coords = getCoordinates((obj as any).position)
    return {
      position: [coords[1], coords[0]] as [number, number],
      icon: `<div class="w-6 h-6 rounded-full flex items-center justify-center ${
        obj.type === 'GeoImage' ? 'bg-blue-500' : 'bg-green-500'
      } text-white text-xs">${obj.type === 'GeoImage' ? '📷' : '💬'}</div>`,
      content: `
        <div class="p-2">
          <p class="font-semibold">${obj.type}</p>
          <p class="text-sm text-gray-600">Altitude: ${(obj as any).altitude.toFixed(2)}m</p>
          ${obj.type === 'GeoComment' ? `<p class="text-sm mt-2">${(obj as any).text}</p>` : ''}
          <div class="mt-2 text-sm text-gray-600">
            <p>Position:</p>
            <p>Lat: ${coords[1].toFixed(6)}°</p>
            <p>Lng: ${coords[0].toFixed(6)}°</p>
            <p>Alt: ${(obj as any).altitude.toFixed(2)}m</p>
          </div>
        </div>
      `
    }
  })

  return [...markers, ...objectMarkers]
})

const fetchAnchorDetails = async (id: string) => {
  const response = await CloudAnchorService.findOneAnchor({ path: { id: id } }) as any
  cloudAnchor.value = response.data as unknown as CloudAnchor
}

const viewGeoObject = (obj: GeoObject) => {
  const id = (obj as any).id
  if (obj.type === 'GeoImage') {
    router.push(`/photos/detail/${id}`)
  } else if (obj.type === 'GeoComment') {
    router.push(`/comment/${id}`)
  }
}

const goBack = () => {
  router.push('/cloud-anchor/management')
}

const focusOnObject = (obj) => {
  if (mapRef.value) {
    const coords = getCoordinates((obj as any).position)
    mapRef.value.setView([coords[1], coords[0]], 15)
  }
}

onMounted(async () => {
  if (route.params.id) {
    await fetchAnchorDetails(route.params.id as string)
  }
})
</script>

<style scoped>
h1 {
  view-transition-name: header;
}
</style>

<style>
::view-transition-old(header),
::view-transition-new(header) {
  width: auto;
}
</style>
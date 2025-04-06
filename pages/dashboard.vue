<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>

    <!-- Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <UCard>
        <div class="p-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <UIcon name="i-heroicons-map-pin"
                     class="text-2xl text-purple-500" />
            </div>
            <div>
              <p class="text-sm text-gray-600">Cloud Anchors</p>
              <p class="text-2xl font-bold">{{ stats.anchors }}</p>
            </div>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="p-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <UIcon name="i-heroicons-camera"
                     class="text-2xl text-blue-500" />
            </div>
            <div>
              <p class="text-sm text-gray-600">Geo Images</p>
              <p class="text-2xl font-bold">{{ stats.images }}</p>
            </div>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="p-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <UIcon name="i-heroicons-chat-bubble-left"
                     class="text-2xl text-green-500" />
            </div>
            <div>
              <p class="text-sm text-gray-600">Geo Comments</p>
              <p class="text-2xl font-bold">{{ stats.comments }}</p>
            </div>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="p-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <UIcon name="i-heroicons-star"
                     class="text-2xl text-orange-500" />
            </div>
            <div>
              <p class="text-sm text-gray-600">Recommended</p>
              <p class="text-2xl font-bold">{{ stats.recommended }}</p>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Map View -->
    <UCard class="mb-6">
      <div class="p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">Map View</h2>
          <UButton icon="i-heroicons-arrows-pointing-out"
                   color="gray"
                   variant="ghost"
                   @click="fitMapToBounds">
            Fit to Bounds
          </UButton>
        </div>
        <GeoMap ref="mapRef"
                :markers="mapObjects"
                @bounds-change="handleBoundsChange" />
      </div>
    </UCard>

    <!-- Content Tabs -->
    <UTabs :items="tabs"
           class="mb-6">
      <template #item="{ item }">
        <UCard>
          <div class="p-4">
            <div class="space-y-4">
              <div v-for="obj in item.content"
                   :key="obj.id"
                   class="border rounded-lg p-4">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <UBadge :color="obj.type === 'GeoImage' ? 'blue' : 'green'">
                        {{ obj.type }}
                      </UBadge>
                      <span class="text-sm text-gray-600">Created: {{ formatDate(obj.createdAt) }}</span>
                    </div>
                    <p class="text-gray-700 mb-2">{{ obj.text || 'No description' }}</p>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p class="text-gray-600">Position</p>
                        <UButton variant="link"
                                 color="blue"
                                 @click="focusOnObject(obj)">
                          <p>Lat: {{ obj.position.coordinates[1].toFixed(6) }}°</p>
                          <p>Lng: {{ obj.position.coordinates[0].toFixed(6) }}°</p>
                          <p>Alt: {{ obj.altitude.toFixed(2) }}m</p>
                        </UButton>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col gap-2">
                    <UButton color="primary"
                             variant="soft"
                             size="sm"
                             @click="viewObject(obj)">
                      View Details
                    </UButton>
                    <UButton v-if="item.key === 'my'"
                             color="red"
                             variant="soft"
                             size="sm"
                             @click="deleteObject(obj.id)">
                      Delete
                    </UButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
import GeoMap from '~/components/GeoMap.vue'


onMounted(async () => {
  const statistics = (await StatisticsService.getStatistics()).data!
  stats.value = {
    anchors: statistics.cloudAnchorsCount ?? 0,
    images: statistics.geoImagesCount ?? 0,
    comments: statistics.geoCommentsCount ?? 0,
    recommended: 0 // 暂时保持为0，等待后续实现
  }
})


interface MapInstance {
  setView: (latlng: [number, number], zoom: number) => void
}

interface GeoObject {
  id: string
  type: string
  position: {
    coordinates: number[]
  }
  altitude: number
  text?: string
  createdAt: string
}

// 占位数据
const myObjects = ref<GeoObject[]>([
  {
    id: '1',
    type: 'GeoComment',
    position: {
      coordinates: [116.4074, 39.9042]
    },
    altitude: 100,
    text: 'This is a sample comment',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    type: 'GeoImage',
    position: {
      coordinates: [116.4074, 39.9042]
    },
    altitude: 100,
    createdAt: new Date().toISOString()
  }
])

const recommendedObjects = ref<GeoObject[]>([
  {
    id: '3',
    type: 'GeoComment',
    position: {
      coordinates: [116.4074, 39.9042]
    },
    altitude: 100,
    text: 'This is a recommended comment',
    createdAt: new Date().toISOString()
  }
])

// 统计信息
const stats = ref({
  anchors: 0,
  images: 0,
  comments: 0,
  recommended: 0
})

// 标签页配置
const tabs = computed(() => [
  {
    key: 'my',
    label: 'My Content',
    content: myObjects.value
  },
  {
    key: 'recommended',
    label: 'Recommended',
    content: recommendedObjects.value
  }
] as any)

const mapRef = ref<MapInstance | null>(null)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const mapObjects = computed(() => {
  const markers = [
    ...myObjects.value.map(obj => ({
      position: [obj.position.coordinates[1], obj.position.coordinates[0]] as [number, number],
      icon: `<div class="w-6 h-6 rounded-full flex items-center justify-center ${obj.type === 'GeoImage' ? 'bg-blue-500' : 'bg-green-500'
        } text-white text-xs">${obj.type === 'GeoImage' ? '📷' : '💬'}</div>`,
      content: `
        <div class="p-2">
          <p class="font-semibold">${obj.type}</p>
          <p class="text-sm text-gray-600">Altitude: ${obj.altitude.toFixed(2)}m</p>
          ${obj.text ? `<p class="text-sm mt-2">${obj.text}</p>` : ''}
        </div>
      `
    })),
    ...recommendedObjects.value.map(obj => ({
      position: [obj.position.coordinates[1], obj.position.coordinates[0]] as [number, number],
      icon: `<div class="w-6 h-6 rounded-full flex items-center justify-center ${obj.type === 'GeoImage' ? 'bg-blue-500' : 'bg-green-500'
        } text-white text-xs">${obj.type === 'GeoImage' ? '📷' : '💬'}</div>`,
      content: `
        <div class="p-2">
          <p class="font-semibold">${obj.type}</p>
          <p class="text-sm text-gray-600">Altitude: ${obj.altitude.toFixed(2)}m</p>
          ${obj.text ? `<p class="text-sm mt-2">${obj.text}</p>` : ''}
        </div>
      `
    }))
  ]
  return markers
})

const focusOnObject = (obj: GeoObject) => {
  if (mapRef.value) {
    mapRef.value.setView(
      [obj.position.coordinates[1], obj.position.coordinates[0]],
      15
    )
  }
}

const fitMapToBounds = () => {
  // TODO: 实现地图边界自适应
  console.log('Fit map to bounds')
}

const viewObject = (obj: GeoObject) => {
  if (obj.type === 'GeoImage') {
    navigateTo(`/photos/detail/${obj.id}`)
  } else if (obj.type === 'GeoComment') {
    navigateTo(`/comment/${obj.id}`)
  }
}

const deleteObject = async (id: string) => {
  // TODO: 实现删除功能
  console.log('Delete object:', id)
}

const handleBoundsChange = (bounds) => {
  // TODO: 实现边界变化处理
  console.log('Bounds changed:', bounds)
}
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
<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold">Scenes with Label: {{ label?.name }}</h1>
        <p class="text-gray-600 mt-1">{{ label?.description || 'No description' }}</p>
      </div>
      <UButton
        icon="i-heroicons-arrow-left"
        color="gray"
        variant="ghost"
        to="/label/management"
      >
        Back to Labels
      </UButton>
    </div>

    <!-- Scene List -->
    <UCard class="mb-6">
      <div class="p-4">
        <div class="flex items-center gap-4 mb-4">
          <UInput
            v-model="searchQuery"
            icon="i-heroicons-magnifying-glass"
            placeholder="Search scenes..."
            class="w-64"
          />
        </div>

        <div class="space-y-4">
          <div v-for="scene in filteredScenes" :key="scene.id" class="border rounded-lg p-4">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <UBadge color="blue">{{ scene.name }}</UBadge>
                  <span class="text-sm text-gray-600">Created: {{ formatDate(scene.createdAt) }}</span>
                </div>
                <p class="text-gray-700 mb-2">{{ scene.description || 'No description' }}</p>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p class="text-gray-600">Position</p>
                    <UButton
                      variant="link"
                      color="blue"
                      @click="focusOnScene(scene)"
                    >
                      <p>Lat: {{ scene.position.coordinates[1].toFixed(6) }}°</p>
                      <p>Lng: {{ scene.position.coordinates[0].toFixed(6) }}°</p>
                      <p>Alt: {{ scene.altitude.toFixed(2) }}m</p>
                    </UButton>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <UButton
                  color="primary"
                  variant="soft"
                  size="sm"
                  @click="viewScene(scene.id)"
                >
                  View Details
                </UButton>
                <UButton
                  color="red"
                  variant="soft"
                  size="sm"
                  @click="removeLabelFromScene(scene.id)"
                >
                  Remove Label
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Map View -->
    <UCard>
      <div class="p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">Map View</h2>
          <UButton
            icon="i-heroicons-arrows-pointing-out"
            color="gray"
            variant="ghost"
            @click="fitMapToBounds"
          >
            Fit to Bounds
          </UButton>
        </div>
        <GeoMap 
          ref="mapRef"
          :markers="mapObjects"
          @bounds-change="handleBoundsChange"
        />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import GeoMap from '~/components/GeoMap.vue'
import { LabelService, SceneService } from '~/generated'
import type { Scene as ApiScene, Label as ApiLabel } from '~/generated/types.gen'

interface MapInstance {
  setView: (latlng: [number, number], zoom: number) => void
}

interface SceneWithDetails {
  id: string
  name: string
  description?: string
  position: {
    coordinates: number[]
  }
  altitude: number
  createdAt: string
  children: ApiScene['children']
  labels: ApiScene['labels']
}

interface Label {
  id: string
  name: string
  description?: string
}

// 路由参数
const route = useRoute()
const labelId = route.params.labelId as string

// 状态
const label = ref<Label | null>(null)
const scenes = ref<SceneWithDetails[]>([])
const searchQuery = ref('')
const mapRef = ref<MapInstance | null>(null)

// 计算属性
const filteredScenes = computed(() => {
  if (!searchQuery.value) return scenes.value
  
  const query = searchQuery.value.toLowerCase()
  return scenes.value.filter(scene => 
    scene.name.toLowerCase().includes(query) || 
    scene.description?.toLowerCase().includes(query)
  )
})

const mapObjects = computed(() => {
  return scenes.value.map(scene => ({
    position: [scene.position.coordinates[1], scene.position.coordinates[0]] as [number, number],
    icon: `<div class="w-6 h-6 rounded-full flex items-center justify-center bg-blue-500 text-white text-xs">📷</div>`,
    content: `
      <div class="p-2">
        <p class="font-semibold">${scene.name}</p>
        <p class="text-sm text-gray-600">Altitude: ${scene.altitude.toFixed(2)}m</p>
        ${scene.description ? `<p class="text-sm mt-2">${scene.description}</p>` : ''}
      </div>
    `
  }))
})

// 方法
const fetchLabel = async () => {
  try {
    const response = await LabelService.findOneLabel({ path: { id: labelId } })
    if (response.data) {
      label.value = response.data as any
    }
  } catch (error) {
    console.error('Error fetching label:', error)
  }
}

const fetchScenes = async () => {
  try {
    const response = await SceneService.findByLabel({ path: { labelId } })
    if (response.data) {
      scenes.value = response.data.map((scene: any) => ({
        ...scene,
        id: scene.id,
        name: scene.name,
        description: scene.description,
        position: scene.position,
        altitude: scene.altitude,
        createdAt: scene.createdAt
      }))
    }
  } catch (error) {
    console.error('Error fetching scenes:', error)
  }
}

const focusOnScene = (scene: SceneWithDetails) => {
  if (mapRef.value) {
    mapRef.value.setView(
      [scene.position.coordinates[1], scene.position.coordinates[0]],
      15
    )
  }
}

const fitMapToBounds = () => {
  // TODO: 实现地图边界自适应
  console.log('Fit map to bounds')
}

const viewScene = (sceneId: string) => {
  navigateTo(`/scene/${sceneId}`)
}

const removeLabelFromScene = async (sceneId: string) => {
  if (!confirm('Are you sure you want to remove this label from the scene?')) return
  
  try {
    await SceneService.removeLabel({ 
      path: { 
        id: sceneId,
        labelId 
      }
    })
    await fetchScenes()
  } catch (error) {
    console.error('Error removing label from scene:', error)
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const handleBoundsChange = (bounds) => {
  // TODO: 实现边界变化处理
  console.log('Bounds changed:', bounds)
}

// 初始化
onMounted(async () => {
  await fetchLabel()
  await fetchScenes()
})
</script> 
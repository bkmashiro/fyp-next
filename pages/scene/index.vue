<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Scene Management</h1>
      <UButton icon="i-heroicons-plus"
               color="primary"
               @click="openCreateSceneModal">
        Create Scene
      </UButton>
    </div>

    <!-- Scene List -->
    <UCard class="mb-6">
      <div class="p-4">
        <div class="flex items-center gap-4 mb-4">
          <UInput v-model="searchQuery"
                  icon="i-heroicons-magnifying-glass"
                  placeholder="Search scenes..."
                  class="w-64" />
        </div>

        <div class="space-y-4">
          <div v-for="scene in filteredScenes"
               :key="scene.id"
               class="border rounded-lg p-4">
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
                    <UButton variant="link"
                             color="blue"
                             @click="focusOnScene(scene)">
                      <p>Lat: {{ scene.position.coordinates[1].toFixed(6) }}°</p>
                      <p>Lng: {{ scene.position.coordinates[0].toFixed(6) }}°</p>
                      <p>Alt: {{ scene.altitude.toFixed(2) }}m</p>
                    </UButton>
                  </div>
                  <div>
                    <p class="text-gray-600">Labels</p>
                    <div class="flex flex-wrap gap-1">
                      <UBadge v-for="label in scene.labels"
                              :key="label.id"
                              :color="getRandomColor(label.id)"
                              size="sm">
                        {{ label.name }}
                      </UBadge>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <UButton color="primary"
                         variant="soft"
                         size="sm"
                         @click="viewScene(scene.id)">
                  View Details
                </UButton>
                <UButton color="red"
                         variant="soft"
                         size="sm"
                         @click="deleteScene(scene.id)">
                  Delete
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

    <!-- Create/Edit Scene Modal -->
    <UModal v-model="isModalOpen"
            :ui="{
              width: 'sm:max-w-md',
              container: 'z-[100]'
            }">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">
              {{ isEditing ? 'Edit Scene' : 'Create Scene' }}
            </h3>
            <UButton color="gray"
                     variant="ghost"
                     icon="i-heroicons-x-mark"
                     @click="closeModal" />
          </div>
        </template>

        <div class="space-y-4">
          <UFormGroup label="Name"
                      required>
            <UInput v-model="sceneForm.name"
                    placeholder="Enter scene name" />
          </UFormGroup>
          <UFormGroup label="Description">
            <UTextarea v-model="sceneForm.description"
                       placeholder="Enter scene description" />
          </UFormGroup>
          <UFormGroup label="Position"
                      required>
            <GeoMapPicker :initial-position="[sceneForm.position[0], sceneForm.position[1]]"
                          @select="handlePositionSelect" />
          </UFormGroup>
          <UFormGroup label="Altitude">
            <UInput v-model="sceneForm.altitude"
                    type="number"
                    step="0.1"
                    placeholder="Enter altitude in meters" />
          </UFormGroup>
        </div>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton color="gray"
                     variant="soft"
                     @click="closeModal">
              Cancel
            </UButton>
            <UButton color="primary"
                     @click="saveScene">
              {{ isEditing ? 'Update' : 'Create' }}
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { BadgeColor } from '#ui/types'
import GeoMap from '~/components/GeoMap.vue'
import GeoMapPicker from '~/components/GeoMapPicker.vue'
import { SceneService } from '~/generated'

interface MapInstance {
  setView: (latlng: [number, number], zoom: number) => void
}

interface Scene {
  id: string
  name: string
  description?: string
  position: {
    coordinates: number[]
  }
  altitude: number
  orientation: number[]
  scale: number[]
  children: any[]
  labels: any[]
  createdAt: string
  updatedAt: string
}

// 状态
const scenes = ref<Scene[]>([])
const searchQuery = ref('')
const isModalOpen = ref(false)
const isEditing = ref(false)
const currentSceneId = ref<string | null>(null)
const mapRef = ref<MapInstance | null>(null)

// 表单数据
const sceneForm = ref({
  name: '',
  description: '',
  position: [0, 0] as [number, number],
  altitude: 0,
  orientation: [0, 0, 0, 1] as [number, number, number, number],
  scale: [1, 1, 1] as [number, number, number]
})

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
const fetchScenes = async () => {
  try {
    const response = await SceneService.findAllScenes()
    if (response.data) {
      scenes.value = response.data as any[]
    }
  } catch (error) {
    console.error('Error fetching scenes:', error)
  }
}

const openCreateSceneModal = () => {
  isEditing.value = false
  currentSceneId.value = null
  sceneForm.value = {
    name: '',
    description: '',
    position: [0, 0],
    altitude: 0,
    orientation: [0, 0, 0, 1],
    scale: [1, 1, 1]
  }
  isModalOpen.value = true
}

const openEditSceneModal = (scene: Scene) => {
  isEditing.value = true
  currentSceneId.value = scene.id
  sceneForm.value = {
    name: scene.name,
    description: scene.description || '',
    position: [scene.position.coordinates[0], scene.position.coordinates[1]],
    altitude: scene.altitude,
    orientation: scene.orientation as [number, number, number, number],
    scale: scene.scale as [number, number, number]
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  sceneForm.value = {
    name: '',
    description: '',
    position: [0, 0],
    altitude: 0,
    orientation: [0, 0, 0, 1],
    scale: [1, 1, 1]
  }
}

const saveScene = async () => {
  try {
    if (isEditing.value && currentSceneId.value) {
      await SceneService.updateScene({
        path: { id: currentSceneId.value },
        body: sceneForm.value as any
      })
    } else {
      await SceneService.createScene({
        body: sceneForm.value as any
      })
    }

    await fetchScenes()
    closeModal()
  } catch (error) {
    console.error('Error saving scene:', error)
  }
}

const deleteScene = async (id: string) => {
  if (!confirm('Are you sure you want to delete this scene?')) return

  try {
    await SceneService.removeScene({ path: { id } })
    await fetchScenes()
  } catch (error) {
    console.error('Error deleting scene:', error)
  }
}

const viewScene = (sceneId: string) => {
  navigateTo(`/scene/${sceneId}`)
}

const focusOnScene = (scene: Scene) => {
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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const getRandomColor = (id: string): BadgeColor => {
  const colors: BadgeColor[] = ['blue', 'green', 'purple', 'orange', 'red', 'pink']
  const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
  return colors[index]
}

const handleBoundsChange = (bounds) => {
  // TODO: 实现边界变化处理
  console.log('Bounds changed:', bounds)
}

const handlePositionSelect = (position: [number, number]) => {
  sceneForm.value.position = position
}

// 初始化
onMounted(() => {
  fetchScenes()
})
</script>

<style scoped></style>
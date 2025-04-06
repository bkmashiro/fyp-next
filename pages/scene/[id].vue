<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <div class="flex items-center gap-2">
          <h1 v-if="!isEditingName" class="text-3xl font-bold cursor-pointer hover:text-primary-600" @click="startEditingName">
            {{ scene?.name }}
          </h1>
          <div v-else class="flex items-center gap-2">
            <UInput
              v-model="editingName"
              class="text-3xl font-bold"
              @keyup.enter="saveName"
              @keyup.esc="cancelEditingName"
            />
            <UButton
              icon="i-heroicons-check"
              color="green"
              variant="ghost"
              size="sm"
              @click="saveName"
            />
            <UButton
              icon="i-heroicons-x-mark"
              color="red"
              variant="ghost"
              size="sm"
              @click="cancelEditingName"
            />
          </div>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <p v-if="!isEditingDescription" 
             class="text-gray-600 cursor-pointer hover:text-primary-600" 
             @click="startEditingDescription">
            {{ scene?.description || 'No description' }}
          </p>
          <div v-else class="flex items-center gap-2 flex-1">
            <UTextarea
              v-model="editingDescription"
              class="flex-1"
              :rows="2"
              @keyup.enter="saveDescription"
              @keyup.esc="cancelEditingDescription"
            />
            <UButton
              icon="i-heroicons-check"
              color="green"
              variant="ghost"
              size="sm"
              @click="saveDescription"
            />
            <UButton
              icon="i-heroicons-x-mark"
              color="red"
              variant="ghost"
              size="sm"
              @click="cancelEditingDescription"
            />
          </div>
        </div>
      </div>
      <UButton
        icon="i-heroicons-arrow-left"
        color="gray"
        variant="ghost"
        to="/scene"
      >
        Back to Scenes
      </UButton>
    </div>

    <div class="grid grid-cols-2 gap-6">
      <!-- Scene Details -->
      <UCard>
        <div class="p-4">
          <h2 class="text-2xl font-bold mb-4">Scene Details</h2>
          
          <div class="space-y-4">
            <div>
              <p class="text-gray-600">Position</p>
              <UButton
                variant="link"
                color="blue"
                @click="focusOnScene"
              >
                <p>Lat: {{ scene?.position.coordinates[1].toFixed(6) }}°</p>
                <p>Lng: {{ scene?.position.coordinates[0].toFixed(6) }}°</p>
                <p>Alt: {{ scene?.altitude.toFixed(2) }}m</p>
              </UButton>
            </div>

            <div>
              <p class="text-gray-600">Orientation (Euler Angles)</p>
              <div class="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p class="text-gray-500">Roll (X)</p>
                  <p>{{ orientationDegrees[0] }}</p>
                </div>
                <div>
                  <p class="text-gray-500">Pitch (Y)</p>
                  <p>{{ orientationDegrees[1] }}</p>
                </div>
                <div>
                  <p class="text-gray-500">Yaw (Z)</p>
                  <p>{{ orientationDegrees[2] }}</p>
                </div>
              </div>
              <p class="text-xs text-gray-400 mt-1">Original Quaternion: [{{ scene?.orientation.map(v => v.toFixed(6)).join(', ') }}]</p>
            </div>

            <div>
              <p class="text-gray-600">Scale</p>
              <p class="text-sm">
                [{{ scene?.scale.map(v => v.toFixed(6)).join(', ') }}]
              </p>
            </div>

            <div>
              <p class="text-gray-600">Created</p>
              <p class="text-sm">{{ formatDate(scene?.createdAt || '') }}</p>
            </div>

            <div>
              <p class="text-gray-600">Last Updated</p>
              <p class="text-sm">{{ formatDate(scene?.updatedAt || '') }}</p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Labels -->
      <UCard>
        <div class="p-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold">Labels</h2>
            <UButton
              icon="i-heroicons-plus"
              color="primary"
              @click="openAddLabelModal"
            >
              Add Label
            </UButton>
          </div>

          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="label in scene?.labels"
              :key="label.id"
              :color="getRandomColor(label.id)"
              class="text-sm"
            >
              {{ label.name }}
              <UButton
                color="white"
                variant="ghost"
                size="xs"
                icon="i-heroicons-x-mark"
                class="ml-1"
                @click="removeLabel(label.id)"
              />
            </UBadge>
          </div>
        </div>
      </UCard>

      <!-- Children Objects -->
      <UCard class="col-span-2">
        <div class="p-4">
          <h2 class="text-2xl font-bold mb-4">Children Objects</h2>
          
          <div class="space-y-4">
            <div v-for="child in scene?.children" :key="child.id" class="border rounded-lg p-4">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <UBadge :color="getObjectColor(child.type) as BadgeColor">
                      {{ child.type }}
                    </UBadge>
                    <span class="text-sm text-gray-600">
                      Created: {{ formatDate(child.createdAt) }}
                    </span>
                  </div>
                  <p class="text-gray-700 mb-2">{{ child.description || 'No description' }}</p>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p class="text-gray-600">Position</p>
                      <UButton
                        variant="link"
                        color="blue"
                        @click="focusOnObject(child)"
                      >
                        <p>Lat: {{ child.position.coordinates[1].toFixed(6) }}°</p>
                        <p>Lng: {{ child.position.coordinates[0].toFixed(6) }}°</p>
                        <p>Alt: {{ child.altitude.toFixed(2) }}m</p>
                      </UButton>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <UButton
                    color="primary"
                    variant="soft"
                    size="sm"
                    @click="viewObject(child)"
                  >
                    View Details
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Map View -->
    <UCard class="mt-6">
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
          :initial-position="scene ? {
            lat: scene.position.coordinates[1],
            lng: scene.position.coordinates[0],
            zoom: 15
          } : undefined"
          @bounds-change="handleBoundsChange"
        />
      </div>
    </UCard>

    <!-- Add Label Modal -->
    <UModal v-model="isAddLabelModalOpen" :ui="{ width: 'sm:max-w-md' }">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Add Label</h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark"
              @click="closeAddLabelModal"
            />
          </div>
        </template>

        <div class="space-y-4">
          <UFormGroup label="Label" required>
            <USelect
              v-model="selectedLabelId"
              :options="availableLabels"
              option-attribute="name"
              value-attribute="id"
              placeholder="Select a label"
              @update:model-value="handleLabelSelect"
            />
          </UFormGroup>
        </div>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton color="gray" variant="soft" @click="closeAddLabelModal">
              Cancel
            </UButton>
            <UButton color="primary" @click="addLabel">
              Add
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
import { LabelService, SceneService } from '~/generated'
import { quaternionToEuler, eulerRadToDeg, formatDegree } from '~/utils/quaternion'

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

interface Label {
  id: string
  name: string
  description?: string
}

// 路由参数
const route = useRoute()
const sceneId = route.params.id as string

// 状态
const scene = ref<Scene | null>(null)
const availableLabels = ref<Label[]>([])
const selectedLabelId = ref<string | undefined>(undefined)
const isAddLabelModalOpen = ref(false)
const mapRef = ref<MapInstance | null>(null)
const isEditingName = ref(false)
const editingName = ref('')
const isEditingDescription = ref(false)
const editingDescription = ref('')

// 计算属性
const mapObjects = computed(() => {
  if (!scene.value) return []

  const objects = [
    {
      position: [scene.value.position.coordinates[1], scene.value.position.coordinates[0]] as [number, number],
      icon: `<div class="w-6 h-6 rounded-full flex items-center justify-center bg-blue-500 text-white text-xs">📷</div>`,
      content: `
        <div class="p-2">
          <p class="font-semibold">${scene.value.name}</p>
          <p class="text-sm text-gray-600">Altitude: ${scene.value.altitude.toFixed(2)}m</p>
          ${scene.value.description ? `<p class="text-sm mt-2">${scene.value.description}</p>` : ''}
        </div>
      `
    },
    ...scene.value.children.map(child => ({
      position: [child.position.coordinates[1], child.position.coordinates[0]] as [number, number],
      icon: `<div class="w-6 h-6 rounded-full flex items-center justify-center ${getObjectColor(child.type)} text-white text-xs">${getObjectIcon(child.type)}</div>`,
      content: `
        <div class="p-2">
          <p class="font-semibold">${child.type}</p>
          <p class="text-sm text-gray-600">Altitude: ${child.altitude.toFixed(2)}m</p>
          ${child.description ? `<p class="text-sm mt-2">${child.description}</p>` : ''}
        </div>
      `
    }))
  ]

  return objects
})

const orientationDegrees = computed(() => {
  if (!scene.value?.orientation) return ['0.00°', '0.00°', '0.00°']
  const eulerRad = quaternionToEuler(scene.value.orientation)
  const eulerDeg = eulerRadToDeg(eulerRad)
  return eulerDeg.map(formatDegree)
})

// 方法
const fetchScene = async () => {
  try {
    const response = await SceneService.findOneScene({ path: { id: sceneId } })
    if (response.data) {
      scene.value = response.data as any
    }
  } catch (error) {
    console.error('Error fetching scene:', error)
  }
}

const fetchAvailableLabels = async () => {
  try {
    const response = await LabelService.findAllLabels()
    if (response.data) {
      availableLabels.value = response.data as any[]
    }
  } catch (error) {
    console.error('Error fetching labels:', error)
  }
}

const openAddLabelModal = () => {
  selectedLabelId.value = undefined
  isAddLabelModalOpen.value = true
}

const closeAddLabelModal = async () => {
  isAddLabelModalOpen.value = false
  selectedLabelId.value = undefined
}

const addLabel = async () => {
  console.log('addLabel', selectedLabelId.value)
  if (!selectedLabelId.value) return
  
  try {
    await SceneService.addLabel({ 
      path: { 
        id: sceneId,
        labelId: selectedLabelId.value
      }
    })
    await fetchScene()
    closeAddLabelModal()
  } catch (error) {
    console.error('Error adding label:', error)
  }
}

const removeLabel = async (labelId: string) => {
  if (!confirm('Are you sure you want to remove this label from the scene?')) return
  
  try {
    await SceneService.removeLabel({ 
      path: { 
        id: sceneId,
        labelId 
      }
    })
    await fetchScene()
  } catch (error) {
    console.error('Error removing label:', error)
  }
}

const focusOnScene = () => {
  if (mapRef.value && scene.value) {
    mapRef.value.setView(
      [scene.value.position.coordinates[1], scene.value.position.coordinates[0]],
      15
    )
  }
}

const focusOnObject = (obj: any) => {
  if (mapRef.value) {
    mapRef.value.setView(
      [obj.position.coordinates[1], obj.position.coordinates[0]],
      15
    )
  }
}

const viewObject = (obj: any) => {
  // TODO: 实现查看对象详情的导航
  console.log('View object:', obj)
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

const getObjectColor = (type: string): string => {
  const colors: Record<string, string> = {
    'camera': 'bg-blue-500',
    'comment': 'bg-green-500',
    'cloud_anchor': 'bg-purple-500'
  }
  return colors[type] || 'bg-gray-500'
}

const getObjectIcon = (type: string): string => {
  const icons: Record<string, string> = {
    'camera': '📷',
    'comment': '💬',
    'cloud_anchor': '🔗'
  }
  return icons[type] || '📍'
}

const handleBoundsChange = (bounds) => {
  // TODO: 实现边界变化处理
  console.log('Bounds changed:', bounds)
}

const handleLabelSelect = (value: any) => {
  console.log('Label selected:', value)
  selectedLabelId.value = value
}

const startEditingName = () => {
  if (scene.value) {
    editingName.value = scene.value.name
    isEditingName.value = true
  }
}

const saveName = async () => {
  if (!scene.value || !editingName.value.trim()) return
  
  try {
    await SceneService.updateScene({
      path: { id: scene.value.id },
      body: { name: editingName.value.trim() }
    })
    scene.value.name = editingName.value.trim()
    isEditingName.value = false
  } catch (error) {
    console.error('Error updating scene name:', error)
  }
}

const cancelEditingName = () => {
  isEditingName.value = false
  editingName.value = ''
}

const startEditingDescription = () => {
  if (scene.value) {
    editingDescription.value = scene.value.description || ''
    isEditingDescription.value = true
  }
}

const saveDescription = async () => {
  if (!scene.value) return
  
  try {
    await SceneService.updateScene({
      path: { id: scene.value.id },
      body: { description: editingDescription.value.trim() }
    })
    scene.value.description = editingDescription.value.trim()
    isEditingDescription.value = false
  } catch (error) {
    console.error('Error updating scene description:', error)
  }
}

const cancelEditingDescription = () => {
  isEditingDescription.value = false
  editingDescription.value = ''
}

// 初始化
onMounted(async () => {
  await fetchScene()
  await fetchAvailableLabels()
})
</script>

<style scoped></style>
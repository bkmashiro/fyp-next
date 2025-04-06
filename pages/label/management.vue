<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Label Management</h1>
      <UButton
        icon="i-heroicons-plus"
        color="primary"
        @click="openCreateLabelModal"
      >
        Create Label
      </UButton>
    </div>

    <!-- Label List -->
    <UCard class="mb-6">
      <div class="p-4">
        <div class="flex items-center gap-4 mb-4">
          <UInput
            v-model="searchQuery"
            icon="i-heroicons-magnifying-glass"
            placeholder="Search labels..."
            class="w-64"
          />
          <USelect
            v-model="selectedLabel"
            :options="labels"
            option-attribute="name"
            placeholder="Filter by label"
            class="w-64"
          />
        </div>

        <div class="space-y-4">
          <div v-for="label in filteredLabels" :key="label.id" class="border rounded-lg p-4">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <UBadge :color="getRandomColor(label.id)">
                    {{ label.name }}
                  </UBadge>
                  <span class="text-sm text-gray-600">Created: {{ formatDate(label.createdAt) }}</span>
                </div>
                <p class="text-gray-700 mb-2">{{ label.description || 'No description' }}</p>
                <div class="flex items-center gap-2">
                  <UButton
                    color="primary"
                    variant="soft"
                    size="sm"
                    @click="viewScenesByLabel(label.id)"
                  >
                    View Scenes ({{ label.sceneCount || 0 }})
                  </UButton>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <UButton
                  color="primary"
                  variant="soft"
                  size="sm"
                  @click="openEditLabelModal(label)"
                >
                  Edit
                </UButton>
                <UButton
                  color="red"
                  variant="soft"
                  size="sm"
                  @click="deleteLabel(label.id)"
                >
                  Delete
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Create/Edit Label Modal -->
    <UModal v-model="isModalOpen" :ui="{ width: 'sm:max-w-md' }">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">
              {{ isEditing ? 'Edit Label' : 'Create Label' }}
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark"
              @click="closeModal"
            />
          </div>
        </template>

        <div class="space-y-4">
          <UFormGroup label="Name" required>
            <UInput v-model="labelForm.name" placeholder="Enter label name" />
          </UFormGroup>
          <UFormGroup label="Description">
            <UTextarea v-model="labelForm.description" placeholder="Enter label description" />
          </UFormGroup>
        </div>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton color="gray" variant="soft" @click="closeModal">
              Cancel
            </UButton>
            <UButton color="primary" @click="saveLabel">
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
import { LabelService } from '~/generated'

interface Label {
  id: string
  name: string
  description?: string
  createdAt: string
  sceneCount?: number
}

// 状态
const labels = ref<Label[]>([])
const searchQuery = ref('')
const selectedLabel = ref<string | undefined>(undefined)
const isModalOpen = ref(false)
const isEditing = ref(false)
const currentLabelId = ref<string | null>(null)

// 表单数据
const labelForm = ref({
  name: '',
  description: ''
})

// 计算属性
const filteredLabels = computed(() => {
  let result = labels.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(label => 
      label.name.toLowerCase().includes(query) || 
      label.description?.toLowerCase().includes(query)
    )
  }

  if (selectedLabel.value) {
    result = result.filter(label => label.id === selectedLabel.value)
  }

  return result
})

// 方法
const fetchLabels = async () => {
  try {
    const response = await LabelService.findAllLabels()
    labels.value = (response.data || []) as any[]
  } catch (error) {
    console.error('Error fetching labels:', error)
  }
}

const openCreateLabelModal = () => {
  isEditing.value = false
  currentLabelId.value = null
  labelForm.value = { name: '', description: '' }
  isModalOpen.value = true
}

const openEditLabelModal = (label: Label) => {
  isEditing.value = true
  currentLabelId.value = label.id
  labelForm.value = { name: label.name, description: label.description || '' }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  labelForm.value = { name: '', description: '' }
}

const saveLabel = async () => {
  try {
    if (isEditing.value && currentLabelId.value) {
      await LabelService.updateLabel({ 
        path: { id: currentLabelId.value },
        body: labelForm.value as any
      })
    } else {
      await LabelService.createLabel({ 
        body: labelForm.value as any
      })
    }
    
    await fetchLabels()
    closeModal()
  } catch (error) {
    console.error('Error saving label:', error)
  }
}

const deleteLabel = async (id: string) => {
  if (!confirm('Are you sure you want to delete this label?')) return
  
  try {
    await (LabelService as any).deleteLabel({ path: { id } })
    await fetchLabels()
  } catch (error) {
    console.error('Error deleting label:', error)
  }
}

const viewScenesByLabel = (labelId: string) => {
  navigateTo(`/scene/by-label/${labelId}`)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const getRandomColor = (id: string): BadgeColor => {
  const colors: BadgeColor[] = ['blue', 'green', 'purple', 'orange', 'red', 'pink']
  const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
  return colors[index]
}

// 初始化
onMounted(() => {
  fetchLabels()
})
</script> 
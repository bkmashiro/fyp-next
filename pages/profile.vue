<template>
  <div class="p-6">
    <div class="max-w-4xl mx-auto">
      <!-- 个人信息卡片 -->
      <UCard class="mb-6">
        <div class="p-4">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
              <UIcon name="i-heroicons-user-circle" class="text-3xl text-primary-500" />
            </div>
            <div>
              <h1 class="text-2xl font-bold">{{ user?.username }}</h1>
              <p class="text-gray-600">{{ user?.email }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-3 gap-4 mt-6">
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <p class="text-2xl font-bold text-primary-500">{{ stats.createdScenes }}</p>
              <p class="text-sm text-gray-600">创建的场景</p>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <p class="text-2xl font-bold text-primary-500">{{ stats.managedScenes }}</p>
              <p class="text-sm text-gray-600">管理的场景</p>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <p class="text-2xl font-bold text-primary-500">{{ stats.totalScenes }}</p>
              <p class="text-sm text-gray-600">总场景数</p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- 我的场景 -->
      <UCard class="mb-6">
        <div class="p-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">我的场景</h2>
            <UButton
              icon="i-heroicons-plus"
              color="primary"
              to="/scene"
            >
              创建场景
            </UButton>
          </div>

          <div class="space-y-4">
            <div v-for="scene in myScenes" :key="scene.id" class="border rounded-lg p-4">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <UBadge color="blue">{{ scene.name }}</UBadge>
                    <span class="text-sm text-gray-600">
                      创建于: {{ formatDate(scene.createdAt) }}
                    </span>
                  </div>
                  <p class="text-gray-700 mb-2">{{ scene.description || '无描述' }}</p>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p class="text-gray-600">位置</p>
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
                    <div>
                      <p class="text-gray-600">标签</p>
                      <div class="flex flex-wrap gap-1">
                        <UBadge
                          v-for="label in scene.labels"
                          :key="label.id"
                          :color="getRandomColor(label.id)"
                          size="sm"
                        >
                          {{ label.name }}
                        </UBadge>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <UButton
                    color="primary"
                    variant="soft"
                    size="sm"
                    :to="`/scene/${scene.id}`"
                  >
                    查看详情
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- 我管理的场景 -->
      <UCard>
        <div class="p-4">
          <h2 class="text-xl font-bold mb-4">我管理的场景</h2>
          
          <div class="space-y-4">
            <div v-for="scene in managedScenes" :key="scene.id" class="border rounded-lg p-4">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <UBadge color="green">{{ scene.name }}</UBadge>
                    <span class="text-sm text-gray-600">
                      创建于: {{ formatDate(scene.createdAt) }}
                    </span>
                  </div>
                  <p class="text-gray-700 mb-2">{{ scene.description || '无描述' }}</p>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p class="text-gray-600">位置</p>
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
                    <div>
                      <p class="text-gray-600">标签</p>
                      <div class="flex flex-wrap gap-1">
                        <UBadge
                          v-for="label in scene.labels"
                          :key="label.id"
                          :color="getRandomColor(label.id)"
                          size="sm"
                        >
                          {{ label.name }}
                        </UBadge>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <UButton
                    color="primary"
                    variant="soft"
                    size="sm"
                    :to="`/scene/${scene.id}`"
                  >
                    查看详情
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BadgeColor } from '#ui/types'
import { SceneService } from '~/generated'

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
  creator: any
  managers: any[]
  createdAt: string
  updatedAt: string
}

interface User {
  id: number
  username: string
  email: string
}

// 状态
const user = ref<User | null>(null)
const myScenes = ref<Scene[]>([])
const managedScenes = ref<Scene[]>([])

// 统计数据
const stats = computed(() => ({
  createdScenes: myScenes.value.length,
  managedScenes: managedScenes.value.length,
  totalScenes: myScenes.value.length + managedScenes.value.length
}))

// 方法
const fetchUserScenes = async () => {
  try {
    const response = await SceneService.findUserScenes()
    if (response.data) {
      const scenes = response.data as any[]
      // 分离创建的场景和管理的场景
      myScenes.value = scenes.filter(scene => scene.creator.id === user.value?.id)
      managedScenes.value = scenes.filter(scene => 
        scene.creator.id !== user.value?.id && 
        scene.managers.some(manager => manager.id === user.value?.id)
      )
    }
  } catch (error) {
    console.error('Error fetching user scenes:', error)
  }
}

const focusOnScene = (scene: Scene) => {
  // TODO: 实现地图聚焦功能
  console.log('Focus on scene:', scene)
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
onMounted(async () => {
  // TODO: 获取用户信息
  user.value = {
    id: 1,
    username: '测试用户',
    email: 'test@example.com'
  }
  await fetchUserScenes()
})
</script> 
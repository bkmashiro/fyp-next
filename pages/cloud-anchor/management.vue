<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Cloud Anchors</h1>

    <!-- Map View -->
    <UCard class="mb-6">
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">Map View</h2>
        <GeoMap 
          ref="mapRef"
          :markers="mapObjects"
          @bounds-change="handleBoundsChange"
        />
      </div>
    </UCard>

    <!-- List of Anchors -->
    <transition-group name="anchor" tag="div" class="space-y-4">
      <UCard v-for="anchor in anchors" :key="anchor.id" class="hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-semibold mb-2">Anchor {{ anchor.id }}</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-600">Cloud Anchor ID</p>
                <p>{{ anchor.cloudAnchorId }}</p>
              </div>
              <div>
                <p class="text-gray-600">Position</p>
                <button 
                  @click="focusOnAnchor(anchor)"
                  class="text-blue-600 hover:underline text-left"
                >
                  <p>Longitude: {{ (anchor.anchor as any).coordinates[0].toFixed(6) }}</p>
                  <p>Latitude: {{ (anchor.anchor as any).coordinates[1].toFixed(6) }}</p>
                  <p>Altitude: {{ (anchor as any).altitude.toFixed(6) }}</p>
                </button>
              </div>
              <div>
                <p class="text-gray-600">Associated Objects</p>
                <p>{{ anchor.geoObjects?.length || 0 }} objects</p>
              </div>
            </div>
          </div>
          <div class="flex space-x-2">
            <UButton type="primary" size="sm" @click="viewAnchor(anchor)">
              View Details
            </UButton>
            <UButton type="error" size="sm" @click="deleteAnchor(anchor.id)">
              Delete
            </UButton>
          </div>
        </div>
      </UCard>
    </transition-group>

    <!-- Pagination -->
    <div class="mt-6 flex justify-center">
      <UPagination v-model="pagination.page"
                   :page-count="pagination.totalPages"
                   :total="pagination.total"
                   @update="fetchAnchors" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CloudAnchorService, type CloudAnchor } from '~/generated'
import GeoMap from '~/components/GeoMap.vue'

interface MapInstance {
  setView: (latlng: [number, number], zoom: number) => void
}

const anchors = ref<CloudAnchor[]>([])
const mapRef = ref<MapInstance | null>(null)
const pagination = ref({
  limit: 10,
  page: 1,
  total: 0,
  totalPages: 0
})

const mapObjects = computed(() => {
  return anchors.value.map(anchor => ({
    position: [
      (anchor.anchor as any).coordinates[1],
      (anchor.anchor as any).coordinates[0]
    ] as [number, number],
    icon: `<div class="w-6 h-6 rounded-full flex items-center justify-center bg-purple-500 text-white text-xs">📍</div>`,
    content: `
      <div class="p-2">
        <p class="font-semibold">Cloud Anchor</p>
        <p class="text-sm text-gray-600">Altitude: ${(anchor as any).altitude.toFixed(2)}m</p>
        <p class="text-sm text-gray-600">ID: ${anchor.cloudAnchorId}</p>
      </div>
    `
  }))
})

const fetchAnchors = async () => {
  const { data: response } = await CloudAnchorService.findAllAnchors({
    query: {
      page: pagination.value.page.toString(),
      pageSize: pagination.value.limit.toString()
    }
  })

  const {
    data,
    limit,
    page,
    total,
    totalPages
  } = response as any

  anchors.value = data
  pagination.value = { limit, page, total, totalPages }
}

const viewAnchor = (anchor) => {
  navigateTo(`/cloud-anchor/${anchor.id}`)
}

const deleteAnchor = async (id) => {
  try {
    await CloudAnchorService.deleteAnchor({ path: { anchorId: id } })
    anchors.value = anchors.value.filter(anchor => anchor.id !== id)
  } catch (error) {
    console.error('Failed to delete anchor:', error)
  }
}

const focusOnAnchor = (anchor) => {
  if (mapRef.value) {
    mapRef.value.setView(
      [(anchor.anchor as any).coordinates[1], (anchor.anchor as any).coordinates[0]],
      15
    )
  }
}

const handleBoundsChange = (bounds) => {
  // 如果需要根据地图边界筛选锚点，可以在这里实现
}

// Fetch initial anchors when the component mounts
onMounted(() => {
  fetchAnchors()
})
</script>

<style scoped>
.anchor-move,
.anchor-enter-active,
.anchor-leave-active {
  transition: all 0.5s ease;
}

.anchor-enter-from,
.anchor-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.anchor-leave-active {
  position: absolute;
}

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
<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Cloud Anchors</h1>

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
                <p>X: {{ (anchor.anchor as any).coordinates[0].toFixed(6) }}</p>
                <p>Y: {{ (anchor.anchor as any).coordinates[1].toFixed(6) }}</p>
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

const anchors = ref<CloudAnchor[]>([])
const pagination = ref({
  limit: 10,
  page: 1,
  total: 0,
  totalPages: 0
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
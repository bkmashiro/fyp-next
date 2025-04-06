<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Comments</h1>

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

    <!-- List of Comments -->
    <transition-group name="comment" tag="div" class="space-y-4">
      <UCard v-for="comment in comments" :key="comment.id" class="hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <UBadge color="green">GeoComment</UBadge>
              <span class="text-sm text-gray-600">Created: {{ formatDate(comment.createdAt) }}</span>
            </div>
            <p class="text-gray-700 mb-2">{{ comment.text }}</p>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-600">Position</p>
                <button 
                  @click="focusOnComment(comment)"
                  class="text-blue-600 hover:underline text-left"
                >
                  <p>Lat: {{ comment.position.coordinates[1].toFixed(6) }}°</p>
                  <p>Lng: {{ comment.position.coordinates[0].toFixed(6) }}°</p>
                  <p>Alt: {{ comment.altitude.toFixed(2) }}m</p>
                </button>
              </div>
              <div>
                <p class="text-gray-600">Cloud Anchor</p>
                <NuxtLink :to="`/cloud-anchor/${comment.cloudAnchor.id}`"
                          class="text-blue-600 hover:underline">
                  ID: {{ comment.cloudAnchor.id }}
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <UButton type="primary" size="sm" @click="viewComment(comment)">
              View Details
            </UButton>
            <UButton type="error" size="sm" @click="deleteComment(comment.id)">
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
                   @update="fetchComments" />
    </div>
  </div>
</template>

<script setup>
import { GeoCommentService, GeoObjectService } from '~/generated'
import GeoMap from '~/components/GeoMap.vue'

const comments = ref([])
const pagination = ref({
  limit: 10,
  page: 1,
  total: 0,
  totalPages: 0
})

const mapRef = ref(null)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString()
}

const fetchComments = async (bounds = null) => {
  try {
    let response
    if (bounds) {
      response = await GeoObjectService.findObjectsInBounds({
        query: {
          ...bounds,
          type: 'GeoComment',
          page: pagination.value.page,
          limit: pagination.value.limit
        }
      })
    } else {
      response = await GeoCommentService.findUserComments({
        query: {
          page: pagination.value.page,
          limit: pagination.value.limit
        }
      })
    }

    const {
      data,
      limit,
      page,
      total,
      totalPages
    } = response.data

    comments.value = data
    pagination.value = { limit, page, total, totalPages }
  } catch (error) {
    console.error('Failed to fetch comments:', error)
  }
}

const handleBoundsChange = (bounds) => {
  fetchComments(bounds)
}

const viewComment = (comment) => {
  navigateTo(`/comment/${comment.id}`)
}

const deleteComment = async (id) => {
  try {
    await GeoCommentService.delete({ path: { id } })
    comments.value = comments.value.filter(comment => comment.id !== id)
  } catch (error) {
    console.error('Failed to delete comment:', error)
  }
}

const focusOnComment = (comment) => {
  if (mapRef.value) {
    mapRef.value.setView(
      [comment.position.coordinates[1], comment.position.coordinates[0]],
      15
    )
  }
}

const mapObjects = computed(() => {
  return comments.value.map(comment => ({
    position: [
      comment.position.coordinates[1],
      comment.position.coordinates[0]
    ],
    icon: `<div class="w-6 h-6 rounded-full flex items-center justify-center bg-green-500 text-white text-xs">💬</div>`,
    content: `
      <div class="p-2">
        <p class="font-semibold">GeoComment</p>
        <p class="text-sm text-gray-600">Altitude: ${comment.altitude.toFixed(2)}m</p>
        <p class="text-sm text-gray-600">Text: ${comment.text}</p>
      </div>
    `
  }))
})

// Fetch initial comments when the component mounts
onMounted(() => {
  fetchComments()
})
</script>

<style scoped>
.comment-move,
.comment-enter-active,
.comment-leave-active {
  transition: all 0.5s ease;
}

.comment-enter-from,
.comment-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.comment-leave-active {
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
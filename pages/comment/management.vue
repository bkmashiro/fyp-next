<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Comments</h1>

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
                <p>Lat: {{ comment.position.coordinates[1].toFixed(6) }}°</p>
                <p>Lng: {{ comment.position.coordinates[0].toFixed(6) }}°</p>
                <p>Alt: {{ comment.altitude.toFixed(2) }}m</p>
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
import { GeoCommentService } from '~/generated'

const comments = ref([])
const pagination = ref({
  limit: 10,
  page: 1,
  total: 0,
  totalPages: 0
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString()
}

const fetchComments = async () => {
  const { data: response } = await GeoCommentService.findAll({
    query: {
      page: pagination.value.page,
      limit: pagination.value.limit
    }
  })

  const {
    data,
    limit,
    page,
    total,
    totalPages
  } = response

  comments.value = data
  pagination.value = { limit, page, total, totalPages }
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
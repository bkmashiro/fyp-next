<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Comment Detail</h1>
    <div v-if="comment">
      <UCard class="mb-6">
        <div class="p-4">
          <h2 class="text-2xl font-bold mb-4">Comment Details</h2>

          <!-- Basic Info -->
          <div class="space-y-6">
            <!-- Comment Content -->
            <div class="border rounded-lg p-4">
              <h3 class="text-lg font-semibold mb-3">Content</h3>
              <p class="text-gray-700">{{ comment.text }}</p>
            </div>

            <!-- Timestamps -->
            <div class="border rounded-lg p-4">
              <h3 class="text-lg font-semibold mb-3">Timestamps</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-600">Created</p>
                  <p>{{ formatDate(comment.createdAt) }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Updated</p>
                  <p>{{ formatDate(comment.updatedAt) }}</p>
                </div>
              </div>
            </div>

            <!-- Location Information -->
            <div class="border rounded-lg p-4">
              <h3 class="text-lg font-semibold mb-3">Location Information</h3>
              <div class="space-y-4">
                <div>
                  <h4 class="font-medium mb-2">Absolute Position</h4>
                  <div class="grid grid-cols-3 gap-4">
                    <div>
                      <p class="text-sm text-gray-600">Latitude</p>
                      <p>{{ comment.position.coordinates[1].toFixed(6) }}°</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Longitude</p>
                      <p>{{ comment.position.coordinates[0].toFixed(6) }}°</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Altitude</p>
                      <p>{{ comment.altitude.toFixed(2) }}m</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 class="font-medium mb-2">Relative Position</h4>
                  <div class="grid grid-cols-3 gap-4">
                    <div>
                      <p class="text-sm text-gray-600">X</p>
                      <p>{{ comment.relPosition.coordinates[0].toFixed(6) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Y</p>
                      <p>{{ comment.relPosition.coordinates[1].toFixed(6) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Altitude</p>
                      <p>{{ comment.relAltitude.toFixed(6) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Orientation -->
            <div class="border rounded-lg p-4">
              <h3 class="text-lg font-semibold mb-3">Orientation</h3>
              <div class="space-y-4">
                <div>
                  <h4 class="font-medium mb-2">Quaternion</h4>
                  <div class="grid grid-cols-4 gap-4">
                    <div>
                      <p class="text-sm text-gray-600">X</p>
                      <p>{{ comment.orientation[0].toFixed(6) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Y</p>
                      <p>{{ comment.orientation[1].toFixed(6) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Z</p>
                      <p>{{ comment.orientation[2].toFixed(6) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">W</p>
                      <p>{{ comment.orientation[3].toFixed(6) }}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 class="font-medium mb-2">Scale</h4>
                  <div class="grid grid-cols-3 gap-4">
                    <div>
                      <p class="text-sm text-gray-600">X</p>
                      <p>{{ comment.scale[0].toFixed(6) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Y</p>
                      <p>{{ comment.scale[1].toFixed(6) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Z</p>
                      <p>{{ comment.scale[2].toFixed(6) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cloud Anchor -->
            <div class="border rounded-lg p-4">
              <h3 class="text-lg font-semibold mb-3">Cloud Anchor</h3>
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-gray-600">ID</p>
                    <NuxtLink :to="`/cloud-anchor/${comment.cloudAnchor.id}`"
                              class="text-blue-600 hover:underline">
                      {{ comment.cloudAnchor.id }}
                    </NuxtLink>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Cloud Anchor ID</p>
                    <NuxtLink :to="`/cloud-anchor/${comment.cloudAnchor.id}`"
                              class="text-blue-600 hover:underline">
                      {{ comment.cloudAnchor.cloudAnchorId }}
                    </NuxtLink>
                  </div>
                </div>
                <div>
                  <h4 class="font-medium mb-2">Anchor Position</h4>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-gray-600">X</p>
                      <p>{{ comment.cloudAnchor.anchor.coordinates[0].toFixed(6) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Y</p>
                      <p>{{ comment.cloudAnchor.anchor.coordinates[1].toFixed(6) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Accuracy Information -->
            <div v-if="parsedMetadata" class="border rounded-lg p-4">
              <h3 class="text-lg font-semibold mb-3">Accuracy Information</h3>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <p class="text-sm text-gray-600">Horizontal Accuracy</p>
                  <p>{{ parsedMetadata.HorizontalAccuracy.toFixed(2) }}m</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Vertical Accuracy</p>
                  <p>{{ parsedMetadata.VerticalAccuracy.toFixed(2) }}m</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Yaw Accuracy</p>
                  <p>{{ parsedMetadata.OrientationYawAccuracy.toFixed(2) }}°</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
    <div v-else class="text-center py-8">
      <p>Loading comment details...</p>
    </div>
    <UButton type="default" @click="goBack" class="mt-4">
      Back to Comments
    </UButton>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const comment = ref<any>(null)
const parsedMetadata = ref<any>(null)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString()
}

const fetchCommentDetails = async (id) => {
  const response = await GeoCommentService.findOneComment({ path: { id: id } }) as any
  comment.value = response.data
  if (comment.value.metadata) {
    parsedMetadata.value = JSON.parse(comment.value.metadata)
  }
}

const goBack = () => {
  router.push('/comment/management')
}

onMounted(async () => {
  const { id } = route.params
  await fetchCommentDetails(id)
})
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
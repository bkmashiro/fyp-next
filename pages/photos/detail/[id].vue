<template>
  <div class="p-6 max-w-3xl mx-auto">
    <!-- Check if photo details have been loaded -->
    <h1 class="text-3xl font-bold mb-6">Photo Detail</h1>
    <div v-if="photo">
      <UCard class="mb-6">
        <img v-if="photo.ossFile"
             :src="`/api/api/file/${photo.ossFile.key}`"
             :alt="photo.ossFile.originalName"
             class="w-full" />

        <div v-else
             class="text-center py-8">
          <p>Loading photo details...</p>
        </div>
        <div class="p-4">
          <h2 class="text-2xl font-bold mb-4">Image Details</h2>

          <!-- Basic Info -->
          <div class="space-y-6">
            <!-- File Information -->
            <div class="border rounded-lg p-4">
              <h3 class="text-lg font-semibold mb-3">File Information</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-600">Original Name</p>
                  <p>{{ photo.ossFile.originalName }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Size</p>
                  <p>{{ formatFileSize(photo.ossFile.size) }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Type</p>
                  <p>{{ photo.ossFile.mimeType }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Key</p>
                  <p>{{ photo.ossFile.key }}</p>
                </div>
              </div>
            </div>

            <!-- Timestamps -->
            <div class="border rounded-lg p-4">
              <h3 class="text-lg font-semibold mb-3">Timestamps</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-600">Created</p>
                  <p>{{ formatDate(photo.createdAt) }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Updated</p>
                  <p>{{ formatDate(photo.updatedAt) }}</p>
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
                      <p>{{ photo.position.coordinates[1].toFixed(6) }}°</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Longitude</p>
                      <p>{{ photo.position.coordinates[0].toFixed(6) }}°</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Altitude</p>
                      <p>{{ photo.altitude.toFixed(2) }}m</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 class="font-medium mb-2">Relative Position</h4>
                  <div class="grid grid-cols-3 gap-4">
                    <div>
                      <p class="text-sm text-gray-600">X</p>
                      <p>{{ photo.relPosition.coordinates[0].toFixed(6) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Y</p>
                      <p>{{ photo.relPosition.coordinates[1].toFixed(6) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Altitude</p>
                      <p>{{ photo.relAltitude.toFixed(6) }}</p>
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
                      <p>{{ photo.orientation[0].toFixed(6) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Y</p>
                      <p>{{ photo.orientation[1].toFixed(6) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Z</p>
                      <p>{{ photo.orientation[2].toFixed(6) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">W</p>
                      <p>{{ photo.orientation[3].toFixed(6) }}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 class="font-medium mb-2">Scale</h4>
                  <div class="grid grid-cols-3 gap-4">
                    <div>
                      <p class="text-sm text-gray-600">X</p>
                      <p>{{ photo.scale[0].toFixed(6) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Y</p>
                      <p>{{ photo.scale[1].toFixed(6) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Z</p>
                      <p>{{ photo.scale[2].toFixed(6) }}</p>
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
                    <NuxtLink :to="`/cloud-anchor/${photo.cloudAnchor.id}`"
                              class="text-blue-600 hover:underline">
                      {{ photo.cloudAnchor.id }}
                    </NuxtLink>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Cloud Anchor ID</p>
                    <!-- <p>{{ photo.cloudAnchor.cloudAnchorId }}</p> -->
                    <NuxtLink :to="`/cloud-anchor/${photo.cloudAnchor.id}`"
                              class="text-blue-600 hover:underline">
                      {{ photo.cloudAnchor.cloudAnchorId }}
                    </NuxtLink>
                  </div>
                </div>
                <div>
                  <h4 class="font-medium mb-2">Anchor Position</h4>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-gray-600">X</p>
                      <p>{{ photo.cloudAnchor.anchor.coordinates[0].toFixed(6) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Y</p>
                      <p>{{ photo.cloudAnchor.anchor.coordinates[1].toFixed(6) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Accuracy Information -->
            <div v-if="parsedMetadata"
                 class="border rounded-lg p-4">
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
    <div v-else
         class="text-center py-8">
      <p>Loading photo details...</p>
    </div>
    <!-- Button to go back to the album -->
    <UButton type="default"
             @click="goBack"
             class="mt-4">
      Back to Album
    </UButton>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const photo = ref(null)
const parsedMetadata = ref(null)

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString()
}

const fetchPhotoDetails = async (id) => {
  const photo = (await GeoImageService.findOneGeoImage({ path: { id } })).data
  if (photo.metadata) {
    parsedMetadata.value = JSON.parse(photo.metadata)
  }
  console.log('photo', photo)
  return photo
}

onMounted(async () => {
  const { id } = route.params
  photo.value = await fetchPhotoDetails(id)
})

const goBack = () => {
  // Navigate back to the home/album page.
  router.push('/photos/management')
}
</script>

<style scoped>
img {
  view-transition-name: selected-photo;
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
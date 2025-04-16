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

            <!-- Copyright Information -->
            <div class="border rounded-lg p-4">
              <h3 class="text-lg font-semibold mb-3">Copyright Information</h3>
              <div class="space-y-4">
                <div v-if="copyrightInfo?.status === 'SUCCESS'">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-gray-600">Status</p>
                      <UBadge :color="copyrightInfo.details.status === 'registered' ? 'green' : 'red'">
                        {{ copyrightInfo.details.status }}
                      </UBadge>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Transaction Hash</p>
                      <p class="truncate">{{ copyrightInfo.details.transactionHash }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">User ID</p>
                      <p>{{ copyrightInfo.details.userId }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Image Hash</p>
                      <p class="truncate">{{ formatBinaryHash(copyrightInfo.details.imageHash) }}</p>
                    </div>
                  </div>
                  <div class="mt-4">
                    <p class="text-sm text-gray-600">Blockchain Info</p>
                    <div class="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p class="text-sm text-gray-600">Topic ID</p>
                        <p class="truncate">{{ copyrightInfo.details.blockchainInfo.topicId }}</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-600">Sequence</p>
                        <p>{{ copyrightInfo.details.blockchainInfo.sequenceNumber }}</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-600">Message</p>
                        <p>{{ copyrightInfo.details.blockchainInfo.message.slice(0, 5) }}...{{
                          copyrightInfo.details.blockchainInfo.message.slice(-5) }}</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-600">Timestamp</p>
                        <p>{{ formatDate(copyrightInfo.details.blockchainInfo.timestamp) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <p class="text-gray-500">{{ copyrightInfo?.message || 'No copyright information available' }}</p>
                </div>
                <div class="flex space-x-4">
                  <UButton v-if="!copyrightInfo?.details"
                           type="primary"
                           @click="registerCopyright"
                           :loading="isRegistering">
                    Register Copyright
                  </UButton>
                  <UButton v-if="copyrightInfo?.status === 'SUCCESS'"
                           type="secondary"
                           @click="createWatermark"
                           :loading="isCreatingWatermark">
                    Create Watermark
                  </UButton>
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

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const photo = ref<any>(null)
const parsedMetadata = ref<any>(null)
const copyrightInfo = ref<any>(null)
const isRegistering = ref(false)
const isCreatingWatermark = ref(false)
const userStore = useUserStore()

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

const formatBinaryHash = (hash: string) => {
  // 将二进制字符串转换为十六进制
  return parseInt(hash, 2).toString(16).toUpperCase()
}

const fetchPhotoDetails = async (id) => {
  const photo = (await GeoImageService.findOneGeoImage({ path: { id } })).data

  if (!photo) {
    throw new Error('Photo not found')
  }

  if (photo.metadata) {
    parsedMetadata.value = JSON.parse(photo.metadata)
  }
  console.log('photo', photo)
  return photo
}

const fetchCopyrightInfo = async (id) => {
  try {
    const { data } = await ConsensusService.getCopyrightInfo({ path: { geoImageId: id } })
    if (data!.status === 'NOT_FOUND') {
      copyrightInfo.value = null
      return
    }
    copyrightInfo.value = data
  } catch (error: any) {
    console.error('Failed to fetch copyright info:', error)
    useToast().add({
      title: 'Error',
      description: 'Failed to fetch copyright information',
      color: 'red',
      timeout: 3000
    })
    copyrightInfo.value = null
  }
}

const registerCopyright = async () => {
  if (!photo.value) return
  console.log('registerCopyright', photo.value, userStore.user)
  isRegistering.value = true
  try {
    const { data } = await ConsensusService.registerImageCopyright({
      body: {
        geoImageId: photo.value.id,
        userId: userStore.user!.id
      }
    })

    await fetchCopyrightInfo(photo.value.id)
    useToast().add({
      title: 'Success',
      description: 'Copyright registered successfully',
      color: 'green',
      timeout: 3000
    })
  } catch (error: any) {
    console.error('Failed to register copyright:', error)
    useToast().add({
      title: 'Error',
      description: error.response?.data?.message || 'Failed to register copyright',
      color: 'red',
      timeout: 3000
    })
  } finally {
    isRegistering.value = false
  }
}

const createWatermark = async () => {
  if (!photo.value || !copyrightInfo.value) return

  isCreatingWatermark.value = true
  try {
    // 获取版权信息的消息前8位作为水印内容
    const watermarkContent = copyrightInfo.value.details.blockchainInfo.message.slice(0, 8)

    // 创建水印
    const { data: watermarkResponse } = await WatermarkService.createWatermark({
      body: {
        fileKey: photo.value.ossFile.key,
        watermark: watermarkContent,
      }
    })

    if (watermarkResponse && (watermarkResponse as any).watermarkLength > 0) {
      // 下载带水印的图片
      const { data: watermarkFile } = await FileService.getFile({ path: { key: (watermarkResponse as any).watermarkFile } })
      
      // 创建下载链接
      const blob = new Blob([watermarkFile as BlobPart], { type: 'image/jpeg' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `watermarked_${photo.value.ossFile.originalName}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      useToast().add({
        title: 'Success',
        description: 'Watermark created and image downloaded successfully',
        color: 'green',
        timeout: 3000
      })
    } else {
      throw new Error('Failed to create watermark')
    }
  } catch (error) {
    console.error('Error:', error)
    useToast().add({
      title: 'Error',
      description: error instanceof Error ? error.message : 'Failed to create watermark',
      color: 'red',
      timeout: 3000
    })
  } finally {
    isCreatingWatermark.value = false
  }
}

onMounted(async () => {
  const { id } = route.params
  photo.value = await fetchPhotoDetails(id)
  await fetchCopyrightInfo(id)
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
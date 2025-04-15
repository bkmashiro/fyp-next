<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Verify Image Copyright</h1>
    
    <UCard class="mb-6">
      <div class="space-y-6">
        <!-- Image Upload Section -->
        <div class="border rounded-lg p-4">
          <h3 class="text-lg font-semibold mb-3">Upload Image</h3>
          <div class="space-y-4">
            <input
              type="file"
              accept="image/*"
              class="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-primary-50 file:text-primary-700
                hover:file:bg-primary-100"
              @change="handleFileUpload"
            />
            <div v-if="previewUrl" class="mt-4">
              <img :src="previewUrl" class="max-w-full h-auto" />
            </div>
            <div v-if="imageHash" class="mt-4">
              <p class="text-sm text-gray-600">Image Hash</p>
              <p class="font-mono text-sm break-all">{{ imageHash }}</p>
            </div>
          </div>
        </div>

        <!-- User Info Section -->
        <div class="border rounded-lg p-4">
          <h3 class="text-lg font-semibold mb-3">User Information</h3>
          <div class="space-y-4">
            <UFormGroup label="User ID" name="userId">
              <UInput
                v-model="userId"
                placeholder="Enter user ID to verify"
              />
            </UFormGroup>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-4">
          <UButton
            type="primary"
            @click="verifyCopyright"
            :loading="isVerifying"
            :disabled="!selectedFile || !userId"
          >
            Verify Copyright
          </UButton>
          <UButton
            type="secondary"
            @click="extractWatermark"
            :loading="isExtracting"
            :disabled="!selectedFile"
          >
            Extract Watermark
          </UButton>
        </div>

        <!-- Verification Result -->
        <div v-if="verificationResult" class="border rounded-lg p-4">
          <h3 class="text-lg font-semibold mb-3">Verification Result</h3>
          <div class="space-y-4">
            <div v-if="!verificationResult.details.matches.exact.length && !verificationResult.details.matches.potential.length" 
                 class="p-4 rounded-lg bg-red-50">
              <p class="font-medium text-red-800">
                No matching images found
              </p>
            </div>
            <div v-else :class="[
              'p-4 rounded-lg',
              verificationResult.isValid ? 'bg-green-50' : 'bg-yellow-50'
            ]">
              <p class="font-medium" :class="[
                verificationResult.isValid ? 'text-green-800' : 'text-yellow-800'
              ]">
                {{ verificationResult.message }}
              </p>
              <div v-if="verificationResult.details" class="mt-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-gray-600">Uploaded Image Hash</p>
                    <p class="font-mono text-sm break-all">{{ verificationResult.details.imageHash }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">User ID to verify</p>
                    <p>{{ verificationResult.details.userId }}</p>
                  </div>
                </div>

                <!-- Similar Images Found -->
                <div v-if="verificationResult.details.matches" class="mt-4">
                  <!-- Exact Matches -->
                  <div v-if="verificationResult.details.matches.exact.length > 0" class="mb-4">
                    <h4 class="font-medium mb-2">Exact Matches</h4>
                    <div class="space-y-2">
                      <div v-for="match in verificationResult.details.matches.exact" :key="match.id" class="border rounded p-2">
                        <div class="grid grid-cols-2 gap-2">
                          <div>
                            <p class="text-sm text-gray-600">GeoImage ID</p>
                            <p class="font-mono text-sm">{{ match.geoImage.id }}</p>
                          </div>
                          <div>
                            <p class="text-sm text-gray-600">User ID</p>
                            <p>{{ match.userId }}</p>
                          </div>
                          <div>
                            <p class="text-sm text-gray-600">Status</p>
                            <p class="capitalize">{{ match.status }}</p>
                          </div>
                          <div>
                            <p class="text-sm text-gray-600">Similarity</p>
                            <p>{{ (match.similarity * 100).toFixed(2) }}%</p>
                          </div>
                          <div>
                            <p class="text-sm text-gray-600">Transaction Hash</p>
                            <p class="font-mono text-sm truncate">{{ match.transactionHash }}</p>
                          </div>
                          <div>
                            <p class="text-sm text-gray-600">Blockchain Info</p>
                            <div class="mt-1">
                              <p class="text-xs text-gray-500">Topic ID: {{ match.blockchainInfo.topicId }}</p>
                              <p class="text-xs text-gray-500">Sequence: {{ match.blockchainInfo.sequenceNumber }}</p>
                              <p class="text-xs text-gray-500">Timestamp: {{ formatDate(match.blockchainInfo.timestamp) }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Potential Matches -->
                  <div v-if="verificationResult.details.matches.potential.length > 0">
                    <h4 class="font-medium mb-2">Potential Matches</h4>
                    <div class="space-y-2">
                      <div v-for="match in verificationResult.details.matches.potential" :key="match.id" class="border rounded p-2">
                        <div class="grid grid-cols-2 gap-2">
                          <div>
                            <p class="text-sm text-gray-600">GeoImage ID</p>
                            <p class="font-mono text-sm">{{ match.geoImage.id }}</p>
                          </div>
                          <div>
                            <p class="text-sm text-gray-600">User ID</p>
                            <p>{{ match.userId }}</p>
                          </div>
                          <div>
                            <p class="text-sm text-gray-600">Status</p>
                            <p class="capitalize">{{ match.status }}</p>
                          </div>
                          <div>
                            <p class="text-sm text-gray-600">Similarity</p>
                            <p>{{ (match.similarity * 100).toFixed(2) }}%</p>
                          </div>
                          <div>
                            <p class="text-sm text-gray-600">Transaction Hash</p>
                            <p class="font-mono text-sm truncate">{{ match.transactionHash }}</p>
                          </div>
                          <div>
                            <p class="text-sm text-gray-600">Blockchain Info</p>
                            <div class="mt-1">
                              <p class="text-xs text-gray-500">Topic ID: {{ match.blockchainInfo.topicId }}</p>
                              <p class="text-xs text-gray-500">Sequence: {{ match.blockchainInfo.sequenceNumber }}</p>
                              <p class="text-xs text-gray-500">Timestamp: {{ formatDate(match.blockchainInfo.timestamp) }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Watermark Result -->
        <div v-if="extractedWatermark" class="border rounded-lg p-4 mt-4">
          <h3 class="text-lg font-semibold mb-3">Extracted Watermark</h3>
          <div :class="[
            'p-4 rounded',
            isWatermarkValid ? 'bg-green-50' : 'bg-yellow-50'
          ]">
            <p v-if="isWatermarkValid" class="font-mono break-all">{{ extractedWatermark }}</p>
            <div v-else>
              <p class="text-yellow-800 font-medium">Watermark extraction failed</p>
              <p class="text-gray-500 text-sm mt-2 font-mono break-all">{{ extractedWatermark }}</p>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { AxiosInstance } from 'axios';

const nuxtApp = useNuxtApp();
const http = nuxtApp.$http as AxiosInstance;

const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const userId = ref('')
const isVerifying = ref(false)
const isExtracting = ref(false)
const verificationResult = ref<any>(null)
const extractedWatermark = ref<string | null>(null)
const imageHash = ref<string | null>(null)
const isWatermarkValid = computed(() => {
  if (!extractedWatermark.value) return false
  // 检查是否只包含字母、数字和常见标点
  return /^[a-zA-Z0-9\s.,!?-]+$/.test(extractedWatermark.value)
})

const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  console.log('Input element:', input)
  const file = input?.files?.[0]
  console.log('Selected file:', file)
  
  if (!file) {
    console.log('No file selected')
    return
  }

  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
  
  // 立即计算图片哈希
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const { data: uploadResponse } = await http.post('/api/consensus/calculate-image-hash', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    if (uploadResponse.success) {
      imageHash.value = uploadResponse.imageHash
    }
  } catch (error) {
    console.error('Failed to calculate image hash:', error)
    useToast().add({
      title: 'Error',
      description: error instanceof Error ? error.message : 'Failed to calculate image hash',
      color: 'red',
      timeout: 3000
    })
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const verifyCopyright = async () => {
  if (!selectedFile.value || !userId.value || !imageHash.value) return

  isVerifying.value = true
  try {
    const { data } = await ConsensusService.verifyImageCopyright({
      body: {
        imageHash: imageHash.value,
        userId: userId.value
      }
    })

    verificationResult.value = data
  } catch (error: any) {
    console.error('Failed to verify copyright:', error)
    useToast().add({
      title: 'Error',
      description: error.response?.data?.message || 'Failed to verify copyright',
      color: 'red',
      timeout: 3000
    })
  } finally {
    isVerifying.value = false
  }
}

const extractWatermark = async () => {
  if (!selectedFile.value) {
    useToast().add({
      title: 'Error',
      description: 'Please select an image first',
      color: 'red',
      timeout: 3000
    })
    return
  }

  try {
    isExtracting.value = true

    // Upload file first
    const formData = new FormData();
    formData.append('file', selectedFile.value);

    const { data: uploadResponse } = await http.post('/api/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    const { key } = uploadResponse;

    // Extract watermark
    const { data: extractResponse } = await WatermarkService.extractWatermark({
      body: {
        fileKey: key,
        watermarkLength: 63,
        passwordImg: 0,
        passwordWm: 0
      }
    });
    if (extractResponse) {
      extractedWatermark.value = extractResponse;
    } else {
      throw new Error('Failed to extract watermark');
    }
  } catch (error) {
    console.error('Error:', error);
    useToast().add({
      title: 'Error',
      description: error instanceof Error ? error.message : 'Failed to extract watermark',
      color: 'red',
      timeout: 3000
    });
  } finally {
    isExtracting.value = false;
  }
}
</script> 
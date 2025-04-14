<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Verify Image Copyright</h1>
    
    <UCard class="mb-6">
      <div class="space-y-6">
        <!-- Image Upload Section -->
        <div class="border rounded-lg p-4">
          <h3 class="text-lg font-semibold mb-3">Upload Image</h3>
          <div class="space-y-4">
            <UInput
              type="file"
              accept="image/*"
              @change="handleFileUpload"
            />
            <div v-if="previewUrl" class="mt-4">
              <img :src="previewUrl" class="max-w-full h-auto" />
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

        <!-- Verification Result -->
        <div v-if="verificationResult" class="border rounded-lg p-4">
          <h3 class="text-lg font-semibold mb-3">Verification Result</h3>
          <div class="space-y-4">
            <div :class="[
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
                    <p class="text-sm text-gray-600">Image Hash</p>
                    <p class="truncate">{{ verificationResult.details.imageHash }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Status</p>
                    <p>{{ verificationResult.details.status }}</p>
                  </div>
                </div>
                <div v-if="verificationResult.details.timeRange" class="mt-4">
                  <p class="text-sm text-gray-600">Time Range</p>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-gray-600">From</p>
                      <p>{{ formatDate(verificationResult.details.timeRange.from) }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">To</p>
                      <p>{{ formatDate(verificationResult.details.timeRange.to) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end">
          <UButton
            type="primary"
            @click="verifyCopyright"
            :loading="isVerifying"
            :disabled="!selectedFile || !userId"
          >
            Verify Copyright
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const userId = ref('')
const isVerifying = ref(false)
const verificationResult = ref<any>(null)

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    selectedFile.value = input.files[0]
    previewUrl.value = URL.createObjectURL(input.files[0])
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const verifyCopyright = async () => {
  if (!selectedFile.value || !userId.value) return

  isVerifying.value = true
  try {
    // TODO: 这里需要实现图片特征提取的逻辑
    const imageHash = 'extracted_image_hash' // 临时占位

    const { data } = await ConsensusService.verifyImageCopyright({
      body: {
        imageHash,
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
</script> 
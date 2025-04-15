<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Image Watermark Management</h1>

    <!-- Add watermark form -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-xl font-semibold mb-4">Add Watermark</h2>
      <form @submit.prevent="handleCreateWatermark" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Select Image</label>
          <input
            type="file"
            @change="handleFileChange"
            accept="image/*"
            class="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Watermark Content</label>
          <input
            v-model="createForm.watermark"
            type="text"
            class="w-full p-2 border rounded"
            placeholder="Enter watermark content"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Image Password</label>
          <input
            v-model="createForm.passwordImg"
            type="password"
            class="w-full p-2 border rounded"
            placeholder="Enter image password"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Watermark Password</label>
          <input
            v-model="createForm.passwordWm"
            type="password"
            class="w-full p-2 border rounded"
            placeholder="Enter watermark password"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Processing...' : 'Add Watermark' }}
        </button>
      </form>
    </div>

    <!-- Extract watermark form -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Extract Watermark</h2>
      <form @submit.prevent="handleExtractWatermark" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Select Image</label>
          <input
            type="file"
            @change="handleExtractFileChange"
            accept="image/*"
            class="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Watermark Length</label>
          <input
            v-model="extractForm.watermarkLength"
            type="number"
            class="w-full p-2 border rounded"
            placeholder="Enter watermark length"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Image Password</label>
          <input
            v-model="extractForm.passwordImg"
            type="password"
            class="w-full p-2 border rounded"
            placeholder="Enter image password"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Watermark Password</label>
          <input
            v-model="extractForm.passwordWm"
            type="password"
            class="w-full p-2 border rounded"
            placeholder="Enter watermark password"
          />
        </div>
        <button
          type="submit"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Processing...' : 'Extract Watermark' }}
        </button>
      </form>

      <!-- Extract result display -->
      <div v-if="extractedWatermark" class="mt-4 p-4 bg-gray-100 rounded">
        <h3 class="font-medium mb-2">Extracted Watermark:</h3>
        <p>{{ extractedWatermark }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AxiosInstance } from 'axios';

const nuxtApp = useNuxtApp();
const http = nuxtApp.$http as AxiosInstance;

const createForm = ref({
  watermark: '',
  passwordImg: '',
  passwordWm: '',
  file: null as File | null
});

const extractForm = ref({
  watermarkLength: '',
  passwordImg: '',
  passwordWm: '',
  file: null
});

const isLoading = ref(false);
const extractedWatermark = ref('');

const handleFileChange = (event) => {
  createForm.value.file = event.target.files[0];
};

const handleExtractFileChange = (event) => {
  extractForm.value.file = event.target.files[0];
};

const handleCreateWatermark = async () => {
  try {
    isLoading.value = true;

    // Upload file first
    const formData = new FormData();
    formData.append('file', createForm.value.file!);

    const { data: uploadResponse } = await http.post('/api/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    const { key } = uploadResponse;

    // Create watermark
    const { data: watermarkResponse } = await WatermarkService.createWatermark({
      body: {
        fileKey: key,
        watermark: createForm.value.watermark,
      }
    });
    if (watermarkResponse && (watermarkResponse as any).watermarkLength > 0) {
      alert('Watermark added successfully!');
      // Reset form
      createForm.value = {
        watermark: '',
        passwordImg: '',
        passwordWm: '',
        file: null
      };
    } else {
      throw new Error('Failed to add watermark');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error occurred: ' + (error as Error).message);
  } finally {
    isLoading.value = false;
  }
};

const handleExtractWatermark = async () => {
  try {
    isLoading.value = true;

    // Upload file first
    const formData = new FormData();
    formData.append('file', extractForm.value.file!);

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
        watermarkLength: parseInt(extractForm.value.watermarkLength),
        passwordImg: +extractForm.value.passwordImg,
        passwordWm: +extractForm.value.passwordWm
      }
    });
    if (extractResponse) {
      extractedWatermark.value = extractResponse;
    } else {
      throw new Error('Failed to extract watermark');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error occurred: ' + (error as Error).message);
  } finally {
    isLoading.value = false;
  }
};
</script>
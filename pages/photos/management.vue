<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">My Photo Album</h1>

    <!-- Add Photo Button -->
    <div class="flex justify-end mb-4">
      <UButton type="primary"
               @click="openAddModal">
        Add Photo
      </UButton>
    </div>

    <!-- Waterfall Layout (Masonry style) -->
    <transition-group name="photo"
                      tag="div"
                      class="columns-1 sm:columns-2 lg:columns-3 gap-4">
      <div v-for="photo in photos"
           :key="photo.id"
           class="mb-4 break-inside-avoid">
        <UCard>
          <nuxt-link :to="`/photos/detail/${photo.id}`"
                     @click.native="active = photo.id">
            <NuxtImg :src="photo.url"
                     :alt="photo.description"
                     class="w-full cursor-pointer"
                     :class="{ active: active === photo.id }" />
          </nuxt-link>
          <div class="flex justify-between items-center mt-2">
            <p class="text-gray-600 text-sm truncate">
              {{ photo.description }}
            </p>
            <UButton type="error"
                     size="sm"
                     @click="deletePhoto(photo.id)">
              Delete
            </UButton>
          </div>
        </UCard>
      </div>
    </transition-group>

    <UPagination v-model="page"
                 :page-count="5"
                 :total="photos.length" />
  </div>
</template>

<script setup lang="ts">
import { GeoImageService } from '~/src/generated'

type Photo = { id: string, url: string, description: string }
const photos = ref<Photo[]>([])

const isAddModalOpen = ref(false)
const newPhotoUrl = ref('')
const newPhotoDesc = ref('')
const active = useState()
const page = ref(1)

// Simulate network request: fetch photos (using placeholder data)
const fetchPhotos = async () => {
  const { data } = await GeoImageService.findAllGeoImages({
    params: { page: page.value, limit: 10 }
  })

  console.log(data)
}

// Open/close modals
const openAddModal = () => {
  newPhotoUrl.value = ''
  newPhotoDesc.value = ''
  isAddModalOpen.value = true
}
const closeAddModal = () => {
  isAddModalOpen.value = false
}

// Simulate network request: add photo
const addPhoto = async () => {
  // In a real application, perform an API call to add the photo.
  const newPhoto = {
    id: Date.now().toString(), // Simple unique id
    url: newPhotoUrl.value || 'https://placehold.co/300?text=Uew+Photo',
    description: newPhotoDesc.value || 'Uew photo'
  }
  photos.value.unshift(newPhoto) // Add new photo at the beginning
  isAddModalOpen.value = false
}

// Simulate network request: delete photo
const deletePhoto = async (id: string) => {
  // In a real application, call your API to delete the photo.
  photos.value = photos.value.filter(photo => photo.id !== id)
}

// Fetch initial photos when the component mounts.
fetchPhotos()
</script>

<style scoped>
.photo-move,
.photo-enter-active,
.photo-leave-active {
  transition: all 0.5s ease;
}

.photo-enter-from,
.photo-leave-to {
  opacity: 0;
  transform: scale(0);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.photo-leave-active {
  position: absolute;
}


img.active {
  view-transition-name: selected-photo;
  contain: layout;
}

h1 {
  view-transition-name: header;
}
</style>

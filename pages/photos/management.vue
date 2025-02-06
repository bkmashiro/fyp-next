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

    <!-- Add Photo Modal -->
    <UModal v-model:show="isAddModalOpen"
            title="Add Photo">
      <div class="space-y-4 py-4">
        <UInput v-model="newPhotoUrl"
                placeholder="Photo URL"
                clearable />
        <UInput v-model="newPhotoDesc"
                placeholder="Description"
                clearable />
      </div>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <UButton @click="closeAddModal">Cancel</UButton>
          <UButton type="primary"
                   @click="addPhoto">Add</UButton>
        </div>
      </template>
    </UModal>

  </div>
</template>

<script setup lang="ts">
type Photo = { id: string, url: string, description: string }
const photos = ref<Photo[]>([])

const isAddModalOpen = ref(false)
const newPhotoUrl = ref('')
const newPhotoDesc = ref('')
const active = useState()

// Simulate network request: fetch photos (using placeholder data)
const fetchPhotos = async () => {
  // In a real application, replace this with an API call.
  photos.value = [
    {
      id: '1',
      url: 'https://placehold.co/300x200?text=Photo+1',
      description: 'Photo 1 description'
    },
    {
      id: '2',
      url: 'https://placehold.co/300x400?text=Photo+2',
      description: 'Photo 2 description'
    },
    {
      id: '3',
      url: 'https://placehold.co/300x250?text=Photo+3',
      description: 'Photo 3 description'
    },
    {
      id: '4',
      url: 'https://placehold.co/300x350?text=Photo+4',
      description: 'Photo 4 description'
    },
    {
      id: '5',
      url: 'https://placehold.co/300x300?text=Photo+5',
      description: 'Photo 5 description'
    }
  ]
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

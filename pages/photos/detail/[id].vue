<template>
  <div class="p-6 max-w-3xl mx-auto">
    <!-- Check if photo details have been loaded -->
    <h1 class="text-3xl font-bold mb-6">Photo Detail</h1>
    <div v-if="photo">
      <UCard class="mb-6">
        <NuxtImg :src="photo.url"
                 :alt="photo.description"
                 class="w-full" />
        <div class="p-4">
          <h2 class="text-2xl font-bold mb-2">Image Details</h2>
          <p class="text-gray-700">{{ photo.description }}</p>
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

// Simulate a network request to fetch photo details based on the ID.
const fetchPhotoDetails = async (id) => {
  // In a real app, you would replace this with an API call.
  // Simulate network delay.
  // await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    id,
    url: `https://placehold.co/600x400?text=Photo+${id}`,
    description: `This is the detailed description of Photo ${id}.`
  }
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
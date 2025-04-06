<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center gap-4">
            <UButton
              icon="i-heroicons-bars-3"
              color="gray"
              variant="ghost"
              @click="isSidebarOpen = !isSidebarOpen"
            />
            <NuxtLink to="/" class="flex items-center gap-2">
              <UIcon name="i-heroicons-map" class="text-2xl text-primary-500" />
              <span class="font-bold text-xl">GeoAR</span>
            </NuxtLink>
          </div>
          <div class="flex items-center">
            <UButton
              icon="i-heroicons-user-circle"
              color="gray"
              variant="ghost"
              to="/profile"
            >
              Profile
            </UButton>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex">
      <!-- Sidebar -->
      <aside
        class="fixed top-16 left-0 bg-white border-r transition-all duration-300 h-[calc(100vh-64px)] overflow-hidden"
        :class="[
          isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'
        ]"
      >
        <nav class="p-4 space-y-1 h-full overflow-y-auto">
          <NuxtLink
            v-for="link in navigationLinks"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 whitespace-nowrap"
            active-class="bg-primary-50 text-primary-600"
          >
            <UIcon :name="link.icon" class="text-lg" />
            <span :class="{ 'opacity-0': !isSidebarOpen }">{{ link.label }}</span>
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main Content -->
      <main
        class="flex-1 transition-all duration-300"
        :class="[isSidebarOpen ? 'ml-64' : 'ml-0']"
      >
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const isSidebarOpen = ref(true)

const navigationLinks = [
  {
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/dashboard'
  },
  {
    label: 'Cloud Anchors',
    icon: 'i-heroicons-map-pin',
    to: '/cloud-anchor/management'
  },
  {
    label: 'Comments',
    icon: 'i-heroicons-chat-bubble-left',
    to: '/comment/management'
  },
  {
    label: 'Photos',
    icon: 'i-heroicons-camera',
    to: '/photos/management'
  },
  {
    label: 'Labels',
    icon: 'i-heroicons-tag',
    to: '/label/management'
  },
  {
    label: 'Scenes',
    icon: 'i-heroicons-camera',
    to: '/scene'
  }
]
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style> 
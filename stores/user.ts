import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref<{
    id: string
    username: string
    // Add other user properties as needed
  } | null>(null)

  const setUser = (userData: any) => {
    user.value = userData
  }

  const clearUser = () => {
    user.value = null
  }

  return {
    user,
    setUser,
    clearUser
  }
}) 
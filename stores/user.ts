import { defineStore } from 'pinia'
import { ref } from 'vue'
import { AuthService } from '~/generated'

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

  // const validateAndFetchUser = async () => {
  //   try {
  //     const { data } = await AuthService.getCurrentUser()
  //     setUser(data)
  //     return true
  //   } catch (error) {
  //     clearUser()
  //     return false
  //   }
  // }

  return {
    user,
    setUser,
    clearUser,
    // validateAndFetchUser
  }
}) 
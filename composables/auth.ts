// composables/useAuth.ts
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core' // 你也可以使用 localStorage API

const token = ref(useLocalStorage('token', ''))

export function useAuth() {
  const setToken = (newToken: string) => {
    token.value = newToken
  }

  const getToken = () => {
    return token.value
  }

  const clearToken = () => {
    token.value = ''
  }

  const hasToken = () => {
    return !!token.value
  }

  return {
    token,
    setToken,
    getToken,
    clearToken,
    hasToken,
  }
}

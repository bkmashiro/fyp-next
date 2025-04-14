import { useUserStore } from '~/stores/user'
import { AuthService } from '~/generated'

export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()
  const { getToken } = useAuth()

  // 如果有 token，尝试获取用户信息
  if (getToken()) {
    try {
      const { data } = await AuthService.getProfile()
      userStore.setUser(data)
    } catch (error) {
      // token 无效，清除用户信息
      userStore.clearUser()
    }
  }
}) 
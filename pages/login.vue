<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <UCard class="w-full max-w-md p-8 space-y-6">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p class="mt-2 text-sm text-gray-600">Please sign in to your account</p>
      </div>
      
      <form @submit.prevent="onSubmit" class="space-y-4">
        <UFormGroup label="Username" name="username">
          <UInput
            v-model="loginForm.username"
            placeholder="Enter your username"
            :ui="{ base: 'w-full' }"
          />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput
            v-model="loginForm.password"
            type="password"
            placeholder="Enter your password"
            :ui="{ base: 'w-full' }"
          />
        </UFormGroup>

        <UButton
          type="submit"
          color="primary"
          block
          :loading="loading"
        >
          Sign in
        </UButton>
      </form>

      <div class="text-center text-sm">
        <NuxtLink to="/register" class="text-primary-600 hover:text-primary-500">
          Don't have an account? Sign up
        </NuxtLink>
      </div>
    </UCard>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})

import { ref } from 'vue'

const route = useRoute()
const router = useRouter()

const loginForm = ref({
  username: '',
  password: ''
})

const loading = ref(false)
const { setToken } = useAuth()

const onSubmit = async () => {
  loading.value = true
  try {
    const { access_token } = (await AuthService.login({
      body: loginForm.value,
      // throwOnError: true
    })).data

    if (!access_token) {
      useToast().add({
        title: 'Error',
        description: 'Login failed',
        color: 'red'
      })

      return
    }

    setToken(access_token)
    console.log('access_token', access_token)

    const toast = useToast()
    toast.add({
      title: 'Success',
      description: 'Login successful!',
      color: 'green',
      timeout: 3000
    })

    // 处理重定向
    const redirectTo = route.query.redirect?.toString() || '/dashboard'
    await router.push(redirectTo)
  } catch (error) {
    const toast = useToast()
    toast.add({
      title: 'Error',
      description: 'Wrong username or password',
      color: 'red',
      timeout: 3000
    })
  } finally {
    loading.value = false
  }
}
</script>

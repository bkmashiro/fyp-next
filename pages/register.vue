<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <UCard class="w-full max-w-md p-8 space-y-6">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900">Create an account</h1>
        <p class="mt-2 text-sm text-gray-600">Please fill in your details</p>
      </div>
      
      <form @submit.prevent="onSubmit" class="space-y-4">
        <UFormGroup label="Username" name="username">
          <UInput
            v-model="registerForm.username"
            placeholder="Choose a username"
            :ui="{ base: 'w-full' }"
          />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput
            v-model="registerForm.password"
            type="password"
            placeholder="Choose a password"
            :ui="{ base: 'w-full' }"
          />
        </UFormGroup>

        <UButton
          type="submit"
          color="primary"
          block
          :loading="loading"
        >
          Sign up
        </UButton>
      </form>

      <div class="text-center text-sm">
        <NuxtLink to="/login" class="text-primary-600 hover:text-primary-500">
          Already have an account? Sign in
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

const registerForm = ref({
  username: '',
  password: ''
})

const loading = ref(false)
const { setToken } = useAuth()

const onSubmit = async () => {
  loading.value = true
  try {
    const { access_token } = await UserService.register({
      body: registerForm.value,
      throwOnError: true
    })

    setToken(access_token)
    useToast().add({
      title: 'Success',
      description: 'Registration successful!',
      color: 'green'
    })

    // 处理重定向
    const redirectTo = route.query.redirect?.toString() || '/dashboard'
    await router.push(redirectTo)
  } catch (error) {
    useToast().add({
      title: 'Error',
      description: 'Failed to register',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="register-container">
    <el-card class="register-card">
      <h2 class="register-title">register</h2>
      <el-form :model="registerForm"
               :rules="rules"
               ref="registerFormRef">
        <el-form-item prop="username">
          <el-input v-model="registerForm.username"
                    placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password"
                    type="password"
                    placeholder="Password"
                    show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">register</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const registerForm = ref({
  username: '',
  password: ''
})

const registerFormRef = ref(null)

const rules = {
  username: [
    { required: true, message: 'Please enter your username', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please enter your password', trigger: 'blur' }
  ]
}

const { setToken } = useAuth()

const onSubmit = () => {
  registerFormRef.value.validate(async valid => {
    if (valid) {
      try {
        const { access_token } = await UserService.register({
          body: registerForm.value,
          throwOnError: true
        })

        setToken(access_token)

        ElMessage.success('register successful!')
      } catch (error) {
        ElMessage.error('Failed to register')
      }
    } else {
      ElMessage.error('Please complete the form correctly')
    }
  })
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.register-card {
  width: 400px;
  padding: 20px;
}

.register-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}
</style>

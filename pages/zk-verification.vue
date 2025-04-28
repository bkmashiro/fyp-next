<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <h1 class="text-4xl font-bold pb-8 text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
      Zero-Knowledge Copyright Verification
    </h1>

    <!-- Description Section -->
    <div class="mb-8 p-6 border rounded-lg shadow-lg bg-white">
      <div class="prose max-w-none">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">About This System</h2>
        <div class="space-y-4">
          <div class="grid grid-cols-[auto_1fr] gap-3">
            <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-600">
              <strong>Privacy-First Approach:</strong> Private and public keys are never uploaded to the system, ensuring complete anonymity of the copyright holder.
            </span>
            
            <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-600">
              <strong>Selective Disclosure:</strong> Verification can only check if a specific artwork belongs to a particular address, without revealing any additional information.
            </span>
            
            <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-gray-600">
              <strong>Irreversible Protection:</strong> Blockchain records cannot be used to reverse-engineer the artwork or identify the owner's address.
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Key Pair Management -->
    <div class="mb-8 p-6 border rounded-lg shadow-lg bg-white">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Key Pair Management</h2>
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row gap-4">
          <button @click="generateKeyPair"
                  class="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center"
                  :disabled="isGeneratingKeyPair">
            <span v-if="isGeneratingKeyPair" class="mr-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isGeneratingKeyPair ? 'Generating...' : 'Generate New Key Pair' }}
          </button>
          <input type="file"
                 accept=".json"
                 @change="handleKeyPairFile"
                 class="hidden"
                 ref="keyPairInput" />
          <button @click="() => keyPairInput?.click()"
                  class="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-all duration-300 flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            Import Key Pair
          </button>
        </div>
        <div v-if="keyPairError"
             class="mt-2 p-3 bg-red-50 text-red-600 rounded-lg">
          {{ keyPairError }}
        </div>
        <div v-if="keyPair"
             class="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-gray-700">Current Key Pair</h3>
            <button @click="downloadKeyPair"
                    class="text-blue-600 hover:text-blue-800 flex items-center">
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download JSON
            </button>
          </div>
          <div class="space-y-2">
            <div class="flex items-center group">
              <span class="text-gray-600 w-24">Address:</span>
              <span class="font-mono text-sm flex-1">{{ keyPair.address }}</span>
              <button @click="copyToClipboard(keyPair.address)"
                      class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500 hover:text-gray-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                </svg>
              </button>
            </div>
            <div class="flex items-center group">
              <span class="text-gray-600 w-24">Public Key:</span>
              <span class="font-mono text-sm flex-1">{{ keyPair.publicKey }}</span>
              <button @click="copyToClipboard(keyPair.publicKey)"
                      class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500 hover:text-gray-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Artwork Proof -->
    <div class="mb-8 p-6 border rounded-lg shadow-lg bg-white">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Create Artwork Proof</h2>
      <div class="space-y-4">
        <div class="flex flex-col gap-4">
          <div class="flex items-center">
            <input type="file"
                   @change="handleArtworkFile"
                   class="hidden"
                   ref="artworkInput" />
            <button @click="() => artworkInput?.click()"
                    class="flex-1 bg-blue-100 text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-200 transition-all duration-300 flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Select Artwork File
            </button>
            <span v-if="artworkFile"
                  class="text-gray-600 flex-1 truncate">
              {{ artworkFile.name }}
            </span>
          </div>
          <div v-if="artworkHash"
               class="p-3 bg-gray-50 rounded-lg">
            <label class="block text-sm font-medium text-gray-600 mb-1">File Hash</label>
            <p class="font-mono text-sm break-all">{{ artworkHash }}</p>
          </div>
          <div v-if="!keyPair" 
               class="p-3 bg-yellow-50 text-yellow-700 rounded-lg">
            Please generate or import a key pair first
          </div>
          <button @click="createProof"
                  class="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center"
                  :disabled="isCreatingProof || !keyPair || !artworkHash">
            <span v-if="isCreatingProof" class="mr-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isCreatingProof ? 'Creating...' : 'Create Proof' }}
          </button>
        </div>
        <div v-if="createProofError"
             class="p-3 bg-red-50 text-red-600 rounded-lg">
          {{ createProofError }}
        </div>
        <div v-if="proofResult"
             class="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-gray-700">Proof Result</h3>
            <button @click="downloadProofResult"
                    class="text-blue-600 hover:text-blue-800 flex items-center">
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download JSON
            </button>
          </div>
          <div class="space-y-2">
            <div class="flex items-center">
              <span class="text-gray-600 w-24">Owner:</span>
              <span class="font-mono text-sm">{{ proofResult.ownerAddress }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-600 w-24">Public Signal:</span>
              <span class="font-mono text-sm">{{ proofResult.publicSignals[0] }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-600 w-24">Protocol:</span>
              <span class="text-sm">{{ proofResult.proof.protocol }}</span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-600 w-24">Curve:</span>
              <span class="text-sm">{{ proofResult.proof.curve }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Verify Artwork Ownership -->
    <div class="mb-8 p-6 border rounded-lg shadow-lg bg-white">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Artwork Verification</h2>
      <div class="space-y-4">
        <div class="flex flex-col gap-4">
          <!-- 验证模式选择 -->
          <div class="flex items-center space-x-4">
            <label class="inline-flex items-center">
              <input type="radio" v-model="verifyMode" value="traditional" class="form-radio text-blue-600">
              <span class="ml-2">Blockchain Mode</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" v-model="verifyMode" value="zk" class="form-radio text-blue-600">
              <span class="ml-2">Zero-Knowledge Mode</span>
            </label>
          </div>

          <!-- Traditional Mode -->
          <div v-if="verifyMode === 'traditional'" class="space-y-4">
            <div class="flex items-center">
              <input type="file"
                     @change="handleVerifyArtworkFile"
                     class="hidden"
                     ref="verifyArtworkInput" />
              <button @click="() => verifyArtworkInput?.click()"
                      class="flex-1 bg-blue-100 text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-200 transition-all duration-300 flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Select Artwork File
              </button>
              <span v-if="verifyArtworkFile"
                    class="text-gray-600 flex-1 truncate">
                {{ verifyArtworkFile.name }}
              </span>
            </div>
            <div v-if="verifyArtworkHash"
                 class="p-3 bg-gray-50 rounded-lg">
              <label class="block text-sm font-medium text-gray-600 mb-1">File Hash</label>
              <p class="font-mono text-sm break-all">{{ verifyArtworkHash }}</p>
            </div>
          </div>

          <!-- Zero-Knowledge Mode -->
          <div v-if="verifyMode === 'zk'" class="space-y-4">
            <div class="flex items-center">
              <input type="file"
                     @change="handleCommitmentFile"
                     class="hidden"
                     ref="commitmentInput" />
              <button @click="() => commitmentInput?.click()"
                      class="flex-1 bg-blue-100 text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-200 transition-all duration-300 flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                Select Commitment
              </button>
              <span v-if="commitmentFile"
                    class="text-gray-600 flex-1 truncate">
                {{ commitmentFile.name }}
              </span>
            </div>
          </div>

          <!-- Owner Address (Optional) -->
          <div class="p-3 bg-gray-50 rounded-lg">
            <label class="block text-sm font-medium text-gray-600 mb-1">Owner Address (Optional)</label>
            <input v-model="ownerAddress"
                   type="text"
                   class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                   placeholder="Enter owner address to verify ownership" />
          </div>

          <button @click="verifyOwnership"
                  class="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center"
                  :disabled="isVerifying || (!verifyArtworkHash && !commitment)">
            <span v-if="isVerifying" class="mr-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isVerifying ? 'Verifying...' : 'Verify Ownership' }}
          </button>
        </div>
        <div v-if="verifyError"
             class="p-3 bg-red-50 text-red-600 rounded-lg">
          {{ verifyError }}
        </div>
        <div v-if="verificationResult"
             class="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 class="font-semibold mb-2 text-gray-700">Verification Result</h3>
          <div class="space-y-2">
            <div class="flex items-center">
              <span class="text-gray-600 w-24">Status:</span>
              <span :class="verificationResult.isValid ? 'text-green-600' : 'text-red-600'">
                {{ verificationResult.isValid ? 'Valid' : 'Invalid' }}
              </span>
              <span class="text-gray-500 text-sm ml-2">
                {{ verificationResult.isValid ? 'The proof is mathematically valid' : 'The proof is invalid or corrupted' }}
              </span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-600 w-24">Ownership:</span>
              <span :class="getOwnershipClass(verificationResult.isOwner)">
                {{ getOwnershipText(verificationResult.isOwner) }}
              </span>
              <span class="text-gray-500 text-sm ml-2">
                {{ getOwnershipExplanation(verificationResult.isOwner) }}
              </span>
            </div>
            <div class="flex items-center">
              <span class="text-gray-600 w-24">On Chain:</span>
              <span :class="getOnChainClass(verificationResult.hasOnChainRecord)">
                {{ getOnChainText(verificationResult.hasOnChainRecord) }}
              </span>
              <span class="text-gray-500 text-sm ml-2">
                {{ getOnChainExplanation(verificationResult.hasOnChainRecord) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AxiosInstance } from 'axios';
import { ethers } from 'ethers';

const nuxtApp = useNuxtApp();
const http = nuxtApp.$http as AxiosInstance;

// 密钥对相关状态
const keyPair = ref<any>(null)
const isGeneratingKeyPair = ref(false)
const keyPairError = ref('')
const keyPairInput = ref<HTMLInputElement | null>(null)

// 创建证明相关状态
const artworkFile = ref<File | null>(null)
const artworkHash = ref('')
const signature = ref('')
const isCreatingProof = ref(false)
const createProofError = ref('')
const proofResult = ref<any>(null)
const artworkInput = ref<HTMLInputElement | null>(null)

// 验证所有权相关状态
const verifyMode = ref<'traditional' | 'zk'>('traditional')
const verifyArtworkFile = ref<File | null>(null)
const verifyArtworkHash = ref('')
const commitmentFile = ref<File | null>(null)
const commitment = ref<any>(null)
const ownerAddress = ref('')
const isVerifying = ref(false)
const verifyError = ref('')
const verificationResult = ref<any>(null)
const verifyArtworkInput = ref<HTMLInputElement | null>(null)
const commitmentInput = ref<HTMLInputElement | null>(null)

// 生成密钥对
const generateKeyPair = async () => {
  try {
    isGeneratingKeyPair.value = true
    keyPairError.value = ''
    
    const { data } = await ZkService.generateKeyPair()
    keyPair.value = data
    
    // 保存到本地存储
    localStorage.setItem('zk-key-pair', JSON.stringify(data))
    
    // 下载密钥对
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `zk-key-pair-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (error) {
    keyPairError.value = error instanceof Error ? error.message : '生成密钥对失败'
  } finally {
    isGeneratingKeyPair.value = false
  }
}

// 处理密钥对文件上传
const handleKeyPairFile = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string)
        keyPair.value = json
        localStorage.setItem('zk-key-pair', JSON.stringify(json))
      } catch (error) {
        keyPairError.value = '无效的密钥对文件'
      }
    }
    reader.readAsText(file)
  }
}

// 处理艺术品文件上传
const handleArtworkFile = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    artworkFile.value = input.files[0]
    const formData = new FormData()
    formData.append('file', artworkFile.value)
    
    try {
      const { data } = await http.post('/api/zk/generate-keccak256-hash', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      artworkHash.value = data.hash
    } catch (error) {
      createProofError.value = error instanceof Error ? error.message : '计算哈希失败'
    }
  }
}

// 处理验证艺术品文件上传
const handleVerifyArtworkFile = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    verifyArtworkFile.value = input.files[0]
    const formData = new FormData()
    formData.append('file', verifyArtworkFile.value)
    
    try {
      const { data } = await http.post('/api/zk/generate-keccak256-hash', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      verifyArtworkHash.value = data.hash
    } catch (error) {
      verifyError.value = error instanceof Error ? error.message : '计算哈希失败'
    }
  }
}

// 处理承诺文件上传
const handleCommitmentFile = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    commitmentFile.value = input.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        commitment.value = JSON.parse(e.target?.result as string)
      } catch (error) {
        verifyError.value = 'Invalid commitment file'
      }
    }
    reader.readAsText(commitmentFile.value)
  }
}

// 创建艺术品证明
const createProof = async () => {
  try {
    isCreatingProof.value = true
    createProofError.value = ''
    
    // 使用私钥对作品哈希进行签名
    const wallet = new ethers.Wallet(keyPair.value.privateKey)
    const signature = await wallet.signMessage(artworkHash.value)
    
    const { data } = await ZkService.createArtworkProof({
      body: {
        artworkHash: artworkHash.value,
        signature: signature
      }
    })
    
    proofResult.value = data
    
    // 清空表单
    artworkFile.value = null
    artworkHash.value = ''
  } catch (error) {
    createProofError.value = error instanceof Error ? error.message : '创建证明失败'
  } finally {
    isCreatingProof.value = false
  }
}

// 获取所有权状态文本
const getOwnershipText = (isOwner: boolean | string) => {
  if (typeof isOwner === 'string') {
    return 'Not Verified'
  }
  return isOwner ? 'Owner' : 'Not Owner'
}

// 获取所有权状态样式类
const getOwnershipClass = (isOwner: boolean | string) => {
  if (typeof isOwner === 'string') {
    return 'text-gray-600'
  }
  return isOwner ? 'text-green-600' : 'text-red-600'
}

// 获取所有权解释文本
const getOwnershipExplanation = (isOwner: boolean | string) => {
  if (typeof isOwner === 'string') {
    return 'Ownership verification was not requested'
  }
  return isOwner ? 'The provided address is the owner of this artwork' : 'The provided address is not the owner of this artwork'
}

// 获取链上状态文本
const getOnChainText = (hasOnChainRecord: boolean | string) => {
  if (hasOnChainRecord === 'unknown') {
    return 'Unknown'
  }
  return hasOnChainRecord ? 'Recorded' : 'Not Recorded'
}

// 获取链上状态样式类
const getOnChainClass = (hasOnChainRecord: boolean | string) => {
  if (hasOnChainRecord === 'unknown') {
    return 'text-gray-600'
  }
  return hasOnChainRecord ? 'text-green-600' : 'text-red-600'
}

// 获取链上状态解释文本
const getOnChainExplanation = (hasOnChainRecord: boolean | string) => {
  if (hasOnChainRecord === 'unknown') {
    return 'Chain status is not available in zero-knowledge mode'
  }
  return hasOnChainRecord ? 'The proof has been recorded on the blockchain' : 'The proof has not been recorded on the blockchain'
}

// 验证艺术品所有权
const verifyOwnership = async () => {
  try {
    isVerifying.value = true
    verifyError.value = ''
    
    const requestData: any = {
      ownerAddress: ownerAddress.value || undefined
    }

    if (verifyMode.value === 'traditional') {
      requestData.artworkHash = verifyArtworkHash.value
    } else {
      requestData.onChainRecord = commitment.value
    }
    
    const { data } = await ZkService.verifyArtworkOwnership({
      body: requestData
    })
    
    verificationResult.value = data
  } catch (error) {
    verifyError.value = error instanceof Error ? error.message : 'Verification failed'
  } finally {
    isVerifying.value = false
  }
}

// 从本地存储加载密钥对
onMounted(() => {
  const savedKeyPair = localStorage.getItem('zk-key-pair')
  if (savedKeyPair) {
    try {
      keyPair.value = JSON.parse(savedKeyPair)
    } catch (error) {
      keyPairError.value = '加载保存的密钥对失败'
    }
  }
})

// 复制到剪贴板
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // 可以添加一个短暂的提示
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

// 下载密钥对
const downloadKeyPair = () => {
  if (!keyPair.value) return
  
  const blob = new Blob([JSON.stringify(keyPair.value, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `zk-key-pair-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// 下载证明结果
const downloadProofResult = () => {
  if (!proofResult.value) return
  
  const blob = new Blob([JSON.stringify(proofResult.value, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `proof-result-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>
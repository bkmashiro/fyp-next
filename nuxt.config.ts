// https://nuxt.com/docs/api/configuration/nuxt-config
import commonjs from 'vite-plugin-commonjs'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['element-plus/dist/index.css', '@fast-crud/fast-crud/dist/style.css'],

  // build: {
  //   transpile: ["@fast-crud/ui-interface"],
  // },
  vite: {
    plugins: [commonjs()],
    server: {
      proxy: {
        '/api': {
          target: process.env.API_BASE_URL || 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  },

  imports: {
    autoImport: true,
    dirs: [
      './composables',
      './utils',
      './components',
      './generated/**/services.gen.ts',
    ],
  },

  ssr: false,
  modules: [
    '@element-plus/nuxt',
    '@nuxt/ui',
    '@nuxt/image',
    '@pinia/nuxt'
  ],
  experimental: {
    viewTransition: true,
  },

  // UI Theme Configuration
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: ''
  },

  // Runtime Config
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://v1.fyp.yuzhes.com'
    }
  }
})

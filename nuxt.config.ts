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
          target: 'http://localhost:3001', 
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  },

  imports: {
    autoImport: true,
    dirs: ['./composables', './utils', './components', './generated/**/services.gen.ts'],
  },

  ssr: false,
  modules: ['@nuxtjs/tailwindcss', '@element-plus/nuxt'],
})

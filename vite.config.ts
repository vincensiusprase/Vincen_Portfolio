import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api/chat': {
              target: 'https://integrate.api.nvidia.com',
          changeOrigin: true,
              rewrite: () => '/v1/chat/completions',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
                  if (env.NVIDIA_API_KEY) {
                    proxyReq.setHeader('Authorization', `Bearer ${env.NVIDIA_API_KEY}`)
              }
            })
          },
        },
      },
    },
  }
})
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/chat': {
          target: 'https://api.z.ai',
          changeOrigin: true,
          rewrite: () => '/api/paas/v4/chat/completions',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (env.GLM_API_KEY) {
                proxyReq.setHeader('Authorization', `Bearer ${env.GLM_API_KEY}`)
              }
            })
          },
        },
      },
    },
  }
})

import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Serves the Vercel functions in /api during `npm run dev`, so the AI terminal
// works locally without the Vercel CLI. Production uses Vercel's own runtime.
function apiDevServer() {
  return {
    name: 'api-dev-server',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const match = req.url?.split('?')[0].match(/^\/api\/([\w-]+)\/?$/)
        if (!match) return next()

        const file = resolve(server.config.root, 'api', `${match[1]}.js`)
        if (!existsSync(file)) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ error: 'Not found.' }))
        }

        try {
          const { default: handler } = await server.ssrLoadModule(file)
          await handler(req, res)
        } catch (err) {
          server.config.logger.error(err?.stack || String(err))
          if (!res.headersSent) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
          }
          res.end(JSON.stringify({ error: 'Dev API handler crashed; see the terminal.' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load server-only secrets from .env for the dev API. They are not VITE_
  // prefixed, so they never reach the browser bundle.
  const env = loadEnv(mode, process.cwd(), '')
  for (const key of ['GROQ_API_KEY', 'GROQ_MODEL']) {
    if (env[key] && !process.env[key]) process.env[key] = env[key]
  }

  return {
    plugins: [react(), apiDevServer()],
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['react', 'react-dom'],
            'animations': ['framer-motion'],
            'ui': ['lucide-react', 'react-icons'],
          }
        }
      }
    },
    server: {
      port: 3001,
      strictPort: false,
    }
  }
})

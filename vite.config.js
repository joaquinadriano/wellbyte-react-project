import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** 1×1 transparent PNG — Chrome still probes /favicon.ico; serve this so it won’t reuse an old cached icon. */
const FAVICON_ICO_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO2p4JkAAAAASUVORK5CYII=',
  'base64',
)

function faviconIcoNoStore() {
  return {
    name: 'favicon-ico-transparent',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0]
        if (path === '/favicon.ico') {
          res.setHeader('Content-Type', 'image/png')
          res.setHeader('Cache-Control', 'no-store')
          res.end(FAVICON_ICO_PNG)
          return
        }
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0]
        if (path === '/favicon.ico') {
          res.setHeader('Content-Type', 'image/png')
          res.setHeader('Cache-Control', 'no-store')
          res.end(FAVICON_ICO_PNG)
          return
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), faviconIcoNoStore()],
})

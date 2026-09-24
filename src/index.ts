import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import checkCache from './handler'
import docsPage from './docs'

// Mock Cloudflare global caches
if (typeof globalThis.caches === 'undefined') {
  (globalThis as any).caches = {
    default: {
      match: async () => null,
      put: async () => {},
      delete: async () => false
    }
  }
}

const app = new Hono()

app.get('/', (c) => docsPage())

app.all('*', async (c) => {
  return await checkCache(c.req.raw)
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
  hostname: '0.0.0.0'
})

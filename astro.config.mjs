import { defineConfig } from 'astro/config'

// https://astro.build/config
import vercel from '@astrojs/vercel/edge'

// https://astro.build/config
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    includeFiles: ['./src/pages/api/advice.json.ts'],
  }),
  integrations: [react()],
})

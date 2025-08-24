/// <reference types="node" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GH Pages met la variable d'env GITHUB_ACTIONS à 'true'
const isGhPages = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Base conditionnelle : GitHub Pages vs Vercel/local
  base: isGhPages ? '/livre-emergence-des-dao/' : '/',
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuração mínima do Vite para transformar JSX e habilitar Fast Refresh.
export default defineConfig({
  plugins: [react()],
})
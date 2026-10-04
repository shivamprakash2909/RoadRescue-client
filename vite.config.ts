import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function getEnvValue(key: string, defaultValue: string): string {
  try {
    const envPath = path.resolve(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed.startsWith(`${key}=`)) {
          return trimmed.substring(`${key}=`.length).trim();
        }
      }
    }
  } catch (e) {
    // fallback
  }
  return defaultValue;
}

const apiBaseUrl = getEnvValue('VITE_API_BASE_URL', 'http://localhost:8080');

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(apiBaseUrl),
  },
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: apiBaseUrl,
        changeOrigin: true,
      },
      '/ws': {
        target: apiBaseUrl,
        ws: true,
        changeOrigin: true,
      },
    },
  },
});

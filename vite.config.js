import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
  ],
  transpileDependencies: ['uview-ui'],
  base: './',
  publicPath: './',
  server: {
    proxy: {
      '/api': {
        "target" : "",
        changeOrigin: true
      }
    }
  },
 
})

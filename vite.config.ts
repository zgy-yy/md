import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from 'url'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        open: true,//启动项目自动弹出浏览器
        host: '0.0.0.0',
        port: 1133,//启动端口
        proxy: {
            '/host': {
                // target: 'https://api.kkiik.com',	//实际请求地址
                target: 'https://yuwhuxuw.com',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/host/, '')
            },
            '/imgHost': {
                target: 'https://mdmdimg.beiying.art',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/imgHost/, '')
            }
        }
    }
})

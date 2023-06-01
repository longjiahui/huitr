import App from './App.vue'
import { isDev } from './const'
import './style.scss'
import HuitrPlugin from '@/index'
import plugins from '@/scripts/plugins'
import { createApp } from 'vue'

const app = createApp(App)

app.use(plugins)

const module = isDev
    ? import.meta.glob('@/index')
    : import.meta.glob('../dist/huitr.js')

;(async () => {
    const [{ default: huitr }] = (await Promise.all(
        Object.keys(module).map((k: keyof typeof module) => module[k]()),
    )) as [{ default: typeof HuitrPlugin }]
    app.use(huitr())
})().finally(() => {
    app.mount('#app')
})

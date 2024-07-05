import { createApp } from 'vue'
import { Lazyload, Notify } from 'vant'
import App from './App.vue'
import router from '@/router'
import 'virtual:uno.css'
import '@/styles/app.less'
import 'vant/es/notify/style'
import 'vant/es/toast/style'
import { setupPinia } from '@/stores'

const app = createApp(App)
app.use(router)

// 全局挂载pinia
setupPinia(app)

// 注册时可以配置额外的选项
app.use(Lazyload, {
  lazyComponent: true,
})
app.use(Notify)

app.mount('#app')

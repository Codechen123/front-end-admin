import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from './stores/axios'; // 导入 Axios 实例

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(axios)

app.mount('#app')

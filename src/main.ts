import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const app=createApp(App)

import "./permission"

//引入样式
import "./styles/index.scss"
//注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(store).mount('#app')

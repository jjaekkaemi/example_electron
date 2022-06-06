import { createApp } from 'vue'
import App from './App.vue'
import { ipcRenderer } from './vue/ipcrenderer'
const app = createApp(App)
app.use(ipcRenderer)
app.mount('#app')

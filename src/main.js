import { createApp } from "vue";
import App from "./App.vue";
import { ipcrenderer, send } from "./vue/ipcrenderer";
const app = createApp(App);
app.use(ipcrenderer);
app.use(send);
app.mount("#app");

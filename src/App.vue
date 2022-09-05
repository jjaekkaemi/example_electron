<template>
  <div class="titlebar">hello</div>
  <button type="button" @click="hidebuttonClick"></button>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Main v-if="main" :msg="list" />
  <Clipboard v-else :msg="list" />
</template>

<script>
import { ipcRenderer, send_hide } from "./vue/ipcrenderer";
import Clipboard from "./components/Clipboard.vue";
import Main from "./components/Main.vue";
export default {
  name: "App",
  components: {
    Clipboard,
    Main,
  },
  mounted() {
    ipcRenderer.on("open-clipboard", (event, arg) => {
      console.log(arg); // "pong"이 출력됩니다.
      this.list = arg;
      this.main = false;
    });
    ipcRenderer.on("close-clipboard", (event, arg) => {
      console.log(arg); // "pong"이 출력됩니다.
      this.list = arg;
      this.main = true;
    });
    ipcRenderer.on("get-db", (event, arg) => {
      console.log(arg); // "pong"이 출력됩니다.
      this.list = arg;
    });
  },
  methods: {
    hidebuttonClick() {
      send_hide(true);
    },
  },
  data() {
    return {
      list: "Sfsfd",
      main: true,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

.titlebar-button {
  -webkit-app-region: no-drag;
}
</style>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld :msg="list" />
  <button type="button" @click="buttonClick()" />
</template>

<script>
import { send, ipcRenderer } from "./vue/ipcrenderer";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  mounted() {
    ipcRenderer.on("asynchronous-reply", (event, arg) => {
      console.log(arg); // "pong"이 출력됩니다.
      this.list = arg;
    });
  },
  methods: {
    buttonClick() {
      send();
    },
  },
  data() {
    return {
      list: [],
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
</style>

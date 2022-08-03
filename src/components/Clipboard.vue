<template>
  <h1>Clipboard</h1>
  <div v-for="(data, idx) in msg" :key="idx" @click="listClick(data)">
    {{ data }}
  </div>
</template>

<script>
import { ipcSend } from "../vue/ipcrenderer";
export default {
  props: {
    msg: String,
  },
  methods: {
    listClick(data) {
      console.log(data.id, data.value);
      ipcSend(data.value);
    },
  },
};
</script>

<style>
</style>
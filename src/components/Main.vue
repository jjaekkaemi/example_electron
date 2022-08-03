<template>
  <h1>Main</h1>
  <Home v-if="home" />
  <Setting v-else />
</template>

<script>
import Home from "./Home.vue";
import Setting from "./Setting.vue";
export default {
  components: {
    Home,
    Setting,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      home: true,
    };
  },
};
</script>

<style>
</style>
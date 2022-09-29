<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <el-button type="primary" @click="open">按钮</el-button>
  </div>
  <router-view />
</template>
<script lang="ts">
import {ElMessage} from "element-plus"
export default {
  setup() {
    const open = () => {
      ElMessage("this is a message.");
    };
    return { open };
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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

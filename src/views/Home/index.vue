<template>
  首页
  <el-button type="primary" @click="handleClick">请求</el-button>
</template>

<script lang="ts" setup>
import { useStore, mapGetters } from "vuex";
import { computed } from "vue";
import { ElMessage } from "element-plus";
// const store = useStore();
// const users = computed(mapGetters(["token"]).token.bind({ $store: store }));
const handleClick = () => {
  ElMessage("this is a message.");
};
</script>

<style>
</style>
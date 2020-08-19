<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <!-- exclude解除对detail.vue的保持keepalive -->
    <keep-alive exclude="detail">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import MainTabBar from "@/components/content/mainTabbar/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import "./assets/css/base.css";
</style>

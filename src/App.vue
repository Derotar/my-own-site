<script setup lang="ts">
import Layout from "./components/Layout.vue";
import Banner from "./components/Banner.vue";
import Work from "./components/Work.vue";
</script>

<template>
  <Layout>
    <Banner></Banner>
    <Work></Work>
    <div class="h-[400vh]"></div>
  </Layout>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

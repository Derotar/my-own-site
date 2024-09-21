<script setup lang="ts">
import Header from "../components/nav/Header.vue";
import Footer from "../components/nav/Footer.vue";
</script>

<template>
  <div class="min-h-screen w-full flex flex-col max-w-[1440px] mx-auto">
    <Header></Header>
    <main class="flex-grow mt-[90px]">
      <slot />
    </main>
    <Footer></Footer>
  </div>
</template>

<style lang="scss" scoped></style>

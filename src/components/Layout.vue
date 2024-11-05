<script setup lang="ts">
import Header from "../components/nav/Header.vue";
import Footer from "../components/nav/Footer.vue";
import { useWindowScroll } from "../composables/useWindowScroll";
import FloatingItem from "./base/FloatingItem.vue";

const { y } = useWindowScroll();

const handleScrollDown = () => {
  console.log("scrolling");
  window.scrollBy({ top: window.innerHeight, left: 0, behavior: "smooth" });
};
</script>

<template>
  <div class="min-h-screen w-full flex flex-col">
    <Transition name="fade-in">
      <Header v-if="y > 100" class="max-w-[1440px] mx-auto"></Header>
    </Transition>

    <FloatingItem class="fixed bottom-[100px] left-[50%]">
      <button
        class="border-own-white border-[2px] w-10 h-10 rounded-full flex items-center justify-center"
        @click="handleScrollDown"
      >
        <i class="material-icons">arrow_downward</i>
      </button>
    </FloatingItem>

    <main class="flex-grow">
      <slot />
    </main>
    <Footer class="max-w-[1440px] mx-auto"></Footer>
  </div>
</template>

<style lang="scss" scoped></style>

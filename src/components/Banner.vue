<script setup lang="ts">
//@ts-ignore
import SpinSvg from "../assets/svg/spin.svg?component";
import { useWindowScroll } from "../composables/useWindowScroll";

const { x, y } = useWindowScroll();
</script>

<template>
  <section
    id="banner"
    class="w-full max-w-[1440px] mx-auto h-[calc(100vh-90px)] flex items-center justify-center"
  >
    <div class="grid grid-cols-2 lg:gap-10">
      <div class="flex flex-col mt-20">
        <h1 class="text-[72px] font-bold text-own-light-green">Hi, I'm Egor</h1>
        <p class="text-[18px] font-bold text-own-light-green fading-in">
          I am a Frontend Developer. Working Vue 3 & Nuxt 3 creating Dapps for
          EVM like chains (ETH, BNB, Polygon). Currently i'm working at
          gotbit.io. Creating staking, vesting, NFT marketplaces, IDO launchpads
        </p>
      </div>

      <div class="flex flex-col items-center gap-5">
        <div class="relative w-[400px] h-[400px]">
          <img
            class="w-full shrink-0 rounded-full border-[4px] border-white drop-shadow-2xl grayscale"
            src="/photo.jpg"
            alt="photo"
          />
          <div
            class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[400px] h-[400px]"
          >
            <SpinSvg
              class="w-full h-full text-own-white"
              :style="`transform: rotate(${0.1 * y}deg)`"
            />
          </div>

          <div
            class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[500px] h-[500px]"
          >
            <SpinSvg
              class="w-full h-full text-own-blue"
              :style="`transform: rotate(${-0.1 * y}deg)`"
            />
          </div>

          <div
            class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[600px] h-[600px]"
          >
            <SpinSvg
              class="w-full h-full text-own-gold"
              :style="`transform: rotate(${0.2 * y}deg)`"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fading-in {
  opacity: 0;
  animation: fade-in 2s forwards;
}
</style>

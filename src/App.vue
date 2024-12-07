<script setup lang="ts">
import Layout from "./components/Layout.vue";
import Banner from "./components/Banner.vue";
import Work from "./components/Work.vue";

const handleInputChange = (e: Event) => {
  document.documentElement.style.setProperty(
    "--shadow-size",
    (e.target as HTMLInputElement).value + "px"
  );

  console.log(
    window.getComputedStyle(document.body).getPropertyValue("--shadow-size")
  );
};
</script>

<template>
  <Layout>
    <Banner></Banner>
    <Work></Work>
    <div class="h-[400vh]"></div>
    <div class="fixed bottom-0 right-0 bg-[red] p-10 z-[9999]">
      <input type="range" @input="handleInputChange" min="1" max="20" />
    </div>
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

/* Стилизуем внешний вид ползунка */
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  background: #ddd;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

/* Стилизуем ползунок */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: blue;
  cursor: pointer;
}

input[type="range"]:hover {
  opacity: 1;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: green;
  cursor: pointer;
}
</style>

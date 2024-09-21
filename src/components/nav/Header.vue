<script setup lang="ts"></script>

<template>
  <header
    class="border-b-own-gold border-b-[1px] w-full mx-auto fixed z-50 top-0 max-w-[1440px] h-[90px] min-h-[90px] max-h-[90px] flex justify-between items-center bg-own-bg"
  >
    <div class="flex items-center gap-1">
      <img
        src="/logo.webp"
        alt="logo"
        class="h-[80px] w-[80px] flex-grow-0 flex-shrink-0"
      />
      <p class="text-own-white lowercase font-semibold text-[24px]">
        curly dev
      </p>
    </div>

    <nav>
      <ul class="flex items-center gap-2">
        <li>
          <a href="#contacts">Contacts</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#work">Work</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped></style>

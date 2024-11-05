<script setup lang="ts"></script>

<template>
  <div class="floating-container w-min h-min">
    <div class="floating">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.floating {
  animation: floating 2s ease-in-out infinite;
}

.floating-container {
  /* animation: container-appear 2s cubic-bezier(0.48, 0.56, 0.49, 1.95) forwards; */
  transform-origin: center;
}

@keyframes container-appear {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes floating {
  from {
    -webkit-transform: translate(0, 0px);
  }
  65% {
    -webkit-transform: translate(0, 5px);
  }
  to {
    -webkit-transform: translate(0, -0px);
  }
}
</style>

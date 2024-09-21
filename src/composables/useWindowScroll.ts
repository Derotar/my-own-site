import { onMounted, onUnmounted, ref } from "vue";

export const useWindowScroll = () => {
  const x = ref(0);
  const y = ref(0);

  const onScroll = () => {
    y.value = window.scrollY;
    x.value = window.scrollX;
  };
  onMounted(() => {
    window.addEventListener("scroll", onScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
  });

  return { x, y };
};

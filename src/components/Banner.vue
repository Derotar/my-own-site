<script setup lang="ts">
//@ts-ignore
import SpinSvg from "../assets/svg/spin.svg?component";
import { useWindowScroll } from "../composables/useWindowScroll";
// import FloatingItem from "./base/FloatingItem.vue";
import DocumentIcon from "../assets/svg/contacts/document.svg";
import TelegramIcon from "../assets/svg/contacts/telegram.svg";
import WhatsappIcon from "../assets/svg/contacts/whatsapp.svg";
import FloatingItem from "./base/FloatingItem.vue";
import { onMounted, ref } from "vue";

const { x, y } = useWindowScroll();

const SQUARE_CLOSE_TIME = 500000; // when square close in ms
const ROWS = 20;
const COLS = 30;
const squares = new Array(ROWS * COLS).fill(false);

function getSquareByIndex(index: number) {
  return document.querySelector(
    `*[data-number="${index}"]`
  ) as HTMLElement | null;
}

function isRightBlockAvaliable(index: number) {
  const currentRow = Math.floor(index / COLS);

  const isAvailable = index < currentRow * COLS + COLS - 1;
  if (!isAvailable) return { isAvailable, isOpened: false };
  return { isAvailable, isOpened: squares[index + 1] };
}

function isLeftBlockAvailable(index: number) {
  const currentRow = Math.floor(index / COLS);

  const isAvailable = index > currentRow * COLS;
  if (!isAvailable) return { isAvailable, isOpened: false };
  return { isAvailable, isOpened: squares[index - 1] };
}

function isTopBlockAvailable(index: number) {
  const isAvailable = index - COLS >= 0;
  if (!isAvailable) return { isAvailable, isOpened: false };
  return { isAvailable, isOpened: squares[index - COLS] };
}

function isBottomBlockAvailable(index: number) {
  const isAvailable = index + COLS <= squares.length - 1;
  if (!isAvailable) return { isAvailable, isOpened: false };
  return { isAvailable, isOpened: squares[index + COLS] };
}

function getFlipCardBottom(el: HTMLElement) {
  return el.querySelector(".flip-card-bottom") as HTMLElement | null;
}

onMounted(() => {
  const gridBg = document.querySelector(".grid-bg") as HTMLElement | null;
  if (!gridBg) return;
});

const onOpenCard = (index: number) => {
  squares[index] = true;
  const square = getSquareByIndex(index);
  if (!square) return;

  //check if there element above and it is not opened, if yes add shadow
  if (
    isTopBlockAvailable(index).isAvailable &&
    !isTopBlockAvailable(index).isOpened
  ) {
    getFlipCardBottom(square)?.classList.add("shadow-top");
  }
  //check if there element under and it is opened, then remove it shadow-top
  if (
    isBottomBlockAvailable(index).isAvailable &&
    isBottomBlockAvailable(index).isOpened
  ) {
    const underSquare = getSquareByIndex(index + COLS);
    if (underSquare) {
      getFlipCardBottom(underSquare)?.classList.remove("shadow-top");
    }
  }

  //check if there element to the left, and if it is not opened to add shadow-left
  if (
    isLeftBlockAvailable(index).isAvailable &&
    !isLeftBlockAvailable(index).isOpened
  ) {
    getFlipCardBottom(square)?.classList.add("shadow-left");
  }

  //check if there element to the right, and if it is opened to remove it shadow-left
  if (
    isRightBlockAvaliable(index).isAvailable &&
    isRightBlockAvaliable(index).isOpened
  ) {
    const rightSquare = getSquareByIndex(index + 1);
    if (rightSquare) {
      getFlipCardBottom(rightSquare)?.classList.remove("shadow-left");
    }
  }

  // there is diagonal shadow case
  // 3 cases:
  // 1. square is right to closed block that will do diagonal shadwo
  // 2. square is bottom to closed block that will do diagonal shadow
  // 3. square is right-bottom to closed block that will do diagonal shadow

  //lets add helpers

  //1 case: right block

  if (
    isLeftBlockAvailable(index).isAvailable &&
    !isLeftBlockAvailable(index).isOpened &&
    isBottomBlockAvailable(index - 1).isAvailable &&
    isBottomBlockAvailable(index - 1).isOpened &&
    isBottomBlockAvailable(index).isAvailable &&
    isBottomBlockAvailable(index).isOpened
  ) {
    const bottomSquare = getSquareByIndex(index + COLS);
    if (bottomSquare) {
      getFlipCardBottom(bottomSquare)?.classList.add("shadow-diagonal");
    }
  }

  // 2 case: bottom block

  if (
    isTopBlockAvailable(index).isAvailable &&
    !isTopBlockAvailable(index).isOpened &&
    isRightBlockAvaliable(index).isAvailable &&
    isRightBlockAvaliable(index).isOpened &&
    isRightBlockAvaliable(index - COLS).isAvailable &&
    isRightBlockAvaliable(index - COLS).isOpened
  ) {
    const rightSquare = getSquareByIndex(index + 1);
    if (rightSquare) {
      getFlipCardBottom(rightSquare)?.classList.add("shadow-diagonal");
    }
  }

  // 3 case: right-bottom diagonal block
  if (
    isTopBlockAvailable(index).isAvailable &&
    isTopBlockAvailable(index).isOpened &&
    isLeftBlockAvailable(index).isAvailable &&
    isLeftBlockAvailable(index).isOpened &&
    isTopBlockAvailable(index - 1).isAvailable &&
    !isTopBlockAvailable(index - 1).isOpened
  ) {
    getFlipCardBottom(square)?.classList.add("shadow-diagonal");
  }

  // check if square opening and right-bottom-diagonal is open
  if (
    isRightBlockAvaliable(index).isAvailable &&
    isRightBlockAvaliable(index).isOpened &&
    isBottomBlockAvailable(index).isAvailable &&
    isBottomBlockAvailable(index).isOpened &&
    isBottomBlockAvailable(index + 1).isAvailable &&
    isBottomBlockAvailable(index + 1).isOpened
  ) {
    const rightBottomDiagonalSquare = getSquareByIndex(index + COLS + 1);
    if (rightBottomDiagonalSquare) {
      getFlipCardBottom(rightBottomDiagonalSquare)?.classList.remove(
        "shadow-diagonal"
      );
    }
  }
};

const onCloseCard = (index: number) => {
  squares[index] = false;
  const square = document.querySelector(
    `*[data-number="${index}"]`
  ) as HTMLElement | null;
  if (!square) return;

  getFlipCardBottom(square)?.classList.remove(
    "shadow-top",
    "shadow-left",
    "shadow-diagonal"
  );

  if (
    isBottomBlockAvailable(index).isAvailable &&
    isBottomBlockAvailable(index).isOpened
  ) {
    const underSquare = getSquareByIndex(index + COLS);
    if (underSquare) {
      getFlipCardBottom(underSquare)?.classList.add("shadow-top");
    }
  }

  if (
    isRightBlockAvaliable(index).isAvailable &&
    isRightBlockAvaliable(index).isOpened
  ) {
    const rightSquare = getSquareByIndex(index + 1);
    if (rightSquare) {
      getFlipCardBottom(rightSquare)?.classList.add("shadow-left");
    }
  }

  // if (index + 10 <= squares.length - 1) {
  //   const underSquare = document.querySelector(
  //     `*[data-number="${index + 10}"]`
  //   );
  //   if (underSquare) {
  //     if (squares[index + 10]) {
  //       (underSquare as HTMLElement).classList.add("border-t");
  //     }
  //   }
  // }

  // if (index - 10 >= 0) {
  //   const topSquare = document.querySelector(`*[data-number="${index - 10}"]`);
  //   if (topSquare) {
  //     if (squares[index - 10]) {
  //       // (topSquare as HTMLElement).classList.add("border-b");
  //       square.classList.add("shadow-top");
  //     }
  //   }
  // }

  // if (index - 1 >= 0) {
  //   const leftSquare = document.querySelector(`*[data-number="${index - 1}"]`);
  //   if (leftSquare) {
  //     if (squares[index - 1]) {
  //       (leftSquare as HTMLElement).classList.add("border-r");
  //     }
  //   }
  // }

  // if (index + 1 <= squares.length - 1) {
  //   const rightSquare = document.querySelector(`*[data-number="${index + 1}"]`);
  //   if (rightSquare) {
  //     if (squares[index + 1]) {
  //       (rightSquare as HTMLElement).classList.add("border-l");
  //     }
  //   }
  // }
};

onMounted(() => {
  const gridBg = document.querySelector(".grid-bg");
  if (!gridBg) return;

  gridBg.addEventListener("mouseover", (e) => {
    const target = e.target;
    if (!target) return;
    const div = (target as HTMLElement).closest(".flip-card");
    if (!div) return;
    div.classList.add("flipped");
    const i = div.getAttribute("data-number");
    if (!i) return;
    onOpenCard(Number(i));
  });

  gridBg.addEventListener("mouseout", (e) => {
    console.log("mouseout");
    const target = e.target;
    if (!target) return;
    const div = (target as HTMLElement).closest(".flip-card");
    if (!div) return;
    setTimeout(() => {
      div.classList.remove("flipped");
      div.removeAttribute("data-opened");
      const i = div.getAttribute("data-number");
      if (!i) return;
      onCloseCard(Number(i));
    }, SQUARE_CLOSE_TIME);
  });
});
</script>

<template>
  <section
    id="banner"
    class="w-full h-screen flex items-center justify-center px-[100px] relative"
  >
    <div
      class="absolute inset-0 grid grid-bg z-20 overflow-hidden"
      :style="`grid-template-rows: repeat(${ROWS}, 1fr); grid-template-columns: repeat(${COLS}, 1fr);`"
    >
      <div
        v-for="i in Array(ROWS * COLS).keys()"
        class="flip-card relative bg-[yellow]"
        :data-number="i"
      >
        <div class="flip-card-top"></div>
        <div class="flip-card-bottom">
          <div class="upper-shadow z-50"></div>
          <div class="side-shadow z-50"></div>
          <div class="diagonal-shadow z-50"></div>
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-[6fr,4fr] items-center gap-10 max-w-[1440px] mx-auto"
    >
      <div class="flex flex-col">
        <h1 class="text-[72px] font-bold text-own-light-green">Hi, I'm Egor</h1>
        <p class="text-[18px] font-bold text-own-light-green fading-in">
          I am a Frontend Developer. Working Vue 3 & Nuxt 3 creating Dapps for
          EVM like chains (ETH, BNB, Polygon). Currently i'm working at
          gotbit.io. Creating staking, vesting, NFT marketplaces, IDO launchpads
        </p>

        <div class="flex items-center gap-2 mt-10">
          <FloatingItem class="shuffling">
            <DocumentIcon class="fill-own-gold" />
          </FloatingItem>
          <FloatingItem>
            <TelegramIcon class="fill-own-light-blue" />
          </FloatingItem>
          <FloatingItem>
            <WhatsappIcon class="fill-own-white" />
          </FloatingItem>
        </div>
      </div>

      <div class="relative w-[50%] aspect-square">
        <img
          class="w-full shrink-0 rounded-full border-[4px] border-white drop-shadow-2xl grayscale"
          src="/photo.jpg"
          alt="photo"
        />
        <div
          class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-full h-full"
        >
          <SpinSvg
            class="w-full h-full text-own-white"
            :style="`transform: rotate(${0.1 * y}deg)`"
          />
        </div>

        <div
          class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[calc(120%)] h-[calc(120%)]"
        >
          <SpinSvg
            class="w-full h-full text-own-blue"
            :style="`transform: rotate(${-0.1 * y}deg)`"
          />
        </div>

        <div
          class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[calc(150%)] h-[calc(150%))]"
        >
          <SpinSvg
            class="w-full h-full text-own-gold"
            :style="`transform: rotate(${0.2 * y}deg)`"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid-bg > div {
  background-color: transparent;
}

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

/* @keyframes shuffle {
  from {
    transform: translateX(0);
  }

  to {
    transform: translate3d(100px, 100px, 100px);
  }
} */

.shuffling {
  animation: shuffle 2s ease-in-out infinite;
}

.flip-card {
  background: yellow;
  width: 100%;
  height: 100%;
  position: relative;
}

.flip-card-top {
  position: absolute;
  inset: 0;
  background: red;
  z-index: 1;
  transition: opacity 0.2s ease-in-out;
}

.flip-card-bottom {
  position: absolute;
  inset: 0;
}

.flip-card.flipped .flip-card-top {
  opacity: 0;
}

/* .flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: yellow;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

.flip-card-back {
  background-color: transparent;
  color: white;
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
} */

.upper-shadow {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: var(--shadow-size, 10px);
  background: transparent;
}

.side-shadow {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: var(--shadow-size, 10px);
  background: transparent;
}

.diagonal-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: var(--shadow-size, 10px);
  height: var(--shadow-size, 10px);
  background: transparent;
}

.shadow-top > .upper-shadow {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}

.shadow-left > .side-shadow {
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}

.shadow-diagonal > .diagonal-shadow {
  background: radial-gradient(circle at top left, black, transparent 70%);
}

/* .flip-card.flipped > .shadow-top {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
} */

/* .flip-card.flipped > .shadow-left {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
} */

/* .shadow-top::after,
.shadow-top-left::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
} */

/* .shadow-left::after,
.shadow-top-left::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 10px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
} */

/* .flip-card-back::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 10px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
} */

/* .shadow-t {
  box-shadow: inset 0 10px 4px -4px rgba(0, 0, 0, 0.5);
}

.shadow-b {
  box-shadow: inset 0 -10px 4px -4px rgba(0, 0, 0, 0.5);
}

.shadow-l {
  box-shadow: inset 10px 0px 4px -4px rgba(0, 0, 0, 0.5);
}

.shadow-r {
  box-shadow: inset -10px 0px 4px -4px rgba(0, 0, 0, 0.5);
}

.shadow-y {
  box-shadow: inset 0 10px 4px -4px rgba(0, 0, 0, 0.5),
    inset 0 -10px 4px -4px rgba(0, 0, 0, 0.5);
}

.shadow-x {
  box-shadow: inset 10px 0px 4px -4px rgba(0, 0, 0, 0.5),
    inset -10px 0px 4px -4px rgba(0, 0, 0, 0.5);
} */

/* .border-t {
  border-top: 2px solid red;
  transition: border 0.3s ease-in-out;
}

.border-r {
  border-right: 2px solid red;
  transition: border 0.3s ease-in-out;
}

.border-l {
  border-left: 2px solid red;
  transition: border 0.3s ease-in-out;
}

.border-b {
  border-bottom: 2px solid red;
  transition: border 0.3s ease-in-out;
} */
</style>

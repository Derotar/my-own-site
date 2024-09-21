<script setup lang="ts">
import moment from "moment";
import { computed } from "vue";

const workTable: {
  companyName: string;
  time: { start: number; end?: number };
  role: string;
  description: string[];
}[] = [
  {
    companyName: "Gotbit",
    description: [
      `Developed and implemented typical DeFi applications from scratch according to the design and requirements of each client: Staking, Vesting, IDOLaunchpad, Bridge, landing pages with swap functionality, and applications with more complex logic based on them.`,

      `Managed projects entirely on my own, including writing smart contracts in Solidity, frontend development using Vue 2 + Nuxt 2 (composition API) + Tailwind + TypeScript, and a small backend with Node.js. Communicated directly with clients regarding technical matters and deadlines from the moment of contract signing.`,

      `Developed smart contracts in Solidity (ERC20 token, ERC721, ERC1155, Flexible Staking, Fixed Staking, Merkle Tree Vesting, etc.), and tested them using Mocha + Chai. Deployed contracts using hardhat-deploy.`,

      `Conducted analysis and audit of smart contract code with other blockchain developers, ensuring their security and identifying critical vulnerabilities in the contract logic that could lead to loss of client funds. Led a small team of 2 people, distributed tasks, and oversaw project execution.`,
    ],

    time: { start: 1625160245, end: 1662053045 },
    role: "Fullstack",
  },
  {
    companyName: "Gotbit",
    description: [
      "Quickly mastered QA materials and, using my understanding of Web3 applications, I was able to quickly establish a QA process for Dapps.",
      "Built a QA team from scratch, hired and trained 3 people on the principles of Web3, and managed the team.",
      "Implemented the Testmo tool to track progress on test cases and generate reports.",
      "Introduced a unified reporting format through Telegram for the testing of each project (in dedicated chats) in a clear and readable manner.",
      "Established requirements for project acceptance for testing to standardize the development process due to the very different working styles of development teams.",
      "Set up and streamlined the process of interaction with QA in the task manager (Linear) for easy tracking of timelines and bug statuses.",
      "In parallel, I also worked as a frontend developer, helping to build a fast-evolving NFT Marketplace based on client demands.",
    ],

    time: { start: 1662053045, end: 1672593845 },
    role: "QA Lead",
  },
  {
    companyName: "Gotbit",
    description: [
      "Quickly mastered QA materials and, using my understanding of Web3 applications, I was able to quickly establish a QA process for Dapps.",
      "Built a QA team from scratch, hired and trained 3 people on the principles of Web3, and managed the team.",
      "Implemented the Testmo tool to track progress on test cases and generate reports.",
      "Introduced a unified reporting format through Telegram for the testing of each project (in dedicated chats) in a clear and readable manner.",
      "Established requirements for project acceptance for testing to standardize the development process due to the very different working styles of development teams.",
      "Set up and streamlined the process of interaction with QA in the task manager (Linear) for easy tracking of timelines and bug statuses.",
      "In parallel, I also worked as a frontend developer, helping to build a fast-evolving NFT Marketplace based on client demands.",
    ],

    time: { start: 1662053045 },
    role: "Frontend engineer",
  },
];

const getDuration = (durationInSeconds: number) => {
  const duration = moment.duration(durationInSeconds * 1000);
  const years = Math.floor(duration.years());
  const months = Math.floor(duration.months());
  return `${years ? years + " years" : ""} ${months ? months + " months" : ""}`;
};

const getTimeStr = (timestamp?: number) => {
  return timestamp ? moment.unix(timestamp).format("MMMM YYYY") : "current";
};

const formattedData = computed(() => {
  return workTable.map((work) => {
    if (work.time.end)
      console.log("duration", getDuration(work.time.end - work.time.start));
    return {
      ...work,
      timeStr: `${getTimeStr(work.time.start)} - ${getTimeStr(work.time.end)}`,
      duration: getDuration(
        (work.time.end ?? Math.trunc(Date.now() / 1000)) - work.time.start
      ),
    };
  });
});
</script>

<template>
  <section id="work" class="w-full max-w-[1440px] mx-auto py-[100px]">
    <h2 class="text-[40px] font-bold text-own-gold">Work</h2>

    <div
      class="w-full grid grid-cols-[20%,20%,1fr] gap-y-2 border-own-gold border-2 rounded-2xl"
    >
      <div class="contents *:border-b-[2px] *:border-own-gold">
        <p>Company Name</p>
        <p>Time</p>
        <p>My Role</p>
      </div>
      <div
        v-for="work in formattedData"
        class="contents *:outline *:border-own-gold *:p-4"
      >
        <div>
          {{ work.companyName }}
        </div>
        <div>
          <p>{{ work.timeStr }}</p>
          <p class="text-own-light-gray">{{ work.duration }}</p>
        </div>
        <ul class="flex flex-col gap-2 list-outside list-disc">
          <li v-for="descr in work.description" class="ml-4">
            {{ descr }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>

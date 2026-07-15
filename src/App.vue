<script setup>
import { onMounted } from "vue";
import ChatBot from "./components/ChatBot.vue";
import { loadData } from "./services/data.js";

onMounted(async () => {
  await loadData();
  console.log("JSON 로딩 완료");
});
</script>

<template>
  <ChatBot />
</template>
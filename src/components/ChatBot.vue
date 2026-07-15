<script setup>
import { askGPT } from "../services/openai";
import { ref } from "vue";

const input = ref("");

const messages = ref([
  {
    role: "assistant",
    text: "안녕하세요! LocalHub 챗봇입니다."
  }
]);

async function sendMessage() {
  if (!input.value.trim()) return;

  // 입력값 저장
  const question = input.value;

  // 사용자 메시지 출력
  messages.value.push({
    role: "user",
    text: question
  });

  // 입력창 비우기
  input.value = "";

  try {
    // GPT 호출
    const answer = await askGPT(question);

    // GPT 답변 출력
    messages.value.push({
      role: "assistant",
      text: answer
    });

  } catch (error) {
    console.error(error);

    messages.value.push({
      role: "assistant",
      text: "오류가 발생했습니다. API Key 또는 OpenAI 연결을 확인해주세요."
    });
  }
}
</script>

<template>
  <div class="chat">
    <div class="history">
      <div
        v-for="(m, index) in messages"
        :key="index"
        :class="m.role"
      >
        {{ m.text }}
      </div>
    </div>

    <div class="input-area">
      <input
        v-model="input"
        @keyup.enter="sendMessage"
        placeholder="질문을 입력하세요"
      />

      <button @click="sendMessage">
        전송
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat {
  width: 400px;
  margin: 40px auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
}

.history {
  height: 350px;
  overflow-y: auto;
  margin-bottom: 15px;
}

.user {
  text-align: right;
  margin: 10px;
  color: blue;
}

.assistant {
  text-align: left;
  margin: 10px;
  color: black;
}

.input-area {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 10px;
}

button {
  padding: 10px 16px;
}
</style>
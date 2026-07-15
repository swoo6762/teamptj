<script setup>
import { ref, nextTick } from "vue";
import { askGPT } from "../services/openai";

const input = ref("");

const messages = ref([
  {
    role: "assistant",
    text: "안녕하세요! 😊 LocalHub 부산 관광 챗봇입니다.\n부산 관광지, 축제, 숙박 등에 대해 질문해보세요."
  }
]);

const history = ref(null);

async function sendMessage() {

  if (!input.value.trim()) return;

  const question = input.value;

  messages.value.push({
    role: "user",
    text: question
  });

  input.value = "";

  scrollBottom();

  try {

    const answer = await askGPT(question);

    messages.value.push({
      role: "assistant",
      text: answer
    });

  } catch (e) {

    messages.value.push({
      role: "assistant",
      text: "죄송합니다. 응답을 가져오지 못했습니다."
    });

  }

  scrollBottom();

}

async function scrollBottom(){

  await nextTick();

  if(history.value){

    history.value.scrollTop = history.value.scrollHeight;

  }

}
</script>

<template>

<div class="chat">

    <div class="header">
        🤖 LocalHub 부산 챗봇
    </div>

    <div class="history" ref="history">

        <div
            v-for="(m,index) in messages"
            :key="index"
            class="message"
            :class="m.role"
        >

            <div class="bubble">
                {{m.text}}
            </div>

        </div>

    </div>

    <div class="input-area">

        <input
            v-model="input"
            @keyup.enter="sendMessage"
            placeholder="부산 관광지를 물어보세요..."
        >

        <button @click="sendMessage">
            전송
        </button>

    </div>

</div>

</template>

<style scoped>

.chat{

    position:fixed;

    top:50%;
    left:50%;
    transform:translate(-50%, -50%);

    width:700px;
    height:800px;

    display:flex;
    flex-direction:column;

    background:white;

    border-radius:20px;

    box-shadow:0 15px 45px rgba(0,0,0,.2);

    overflow:hidden;

}

.header{

    background:#0A84FF;

    color:white;

    padding:20px;

    font-size:22px;

    font-weight:bold;

    text-align:center;

}

.history{

    flex:1;

    overflow-y:auto;

    background:#f5f7fb;

    padding:25px;

}

.message{

    display:flex;

    margin-bottom:18px;

}

.user{

    justify-content:flex-end;

}

.assistant{

    justify-content:flex-start;

}

.bubble{

    max-width:75%;

    padding:14px 18px;

    border-radius:20px;

    white-space:pre-wrap;

    line-height:1.7;

    font-size:16px;

    word-break:break-word;

}

.user .bubble{

    background:#0A84FF;

    color:white;

    border-bottom-right-radius:6px;

}

.assistant .bubble{

    background:white;

    border:1px solid #ddd;

    border-bottom-left-radius:6px;

}

.input-area{

    display:flex;

    gap:12px;

    padding:18px;

    border-top:1px solid #eee;

    background:white;

}

.input-area input{

    flex:1;

    padding:14px 18px;

    border-radius:25px;

    border:1px solid #ccc;

    outline:none;

    font-size:16px;

}

.input-area input:focus{

    border-color:#0A84FF;

}

button{

    border:none;

    background:#0A84FF;

    color:white;

    border-radius:25px;

    padding:14px 24px;

    font-size:15px;

    font-weight:bold;

    cursor:pointer;

    transition:.2s;

}

button:hover{

    background:#006ddf;

}

@media(max-width:900px){

.chat{

    width:95%;

    height:90%;

}

}

@media(max-width:600px){

.chat{

    width:100%;

    height:100%;

    border-radius:0;

    top:0;
    left:0;
    transform:none;

}

}

</style>
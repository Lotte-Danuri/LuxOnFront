<template>
  <div class="chat__body" id="chat__body">
    <ChatMessage
      v-for="(msg, index) in msgs"
      :key="index"
      :msg="msg"
      :prev="[index == 0 ? null : messages[index - 1]]"
    >
    </ChatMessage>
  </div>
</template>

<script>
import ChatMessage from '@/components/chat/chatMessage.vue';
import axios from 'axios';

export default {
  data() {
    return {
      messages: Array,
    };
  },
  components: {
    ChatMessage,
  },
  methods: {
    getNewMessages: function async() {
      console.log('실행중');
      axios
        .get(
          'http://localhost:8080/chatRoom/newChats/Test1/634cfc1d6e1d7300ef16e8f7',
        )
        .then(res =>
          res.data.length !== 0
            ? this.messages.push(res.data)
            : console.log(res.data),
        )
        .catch(err => console.log(err));
    },
  },
  props: ['msgs'],
};
</script>

<style>
.chat__body {
  padding: 1rem;
  overflow: scroll;
  scroll-behavior: smooth;
}

.chat__body::-webkit-scrollbar {
  display: none;
}
</style>

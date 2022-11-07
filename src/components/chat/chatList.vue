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

export default {
  data() {
    return {
      messages: Array,
    };
  },
  components: {
    ChatMessage,
  },
  props: ['msgs'],
  updated: function () {
    var objDiv = document.getElementById('chat__body');
    objDiv.scrollTop = objDiv.scrollHeight;
  },
};
</script>

<style>
.chat__body {
  padding: 1rem;
  overflow: scroll;
}

.chat__body::-webkit-scrollbar {
  display: none;
}
</style>

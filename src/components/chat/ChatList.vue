<template>
  <div class="chat__body" id="chat__body">
    <ChatMessage
      v-for="(msg, index) in msgs"
      :key="index"
      :msg="msg"
      :prev="[index == 0 ? null : msgs[index - 1]]"
    >
    </ChatMessage>
  </div>
</template>

<script>
import ChatMessage from '@/components/chat/ChatMessage.vue';

export default {
  components: {
    ChatMessage,
  },
  props: ['msgs'],
};
console.log(this.props);
</script>

<style>
.chat__body {
  padding: 2rem;
  overflow: scroll;
  scroll-behavior: smooth;
}

.chat__body::-webkit-scrollbar {
  display: none;
}
</style>

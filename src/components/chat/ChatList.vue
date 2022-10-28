<template>
  <div class="chat__body" id="chat__body" onscroll="chat_on_scroll()">
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
  methods: {},
  props: ['msgs'],
  updated: function () {
    var objDiv = document.getElementById('chat__body');
    if (bottom_flag) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  },
};

var pre_diffHeight = 0;
var bottom_flag = true;
var chat_on_scroll = function () {
  var objDiv = document.getElementById('chat__body');

  if (objDiv.scrollTop + objDiv.clientHeight == objDiv.scrollHeight) {
    bottom_flag = true;
  }

  if (pre_diffHeight > objDiv.scrollTop + objDiv.clientHeight) {
    bottom_flag = false;
  }

  pre_diffHeight = objDiv.scrollTop + objDiv.clientHeight;
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

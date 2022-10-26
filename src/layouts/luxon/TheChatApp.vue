<template>
  <div>
    <!-- 채팅방 -->
    <div class="chat_app_wrapper" v-if="!showChat">
      <div class="chat_app_header border">
        <span style="margin-left: 28px"></span>
        <div><img src="@/assets/logo/logo_white.png" /></div>
        <button class="btn" @click="$emit('closeBtn')">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <!-- <ChatRoom v-model:chatRoomId="selectedchatRoomId" :rooms="rooms" /> -->
      <div class="chatroom_area">
        <ChatRoom v-bind:rooms="rooms"></ChatRoom>
      </div>
    </div>
    <!-- 채팅창 -->
    <div class="chat_app_wrapper" v-if="showChat">
      <div class="chat_app_header border">
        <button class="btn" @click="backButton">
          <i class="bi bi-chevron-left"></i>
        </button>
        <p class="app__brand">이름 들어가는곳</p>
        <button class="btn" @click="$emit('closeBtn')">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <chat-list></chat-list>
      <ChatForm @submitMessage="sendMessage"></ChatForm>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import ChatList from '@/components/chat/ChatList.vue';
import ChatForm from '@/components/chat/ChatForm.vue';
import ChatRoom from '@/components/chat/ChatRoom.vue';
export default {
  name: 'theChatApp',
  data() {
    return {
      showChat: true,
      rooms: [],
    };
  },
  components: {
    ChatList,
    ChatForm,
    ChatRoom,
  },
  methods: {
    backButton: function () {
      this.showChat = !this.showChat;
    },
  },
  beforeCreate() {
    axios
      .get('http://localhost:8080/user/Test1')
      .then(res => (this.rooms = res.data))
      .catch(err => console.log(err));
  },
  computed: {},
};
</script>
<style scoped>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
@font-face {
  font-family: 'Golden Plains - Demo';
  src: url('./assets/GoldenPlains.woff2') format('woff2'),
    url('./assets/GoldenPlains.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
* {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR',
    'Malgun Gothic', sans-serif;
}
body {
  background-color: #cfcff4;
}
.app__brand {
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
}
.chat_app_wrapper {
  width: 375px;
  height: 812px;
  background-color: #ffffff;
  margin: 5rem auto 0rem;
  border-radius: 1.5rem;
  box-shadow: 0px 1px 20px #9c9cc855;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.chat_app_header {
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
  border-radius: 24px 24px 0px 0px;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 70px;
}
.chatroom_area {
  border-right: 1px solid black;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  flex-shrink: 0;
}
.chat__header__greetings {
  color: #292929;
}

.chat_room_list {
  width: 100%;
  display: list_item;
}
.chat_app_sidebar {
  display: none;
  background-color: yellow;
  width: 20%;
}

.content {
  display: none;
  background-color: aqua;
  width: 80%;
}
.chat_app_footer {
  background-color: black;
  width: 100%;
  height: 80px;
}

.close_btn {
  justify-content: flex_end;
}
</style>

<template>
  <div class="chat_app_wrapper">
    <div class="chat_app_header border" v-if="showChat">
      <button class="btn" @click="backButton">
        <i class="bi bi-chevron-left"></i>
      </button>
      <p class="app__brand">{{ roomDatas[0].userName }}</p>
      <button class="btn" @click="$emit('closeBtn')">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
    <div v-if="!showChat" class="chat_app_body border">
      <div
        v_for="conversation in props.conversations"
        :key="conversation.id"
        class="chat_room_list"
        :class="[roomDatas.chatRoomId === roomDatas.chatRoomId && 'active']"
        tabindex="0"
        @keydown.space.prevent="
          () => {
            emit('update:conversationId', conversation.id);
          }
        "
        @click="
          () => {
            emit('update:conversationId', conversation.id);
          }
        "
      ></div>
    </div>
    <chat-list v-if="showChat"></chat-list>
    <ChatForm @submitMessage="sendMessage" v-if="showChat"></ChatForm>
  </div>
</template>
<script>
import axios from 'axios';
import ChatList from '@/components/chat/ChatList.vue';
import ChatForm from '@/components/chat/ChatForm.vue';
export default {
  data: function () {
    return {
      showChat: true,
      roomDatas: [
        {
          chatRoomId: '634cfc1d6e1d7300ef16e8f7',
          userName: '챙',
          lastChatContent: '테스트 메세지',
          lastChatCreatedAt: '2022-10-17T17:35:28.273',
          valid: true,
          roomType: 'chat',
          updateAt: '2022-10-17T17:35:28.273',
          receiverId: 'Test2',
          countNewChats: 3,
          userId: null,
        },
        {
          chatRoomId: '634d00746e1d7300ef16e8f8',
          userName: '박',
          lastChatContent: null,
          lastChatCreatedAt: null,
          valid: true,
          roomType: 'chat',
          updateAt: '2022-10-17T16:12:52.61',
          receiverId: 'Test3',
          countNewChats: 0,
          userId: null,
        },
      ],
    };
  },
  components: {
    ChatList,
    ChatForm,
  },
  methods: {
    fetchData: function () {
      axios
        .get('http://localhost:8080/user/Test1')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
function backButton() {
  this.showChat = !this.showChat;
  this.fetchData();
}
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

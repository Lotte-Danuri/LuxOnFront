<template>
  <div>
    <!-- 채팅방 -->
    <div class="chat_app_wrapper" v-if="showChat">
      <div class="chat_app_header">
        <div style="margin-left: 28px"></div>
        <div>
          <img class="chat_app_brand" src="@/assets/logo/logo_white.png" />
        </div>
        <button class="btn" @click="$emit('closeBtn')">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <div class="chatroom_area">
        <ChatRoom
          v-bind:rooms="rooms"
          @selectChatRoom="selectChatRoom"
          @click="getChatDatas(selectedChatRoom.chatRoomId)"
        ></ChatRoom>
      </div>
    </div>
    <!-- 채팅창 -->
    <div class="chat_app_wrapper_chat" v-if="!showChat">
      <div class="chat_app_header_chat border">
        <button class="btn" @click="backButton">
          <i class="bi bi-chevron-left"></i>
        </button>
        <p class="app__brand">{{ selectedChatRoom.userName }}</p>
        <div>
          <button class="btn" style="height: 100%" @click="outBtn()">
            <i class="bi bi-box-arrow-right"></i>
          </button>
          <button class="btn" @click="$emit('closeBtn')">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
      <ChatList :msgs="msgData"></ChatList>
      <ChatForm
        @submitMessage="sendMessage"
        :chatValid="selectedChatRoom.valid"
      ></ChatForm>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import ChatList from '@/components/chat/chatList.vue';
import ChatForm from '@/components/chat/chatForm.vue';
import ChatRoom from '@/components/chat/chatRoom.vue';
export default {
  name: 'theChatApp',
  data() {
    return {
      showChat: true,
      selectedChatRoom: {},
      rooms: [],
      msgData: [],
      userId: '',
    };
  },
  components: {
    ChatList,
    ChatForm,
    ChatRoom,
  },
  methods: {
    backButton: function () {
      clearInterval(this.chatLoading);
      this.showChat = !this.showChat;
    },
    selectChatRoom: function (room) {
      this.selectedChatRoom = room;
      this.showChat = !this.showChat;
    },
    getRoomDatas: async function () {
      await axios
        .get('http://localhost:8000/chat/user/' + this.userId, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            contentType: 'application/json',
          },
        })
        .then(res => (this.rooms = res.data))
        .catch(err => console.log(err));
    },
    outBtn: async function () {
      await axios
        .delete(
          'http://localhost:8000/chat/user/' +
            this.userId +
            '/' +
            this.selectedChatRoom.chatRoomId,
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              contentType: 'application/json',
            },
          },
        )
        .then(this.backButton())
        .catch(err => console.log(err));
    },
    getChatDatas: async function (val) {
      await axios
        .get(
          'http://localhost:8000/chat/chatRoom/chats/' +
            this.userId +
            '/' +
            val,
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              contentType: 'application/json',
            },
          },
        )
        .then(res => (this.msgData = res.data))
        .catch(err => console.log(err));
    },
    getNewMessages: async function (val) {
      await axios
        .get(
          'http://localhost:8000/chat/chatRoom/newChats/' +
            this.userId +
            '/' +
            val,
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              contentType: 'application/json',
            },
          },
        )
        .then(res =>
          res.data.length !== 0
            ? res.data.reverse().forEach(element => this.msgData.push(element))
            : console.log(),
        )
        .catch(err => console.log(err));
    },
    async sendMessage(msg, type, file) {
      let data = {
        content: msg,
        contentType: type,
        id: this.selectedChatRoom.chatRoomId,
        sendBy: this.userId,
        sendTo: this.selectedChatRoom.receiverId,
        source: '',
      };
      if (type == '메세지') {
        await axios
          .post('http://localhost:8000/chat/chatRoom/chat', data, {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              contentType: 'application/json',
            },
          })
          .then(res =>
            res.data.length !== 0
              ? res.data.forEach(element => this.msgData.push(element))
              : console.log(),
          )
          .catch(err => console.log(err));
      } else if (type == '이미지') {
        const fd = new FormData();
        const js2 = JSON.stringify(data);
        const blob = new Blob([js2], { type: 'application/json' });
        fd.append('chatVo', blob);
        fd.append('imageFile', file);
        await axios
          .post('http://localhost:8000/chat/chatRoom/image', fd, {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              contentType: 'multipart/form-data',
            },
          })
          .then(console.log('image send success'))
          .catch(err => console.log(err));
      }
    },
  },
  created() {
    this.userId = localStorage.getItem('login_id');
    this.listLoading = setInterval(() => {
      this.getRoomDatas();
    }, 1000);
  },
  watch: {
    selectedChatRoom(val) {
      this.chatLoading = setInterval(() => {
        this.getNewMessages(val.chatRoomId);
      }, 1000);
      return this.chatLoading;
    },
  },
  beforeUnmount: function () {
    clearInterval(this.chatLoading);
    clearInterval(this.listLoading);
  },
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

.chat_app_brand {
  height: 70px;
}

.chat_app_wrapper {
  width: 375px;
  height: 812px;
  background-color: #ffffff;
  margin: 5rem auto 0rem;
  border-radius: 1.5rem;
  box-shadow: 0px 1px 20px #9c9cc855;
  flex-direction: column;
  justify-content: space-between;
}

.chat_app_wrapper_chat {
  width: 375px;
  height: 812px;
  background-color: #ffffff;
  margin: 5rem auto 0rem;
  border-radius: 1.5rem;
  box-shadow: 0px 1px 20px #9c9cc855;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
}

.chat_app_header {
  height: 70px;
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
  border-radius: 24px 24px 0px 0px;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  z-index: 2;
  flex-direction: row;
  justify-content: space-between;
}
.chat_app_header_chat {
  height: 70px;
  width: 375px;
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
  border-radius: 24px 24px 0px 0px;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  position: fixed;
  flex-direction: row;
  justify-content: space-between;
}
.chatroom_area {
  border-right: 1px solid black;
  overflow-y: auto;
  overflow-x: hidden;
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

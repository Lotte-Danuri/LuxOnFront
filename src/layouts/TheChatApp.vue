<template>
  <div class="chat_app_wrapper">
    <div class="chat_app_header border" v-if="showChat">
      <button class="btn" @click="backButton">
        <i class="bi bi-chevron-left"></i>
      </button>
      <p class="app__brand">이름 오는곳</p>
      <button class="btn" @click="$emit('closeBtn')">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
    <div v-if="!showChat" class="chat_app_body border">
      <div
        v_for="conversation in props.conversations"
        :key="conversation.id"
        class="chat_room_list"
        :class="[props.conversationId === conversation.id && 'active']"
        tabindex="0"
        @keydown.space.prevent="
          () => {
            emit('update:conversationId', conversation.id);
            emit('toggleMobileConversation');
          }
        "
        @click="
          () => {
            emit('update:conversationId', conversation.id);
            emit('toggleMobileConversation');
          }
        "
      ></div>
    </div>
    <chat-list v-if="showChat"></chat-list>
    <ChatForm @submitMessage="sendMessage" v-if="showChat"></ChatForm>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      showChat: true,
    };
  },
};
function backButton() {
  this.showChat = !this.showChat;
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

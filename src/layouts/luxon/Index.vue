<script>
import TheHeader from '@/layouts/luxon/TheHeader.vue';
import TheView from '@/layouts/luxon/TheView.vue';
import TheChat from '@/layouts/luxon/TheChat.vue';
import TheChatApp from '@/layouts/luxon/TheChatApp.vue';
import { ref } from 'vue';

export default {
  name: 'DefaultLayout',
  components: {
    TheHeader,
    TheView,
    TheChat,
    TheChatApp,
  },
  created() {
    if (window.location.pathname == '/') {
      location.href = '/MyMain';
    }
  },
  data: function () {
    return {
      chatShow: false,
    };
  },
  methods: {
    buttonClick() {
      this.chatShow = !this.chatShow;
    },
  },
};
</script>

<template>
  <the-header></the-header>

  <the-view></the-view>

  <TheChat
    style="position: fixed; z-index: 999; right: 30px; bottom: 30px"
    @click="buttonClick"
  ></TheChat>
  <Transition>
    <TheChatApp
      @closeBtn="buttonClick"
      v-if="chatShow"
      style="position: fixed; right: 30px; bottom: 30px; z-index: 999"
    ></TheChatApp>
  </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

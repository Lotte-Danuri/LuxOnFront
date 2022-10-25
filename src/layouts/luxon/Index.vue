<script>
import TheHeader from '@/layouts/luxon/TheHeader.vue';
import TheView from '@/layouts/luxon/TheView.vue';
import TheChat from '@/layouts/luxon/TheChat.vue';
import TheChatApp from '@/layouts/luxon/TheChatApp.vue';
import { ref } from 'vue';

let chatShow = ref(false);

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
  methods: {
    buttonClick() {
      chatShow.value = !chatShow.value;
    },
  },
};
</script>

<template>
  <the-header></the-header>

  <the-view></the-view>

  <the-chat
    style="position: fixed; z-index: 999; right: 50px; bottom: 50px"
    @click="buttonClick"
  ></the-chat>
  <Transition>
    <the-chat-app
      class="border border-3 rounded"
      v-if="chatShow"
      style="
        position: fixed;
        width: 30%;
        height: 60%;
        right: 130px;
        bottom: 130px;
        z-index: 999;
        background-color: grey;
        min-height: 800px;
        min-width: 600px;
      "
    ></the-chat-app>
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

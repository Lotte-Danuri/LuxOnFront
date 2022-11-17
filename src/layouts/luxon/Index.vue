<template>
  <the-header></the-header>
  <the-view></the-view>
  <TheChat
    v-if="!state.chatShow && state.localStorage.login_id != null"
    style="position: fixed; z-index: 999; right: 30px; bottom: 30px"
    @click="buttonClick"
  ></TheChat>
  <Transition>
    <TheChatApp
      @closeBtn="buttonClick"
      v-if="state.chatShow"
      style="position: fixed; right: 30px; bottom: 30px; z-index: 999"
    ></TheChatApp>
  </Transition>
  <the-footer></the-footer>
</template>

<script>
import TheHeader from '@/layouts/luxon/theHeader.vue';
import TheView from '@/layouts/luxon/theView.vue';
import { onBeforeMount } from 'vue';
import { getCurrentInstance } from 'vue';

import TheChat from '@/layouts/luxon/theChat.vue';
import TheChatApp from '@/layouts/luxon/theChatApp.vue';
import TheFooter from '@/layouts/luxon/theFooter.vue';
import router from '@/router';
import { reactive } from 'vue';
import { onMounted } from 'vue';
// import { ref } from 'vue';

export default {
  name: 'DefaultLayout',
  components: {
    TheHeader,
    TheView,
    TheChat,
    TheChatApp,
    TheFooter,
  },

  setup() {
    let login = false;
    const emitter =
      getCurrentInstance().appContext.config.globalProperties.$emitter;
    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    onBeforeMount(() => {
      if (globalProperties.$isLogin() == false) {
        login = true;
      }
    });
    const state = reactive({
      localStorage: '',
      chatShow: false,
    });
    let buttonClick = () => {
      state.chatShow = !state.chatShow;
    };

    onMounted(() => {
      state.localStorage = localStorage;
      emitter.on('chatShow', buttonClick);
    });
    return {
      state,
      login,
      buttonClick,
    };
  },

  created() {
    if (window.location.pathname == '/') {
      router.push('/main');
    }
  },
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

p {
  font-family: 'Do Hyeon', sans-serif;
  font-size: 15px;
}

/* 아래의 모든 코드는 영역::코드로 사용 */
</style>

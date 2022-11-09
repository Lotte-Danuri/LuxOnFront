<template>
  <the-header></the-header>
  <the-view></the-view>
  <TheChat
    v-if="state.localStorage.login_id != null"
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
  <the-footer></the-footer>
</template>

<script>
import TheHeader from '@/layouts/luxon/theHeader.vue';
import TheView from '@/layouts/luxon/theView.vue';
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

  created() {
    if (window.location.pathname == '/') {
      router.push('/main');
    }
  },
  data: function () {
    return {
      chatShow: false,
      login: false,
    };
  },
  setup() {
    const state = reactive({
      localStorage: '',
    });

    onMounted(() => {
      state.localStorage = localStorage;
    });
    return {
      state,
    };
  },
  methods: {
    buttonClick() {
      this.chatShow = !this.chatShow;
    },
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
</style>

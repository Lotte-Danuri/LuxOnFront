<script setup>
import TheHeader from '@/layouts/TheHeader.vue';
import TheView from '@/layouts/TheView.vue';
import TheChat from '@/layouts/TheChat.vue';
import TheChatApp from '@/layouts/TheChatApp.vue';
import { ref } from 'vue';

let chatShow = ref(false);

function buttonClick() {
  chatShow.value = !chatShow.value;
}
</script>

<template>
  <TheHeader></TheHeader>

  <TheView></TheView>

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

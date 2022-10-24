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
    style="position: fixed; z-index: 999; right: 50px; bottom: 50px"
    @click="buttonClick"
  ></TheChat>
  <Transition>
    <TheChatApp
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

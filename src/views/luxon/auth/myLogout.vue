<template></template>

<script>
import router from '@/router';
import { onBeforeMount } from 'vue';

export default {
  setup() {
    onBeforeMount(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('loginId');
      window.location.href = '/main';
    });
    return {};
  },
};
</script>

<style></style>

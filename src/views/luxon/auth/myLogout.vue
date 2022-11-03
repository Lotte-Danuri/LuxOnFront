<template></template>

<script>
import router from '@/router';
import { onBeforeMount } from 'vue';

export default {
  setup() {
    onBeforeMount(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('role');
      localStorage.removeItem('login_id');
      localStorage.removeItem('store_id');
      localStorage.removeItem('userinfo');
      window.location.href = '/main';
    });
    return {};
  },
};
</script>

<style></style>

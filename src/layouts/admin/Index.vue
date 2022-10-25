<script>
import TheHeader from '@/layouts/admin/TheHeader.vue';
import TheSide from '@/layouts/admin/sidebar.vue';
import TheView from '@/layouts/admin/adminView.vue';

export default {
  name: 'DefaultLayout',
  components: {
    TheSide,
    TheHeader,
    TheView,
  },
};
</script>

<template>
  <the-side></the-side>
  <the-header></the-header>
  <the-view></the-view>
</template>

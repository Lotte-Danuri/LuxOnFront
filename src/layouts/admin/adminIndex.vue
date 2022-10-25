<template>
  <the-header></the-header>
  <the-side></the-side>
  <admin-view></admin-view>
</template>

<script>
import TheHeader from '@/layouts/admin/TheHeader.vue';
import TheSide from '@/layouts/admin/TheSide.vue';
import AdminView from '@/layouts/admin/adminView.vue';

export default {
  name: 'DefaultLayout',
  components: {
    TheSide,
    TheHeader,
    AdminView,
  },
};
</script>

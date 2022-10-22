<template>
  <div>
    <h2>home view</h2>
    <p>{{ $route.path }}</p>
    <button class="btn btn-primary" @click="$router.push('/about')">
      about으로 이동
    </button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
console.log('route.path ', route.path);
</script>

<style lang="scss" scoped></style>

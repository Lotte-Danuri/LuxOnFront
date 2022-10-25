<template>
  <div>
    <h2>home view</h2>
    <!-- <p>{{ $route.path }}</p> -->
    <button class="btn btn-primary" @click="$router.push('/about')">
      about으로 이동@@@@@@
    </button>
  </div>
</template>

<script>
// console.log('route.path ', route.path);

export default {
  components: {},
  data() {
    return {
      example: '',
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>

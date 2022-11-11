<template>
  <main>
    <div class="promotion_container">
      <h1>{{ $route.query.title }}</h1>
      <div>
        <p>기간 {{ $route.query.startDate }}~{{ $route.query.endDate }}</p>
      </div>
      <img :src="$route.query.imageUrl" />
      <button class="btn btn-dark getInBtn" @click="sendPromotion()">
        이벤트 참여하기
      </button>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Prommotion',
  query: {
    title: { type: String, default: '프로모션' },
    imageUrl: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    buttonUrl: { type: String, default: '' },
  },
  methods: {
    sendPromotion: function () {},
  },
};
</script>

<style>
.promotion_container {
  display: flex;
  flex-direction: column;
}

.getInBtn {
  width: 300px;
  height: 100px;
  align-self: center;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

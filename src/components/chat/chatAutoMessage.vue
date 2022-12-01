<template>
  <div class="product_list">
    <div style="font-weight: bold">챗봇</div>
    <div class="">
      <hr />
      <button class="btn btn-black" @click="sendPromotionMessages">
        진행중 프로모션
      </button>
      <button class="btn btn-black" @click="sendRecommendMessages">
        나에게 맞는 상품 추천
      </button>
    </div>
    <hr />
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  props: {
    chatData: {},
  },

  data() {
    return {
      plist: [],
      promotions: [],
      router: useRouter(),
      a: window.location,
      productCode: '',
    };
  },

  methods: {
    sendPromotionMessages: function () {
      this.getPromotion();
      this.promotions.forEach(async function (promotion) {
        await axios
          .post(
            'http://localhost:8000/chat/chatRoom/chat',
            {
              id: null,
              content: '',
              contentType: '프로모션',
              sendBy: 'admin',
              sendTo: localStorage.getItem('login_id'),
              source: promotion.id,
            },
            {
              headers: {
                Authorization: `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json',
              },
            },
          )
          .catch(err => console.log(err));
      });
    },
    getPromotion: async function () {
      await axios
        .get('http://localhost:8000/member/promotion/all', {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        })
        .then(res => (this.promotions = res.data))
        .catch(err => console.log(err));
    },
    sendRecommendMessages: async function (selectedMembers) {
      console.log(selectedMembers);
      await axios
        .get('http://localhost:8000/recommend/recommends/list/member', {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        })
        .then(res => (this.productCode = res.data))
        .catch(err => console.log(err));
      console.log(this.productCode);

      await axios
        .post(
          'http://localhost:8000/chat/chatRoom/chat',
          {
            id: null,
            content: '나에게 맞는 상품 추천',
            contentType: '추천',
            sendBy: 'admin',
            sendTo: localStorage.getItem('login_id'),
            source: this.productCode.productCode,
          },
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            },
          },
        )
        .then()
        .catch(err => console.log(err));
    },
  },
};
</script>

<style scoped>
.product_list {
  display: flex;
  flex-direction: column;
}
.product_name {
  font-weight: bold;
}
</style>

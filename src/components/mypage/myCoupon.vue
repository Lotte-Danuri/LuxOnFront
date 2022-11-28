<template>
  <div class="mypage col-12 col-md-9 col-lg-8 offset-lg-1">
    <h2>쿠폰 조회</h2>
    <br />

    <div class="list-group">
      <a
        v-for="coupon in state.coupons"
        :key="coupon"
        href="#"
        class="list-group-item list-group-item-action"
        aria-current="true"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ coupon.name }}</h5>
        </div>
        <p class="mb-1">{{ coupon.contents }}</p>
        <small>{{ coupon.startDate }} - {{ coupon.endDate }}</small>
      </a>
    </div>
  </div>

  <!-- mypage-shopping__content end -->
</template>

<script>
import { reactive } from 'vue';
import { onBeforeMount } from 'vue';
import axios from 'axios';
import { getCurrentInstance } from 'vue';
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      coupons: [],
    });

    onBeforeMount(async () => {
      await getCoupons();
    });

    const getCoupons = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/member/mycoupon/all',
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
            },
          },
        );
        console.log(response.data);
        state.coupons = response.data;
        console.log('data', state.coupons);
      } catch (err) {
        console.log(err);
      }
    };

    return { state };
  },
};
</script>

<style>
.pc-wrap {
}

.mypage {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  width: 1182px;
  min-height: 1467px;
  padding: 40px;
  box-sizing: border-box;
  margin-left: 0;
}

.main__styling-img img {
  height: 650px;
  width: 433px;
  object-fit: cover;
}

.main__styling-slide {
  position: relative;
  display: flex;
  height: 730px;
  padding: 0 183px 0 200px;
  box-sizing: border-box;
}

.main__styling-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main__styling-img {
  position: absolute;
  top: 41px;
  right: 223px;
}

.main__styling-text h2 {
  margin-bottom: 57px;
  font-size: 72px;
  color: #141a23;
}

.main__styling-text-strong {
  white-space: nowrap;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.5px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.main__styling-text-description {
  white-space: nowrap;
  font-size: 16px;
  line-height: 22px;
  color: #404040;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

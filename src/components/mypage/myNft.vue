<template>
  <div class="mypage col-12 col-md-9 col-lg-8 offset-lg-1">
    <h2>주문/배송 조회</h2>
    <!-- Order -->
    <div class="card card-lg mb-5 border">
      <div class="pc-wrap">
        <div class="main__styling-slide" style="
            background-image: url('https://cdn-fo.sivillage.com/fo/assets/comm/image/main_styling_pattern.svg');
          ">
          <div class="main__styling-text">
            <h2 class="regularbold">NFT</h2>

            <div class="main__styling-info">
              <p class="main__styling-text-strong">PERFUME GALLERY</p>
              <p class="main__styling-text-description">
                {{ state.nftData.name }}
              </p>
            </div>
          </div>
          <div class="main__styling-img">
            <img :src="state.nftData.image" alt="[아무아쥬] 아너 오드퍼퓸 포 우먼 100ml" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- mypage-shopping__content end -->
</template>

<script>
import { reactive } from "vue";
import { onBeforeMount } from "vue";
import axios from "axios";
import { getCurrentInstance } from "vue";
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";
import { computed } from "@vue/reactivity";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userId = computed(() =>
      route.params.userId
    );
    const productId = computed(() =>
      route.params.productId
    );

    const state = reactive({
      nftData: ''
    })

    onBeforeMount(async () => {
      if (!userId.value || !productId.value) {
        Swal.fire("정상적인 경로로 접근해주세요")
        router.push("order")
      }

      await getNftData()
    })

    const getNftData = async () => {
      try {
        const response = await axios.post("http://43.200.203.135:5000/api/nft", {
          userId: userId.value,
          productId: productId.value
        })
        state.nftData = response.data[0];
        console.log('data', state.nftData)
      } catch (err) {
        console.log(err)
      }
    }

    return { state, };
  },
};
</script>

<style>
.pc-wrap {}

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

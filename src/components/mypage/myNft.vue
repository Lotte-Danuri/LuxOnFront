<template>
  <div class="mypage">
    <h2>NFT 인증서</h2>
    <!-- Order -->
    <div
      class="main__styling-slide"
      style="
        background-image: url('https://cdn-fo.sivillage.com/fo/assets/comm/image/main_styling_pattern.svg');
        background-size: 1000px 600px;
        background-repeat: no-repeat;
        width: 1000px;
        height: 800px;
        padding: 80px;
        padding-left: 20px;
        margin-left: 5%;
      "
    >
      <div class="nft_grid" style="margin-left: 0%; margin-top: 0%">
        <div
          class=""
          style="
            background-image: url('https://pixy.org/src/474/thumbs350/4743058.jpg');
            background-size: 1000px 900px;
            background-repeat: no-repeat;
            width: 380px;
            height: 440px;
            margin-left: 50px;
          "
        >
          <img
            style="
              width: 330px;
              height: 400px;
              margin-top: 20px;
              margin-left: 25px;
            "
            :src="state.nftData.image"
          />
        </div>
        <div style="margin-left: 40px">
          <div>
            <div>
              <h1 style="text-align: center">NFT</h1>
            </div>
          </div>
          <div style="margin-bottom: 40px">
            <a href="">
              <VueQrcode
                style="margin-left: 170px"
                :value="
                  'https://baobab.scope.klaytn.com/account/' +
                  state.nftData.contractAddr
                "
                tag="svg"
                :options="{ width: 120 }"
              ></VueQrcode>
            </a>
          </div>
          <div class="data_grid">
            <h3>상품명</h3>
            <p>{{ state.nftData.name }}</p>
          </div>
          <div class="data_grid">
            <h3>브랜드명</h3>
            <p>{{ state.nftData.brandName }}</p>
          </div>
          <div class="data_grid">
            <h3>판매자</h3>
            <p>{{ state.nftData.sellerId }}</p>
          </div>
          <div class="data_grid">
            <h3>발급일</h3>
            <p>
              {{
                globalProperties.$formatDatetime(
                  new Date(state.nftData.registeredDate),
                )
              }}
            </p>
          </div>
          <div class="data_grid">
            <h3 style="background-color: none">NFT 주소</h3>
            <button @click="clickContractAddr">
              <p>{{ state.nftData.contractAddr }}</p>
            </button>
          </div>
        </div>
      </div>
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
import { computed } from 'vue';
import VueQrcode from '@chenfengyuan/vue-qrcode';

export default {
  components: { VueQrcode },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const userId = computed(() => route.params.userId);
    const productId = computed(() => route.params.productId);
    const orderId = computed(() => route.params.orderId);
    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;

    const state = reactive({
      nftData: '',
    });

    onBeforeMount(async () => {
      if (!userId.value || !productId.value || !orderId.value) {
        Swal.fire('정상적인 경로로 접근해주세요');
        router.push('order');
      }

      await getNftData();
    });

    const getNftData = async () => {
      try {
        const response = await axios.post(
          "https://sbbro.xyz/v2/nft/api/nft",
          {
            userId: userId.value,
            productId: productId.value,
            orderId: orderId.value,
          },
        );
        state.nftData = response.data[0];
        console.log('data', state.nftData);
      } catch (err) {
        console.log(err);
      }
    };

    const clickContractAddr = () => {
      var win = window.open(
        'https://baobab.scope.klaytn.com/account/' + state.nftData.contractAddr,
        '_blank',
      );
      win.focus();
    };

    return { state, globalProperties, clickContractAddr };
  },
};
</script>

<style scoped>
.pc-wrap {
}

.mypage {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  width: 1182px;
  height: 500px;
  /* min-height: 1467px; */
  padding: 40px;
  box-sizing: border-box;
  margin-left: 0;
}

.nft_grid {
  display: grid;
  grid-template-columns: 400px 500px;
  width: 800px;
}

.data_grid {
  display: grid;
  grid-template-columns: 150px 300px;
}

.data_grid h3 {
  font-weight: bold;
}
</style>

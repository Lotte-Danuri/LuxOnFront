<template>
  <div class="mypage">
    <!-- <h2>NFT 인증서</h2> -->
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
        margin-top: 5%;
      "
    >
      <div class="nft_grid" style="margin-left: 0%; margin-top: 0%">
        <div style="margin-left: 25%">
          <div class="main__styling-text" style="margin-top: 15%">
            <h1 class="regularbold" style="font-size: 35px">NFT</h1>
            <h1 style="text-align: center; font-size: 35px; margin-bottom: 10%">
              보증서
            </h1>
            <div class="main__styling-info">
              <p class="main__styling-text-description" style="font-size: 15px">
                {{ state.nftData.brandName }}
              </p>
              <p class="main__styling-text-strong" style="font-size: 20px">
                {{ state.nftData.name }}
              </p>
              <p class="main__styling-text-description" style="font-size: 15px">
                {{
                  globalProperties.$formatDatetime(
                    new Date(state.nftData.registeredDate)
                  )
                }}
              </p>
            </div>
            <div style="margin-bottom: 40px">
              <div style="border: 1px solid green; width: 122px">
                <a
                  :href="
                    'https://baobab.scope.klaytn.com/account/' +
                    state.nftData.contractAddr
                  "
                  target="_blank"
                  style="width: 50px"
                >
                  <VueQrcode
                    style="margin-left: 0px"
                    :value="
                      'https://baobab.scope.klaytn.com/account/' +
                      state.nftData.contractAddr
                    "
                    tag="svg"
                    :options="{ width: 120 }"
                  ></VueQrcode>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          class="nft"
          style="
            background-image: url('https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_960_720.png');
            background-size: auto;
            background-repeat: no-repeat;
            background-position: center center;
            width: 340px;
            height: 400px;
            margin-left: 25%;
            margin-top: 5%;
            position: relative;
          "
        >
          <img
            style="
              margin-left: 5%;
              width: 80px;
              position: absolute;
              mix-blend-mode: darken;
            "
            src="@/assets/logo/logo_white_6.png"
          />
          <img
            style="
              width: 270px;
              height: 300px;
              margin-top: 14%;
              margin-left: 10%;
              mix-blend-mode: hard-light;
            "
            :src="state.nftData.image"
          />
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
import { computed } from "vue";
import VueQrcode from "@chenfengyuan/vue-qrcode";

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
      nftData: "",
    });

    onBeforeMount(async () => {
      if (!userId.value || !productId.value || !orderId.value) {
        Swal.fire("정상적인 경로로 접근해주세요");
        router.push("order");
      }

      await getNftData();
    });

    const getNftData = async () => {
      try {
        const response = await axios.post("https://sbbro.xyz/v2/nft/api/nft", {
          userId: userId.value,
          productId: productId.value,
          orderId: orderId.value,
        });
        state.nftData = response.data[0];
        console.log("data", state.nftData);
      } catch (err) {
        console.log(err);
      }
    };

    const clickContractAddr = () => {
      var win = window.open(
        "https://baobab.scope.klaytn.com/account/" + state.nftData.contractAddr,
        "_blank"
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
<style scoped>
.listBtn button {
  background-color: transparent;
}
.firstSwiper {
  width: 100%;
  height: 600px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

/* .firstSwiper img {
  margin-left: 1000px;
} */

/* Position text in the middle of the page/image */
.bg-text {
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
  color: white;
  font-weight: bold;
  border: 3px solid #f1f1f1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 80%;
  padding: 20px;
  text-align: center;
}

.coupon-text {
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
  color: white;
  font-weight: bold;
  border: 3px solid #f1f1f1;
  position: relative;
  margin-top: -60%;
  top: -100px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 50%;
  padding: 20px;
  text-align: center;
}

.container_grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  grid-auto-rows: minmax(25px, auto);
}
.coupon_grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(25px, auto);
}

.container_grid img {
  width: 280px;
  height: 400px;
  border-radius: 30px;
}

.container_grid div span p {
  margin: 0px;
}

.favorite_cls {
  opacity: 0;
  transform: translateY(150px);
  transition: 2s all ease;
  /* transition-timing-function: ease;
  transition-duration: 1.5s;
  transition-property: opacity, transform; */
}

.favorite_cls.active {
  /* opacity: 0; */
  /* transform: translateY(0); */
  /* transition-timing-function: ease; */
}

.recommend_cls {
  opacity: 0;
  transform: translateY(150px);
  transition: 2s all ease;
  /* transition-timing-function: ease;
  transition-duration: 1.5s;
  transition-property: opacity, transform; */
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

.product_grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  grid-auto-rows: minmax(5px, auto);
  margin-right: 20%;
}

.product_grid div {
  background-color: rgb(238, 238, 238);
  width: 250px;
  height: 400px;
  margin-bottom: 90px;
}

.product_grid div img {
  height: 400px;
}

.product_grid div span p {
  font-weight: bold;
}
.product_grid div span p {
  margin: 0px;
}

.rank_num {
  position: absolute;
  background-color: black;
  color: white;
  font-size: 20px;
  margin: 0;
  text-align: center;
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

<template>
  <div class="mypage col-12 col-md-9 col-lg-8 offset-lg-1">
    <h2>주문/배송 조회</h2>
    <!-- Order -->
    <div class="card card-lg mb-5 border">
      <div
        v-for="order in state.orderList"
        v-bind:key="order"
        class="card-body pb-0"
      >
        <!-- Info -->
        <div class="card card-sm">
          <div class="card-body bg-light">
            <div class="row">
              <div class="col-6 col-lg-3">
                <!-- Heading -->
                <h6 class="heading-xxxs text-muted">{{}}</h6>
                <!-- Text -->
                <p class="mb-lg-0 fs-sm fw-bold">NO.{{ order.id }}</p>
              </div>
              <div class="col-6 col-lg-3">
                <!-- Heading -->
                <h6 class="heading-xxxs text-muted">Ordered date:</h6>
                <!-- Text -->
                <p class="mb-lg-0 fs-sm fw-bold">
                  <time datetime="2019-10-01">
                    {{ order.orderDate }}
                  </time>
                </p>
              </div>
              <div class="col-6 col-lg-3">
                <!-- Heading -->
                <h6 class="heading-xxxs text-muted">Status:</h6>
                <!-- Text -->
                <p class="mb-0 fs-sm fw-bold">구매완료</p>
              </div>
              <div class="col-6 col-lg-3">
                <!-- Heading -->
                <h6 class="heading-xxxs text-muted">Total Price:</h6>
                <!-- Text -->
                <p class="mb-0 fs-sm fw-bold">
                  {{ comma(order.totalPrice) }}
                </p>
              </div>
              <div>
                <br />
                <div v-for="o in order.orderDataDtoList" v-bind:key="o">
                  <div>
                    <div class="row">
                      <div class="col-3 col-lg-2">
                        <img :src="o.thumbnail" />
                      </div>
                      <div
                        class="col-7 col-lg-6"
                        style="
                          font-family: 'Lucida Sans', 'Lucida Sans Regular',
                            'Lucida Grande', 'Lucida Sans Unicode', Geneva,
                            Verdana, sans-serif;
                        "
                      >
                        <div style="margin-top: 7%">
                          <span
                            >[상품명] {{ o.productName.substring(0, 15) }}</span
                          >
                          <br />
                          <span>[가격] {{ comma(o.productPrice) }}원</span>
                          <br />
                          <span
                            >[보증기간] {{ o.warrantyStartDate }} [2022-10-19 ~
                            {{ o.warrantyEndDate }}2025-10-19]</span
                          >
                        </div>
                      </div>
                      <div
                        class="col-2 col-lg-4"
                        style="
                          font-family: 'Franklin Gothic Medium', 'Arial Narrow',
                            Arial, sans-serif;
                        "
                      >
                        <router-link
                          :to="{
                            path: '/product/myProduct',
                            query: {
                              productCode: o.productCode,
                            },
                          }"
                        >
                          <button
                            style="
                              width: 200px;
                              height: 50px;
                              margin-top: 15%;
                              background-color: black;
                              color: white;
                              border-radius: 5px;
                            "
                          >
                            상품상세
                          </button>
                        </router-link>
                        <button
                          style="
                            width: 200px;
                            height: 50px;
                            margin-top: 15%;
                            background-color: black;
                            color: white;
                            border-radius: 5px;
                          "
                          @click="pushNft(o)"
                        >
                          NFT 증명서
                        </button>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
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
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const comma =
      getCurrentInstance().appContext.config.globalProperties.$comma;
    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;
    const state = reactive({
      orderList: [],
    });

    onBeforeMount(() => {
      if (globalProperties.$isLogin() == false) {
        Swal.fire("로그인 해주세요").then(() => {
          router.push("/login");
        });
      }

      axios
        .get("https://sbbro.xyz/api/member/products", {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          state.orderList = response.data;
        });
    });

    const checkNft = (productId) => {};

    const pushNft = (order) => {
      if (!checkNft(order.orderDataDtoList.productId)) {
        Swal.fire({
          title: "NFT 증명서를 등록 하시겠습니까?",
        });
      }

      router.push({});
    };

    return { state, comma, pushNft };
  },
};
</script>

<style>
.mypage {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  width: 1182px;
  min-height: 1467px;
  padding: 40px;
  box-sizing: border-box;
  margin-left: 0;
}
</style>

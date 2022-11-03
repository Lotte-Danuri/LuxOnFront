<template>
  <div class="col-12 col-md-9 col-lg-8 offset-lg-1">
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
                  {{ self.$comma(order.totalPrice) }}
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
                          <span
                            >[가격] {{ self.$comma(o.productPrice) }}원</span
                          >
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

let self;

export default {
  created() {
    self = this;
  },
  setup() {
    const state = reactive({
      orderList: [],
    });

    onBeforeMount(() => {
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

    return { state, self };
  },
};
</script>

<style></style>

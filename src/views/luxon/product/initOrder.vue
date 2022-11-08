<template>
  <main>
    <div style="width: 80%; margin-left: 10%; margin-right: 10%">
      <br />
      <h2 style="text-align: center; font-weight: bold; margin-top: 50px">
        주문서
      </h2>
      <hr style="border: 2px solid black" />
      <div class="initOrder_grid">
        <div>
          <div>
            <h2 style="font-weight: bold">배송지</h2>
            <hr />
            <br />
            <div>
              <div class="small_grid">
                받는분
                <p id="insertAddress">{{ state.userInfo.address }}</p>
                <button
                  style="
                    width: 100px;
                    height: 30px;
                    background-color: white;
                    border: solid 1px black;
                  "
                  @click="openPost"
                >
                  입력
                </button>
              </div>
              <div class="small_grid">
                배송 메시지
                <select
                  style="
                    margin-left: 10%;
                    width: 450px;
                    height: 30px;
                    color: gray;
                    border: solid 1px;
                    text-align: center;
                  "
                >
                  <option>배송 전에 미리 연락 바랍니다.</option>
                  <option>부재 시 경비실에 맡겨 주세요.</option>
                  <option>부재 시 문 앞에 놓아 주세요.</option>
                  <option>부재 시 전화나 문자 주세요.</option>
                </select>
              </div>
            </div>
            <hr style="border: 3px solid gray" />
          </div>
          <div>
            <h2 style="font-weight: bold">주문고객</h2>
            <hr />
            <br />
            <div class="custom_info">
              <div class="small_grid">
                이름
                <input :value="state.userInfo.name" />
              </div>
              <!-- <div class="small_grid">
                이메일 주소
                <input value="lotte@luxon.com" />
              </div> -->
              <div class="small_grid">
                휴대폰 번호
                <div>
                  <select
                    style="width: 50px; height: 30px; border: 1px solid gray"
                  >
                    <option>010</option>
                    <option>011</option>
                    <option>016</option>
                  </select>
                  <input
                    style="margin-left: 10px; width: 323px"
                    :value="state.userInfo.phoneNumber"
                  />
                </div>
              </div>
              <div class="small_grid">
                다른 연락처
                <input value="" />
              </div>
            </div>
            <hr style="border: 3px solid gray" />
          </div>
          <div>
            <h2 style="font-weight: bold">주문상품</h2>
            <hr />
            <br />
            <div v-for="product in products" :key="product">
              <div class="order_product_grid">
                <router-link
                  :to="{
                    path: '/product/myProduct',
                    query: { productCode: product.productDto.productCode },
                  }"
                >
                  <img :src="product.productDto.thumbnailUrl" />
                </router-link>
                <div>
                  <p style="font-weight: bold">{{ product.brandName }}</p>
                  <router-link
                    :to="{
                      path: '/product/myProduct',
                      query: { productCode: product.productDto.productCode },
                    }"
                  >
                    <p>{{ product.productDto.productName }}</p>
                  </router-link>
                </div>
                <div>
                  <p>{{ product.quantity }}개 주문</p>
                </div>
                <div>
                  <p style="font-weight: bold">
                    {{
                      comma(
                        product.productDto.price * product.quantity -
                          product.discountPrice
                      )
                    }}원
                  </p>
                </div>
              </div>

              <div class="small_grid">
                쿠폰적용
                <select
                  :v-model="state.couponPick"
                  style="
                      width: 300px;
                      height: 30px;
                      margin-left:10%
                      color: gray;
                      border: solid 1px;
                      text-align: center;
                    "
                  @change="onChangeCoupon(product, $event)"
                >
                  <option v-if="!reserveCouponId" value="none" selected>
                    === 선택 ===
                  </option>
                  <option
                    v-for="(coupon, index) in product.coupons"
                    :key="coupon"
                    :value="index"
                  >
                    {{ coupon.name }} : {{ coupon.discountRate }}% 할인
                  </option>
                </select>
                <button
                  style="width: 100px; background-color: black; color: white"
                  @click="applyCoupon(product)"
                >
                  적용
                </button>
              </div>
              <hr style="border: 3px solid gray" />
            </div>
          </div>
        </div>
        <aside class="aside" style="padding: 20px; height: 410px">
          <br />
          <div class="small_aside_grid">
            <div style="font-weight: bold; color: gray">총 상품금액</div>
            <div style="margin-left: 30%">{{ comma(state.totalPrice) }} 원</div>
          </div>
          <hr />
          <div class="small_aside_grid">
            <div style="font-weight: bold; color: gray">총 할인금액</div>
            <div style="margin-left: 30%">
              {{ comma(state.totalDiscountPrice) }} 원
            </div>
          </div>
          <hr />
          <div class="small_aside_grid">
            <div style="font-weight: bold; color: gray">배송비</div>
            <div style="margin-left: 30%">{{ comma(state.delivaryFee) }}원</div>
          </div>
          <hr style="border: 4px solid black" />
          <br /><br />
          <div>
            <div style="font-weight: bold; color: gray">최종 결제금액</div>
            <div
              style="
                margin-left: 10%;
                font-size: 40px;
                font-weight: bold;
                color: goldenrod;
              "
            >
              {{ comma(state.totalPrice + state.delivaryFee) }}원
            </div>
          </div>
          <hr />
          <button
            style="
              background-color: black;
              width: 200px;
              height: 40px;
              margin-top: 3%;
              margin-left: 15%;
              color: white;
            "
            @click="order"
          >
            결제하기
          </button>
        </aside>
      </div>
    </div>
  </main>
</template>
<script>
import { computed, reactive } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import axios from "axios";
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {},

  setup() {
    const route = useRoute();
    const router = useRouter();
    const products = computed(() =>
      route.params.products ? JSON.parse(route.params.products) : null
    );
    const reserveCouponId = computed(() =>
      route.params.couponId ? route.params.couponId : null
    );
    const state = reactive({
      userInfo: "",
      order: "",
      totalPrice: 0,
      totalQuantity: 0,
      totalDiscountPrice: 0,
      delivaryFee: 5000,
    });

    onBeforeMount(async () => {
      await router.isReady();

      isProductsData();

      await setProductsCoupon().then(() => {
        calTotalPriceAndQuantity();
      });

      console.log(products);

      loginCheck();

      getUserData();
    });

    const setProductsCoupon = async () => {
      if (reserveCouponId.value != null) {
        setReserveCoupon();
        return;
      }

      for (var index in products.value) {
        await axios
          .post(
            "https://sbbro.xyz/api/member/mycoupon/product",
            {
              productId: products.value[index].productDto.id,
            },
            {
              headers: {
                Authorization: `Bearer ` + localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            products.value[index].coupons = response.data;
            products.value[index].discountPrice = 0;
            products.value[index].selectedCouponIndex = -1;
          });
        }
    };

    const setReserveCoupon = async () => {
      try {
        const response = await axios.get(
          "https://sbbro.xyz/api/product/coupons/" + reserveCouponId.value,
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("token"),
            },
          }
          );
          products.value[0].coupons = [];
          products.value[0].coupons.push(response.data);
          products.value[0].discountPrice = 0;
          products.value[0].selectedCouponIndex = 0;
          applyCoupon(products.value[0]);
      } catch (err) {
        console.log(err)
      }
    };

    const getUserData = async () => {
      await axios
        .get("https://sbbro.xyz/api/member/members", {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          state.userInfo = response.data;
        });
    };

    const loginCheck = () => {
      if (localStorage.getItem("token") == null) {
        Swal.fire("로그인 해주세요").then(() => {
          router.push("/login");
        });
      }
    };

    const isProductsData = () => {
      if (products.value == null) {
        Swal.fire("올바른 경로로 접근해주세요").then(() => {
          router.push("/cart");
        });
      }
    };

    const calTotalPriceAndQuantity = async () => {
      state.totalPrice = 0;
      state.totalQuantity = 0;
      state.totalDiscountPrice = 0;

      for (var index in products.value) {
        state.totalPrice +=
          products.value[index].quantity *
            products.value[index].productDto.price -
          products.value[index].discountPrice;
        state.totalQuantity += products.value[index].quantity;
        state.totalDiscountPrice +=
          products.value[index].quantity * products.value[index].discountPrice;
      }
    };

    const order = () => {
      Swal.fire({
        title: "결제 하시겠습니까?",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "네",
        cancelButtonText: "아니요",
      }).then((result) => {
        if (result.isConfirmed) {
          var orderDataDtoList = new Array();
          for (var index in products.value) {
            var jsonTemp = new Object();
            jsonTemp.productId = products.value[index].productDto.id;
            jsonTemp.productName = products.value[index].productDto.productName;
            jsonTemp.productQuantity = products.value[index].quantity;
            jsonTemp.productPrice = products.value[index].productDto.price;
            orderDataDtoList.push(jsonTemp);
          }
          axios
            .post(
              `https://sbbro.xyz/api/order/orders/pays`,
              {
                buyerId: state.userInfo.id,
                totalPrice: state.totalPrice,
                totalQuantity: state.totalQuantity,
                orderDataDtoList: orderDataDtoList,
              },
              {
                headers: {
                  Authorization: `Bearer ` + localStorage.getItem("token"),
                },
              }
            )
            .then((response) => {
              Swal.fire("주문이 완료되었습니다.");
              router.push("/mypage/order");
            });
        }
      });
    };

    const onChangeCoupon = (product, event) => {
      if (event.target.value == "none") {
        product.selectedCouponIndex = -1;
        return;
      }
      product.selectedCouponIndex = event.target.value;
    };

    const applyCoupon = (product) => {
      var discountRate =
        product.selectedCouponIndex != -1
          ? product.coupons[product.selectedCouponIndex].discountRate
          : 0;
      product.discountPrice = (discountRate / 100) * product.productDto.price;
      calTotalPriceAndQuantity();
    };

    const showAlert = () => {
      this.$swal("적용 되었습니다");
    };

    const comma = (val) => {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return {
      state,
      products,
      comma,
      showAlert,
      order,
      onChangeCoupon,
      applyCoupon,
      calTotalPriceAndQuantity,
      reserveCouponId,
    };
  },
};
</script>

<style scoped>
.initOrder_grid {
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
  display: grid;
  grid-template-columns: 65% 35%;
}

.aside {
  background-color: rgb(230, 230, 230);
  margin-left: 20%;
  position: sticky;
  top: 50px;
}

.small_grid {
  font-weight: bold;
  color: gray;
  margin-left: 5%;
  display: grid;
  grid-template-columns: 15% 70% 35%;
}

.custom_info div input {
  border: 1px solid gray;
  height: 30px;
  padding: 10px;
}

.order_product_grid {
  display: grid;
  grid-template-columns: 15% 40% 30% 35%;
}

.order_product_grid div {
  margin-left: 10%;
}

.order_product_grid div p {
  font-size: 15px;
}

.small_aside_grid {
  display: grid;
  grid-template-columns: 50% 50%;
  height: 5px;
}
</style>

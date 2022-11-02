<template>
  <!-- CONTENT -->
  <section class="pt-7 pb-12">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <!-- Heading -->
          <h3 class="mb-10 text-center">Shopping Cart</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-7">
          <!-- List group -->
          <ul
            v-for="(product, index) in state.products"
            :key="index"
            class="list-group list-group-lg list-group-flush-x mb-6"
          >
            <li class="list-group-item">
              <div class="row align-items-center">
                <div class="col-3">
                  <!-- Image -->
                  <a href="htts://sbbro.xyz">
                    <img
                      :src="product.productDto.thumbnailUrl"
                      alt="..."
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="col">
                  <!-- Title -->
                  <div class="d-flex mb-2 fw-bold">
                    <a class="text-body" href="product.html">{{
                      product.productDto.productName
                    }}</a>
                    <span class="ms-auto"
                      >{{ comma(product.productDto.price) }} 원</span
                    >
                  </div>

                  <!-- Text -->
                  <p class="mb-7 fs-sm text-muted">
                    {{ product.storeName }}&nbsp;&nbsp;&nbsp;{{
                      product.productDto.productCode
                    }}
                    <br />
                    보증기간 : {{ product.productDto.warranty }} 개월
                  </p>

                  <!--Footer -->
                  <div class="d-flex align-items-center">
                    <!-- Select -->
                    <div class="row">
                      <div class="col-auto">
                        <label class="col-form-label">구매수량</label>
                      </div>
                      <div class="col-auto">
                        <div class="input-group">
                          <span
                            class="input-group-text"
                            style="cursor: pointer"
                            @click="calculatePrice(product, -1)"
                            >-</span
                          >
                          <input
                            v-model="product.quantity"
                            type="text"
                            class="form-control"
                            style="width: 40px"
                          />
                          <span
                            class="input-group-text"
                            style="cursor: pointer"
                            @click="calculatePrice(product, 1)"
                            >+</span
                          >
                        </div>
                      </div>
                    </div>

                    <!-- Remove -->
                    <a
                      class="fs-xs text-gray-400 ms-auto"
                      @click="removeProduct(index)"
                    >
                      <i class="fe fe-x"></i> Remove
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <!-- Footer -->
          <div
            class="row align-items-end justify-content-between mb-10 mb-md-0"
          >
            <div class="col-12 col-md-7">
              <!-- Coupon -->
              <form class="mb-7 mb-md-0">
                <label class="form-label fs-sm fw-bold" for="cartCouponCode">
                  Coupon code:
                </label>
                <div class="row row gx-5">
                  <div class="col">
                    <!-- Input -->
                    <input
                      id="cartCouponCode"
                      class="form-control form-control-sm"
                      type="text"
                      placeholder="Enter coupon code*"
                    />
                  </div>
                  <div class="col-auto">
                    <!-- Button -->
                    <button class="btn btn-sm btn-dark" type="submit">
                      Apply
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-12 col-md-auto">
              <!-- Button -->
              <button class="btn btn-sm btn-outline-dark">Update Cart</button>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-5 col-lg-4 offset-lg-1">
          <!-- Total -->
          <div class="card mb-7 bg-light">
            <div class="card-body">
              <ul
                class="list-group list-group-sm list-group-flush-y list-group-flush-x"
              >
                <li class="list-group-item d-flex">
                  <span>상품 금액</span>
                  <span class="ms-auto fs-sm"
                    >{{ comma(total()) }}&nbsp;원</span
                  >
                </li>
                <li class="list-group-item d-flex">
                  <span>배송 금액</span>
                  <span class="ms-auto fs-sm">{{ comma(5000) }}&nbsp;원</span>
                </li>
                <li class="list-group-item d-flex fs-lg fw-bold">
                  <span>총 금액</span>
                  <span class="ms-auto fs-sm"
                    >{{ comma(total() + 5000) }}&nbsp;원</span
                  >
                </li>
                <li class="list-group-item fs-sm text-center text-gray-500">
                  * 배송비가 포함된 가격입니다 *
                </li>
              </ul>
            </div>
          </div>

          <!-- Button -->
          <button
            type="button"
            class="btn w-100 btn-dark mb-2"
            @click="addOrder(state.products)"
          >
            주문하기
          </button>

          <!-- Link -->
          <a class="btn btn-link btn-sm px-0 text-body" href="shop.html">
            <i class="fe fe-arrow-left me-2"></i> Continue Shopping
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, reactive } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import axios from "axios";
import Swal from "sweetalert2";
import router from "@/router";

export default {
  setup() {
    const id = computed(() => router.params.id);
    const state = reactive({
      products: [],
    });

    onBeforeMount(async () => {
      if (localStorage.getItem("token") == null) {
        Swal.fire("로그인 해주세요").then(() => {
          router.push("/login");
        });
      }

      console.log("before Mounted");
      await axios
        .get("https://sbbro.xyz/api/member/cart", {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          state.products = response.data;
        });
      console.log("end");
    });

    const comma = (val) => {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const total = () => {
      var totalPrice = 0;
      for (var i in state.products) {
        totalPrice +=
          state.products[i].productDto.price * state.products[i].quantity;
      }
      return totalPrice;
    };

    const totalQuantity = (products) => {
      var totalQuantity = 0;
      for (var i in products) {
        totalQuantity += products[i].quantity;
      }
      return totalQuantity;
    };

    const calculatePrice = (product, cnt) => {
      product.quantity = product.quantity + cnt;
      if (product.quantity < 1) product.quantity = 1;
    };

    const removeProduct = (index) => {
      Swal.fire({
        title: "삭제하시겠습니까?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "네",
        cancelButtonText: "아니요",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("장바구니에서 삭제되었습니다.", "", "success");
          state.products.pop(index);
        }
      });
    };

    const addOrder = (products) => {
        Swal.fire({
            title: "주문 하시겠습니까?",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "네",
        cancelButtonText: "아니요",
    }).then((result) => {
        if (result.isConfirmed) {
            router.push({
              name: "initOrder",
              params: {
            products : JSON.stringify(state.products)},
            });
        }
      });

      
    };

    return {
      state,
      comma,
      total,
      totalQuantity,
      addOrder,
      calculatePrice,
      removeProduct,
      id,
    };
  },
};
</script>

<style></style>

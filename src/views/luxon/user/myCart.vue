<template>
  <!-- CONTENT -->
  <section class="pt-7 pb-12" style="height: 1500px">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <!-- Heading -->
          <h1 class="mb-10 text-center">Shopping Cart</h1>
        </div>
      </div>
      <div class="row" style="margin-top: 10%">
        <div class="col-12 col-md-7">
          <!-- List group -->
          <div v-if="state.products.length == 0" class="cart_empty">
            <!-- <h2>장바구니가 비어있습니다.</h2> -->
          </div>
          <ul
            v-for="(product, index) in state.products"
            :key="index"
            class="list-group list-group-lg list-group-flush-x mb-6"
          >
            <li class="list-group-item">
              <div class="row align-items-center">
                <div class="col-3">
                  <!-- Image -->
                  <router-link
                    :to="{
                      path: '/product/myProduct',
                      query: { productCode: product.productDto.productCode },
                    }"
                  >
                    <img
                      :src="product.productDto.thumbnailUrl"
                      alt="..."
                      class="img-fluid"
                    />
                  </router-link>
                </div>
                <div class="col">
                  <!-- Title -->
                  <div class="d-flex mb-2 fw-bold">
                    <router-link
                      :to="{
                        path: '/product/myProduct',
                        query: { productCode: product.productDto.productCode },
                      }"
                      >{{ product.productDto.productName }}</router-link
                    >
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
                    <a @click="removeProduct(index)" style="margin-left: 10px">
                      <i class="fa-solid fa-trash"></i>&nbspremove
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
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
            style="
              margin-top: 20px;
              width: 350px;
              height: 50px;
              background-color: black;
              border-radius: 20px;
              font-size: 15px;
              color: white;
            "
            @click="addOrder(state.products)"
          >
            주문하기
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, reactive } from 'vue';
import { getCurrentInstance } from 'vue';
import { onBeforeMount } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const comma =
      getCurrentInstance().appContext.config.globalProperties.$comma;
    const router = useRouter();
    const id = computed(() => router.params.id);
    const state = reactive({
      products: [],
    });

    onBeforeMount(async () => {
      if (localStorage.getItem('token') == null) {
        Swal.fire('로그인 해주세요').then(() => {
          router.push('/login');
        });
      }

      await axios
        .get('https://sbbro.xyz/api/member/cart', {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
          },
        })
        .then(response => {
          console.log(response);
          state.products = response.data;
          if (state.products.length == 0) {
            Swal.fire('장바구니가 비어있습니다').then(() => {
              router.push('/main');
            });
          }
        });
    });

    const total = () => {
      var totalPrice = 0;
      for (var i in state.products) {
        totalPrice +=
          state.products[i].productDto.price * state.products[i].quantity;
      }
      return totalPrice;
    };

    const totalQuantity = products => {
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

    const removeProduct = index => {
      Swal.fire({
        title: '삭제하시겠습니까?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '네',
        cancelButtonText: '아니요',
      }).then(result => {
        if (result.isConfirmed) {
          axios
            .delete('https://sbbro.xyz/api/member/cart', {
              data: {
                id: state.products[index].id,
              },
              headers: {
                Authorization: `Bearer ` + localStorage.getItem('token'),
              },
            })
            .then(() => {
              Swal.fire('장바구니에서 삭제되었습니다.', '', 'success');
              state.products = state.products.filter(function (product) {
                return product.id != state.products[index].id;
              });
            });
        }
      });
    };

    const addOrder = products => {
      Swal.fire({
        title: '주문 하시겠습니까?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: '네',
        cancelButtonText: '아니요',
      }).then(result => {
        if (result.isConfirmed) {
          router.push({
            name: 'initOrder',
            params: {
              products: JSON.stringify(state.products),
            },
          });
        }
      });
    };

    const emptyProduct = products => {
      if (this.products == null) {
        Swal.fire('장바구니가 비어있습니다').then(() => {
          router.push('/main');
        });
      }
    };

    window.scrollTo(0, 0);

    return {
      state,
      comma,
      total,
      totalQuantity,
      addOrder,
      calculatePrice,
      removeProduct,
      id,
      emptyProduct,
    };
  },
};
</script>

<style>
.cart_empty {
  text-align: center;
}
</style>

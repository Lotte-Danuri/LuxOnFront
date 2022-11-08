<template>
  <main>
    <div class="list_contents">
      <div class="div_top">
        <div>
          <img :src="state.products[0]?.imageList[0]" />
        </div>
        <div style="margin-left: 10%">
          <span>
            <div style="display: flex; justify-content: space-between">
              <p>상품코드 {{ state.productCode }}</p>
              <button>
                <like-button
                  v-bind:productCode="state.productCode"
                ></like-button>
              </button>
            </div>
            <h1>{{ state.products[0]?.productName }}</h1>
            <h2 style="font-weight: bold">
              ￦{{ comma(state.products[0]?.price) }}원
            </h2>
          </span>
          <hr />

          <div class="option_grid">
            <div class="option_name">
              <h3>지점</h3>
            </div>
            <div class="size_div" style="float: left">
              <div
                v-for="(product, index) in state.products"
                v-bind:key="index"
                class="form-check form-check-inline form-check-size mb-2"
              >
                <input
                  :id="'문자열' + index"
                  v-model="state.selectedStoreIndex"
                  type="radio"
                  class="form-check-input"
                  name="sizeRadio"
                  :value="index"
                  data-toggle="form-caption"
                  data-target="#sizeCaption"
                />
                <label class="form-check-label" :for="'문자열' + index">{{
                  product.storeName
                }}</label>
              </div>
            </div>
          </div>
          <hr />
          <div class="option_grid">
            <div class="option_name">
              <h3>수량</h3>
            </div>
            <div class="count">
              <button @click="minusBtn">-</button>
              <input
                id="countValue"
                :value="state.quantity"
                style="text-align: center"
              />
              <button @click="plusBtn">+</button>
            </div>
          </div>
          <hr style="border: 3px solid black !important" />
          <div class="option_grid">
            <div class="option_name">
              <h3>판매가</h3>
            </div>
            <div class="size_div" style="float: left">
              <h2 style="margin-left: 50%; font-weight: bold">
                {{ comma(state.sumPrice) }} 원
              </h2>
            </div>
          </div>
          <div class="actionBtn">
            <button style="background-color: gray" @click="addCart">
              장바구니
            </button>
            <button @click="initOrder" style="margin-left: 10%">
              바로구매
            </button>
          </div>
        </div>
      </div>
      <div>
        <h1>상품상세</h1>
        <div
          style="margin-right: 20%"
          v-for="productImg in state.products[0]?.imageList"
          v-bind:key="productImg"
        >
          <img :src="productImg" alt="/" />
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { reactive } from "vue";
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import LikeButton from "@/components/button/likeButton.vue";
import { getCurrentInstance } from "@vue/runtime-core";

export default {
  components: { LikeButton },
  setup() {
    const router = useRouter();
    const state = reactive({
      productCode: "",
      products: [],
      sumPrice: 0,
      selectedStoreIndex: "",
      quantity: 0,
    });
    const comma =
      getCurrentInstance().appContext.config.globalProperties.$comma;

    onBeforeMount(() => {
      var route = useRoute();
      state.productCode = route.query.productCode;
      axios
        .get("https://sbbro.xyz/api/product/products/list/" + state.productCode)
        .then((response) => {
          if (response.status == 200) {
            state.products = response.data;
            console.log(state.products);
            state.sumPrice =
              document.getElementById("countValue").value *
              state.products[0].price;
          }
        })
        .catch(() => {
          alert("해당 상품은 조회할 수 없습니다.");
          history.back();
        });
    });

    const minusBtn = () => {
      if (state.quantity > 0) {
        state.quantity--;
        state.sumPrice = state.quantity * state.products[0].price;
      }
    };
    const plusBtn = () => {
      state.quantity++;
      state.sumPrice = state.quantity * state.products[0].price;
    };

    const loginCheck = () => {
      if (localStorage.getItem("token") == null) {
        Swal.fire({
          title: "로그인 해주세요",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "확인",
        }).then(() => {
          return false;
        });
      } else {
        return true;
      }
    };

    const isSelectStore = () => {
      if (state.selectedStoreIndex === "") {
        Swal.fire("지점을 선택해주세요");
        return false;
      }
      return true;
    };

    const isSelectQuantity = () => {
      if (state.quantity === 0) {
        Swal.fire("수량을 선택해주세요");
        return false;
      }
      return true;
    };

    const initOrder = () => {
      if (!loginCheck()) {
        return;
      }

      if (!isSelectStore()) {
        return;
      }

      if (!isSelectQuantity()) {
        return;
      }

      Swal.fire({
        title: "주문 하시겠습니까?",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "네",
        cancelButtonText: "아니요",
      }).then((result) => {
        if (result.isConfirmed) {
          var productsData = [];
          var product = {
            storeName: state.products[0].storeName,
            quantity: state.quantity,
            productDto: {
              id: state.products[0].id,
              price: state.products[0].price,
              productCode: state.products[0].productCode,
              productName: state.products[0].productName,
              storeId: state.products[0].storeId,
              thumbnailUrl: state.products[0].thumbnailUrl,
              warranty: state.products[0].warranty,
            },
          };
          productsData.push(product);
          router.push({
            name: "initOrder",
            params: {
              products: JSON.stringify(productsData),
            },
          });
        }
      });
    };

    const addCart = () => {
      if (!loginCheck()) {
        return;
      }

      if (!isSelectStore()) {
        return;
      }

      if (!isSelectQuantity()) {
        return;
      }

      axios
        .post(
          "https://sbbro.xyz/api/member/cart",
          {
            productId: state.products[state.selectedStoreIndex].id,
            quantity: state.quantity,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            Swal.fire({
              title: "상품이 장바구니에 담겼습니다.",
              icon: "success",
              showCancelButton: true,
              confirmButtonText: "장바구니로 이동",
              cancelButtonText: "계속 쇼핑하기",
            }).then((result) => {
              if (result.isConfirmed) {
                router.push("/cart");
              }
            });
          }
        });
    };

    return { state, minusBtn, plusBtn, initOrder, comma, addCart };
  },
};
</script>
<style scoped>
input[type="radio"] {
  display: none;
  margin: 10px;
}

input[type="radio"] + label {
  display: inline-block;
  margin: -2px;
  padding: 8px 19px;
  background-color: #ffffff;
  border: 1px solid rgb(0, 0, 0);
  font-size: 13px !important;
  width: 130px;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
}

input[type="radio"]:checked + label {
  background-color: #38363656;
}
.list_contents {
  margin-left: 20%;
  margin-top: 5%;
}
.div_top {
  margin-right: 20%;
  display: grid;
  grid-template-columns: 40% 60%;
}

.option_grid {
  display: grid;
  grid-template-columns: 30% 70%;
  margin-bottom: -20px;
  margin-top: 20px;
}

.option_name {
  margin-left: 15%;
}

.option_name h3 {
  font-weight: bold;
}

.option_grid button {
  width: 300px;
  height: 30px;
  background-color: white;
  border-color: black;
  border: 1px solid black;
}

.size_div {
  margin-bottom: 0px;
}

.size_div button {
  width: 70px;
  margin-left: 20px;
}

.count {
  display: flex;
}
.count input {
  width: 250px;
  height: 40px;
  border: solid 1px black;
}

.count button {
  width: 40px;
  height: 40px;
}

.actionBtn button {
  width: 250px;
  height: 70px;
  font-size: 20px;
  background-color: black;
  color: white;
  margin-top: 40px;
  margin-right: 10px;
  margin-left: 30px;
}
</style>

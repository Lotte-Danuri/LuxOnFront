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
          <br />
          <div class="option_grid">
            <div class="option_name">
              <h3>할인쿠폰</h3>
            </div>
            <div>
              <button>50% 상품쿠폰</button>
              <br />
              <br />
              <button>15% 더블쿠폰</button>
            </div>
          </div>
          <hr />
          <div class="option_grid">
            <div class="option_name">
              <h3>색상</h3>
            </div>
            <div>
              <span class="siv-colorchip__option">
                <img
                  src="https://image.sivillage.com/upload/C00001/upload1/product/colorChip/15_04_카멜.png"
                  style="width: 50px"
                  alt="카멜"
                />
              </span>
            </div>
          </div>
          <hr />
          <div class="option_grid">
            <div class="option_name">
              <h3>옵션</h3>
            </div>
            <div class="size_div" style="float: left">
              <button>Small</button>
              <button>Medium</button>
              <button>Large</button>
            </div>
          </div>
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
                  v-model="state.productId"
                  type="radio"
                  class="form-check-input"
                  name="sizeRadio"
                  :value="product.id"
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
        <nav class="click_nav">
          <button id="detail_btn" @click="click_detail" style="color: black">
            상품상세
          </button>
          <button id="review_btn" @click="click_review">리뷰</button>
        </nav>
        <hr style="width: 80%" />
        <div id="product_detail">
          <div
            style="margin-right: 20%"
            v-for="productImg in state.products[0]?.imageList"
            v-bind:key="productImg"
          >
            <img :src="productImg" alt="/" />
          </div>
        </div>
        <div id="product_review">
          <!-- <hr style="width: 80%" /> -->
          <div>
            <div
              style="
                display: grid;
                grid-template-columns: 5% 5%;
                margin-bottom: 0px;
              "
            >
              <p>jeyz******</p>
              <p>2022.11.05</p>
            </div>
            <div>
              <p style="font-size: 20px; font-weight: bold; margin-bottom: 0px">
                멜란지 그레이/M
              </p>
              <br />
              <p style="font-size: 15px">
                소재도 부드럽고 따뜻하니 마음에 들어요 색감도 사진이랑 똑같고
                특히 핏이 너무 예쁘네요 기장이 긴 편이라 키 큰 사람한테 더 잘
                어울릴 것 같아요.
              </p>
            </div>
            <div>
              <img
                style="width: 100px; height: 100px"
                src="https://image.sivillage.com/upload/C00001/eval/281/202211050726281_00001.jpeg?RS=90&SP=1&AO=1"
              />
            </div>
            <div
              style="
                margin-left: 5%;
                display: grid;
                grid-template-columns: 3% 45% 10%;
              "
            >
              <p style="font-size: 30px">└</p>
              <input
                style="
                  width: 700px;
                  height: 70px;
                  border: solid 1px black;
                  margin-left: ;
                  border-radius: 10px;
                "
                placeholder="답글을 작성해주세요"
              />
              <button
                style="
                  background-color: black;
                  color: white;
                  border-radius: 10px;
                "
              >
                답글 작성
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { reactive } from 'vue';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import router from '@/router';
import Swal from 'sweetalert2';
import LikeButton from '@/components/button/likeButton.vue';

export default {
  components: { LikeButton },
  setup() {
    const state = reactive({
      productCode: '',
      products: [],
      sumPrice: 0,
      productId: '',
      quantity: 0,
    });

    onBeforeMount(() => {
      var route = useRoute();
      state.productCode = route.query.productCode;
      axios
        .get('https://sbbro.xyz/api/product/products/list/' + state.productCode)
        .then(response => {
          if (response.status == 200) {
            state.products = response.data;
            console.log(state.products);
            state.sumPrice =
              document.getElementById('countValue').value *
              state.products[0].price;
          }
        })
        .catch(() => {
          alert('해당 상품은 조회할 수 없습니다.');
          history.back();
        });
    });

    const comma = val => {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

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
    const initOrder = () => {
      // this.$router.push("initOrder");
      // if (loginCheck()) {
      // }
    };

    const loginCheck = () => {
      if (localStorage.getItem('token') == null) {
        Swal.fire({
          title: '로그인 해주세요',
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: '확인',
        }).then(() => {
          return false;
        });
      } else {
        return true;
      }
    };

    const addCart = () => {
      if (loginCheck() == true) {
        axios
          .post(
            'https://sbbro.xyz/api/member/cart',
            {
              productId: state.productId,
              quantity: state.quantity,
            },
            {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            },
          )
          .then(response => {
            if (response.status == 200) {
              Swal.fire({
                title: '상품이 장바구니에 담겼습니다.',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: '장바구니로 이동',
                cancelButtonText: '계속 쇼핑하기',
              }).then(result => {
                if (result.isConfirmed) {
                  router.push('/cart');
                }
              });
            }
          });
      }
    };

    const click_review = () => {
      document.getElementById('product_detail').style.display = 'none';
      document.getElementById('product_review').style.display = 'block';
      document.getElementById('review_btn').style.color = 'black';
      document.getElementById('detail_btn').style.color = 'gray';
    };

    const click_detail = () => {
      document.getElementById('product_review').style.display = 'none';
      document.getElementById('product_detail').style.display = 'block';
      document.getElementById('review_btn').style.color = 'gray';
      document.getElementById('detail_btn').style.color = 'black';
    };

    return {
      state,
      minusBtn,
      plusBtn,
      initOrder,
      comma,
      addCart,
      click_review,
      click_detail,
    };
  },
};
</script>
<style scoped>
input[type='radio'] {
  display: none;
  margin: 10px;
}

input[type='radio'] + label {
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

input[type='radio']:checked + label {
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

.click_nav {
  display: grid;
  grid-template-columns: 40% 30%;
}
.click_nav button {
  background-color: transparent;
  font-size: 40px;
  font-weight: bold;
  color: gray;
}
</style>

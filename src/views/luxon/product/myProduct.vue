<template>
  <main>
    <div class="list_contents">
      <div class="div_top">
        <div>
          <img :src="state.products[0]?.thumbnailUrl" />
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
            <div
              class="brand_info"
              @click="
                router.push({
                  path: '/store',
                  query: {
                    brandId: state.brand.id,
                  },
                })
              "
            >
              <img class="brand_thumnail" :src="state.brand.imageUrl" />
              <div class="brand_name">
                <h1>{{ state.brand.name }}</h1>
              </div>
            </div>
            <br />
            <h2>{{ state.products[0]?.productName }}</h2>
            <br />
            <h1 style="font-weight: bold; color: black">
              {{ comma(state.products[0]?.price) }}원
            </h1>
          </span>
          <br />
          <hr />

          <div class="" style="margin-bottom: 10px">
            <div class="size_div" style="">
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
          <div class="countClass">
            <div class="count">
              <button class="minus_Btn" @click="minusBtn">-</button>
              <input
                id="countValue"
                :value="state.quantity"
                style="text-align: center"
              />
              <button class="plus_Btn" @click="plusBtn">+</button>
            </div>
            <div>
              <h2 style="margin-left: 35%; margin-top: 2%; font-weight: bold">
                {{ comma(state.sumPrice) }} 원
              </h2>
            </div>
          </div>
          <br />
          <hr style="border: 3px solid black !important" />
          <div class="actionBtn">
            <button style="background-color: white" @click="addCart">
              <span class="material-icons-sharp" style="font-size: 15px">
                add_shopping_cart장바구니
              </span>
            </button>
            <button
              @click="initOrder"
              style="background-color: black; color: white"
            >
              바로구매
            </button>
            <button @click="sendChat" style="background-color: white">
              <i class="bi bi-chat-left-dots"></i>
              채팅문의
            </button>
          </div>
        </div>
      </div>
      <div style="margin-top: 50px">
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
          <div v-for="review in state.reviews" :key="review">
            <div
              style="
                display: grid;
                grid-template-columns: 5% 5%;
                margin-bottom: 0px;
              "
            >
              <p>{{ review.name }}</p>
              <p>
                {{
                  globalProperties.$formatDatetime(new Date(review.createdDate))
                }}
              </p>
            </div>
            <div>
              <p style="font-size: 20px; font-weight: bold; margin-bottom: 0px">
                {{ review.title }}
              </p>
              <br />
              <p style="font-size: 15px">
                {{ review.contents }}
              </p>
            </div>
            <div>
              <img
                style="width: 100px; height: 100px"
                :src="review.thumbnailImage"
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
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import LikeButton from '@/components/button/likeButton.vue';
import { getCurrentInstance } from 'vue';

export default {
  components: { LikeButton },
  setup() {
    const router = useRouter();
    const state = reactive({
      productCode: '',
      products: [],
      reviews: [],
      sumPrice: 0,
      selectedStoreIndex: '',
      quantity: 0,
      brand: {},
    });
    const comma =
      getCurrentInstance().appContext.config.globalProperties.$comma;
    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;

    const emitter =
      getCurrentInstance().appContext.config.globalProperties.$emitter;
    onBeforeMount(() => {
      var route = useRoute();

      state.productCode = route.query.productCode;

      getProduct();

      getReviews();
    });

    const getProduct = () => {
      axios
        .get('https://sbbro.xyz/api/product/products/list/' + state.productCode)
        .then(response => {
          console.log('getProduct', response);
          if (response.status == 200) {
            state.products = response.data;
            state.sumPrice =
              document.getElementById('countValue').value *
              state.products[0].price;
            state.products.forEach(product => {
              if (globalProperties.$isLogin() == false) {
                axios.get(
                  `https://sbbro.xyz/api/recommend/recommends/click/unlogin/` +
                    product.id,
                );
              } else {
                axios.get(
                  `https://sbbro.xyz/api/recommend/recommends/click/login/` +
                    product.id,
                  {
                    headers: {
                      Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                  },
                );
              }
            });
          }
          getBrand();
        })
        .catch(() => {
          alert('해당 상품은 조회할 수 없습니다.');
          history.back();
        });
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

    const isSelectStore = () => {
      if (state.selectedStoreIndex === '') {
        Swal.fire('지점을 선택해주세요');
        return false;
      }
      return true;
    };

    const isSelectQuantity = () => {
      if (state.quantity === 0) {
        Swal.fire('수량을 선택해주세요');
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
        title: '주문 하시겠습니까?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: '네',
        cancelButtonText: '아니요',
      }).then(result => {
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
            name: 'initOrder',
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
          'https://sbbro.xyz/api/member/cart',
          {
            productId: state.products[state.selectedStoreIndex].id,
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
    };

    const getReviews = async () => {
      try {
        const response = await axios.get(
          'https://sbbro.xyz/api/review/code/' + state.productCode,
        );
        console.log('getReviews', response);
        state.reviews = response.data;
      } catch (err) {
        console.log(err);
      }
    };

    const getBrand = async () => {
      await axios
        .get(
          'https://sbbro.xyz/api/member/store/brand/' +
            state.products[0].brandId,
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              contentType: 'application/json',
            },
          },
        )
        .then(res => (state.brand = res.data));

      console.log('brand', state.brand);
    };

    const sendChat = () => {
      if (!isSelectStore()) {
        return;
      }
      axios
        .post(
          'https://sbbro.xyz/api/chat/chatRoom/chat',
          {
            id: null,
            content:
              state.products[state.selectedStoreIndex].productName +
              ' 상품 문의',
            contentType: '상품정보',
            sendBy: localStorage.getItem('login_id'),
            sendTo: state.products[state.selectedStoreIndex].storeId,
            source: state.products[state.selectedStoreIndex].id,
          },
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            },
          },
        )
        .then(emitter.emit('chatShow'))
        .catch(err => console.log(err));
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

    window.scrollTo(0, 0);

    return {
      state,
      minusBtn,
      plusBtn,
      initOrder,
      comma,
      router,
      emitter,
      sendChat,
      addCart,
      click_review,
      click_detail,
      globalProperties,
    };
  },
};
</script>

<style scoped>
h1 {
  font-family: 'Do Hyeon', sans-serif;
}

h2 {
  font-family: 'Do Hyeon', sans-serif;
}

input[type='radio'] {
  display: none;
  margin: 10px;
}

input[type='radio'] + label {
  display: inline-block;
  margin: -2px;
  padding: 8px 19px;
  background-color: #f6e7f8;
  color: #bc6aff;
  /* border: 1px solid rgb(0, 0, 0); */
  border-radius: 20px;
  font-size: 13px !important;
  width: 130px;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
}

input[type='radio']:checked + label {
  background-color: #bc6aff;
  color: white;
}
.list_contents {
  margin-left: 25%;
  margin-top: 5%;
  width: 1100px;
}
.div_top {
  margin-right: 20%;
  display: grid;
  grid-template-columns: 50% 50%;
}

.countClass {
  display: grid;
  grid-template-columns: 40% 60%;
  background-color: rgb(227, 227, 227);
  height: 80px;
  padding: 20px;
  border-radius: 10px;
}

.countClass button {
  background-color: white;
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
  margin-left: 10px;
}
.count input {
  width: 50px;
  height: 35px;
  border: solid 1px gray;
  border-left: none;
  border-right: none;
}

.count button {
  width: 35px;
  height: 35px;
  border: solid 1px gray;
}

.minus_Btn {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.plus_Btn {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.actionBtn {
  display: flex;
  justify-content: space-between;
}

.actionBtn button {
  width: 250px;
  height: 50px;
  font-size: 15px;
  background-color: rgb(255, 255, 255);
  color: black;
  margin-top: 10px;
  border-radius: 10px;
  margin-right: 5px;
  border: solid 1px black;
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
.brand_info {
  color: black;
  display: flex;
}
.brand_name {
  align-self: center;
  margin-left: 20px;
  font-size: large;
  margin-bottom: 5px;
}
.brand_thumnail {
  border-radius: 50%;
  width: 60px;
  height: 60px;
}
</style>

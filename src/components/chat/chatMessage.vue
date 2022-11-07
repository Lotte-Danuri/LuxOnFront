<template>
  <div>
    <div
      v-if="msg.sendBy === state.localStorage.login_id"
      class="chat__mymessage"
      :class="[isSame ? '' : 'chat__first']"
    >
      <p class="chat__mymessage__time">{{ msg.createdAt.substr(11, 5) }}</p>
      <div
        class="chat__mymessage__paragraph"
        v-if="msg.contentType == '메세지'"
      >
        {{ msg.content }}
      </div>
      <div
        class="chat__mymessage__image"
        v-else-if="msg.contentType == '이미지'"
      >
        <div class="image-container">
          <img v-if="msg.source" :src="`${msg.source}`" />
        </div>
      </div>
      <div
        class="chat__mymessage__coupon"
        v-else-if="msg.contentType == '쿠폰'"
        :on-load="getCouponInfo(msg.source)"
      >
        <div>{{ coupon.data.name }}</div>
        <div>{{ coupon.data.discountRate }}% 할인</div>
        <div style="color: gray; font-size: 12px">
          {{ coupon.data.startDate.slice(0, 10) }}~{{
            coupon.data.endDate.slice(0, 10)
          }}
        </div>
        <div style="color: gray; font-size: 14px" v-if="coupon.data.status">
          상대가 쿠폰을 받으셨습니다.
        </div>
        <div
          style="color: gray; font-size: 14px"
          v-else
          class="chat__coupon__button"
          @click="getCoupon(msg.source)"
        >
          쿠폰을 보냈습니다.
        </div>
      </div>
      <div
        class="chat__mymessage__paragraph"
        v-else-if="msg.contentType == '프로모션'"
      ></div>
      <div
        class="chat__mymessage__product"
        v-else-if="msg.contentType == '상품정보'"
        :on-load="getProduct(msg.source)"
      >
        <div>상품정보</div>
        <img :src="product.data.thumbnailUrl" />
        <div>
          {{ product.data.categoryFirstName }}>{{
            product.data.categorySecondName
          }}>{{ product.data.categoryThirdName }}
        </div>
        <div>{{ product.data.productName }}</div>
        <div>{{ product.data.price }}</div>
        <button
          class="btn btn-primary"
          @click="
            router.push({
              path: '/product/myProduct',
              query: {
                productCode: product.data.productCode,
              },
            })
          "
        >
          상품 구매
        </button>
        <button
          class="btn btn-primary"
          @click="insertCart(product.data.source)"
        >
          장바구니
        </button>
      </div>
      <div
        class="chat__mymessage__product"
        v-else-if="msg.contentType == '특별할인'"
        :on-load="getSaleProduct(msg.source.split('/'))"
      >
        <div>특별 할인</div>
        <img :src="product.data.thumbnailUrl" />
        <div>
          {{ product.data.categoryFirstName }}>{{
            product.data.categorySecondName
          }}>{{ product.data.categoryThirdName }}
        </div>
        <div>{{ product.data.productName }}</div>
        <p style="text-decoration: line-through">{{ product.data.price }} 원</p>
        <div>
          {{ (product.data.price * (100 - coupon.data.discountRate)) / 100 }} 원
        </div>
        <button
          @click="
            router.push({
              path: '/product/myProduct',
              query: {
                productId: product.data.source.split('/')[0],
                couponId: product.data.source.split('/')[1],
              },
            })
          "
        >
          상품 구매
        </button>
      </div>
      <div
        class="chat__mymessage__product"
        v-else-if="msg.contentType == '상품추천'"
        :on-load="getRecommendProduct(msg.source.split('/'))"
      >
        <div>상품 추천</div>
        <div v-for="product in plist" :key="product.productId">
          <div
            @click="
              router.push({
                path: '/product/myProduct',
                query: {
                  productCode: product.data.productCode,
                },
              })
            "
          >
            <img :src="product.data.thumbnailUrl" />
            <div>
              {{ product.data.categoryFirstName }}>{{
                product.data.categorySecondName
              }}>{{ product.data.categoryThirdName }}
            </div>
            <div>{{ product.data.productName }}</div>
            <div>{{ product.data.price }}</div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="chat__yourmessage"
      :class="[isSame ? '' : 'chat__first']"
    >
      <div>
        <p class="chat__yourmessage__user" v-if="!isSame">{{}}</p>
        <div class="chat__yourmessage__p">
          <div
            class="chat__yourmessage__paragraph"
            v-if="msg.contentType == '메세지'"
          >
            {{ msg.content }}
          </div>
          <div
            class="chat__yourmessage__image"
            v-else-if="msg.contentType == '이미지'"
          >
            <div class="image-container">
              <img v-if="msg.source" :src="`${msg.source}`" />
            </div>
          </div>
          <div
            class="chat__mymessage__coupon"
            v-else-if="msg.contentType == '쿠폰'"
            :on-load="getCouponInfo(msg.source)"
          >
            <div>{{ coupon.data.name }}</div>
            <div>{{ coupon.data.discountRate }}% 할인</div>
            <div style="color: gray; font-size: 12px">
              {{ coupon.data.startDate.slice(0, 10) }}~{{
                coupon.data.endDate.slice(0, 10)
              }}
            </div>
            <div style="color: gray; font-size: 14px" v-if="coupon.data.status">
              이미 쿠폰을 받으셨습니다.
            </div>
            <button
              v-else
              class="chat__coupon__button"
              @click="getCoupon(msg.source)"
            >
              쿠폰 받기
            </button>
          </div>
          <div
            class="chat__mymessage__paragraph"
            v-else-if="msg.contentType == '프로모션'"
          ></div>
          <div
            class="chat__mymessage__product"
            v-else-if="msg.contentType == '상품정보'"
            :on-load="getProduct(msg.source)"
          >
            <div>상품정보</div>
            <img :src="product.data.thumbnailUrl" />
            <div>
              {{ product.data.categoryFirstName }}>{{
                product.data.categorySecondName
              }}>{{ product.data.categoryThirdName }}
            </div>
            <div>{{ product.data.productName }}</div>
            <div>{{ product.data.price }}</div>
          </div>
          <div
            class="chat__mymessage__product"
            v-else-if="msg.contentType == '특별할인'"
            :on-load="getSaleProduct(msg.source.split('/'))"
          >
            <div>특별 할인</div>
            <img :src="product.data.thumbnailUrl" />
            <div>
              {{ product.data.categoryFirstName }}>{{
                product.data.categorySecondName
              }}>{{ product.data.categoryThirdName }}
            </div>
            <div>{{ product.data.productName }}</div>
            <p style="text-decoration: line-through">
              {{ product.data.price }} 원
            </p>
            <div>
              {{
                (product.data.price * (100 - coupon.data.discountRate)) / 100
              }}
              원
            </div>
            <button
              @click="
                router.push({
                  path: '/product/myProduct',
                  query: {
                    productId: product.data.source.split('/')[0],
                    couponId: product.data.source.split('/')[1],
                  },
                })
              "
            >
              상품 구매
            </button>
          </div>
          <p class="chat__yourmessage__time">
            {{ msg.createdAt.substr(11, 5) }}
          </p>
        </div>
        <!-- 진우 프로덕트-->
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  setup() {
    const state = reactive({
      localStorage: '',
    });
    onMounted(() => {
      state.localStorage = localStorage;
    });

    return {
      state,
    };
  },
  props: ['msg', 'prev'],
  data() {
    return {
      isSame: false,
      coupon: {
        data: { name: '쿠폰 정보', startDate: '', endDate: '' },
      },
      product: {
        data: {
          productName: '',
          thumbnailUrl: '',
          price: 0,
          storeName: '',
          categoryFirstName: '',
          categorySecondName: '',
          categoryThirdName: '',
        },
      },
      plist: [],
    };
  },
  methods: {
    isSamePerson(msg, prev) {
      if (prev === null) {
        return false;
      } else if (prev[0]?.sendBy == msg?.sendBy) {
        return true;
      } else {
        return false;
      }
    },
    async getCouponInfo(couponId) {
      await axios
        .get('https://sbbro.xyz/api/product/coupons/' + couponId, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            contentType: 'application/json',
          },
        })
        .then(res => (this.coupon = res))
        .catch(err => console.log(err));
    },
    async getCoupon(couponId) {
      await axios
        .post(
          'https://sbbro.xyz/api/member/mycoupon/person',
          { id: couponId },
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              contentType: 'application/json',
            },
          },
        )
        .then();
    },
    async getProduct(productId) {
      await axios
        .get('https://sbbro.xyz/api/product/products/' + productId, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            contentType: 'application/json',
          },
        })
        .then(res => (this.product = res))
        .catch(err => console.log(err));
    },
    async getSaleProduct(source) {
      await axios
        .get('https://sbbro.xyz/api/product/products/' + source[0], {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            contentType: 'application/json',
          },
        })
        .then(res => (this.product = res))
        .catch(err => console.log(err));
      await axios
        .get('https://sbbro.xyz/api/product/coupons/' + source[1], {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            contentType: 'application/json',
          },
        })
        .then(res => (this.coupon = res))
        .catch(err => console.log(err));
    },
    async insertCart(productId) {
      axios
        .post(
          'https://sbbro.xyz/api/member/cart',
          {
            productId: productId,
            quantity: 1,
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
    },
    async getRecommendProduct(productList) {
      this.plist = [];
      productList.forEach(async product => {
        await axios
          .get('https://sbbro.xyz/api/product/products/' + product, {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              contentType: 'application/json',
            },
          })
          .then(res => this.plist.push(res))
          .catch(err => console.log(err));
      });
    },
  },
  created() {
    this.isSame = this.isSamePerson(this.msg, this.prev);
  },
};
</script>
<style scoped>
.chat__mymessage {
  display: flex;
  justify-content: right;
  align-items: flex-end;
  margin: 0;
  min-height: 40px;
  line-break: anywhere;
}
.chat__mymessage__paragraph {
  margin: 0.4rem 0 0 1rem;
  border-radius: 20px 20px 0px 20px;
  max-width: 180px;
  background-color: black;
  color: #ffffff;
  padding: 0.8rem;
  font-size: 14px;
}

.chat__mymessage__coupon {
  margin: 0.4rem 0 0 1rem;
  border-radius: 20px 20px 0px 20px;
  max-width: 180px;
  width: 180px;
  background-color: black;
  color: #ffffff;
  padding: 0.8rem;
  font-size: 14px;
}

.chat__mymessage__product {
  margin: 0.4rem 0 0 1rem;
  border-radius: 20px 20px 0px 20px;
  max-width: 180px;
  background-color: black;
  color: #ffffff;
  padding: 0.8rem;
  font-size: 14px;
}

.chat__mymessage__time {
  margin: 0;
  font-size: 12px;
  color: #9c9c9c;
}

.chat__coupon__button {
  width: 75px;
  height: 25px;
  color: #ffffff;
  background-color: #414141;
}

.chat__first {
  margin-top: 2rem;
}
.chat__yourmessage {
  display: flex;
}
.chat__yourmessage__img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.chat__yourmessage__user {
  font-size: 14px;
  font-weight: 700;
  color: #292929;
  margin-top: 0;
  margin-block-end: 0rem;
}
.chat__yourmessage__p {
  display: flex;
  align-items: flex-end;
  line-break: anywhere;
}
.chat__yourmessage__paragraph {
  margin: 0.4rem 1rem 0 0;
  border-radius: 0px 20px 20px 20px;
  background-color: #f3f3f3;
  max-width: 180px;
  color: #414141;
  padding: 0.8rem;
  font-size: 14px;
}
.chat__yourmessage__time {
  margin: 0;
  font-size: 12px;
  color: #9c9c9c;
}

.image-container {
  position: relative;
  border-radius: 3px;
  max-width: 180px;
}

.chat__mymessage__image {
  object-fit: contain;
}

.chat__yourmessage__image {
  object-fit: contain;
}
</style>

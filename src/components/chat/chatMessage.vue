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
        class="chat__mymessage__notification"
        v-if="msg.contentType == '공지'"
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
        <div class="coupon_name">{{ coupon.data.name }}</div>
        <div class="coupon_percent">{{ coupon.data.discountRate }}%</div>
        <div style="color: gray; font-size: 12px">
          {{ coupon.data.startDate.slice(0, 10) }}~{{
            coupon.data.endDate.slice(0, 10)
          }}
        </div>
        <div style="color: gray; font-size: 14px" v-if="coupon.data.status">
          상대가 쿠폰을 받으셨습니다.
        </div>
        <div style="color: gray; font-size: 14px" v-else>
          쿠폰을 보냈습니다.
        </div>
      </div>
      <div
        v-else-if="msg.contentType == '프로모션'"
        :on-load="getPromotion(msg.source)"
      >
        <div class="image-container">
          <img :src="promotion.imageUrl" />
        </div>
        <div class="chat__mymessage__paragraph">
          <div>{{ promotion.title }}</div>
          <div class="product_category">
            {{ promotion.startDate.slice(0, 10) }}~{{
              promotion.endDate.slice(0, 10)
            }}
          </div>
          <router-link
            :to="{
              name: 'promotion',
              query: {
                title: promotion.title,
                imageUrl: promotion.imageUrl,
                startDate: promotion.startDate,
                endDate: promotion.endDate,
                buttonUrl: promotion.buttonUrl,
              },
            }"
            target="_blank"
          >
            <button class="btn btn-light" style="width: 100%" disabled>
              프로모션 이동
            </button>
          </router-link>
        </div>
      </div>
      <div
        v-else-if="msg.contentType == '상품정보'"
        :on-load="getProduct(msg.source)"
      >
        <img
          class="image-container"
          :src="product.data.thumbnailUrl"
          @click="
            router.push({
              path: '/product/myProduct',
              query: {
                productCode: product.data.productCode,
              },
            })
          "
        />

        <div class="chat__mymessage__product">
          <div
            class="product_name"
            @click="
              router.push({
                path: '/product/myProduct',
                query: {
                  productCode: product.data.productCode,
                },
              })
            "
          >
            {{ product.data.productName }}
          </div>

          <div class="product_category">
            {{ product.data.categoryFirstName }}>{{
              product.data.categorySecondName
            }}>{{ product.data.categoryThirdName }}
          </div>
          <hr />

          <div class="product_price">{{ $comma(product.data.price) }}원</div>
          <div class="product_button">
            <button
              class="btn btn-light product_btn"
              @click="
                router.push({
                  path: '/product/myProduct',
                  query: {
                    productCode: product.data.productCode,
                  },
                })
              "
            >
              상품 상세
            </button>
            <button class="btn btn-light product_btn" @click="orderProduct">
              상품 구매
            </button>
            <button
              class="btn btn-light product_btn"
              @click="insertCart(product.data.id)"
            >
              장바구니
            </button>
          </div>
        </div>
      </div>

      <div
        v-else-if="msg.contentType == '특별할인'"
        :on-load="getSaleProduct(msg.source.split('/'))"
      >
        <img
          class="image-container"
          :src="product.data.thumbnailUrl"
          @click="
            router.push({
              path: '/product/myProduct',
              query: {
                productCode: product.data.productCode,
              },
            })
          "
        />

        <div class="">
          <div
            class="product_name"
            @click="
              router.push({
                path: '/product/myProduct',
                query: {
                  productCode: product.data.productCode,
                },
              })
            "
          >
            {{ product.data.productName }}
          </div>

          <div class="product_category">
            {{ product.data.categoryFirstName }}>{{
              product.data.categorySecondName
            }}>{{ product.data.categoryThirdName }}
          </div>
          <hr />

          <div
            style="
              text-decoration: line-through;
              font-weight: 100;
              color: gray;
              text-align: right;
            "
          >
            <span style="color: white; text-decoration: none; text-align: left"
              >특별 할인가</span
            >
            {{ product.data.price }} 원
          </div>
          <div class="product_price">
            {{
              $comma(
                (product.data.price * (100 - coupon.data.discountRate)) / 100,
              )
            }}원
          </div>
          <div class="product_button">
            <button
              class="btn btn-light product_btn"
              @click="
                router.push({
                  path: '/product/myProduct',
                  query: {
                    productCode: product.data.productCode,
                  },
                })
              "
            >
              상품 상세
            </button>
            <button
              class="btn btn-light product_btn"
              @click="orderProduct"
              disabled
              v-if="coupon.data.status"
            >
              상품을 보냈습니다.
            </button>
            <button
              v-else
              class="btn btn-light product_btn"
              @click="orderProduct"
              disabled
            >
              상대방이 받았습니다.
            </button>
          </div>
        </div>
      </div>

      <ChatRecommend
        class="chat__yourmessage__product"
        v-else-if="msg.contentType == '추천'"
      >
      </ChatRecommend>
      <ChatAutoMessage
        class="chat__mymessage__paragraph"
        v-else-if="msg.contentType == '자동응답'"
        :chatData="msg"
      >
      </ChatAutoMessage>
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
            class="chat__yourmessage__notification"
            v-if="msg.contentType == '공지'"
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
            class="chat__yourmessage__coupon"
            v-else-if="msg.contentType == '쿠폰'"
            :on-load="getCouponInfo(msg.source)"
          >
            <div class="coupon_name">{{ coupon.data.name }}</div>
            <div class="coupon_percent">{{ coupon.data.discountRate }}%</div>
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
              class="chat__coupon__button btn btn-dark"
              @click="getCoupon(msg.source)"
            >
              쿠폰 받기
            </button>
          </div>
          <div
            v-else-if="msg.contentType == '프로모션'"
            :on-load="getPromotion(msg.source)"
          >
            <div class="image-container">
              <img :src="promotion.imageUrl" />
            </div>
            <div class="chat__yourmessage__paragraph">
              <div>{{ promotion.title }}</div>

              <div class="product_category">
                기간: {{ promotion.startDate.slice(0, 10) }}~{{
                  promotion.endDate.slice(0, 10)
                }}
              </div>
              <router-link
                :to="{
                  name: 'promotion',
                  query: {
                    title: promotion.title,
                    imageUrl: promotion.imageUrl,
                    startDate: promotion.startDate,
                    endDate: promotion.endDate,
                    buttonUrl: promotion.buttonUrl,
                  },
                }"
                target="_blank"
              >
                <hr />
                <button class="btn btn-dark" style="width: 100%">
                  프로모션 이동
                </button>
              </router-link>
            </div>
          </div>

          <div
            v-else-if="msg.contentType == '상품정보'"
            :on-load="getProduct(msg.source)"
          >
            <img
              class="image-container"
              :src="product.data.thumbnailUrl"
              @click="
                router.push({
                  path: '/product/myProduct',
                  query: {
                    productCode: product.data.productCode,
                  },
                })
              "
            />
            <div class="chat__yourmessage__product">
              <div
                class="product_name"
                @click="
                  router.push({
                    path: '/product/myProduct',
                    query: {
                      productCode: product.data.productCode,
                    },
                  })
                "
              >
                {{ product.data.productName }}
              </div>

              <div class="product_category">
                {{ product.data.categoryFirstName }}>{{
                  product.data.categorySecondName
                }}>{{ product.data.categoryThirdName }}
              </div>
              <hr />

              <div class="product_price">
                {{ $comma(product.data.price) }}원
              </div>
              <div class="product_button">
                <button
                  class="btn btn-light product_btn"
                  @click="
                    router.push({
                      path: '/product/myProduct',
                      query: {
                        productCode: product.data.productCode,
                      },
                    })
                  "
                >
                  상품 상세
                </button>
                <button class="btn btn-light product_btn" @click="orderProduct">
                  상품 구매
                </button>
                <button
                  class="btn btn-light product_btn"
                  @click="insertCart(product.data.id)"
                >
                  장바구니
                </button>
              </div>
            </div>
          </div>
          <div
            class="chat__yourmessage__product"
            v-else-if="msg.contentType == '특별할인'"
            :on-load="getSaleProduct(msg.source.split('/'))"
          >
            <img
              class="image-container"
              :src="product.data.thumbnailUrl"
              @click="
                router.push({
                  path: '/product/myProduct',
                  query: {
                    productCode: product.data.productCode,
                  },
                })
              "
            />

            <div class="chat__yourmessage__product">
              <div
                class="product_name"
                @click="
                  router.push({
                    path: '/product/myProduct',
                    query: {
                      productCode: product.data.productCode,
                    },
                  })
                "
              >
                {{ product.data.productName }}
              </div>

              <div class="product_category">
                {{ product.data.categoryFirstName }}>{{
                  product.data.categorySecondName
                }}>{{ product.data.categoryThirdName }}
              </div>
              <hr />

              <div
                style="
                  text-decoration: line-through;
                  font-weight: 100;
                  color: gray;
                  text-align: right;
                "
              >
                <span
                  style="color: black; text-decoration: none; text-align: left"
                  >할인가</span
                >
                {{ product.data.price }} 원
              </div>
              <div class="product_price">
                {{
                  $comma(
                    (product.data.price * (100 - coupon.data.discountRate)) /
                      100,
                  )
                }}원
              </div>
              <div class="product_button">
                <button
                  class="btn btn-dark product_btn"
                  @click="
                    router.push({
                      path: '/product/myProduct',
                      query: {
                        productCode: product.data.productCode,
                      },
                    })
                  "
                >
                  상품 상세
                </button>
                <button
                  class="btn btn-dark product_btn"
                  @click="orderProduct"
                  v-if="coupon.data"
                >
                  상품 구매
                </button>
              </div>
            </div>
          </div>
          <ChatRecommend
            class="chat__yourmessage__product"
            v-else-if="msg.contentType == '추천'"
            :chatData="msg"
          >
          </ChatRecommend>
          <ChatAutoMessage
            class="chat__yourmessage__paragraph"
            v-else-if="msg.contentType == '자동응답'"
            :chatData="msg"
          >
          </ChatAutoMessage>
          <p class="chat__yourmessage__time">
            {{ msg.createdAt.substr(11, 5) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import ChatRecommend from '@/components/chat/chatRecommend.vue';
import ChatAutoMessage from '@/components/chat/chatAutoMessage.vue';

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
  components: {
    ChatRecommend,
    ChatAutoMessage,
  },
  data() {
    return {
      router: useRouter(),
      isSame: false,
      coupon: {
        data: { name: '쿠폰 정보', startDate: '', endDate: '' },
      },
      first: true,
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
      promotion: { startDate: '', endDate: '' },
      plist: [{ id: '', thumbnailUrl: '', productName: '', price: '' }],
    };
  },
  methods: {
    orderProduct() {
      console.log(this.product.data);
      var productsData = [];
      var productData = {
        storeName: this.product.data.storeName,
        quantity: 1,
        productDto: {
          id: this.product.data.id,
          price: this.product.data.price,
          productCode: this.product.data.productCode,
          productName: this.product.data.productName,
          storeId: this.product.data.storeId,
          thumbnailUrl: this.product.data.thumbnailUrl,
          warranty: this.product.data.warranty,
        },
      };
      productsData.push(productData);
      console.log(productData);
      this.router.push({
        name: 'initOrder',
        params: {
          products: JSON.stringify(productsData),
          couponId: this.coupon.data.id,
        },
      });
    },
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
        .get('http://localhost:8000/product/coupons/' + couponId, {
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
          'http://localhost:8000/member/mycoupon/person',
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
        .get('http://localhost:8000/product/products/' + productId, {
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
        .get('http://localhost:8000/product/products/' + source[0], {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            contentType: 'application/json',
          },
        })
        .then(res => (this.product = res))
        .catch(err => console.log(err));
      await axios
        .get('http://localhost:8000/product/coupons/' + source[1], {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            contentType: 'application/json',
          },
        })
        .then(res => (this.coupon = res))
        .catch(err => console.log(err));
    },
    async getPromotion(promotionId) {
      await axios
        .get('http://localhost:8000/member/promotion/' + promotionId, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            contentType: 'application/json',
          },
        })
        .then(res => (this.promotion = res.data))
        .catch(err => console.log(err));
    },
    async insertCart(productId) {
      axios
        .post(
          'http://localhost:8000/member/cart',
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
                this.router.push('/cart');
              }
            });
          }
        });
    },
    async getRecommendProduct(productList) {
      if (this.first) {
        this.first = false;
        let plist = [];
        console.log(productList);
        await productList.forEach(async product => {
          await axios
            .get('http://localhost:8000/product/products/list/' + product, {
              headers: {
                Authorization: `Bearer ` + localStorage.getItem('token'),
                contentType: 'application/json',
              },
            })
            .then(res => plist.push(res.data[0]))
            .catch(err => console.log(err));
        });
        this.plist = plist;
        console.log(this.plist);
      }
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
  width: 100%;
  height: 25px;
}

.chat__mymessage__notification {
  margin: 0.4rem 0 0 1rem;
  border-radius: 20px 20px 0px 20px;
  max-width: 180px;
  background-color: black;
  color: #ffffff;
  padding: 0.8rem;
  font-size: 14px;
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

.chat__yourmessage__product {
  margin: 0.4rem 1rem 0 0;
  border-radius: 0px 20px 20px 20px;
  background-color: #f3f3f3;
  max-width: 180px;
  color: #414141;
  padding: 0.8rem;
  font-size: 14px;
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

.chat__yourmessage__coupon {
  margin: 0.4rem 1rem 0 0;
  border-radius: 0px 20px 20px 20px;
  background-color: #f3f3f3;
  max-width: 180px;
  color: #414141;
  padding: 0.8rem;
  font-size: 14px;
}

.chat__yourmessage__notification {
  margin: 0.4rem 1rem 0 0;
  border-radius: 0px 20px 20px 20px;
  max-width: 180px;
  background-color: rgb(234, 137, 137);
  color: #ffffff;
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
  z-index: 1;
}

.chat__yourmessage__image {
  object-fit: contain;
  z-index: 1;
}

.product_name {
  font: 12px;
  font-weight: bold;
}

.product_category {
  font-weight: 100;
  font-size: 12px;
}

.product_price {
  text-align: right;
  font-size: large;
}

.product_button {
  border: black;
  border-radius: 0%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product_btn {
  margin-bottom: 3px;
}

.coupon_name {
}
.coupon_percent {
  font-size: large;
  font-weight: bold;
  text-align: center;
}
</style>

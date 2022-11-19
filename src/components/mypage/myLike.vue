<template>
  <div class="mypage-shopping__content">
    <form id="searchForm" method="post">
      <input type="hidden" name="page_idx" value="1" />
    </form>
    <h2 style="">찜 목록</h2>
    <br />
    <div
      class="all_procut"
      style="margin-top: 0px; width: 100%; margin-left: 20px"
    >
      <div class="product_grid">
        <div v-for="product in state.products" v-bind:key="product">
          <LikeButton
            class="like"
            v-bind:productCode="product.productCode"
          ></LikeButton>
          <router-link
            :to="{
              path: '/product/myProduct',
              query: { productCode: product.productCode },
            }"
          >
            <img :src="product.thumbnailUrl" />
            <br />
            <span>
              <p class="cls_brandName" style="color: black; font-weight: bold">
                {{ product.brandName }}
              </p>
              <p class="cls_productName" style="color: black">
                {{ product.productName }}
              </p>
              <p class="cls_productPrice" style="font-weight: ">
                ￦&nbsp;{{ comma(product.price) }}
              </p>
            </span>
          </router-link>
        </div>
        <br />
        <br />
      </div>
    </div>
    <!-- <div class="product hide-scroll">
      <ul class="product__list thum--4 gap--mid">
        <li
          class="product__item"
          v-for="product in state.products"
          v-bind:key="product"
        >
          <div class="product__thum">
            <LikeButton class ="like" v-bind:productCode="product.productCode"></LikeButton>
            <router-link
              :to="{
                path: '/product/myProduct',
                query: { productCode: product.productCode },
              }"
            >
              <img
                :src="product.thumbnailUrl"
                :alt="product.productName"
                onError="this.src='https://image.sivillage.com/upload/C00001/common/noimg.jpg?RS=300&SP=1'"
              />
            </router-link>
          </div>
          <a class="product__data" onclick="">
            <p class="product__data-brand">{{ product.brandName }}</p>
            <router-link
              :to="{
                path: '/product/myProduct',
                query: { productCode: product.productCode },
              }"
            >
              <p class="product__data-name">
                {{ product.productName }}
              </p>
            </router-link>
            <p class="product__data-price">{{ comma(product.price) }}원</p>
          </a>
        </li>
      </ul>
    </div> -->
  </div>
  <!-- mypage-shopping__content end -->
</template>

<script>
import { reactive } from 'vue';
import { onBeforeMount } from 'vue';
import axios from 'axios';
import { getCurrentInstance } from 'vue';
import LikeButton from '@/components/button/likeButton.vue';

// let self;

export default {
  components: {
    LikeButton,
  },
  created() {
    // self = this;
  },
  setup() {
    const comma =
      getCurrentInstance().appContext.config.globalProperties.$comma;
    const state = reactive({
      products: [],
    });
    onBeforeMount(() => {
      axios
        .post('https://sbbro.xyz/api/member/like', null, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log(response);
          state.products = response.data;
        });
    });

    return { state, comma };
  },
};
</script>

<style>
a {
  text-decoration: none;
}
.coupon_cls .swiper-pagination-bullets span {
  display: none;
}

.swiper-pagination-bullets span {
  background-color: black;
}
</style>

<style>
::-webkit-scrollbar {
  width: 10px; /* 스크롤바의 너비 */
}

::-webkit-scrollbar-thumb {
  height: 30%; /* 스크롤바의 길이 */
  background: #000000; /* 스크롤바의 색상 */
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(102, 102, 102, 0.1); /*스크롤바 뒷 배경 색상*/
}
</style>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
/* Adopt bootstrap pagination stylesheet. */
/* @import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'; */

/* Write your own CSS for pagination */
/* 임의의 영역 생성 */
.div_category {
  width: 200px;
  height: 500px;
  overflow-y: scroll;
}

/* 아래의 모든 코드는 영역::코드로 사용 */

.div_category::-webkit-scrollbar {
  width: 10px; /* 스크롤바의 너비 */
}

.div_category::-webkit-scrollbar-thumb {
  height: 30%; /* 스크롤바의 길이 */
  background: #000000; /* 스크롤바의 색상 */
  border-radius: 10px;
}

.div_category::-webkit-scrollbar-track {
  background: rgba(102, 102, 102, 0.1); /*스크롤바 뒷 배경 색상*/
}

a {
  text-decoration: none;
  font-family: 'Noto Sans KR', sans-serif;
}

p {
  font-family: 'Noto Sans KR', sans-serif;
}

.active .side_menu div h3 {
  margin-bottom: 10px;
  font-weight: bold;
}
.side_menu div ul li {
  margin-bottom: 5px;
  font-size: 13px;
}

/* sidebar css */

.side_menu {
  float: left;
  width: 200px;
}

.inputPrice input {
  height: 30px;
  margin-left: 10px;
}

.color_grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  grid-auto-rows: minmax(5px, auto);
  padding-left: 0px;
}

.listSwiper {
  width: 100%;
  height: 700px;
  /* postion: absolute; */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.list_grid {
  margin-top: 5%;
  margin-left: 10%;
  display: grid;
  grid-template-columns: 15% 85%;
}
.list-text {
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
  color: white;
  font-weight: bold;
  border: 3px solid #f1f1f1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 80%;
  padding: 20px;
  text-align: center;
}

.swiper-content {
  margin-right: 10%;
  display: grid;
  grid-template-columns: 46% 46%;
}

.swiper_content div swiper {
  /* width: 10px; */
}

.product_grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  grid-auto-rows: minmax(5px, auto);
  margin-right: 20%;
}

.product_grid div {
  /* background-color: rgb(238, 238, 238); */
  width: 250px;
  height: 400px;
  margin-bottom: 120px;
  background-color: #f1f1f1;
  position: relative;
}
.product_grid div .like {
  position: absolute;
  left: 80%;
  z-index: 3;
  background-color: transparent;
}

.product_grid div img {
  height: 400px;
  mix-blend-mode: darken;
}

.product_grid div span p {
  /* font-weight: bold; */
  font-weight: 500;
  /* font-size: 13px; */
}
.product_grid div span p {
  margin: 0px;
}

.cls_brandName {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 18px;
}

.cls_productName {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
}

.cls_productPrice {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
}

.div_category li a {
  font-size: 15px;
}

.div_category ul {
  margin-bottom: 40px;
}

.second_category li a:hover {
  cursor: pointer;
}
</style>

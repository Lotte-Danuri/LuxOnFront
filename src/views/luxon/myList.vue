<template>
  <main class="list_grid">
    <div
      class="side_menu"
      id="style-3"
      style="height: 600px; overflow-x: hidden; position: sticky; top: 200px"
    >
      <div class="div_category">
        <h2 style="font-weight: bold">Category</h2>
        <br />
        <ul class="first_category">
          <li v-for="categoryFirst in categoryList" :key="categoryFirst.id">
            <router-link
              :to="{
                name: 'MyList',
                query: { id: categoryFirst.id },
              }"
              @click="
                () => {
                  secondValue = '';
                  firstValue = categoryFirst.id;
                  getBrandProduct();
                }
              "
              style="font-weight: bold"
              >{{ categoryFirst.categoryName }}</router-link
            >
            <br />
            <ul class="second_category">
              <li
                v-for="categorySecond in categoryFirst.categorySecondDtoList"
                :key="categorySecond.id"
                style="margin-top: 10px; margin-bottom: -3px"
              >
                <router-link
                  :to="{
                    name: 'MyList',
                    query: { secondid: categorySecond.id },
                  }"
                  @click="
                    () => {
                      firstValue = '';
                      secondValue = categorySecond.id;
                      getBrandProduct2(secondValue);
                    }
                  "
                >
                  {{ categorySecond.categoryName }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="category__content"
      style="margin-left: 00px; margin-bottom: 0px"
    >
      <div class="swiper-content" style="margin-top: -70px">
        <div class="leftSwiper">
          <swiper
            class="border-b-2 cursor-grab border-gray-500 max-w-screen-lg m-auto p-4 mt-24"
            :space-between="0"
            :loop="true"
            :pagination="{ clickable: true }"
            :autoplay="{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }"
          >
            <swiper-slide
              v-for="text in swiperTextBase"
              :key="text.description"
              class="pb-14 sm:flex sm:justify-evenly"
            >
              <div style="background-color: transparent; position: relative">
                <div class="firstSwiper">
                  <div class="list-text">
                    <h2>Winter LuxOn</h2>
                    <h1 style="font-size: 50px">Luxury On</h1>
                    <!-- <p>?????? test</p> -->
                  </div>
                  <div>
                    <img
                      :src="text.img"
                      alt="image"
                      style="width: 500px; height: 500px"
                      class="w-32 h-32 rounded-full object-cover mt-5 m-auto lg:m-0"
                    />
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="rightSwiper">
          <swiper
            class="border-b-2 cursor-grab border-gray-500 max-w-screen-lg m-auto p-4 mt-24"
            :space-between="0"
            :loop="true"
            :pagination="{ clickable: true }"
            :autoplay="{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }"
          >
            <swiper-slide
              v-for="text in swiperTextBase2"
              :key="text.description"
              class="pb-14 sm:flex sm:justify-evenly"
            >
              <div style="background-color: transparent; position: relative">
                <div class="firstSwiper">
                  <div class="list-text">
                    <h2>Winter LuxOn</h2>
                    <h1 style="font-size: 50px">Luxury On</h1>
                    <!-- <p>?????? test</p> -->
                  </div>
                  <div>
                    <img
                      :src="text.img"
                      alt="image"
                      style="width: 500px; height: 500px"
                      class="w-32 h-32 rounded-full object-cover mt-5 m-auto lg:m-0"
                    />
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <br />
      <br />
      <div
        class="all_procut"
        style="margin-top: 0px; width: 1100px; margin-left: 50px"
      >
        <h2 style="font-weight: bold">All Product</h2>
        <br />
        <div class="product_grid">
          <div v-for="product in showList" v-bind:key="product">
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
                <p
                  class="cls_brandName"
                  style="color: black; font-weight: bold"
                >
                  {{ product.brandName }}
                </p>
                <p class="cls_productName" style="color: black">
                  {{ product.productName }}
                </p>
                <p class="cls_productPrice" style="font-weight: ">
                  ???&nbsp;{{ comma(product.price) }}
                </p>
              </span>
            </router-link>
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { ref } from 'vue';
import LikeButton from '@/components/button/likeButton.vue';

window.addEventListener('locationchange', function () {
  console.log('onlocationchange event occurred!');
});

export default {
  components: { Swiper, SwiperSlide, LikeButton },
  data() {
    return {
      productList: [],
      categoryList: [],
      selectedUl: [],
      isActive: false,
      searchValue: '',
      searchValue2: '',
      showList: [],
      firstValue: '',
      secondValue: '',
    };
  },
  watch: {
    //?????? ??????????????? ????????? ???????????? ?????????
    $route() {
      // console.log('this.secondValue' + this.secondValue);
      const url = decodeURI(window.location.href);
      this.searchValue = url.slice(url.indexOf('searchValue')).slice(12);
      if (this.searchValue) {
        this.getSearchProduct();
      }
    },
  },
  created() {
    this.getCategoryList();
  },
  mounted() {
    this.firstValue = this.$route.query.id;
    this.secondValue = this.$route.query.secondid;
    this.searchValue = this.$route.query.searchValue;
    this.getProductList();
  },
  methods: {
    async getProductList() {
      this.productList = await this.$api('/product/products');
      this.showList = this.productList;
      if (this.firstValue != undefined) {
        this.getBrandProduct();
      }
      if (this.secondValue != undefined) {
        this.getBrandProduct2(this.secondValue);
      }
      if (this.$route.query.searchValue != undefined) {
        // console.log(this.$route.query.searchValue);
        this.getSearchProduct();
        // location.reload();
      }
      console.log(this.productList);
    },
    async getCategoryList() {
      this.categoryList = await this.$api('/product/categories');
    },
    getSearchProduct() {
      let newList = [];
      let search = this.searchValue;
      // console.log(this.productList);
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].productName.includes(search)) {
          newList.push(JSON.parse(JSON.stringify(this.productList[i])));
        }
      }
      let proxy = new Proxy(newList, {});
      this.showList = proxy;
      // console.log('search' + this.productList);
    },
    getBrandProduct() {
      let newList = [];
      let first = this.firstValue;
      for (let i = 0; i < this.productList.length; i++) {
        if (first == this.productList[i].categoryFirstId) {
          newList.push(JSON.parse(JSON.stringify(this.productList[i])));
        }
      }
      let proxy = new Proxy(newList, {});
      this.showList = proxy;
      // console.log('brand' + this.productList);
    },
    getBrandProduct2(secondValue) {
      this.secondValue = secondValue;
      let newList = [];
      let second = secondValue;
      for (let i = 0; i < this.productList.length; i++) {
        if (second == this.productList[i].categorySecondId) {
          newList.push(JSON.parse(JSON.stringify(this.productList[i])));
        }
      }
      let proxy = new Proxy(newList, {});
      this.showList = proxy;
      // console.log('brand2' + this.productList);
    },
  },
  setup() {
    const swiperTextBase = ref([
      {
        author: 'Elon Musk',
        description: 'ghjhgjgj',
        img: 'https://image.sivillage.com/upload/C00001/dspl/banner/1010/096/00/221000000299096.jpg?cVer=31105502&RS=&SP=1',
      },
      {
        author: 'Elon Musk',
        description: 'ghjhgjgj',
        img: 'https://image.sivillage.com/upload/C00001/dspl/banner/1010/496/00/221000000288496.jpg?cVer=12125857&RS=&SP=1',
      },
      {
        author: 'Elon Musk',
        description: 'ghjhgjgj',
        img: 'https://image.sivillage.com/upload/C00001/dspl/banner/1010/481/00/221000000299481.jpg?cVer=03094826&RS=&SP=1',
      },
      {
        author: 'Elon Musk',
        description: 'ghjhgjgj',
        img: 'https://image.sivillage.com/upload/C00001/dspl/banner/1010/511/00/221000000288511.jpg?cVer=01093513&RS=&SP=1',
      },
    ]);
    const swiperTextBase2 = ref([
      {
        author: 'Elon Musk',
        description: 'ghjhgjgj',
        img: 'https://image.sivillage.com/upload/C00001/dspl/banner/1010/374/00/221000000288374.jpg?cVer=17020031&RS=&SP=1',
      },
      {
        author: 'Elon Musk',
        description: 'ghjhgjgj',
        img: 'https://image.sivillage.com/upload/C00001/dspl/banner/1010/225/00/220900000284225.jpg?cVer=10023119&RS=&SP=1',
      },
      {
        author: 'Elon Musk',
        description: 'ghjhgjgj',
        img: 'https://image.sivillage.com/upload/C00001/dspl/banner/1010/519/00/221000000296519.jpg?cVer=19044659&RS=&SP=1',
      },
      {
        author: 'Elon Musk',
        description: 'ghjhgjgj',
        img: 'https://image.sivillage.com/upload/C00001/dspl/banner/1010/608/00/221000000297608.jpg?cVer=20091259&RS=&SP=1',
      },
    ]);

    const comma = val => {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    return {
      modules: [Pagination, Autoplay],
      swiperTextBase,
      swiperTextBase2,
      comma,
    };
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

.swiper-pagination-bullets {
}

.swiper-pagination-bullets span {
  background-color: black;
  margin-top: -100px;
}
</style>

<style>
::-webkit-scrollbar {
  width: 10px; /* ??????????????? ?????? */
}

::-webkit-scrollbar-thumb {
  height: 30%; /* ??????????????? ?????? */
  background: #000000; /* ??????????????? ?????? */
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(102, 102, 102, 0.1); /*???????????? ??? ?????? ??????*/
}
</style>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
/* Adopt bootstrap pagination stylesheet. */
/* @import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'; */

/* Write your own CSS for pagination */
/* ????????? ?????? ?????? */
.div_category {
  width: 200px;
  height: 500px;
  overflow-y: scroll;
}

/* ????????? ?????? ????????? ??????::????????? ?????? */

.div_category::-webkit-scrollbar {
  width: 10px; /* ??????????????? ?????? */
}

.div_category::-webkit-scrollbar-thumb {
  height: 30%; /* ??????????????? ?????? */
  background: #000000; /* ??????????????? ?????? */
  border-radius: 10px;
}

.div_category::-webkit-scrollbar-track {
  background: rgba(102, 102, 102, 0.1); /*???????????? ??? ?????? ??????*/
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
  height: 600px;
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
  width: 270px;
  height: 405px;
  margin-right: 15px;
  margin-bottom: 120px;
  background-color: #f5f4f4;
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

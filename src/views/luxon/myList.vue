<template>
  <main class="list_grid">
    <div
      class="side_menu"
      id="style-3"
      style="height: 600px; overflow-x: hidden; position: sticky; top: 200px"
    >
      <div>
        <h2>Category</h2>
        <ul class="first_category">
          <li v-for="categoryFirst in categoryList" :key="categoryFirst.id">
            <a
              href="#"
              @click="
                () => {
                  secondValue = '';
                  firstValue = categoryFirst.id;
                  getBrandProduct();
                }
              "
              >{{ categoryFirst.categoryName }}</a
            >
            <ul class="second_category">
              <li
                v-for="categorySecond in categoryFirst.categorySecondDtoList"
                :key="categorySecond.id"
              >
                <a
                  href="#"
                  @click="
                    () => {
                      firstValue = '';
                      secondValue = categorySecond.id;
                      getBrandProduct2(secondValue);
                    }
                  "
                >
                  {{ categorySecond.categoryName }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="category__content"
      style="margin-left: 50px; margin-bottom: 0px"
    >
      <div class="swiper-content" style="margin-top: -70px">
        <div class="leftSwiper">
          <swiper
            class="border-b-2 cursor-grab border-gray-500 max-w-screen-lg m-auto p-4 mt-24"
            :space-between="20"
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
              <div style="background-color: black; position: relative">
                <div class="firstSwiper">
                  <div class="list-text">
                    <h2>Winter LuxOn</h2>
                    <h1 style="font-size: 50px">Luxury On</h1>
                    <!-- <p>겨울 test</p> -->
                  </div>
                  <div>
                    <img
                      :src="text.img"
                      alt="image"
                      style="width: 300px; height: 300px"
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
            :space-between="20"
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
              <div style="background-color: black; position: relative">
                <div class="firstSwiper">
                  <div class="list-text">
                    <h2>Winter LuxOn</h2>
                    <h1 style="font-size: 50px">Luxury On</h1>
                    <!-- <p>겨울 test</p> -->
                  </div>
                  <div>
                    <img
                      :src="text.img"
                      alt="image"
                      style="width: 300px; height: 300px"
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
      <div class="all_procut" style="margin-top: -100px">
        <h2 style="font-weight: bold">All Product</h2>
        <br />
        <div class="product_grid">
          <div v-for="product in showList" v-bind:key="product">
            <router-link
              :to="{
                path: '/product/myProduct',
                query: { productCode: product.productCode },
              }"
            >
              <img :src="product.thumbnailUrl" />
              <br />
              <span>
                <p style="color: black">
                  {{ product.productName }}
                </p>
                <p style="font-weight: ">￦&nbsp;{{ comma(product.price) }}</p>
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

export default {
  components: { Swiper, SwiperSlide },
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
    };
  },
  watch: {
    searchValue() {
      this.searchValue2 = this.searchValue;
    },
    $route(to, from) {
      if (to.path != from.path) {
        // console.log('감지');
        this.firstValue = this.$route.query.id;
      }
    },
  },
  created() {
    this.getCategoryList();

    // this.showList = this.productList;

    // const url = decodeURI(window.location.href);
    // alert(url);
    // this.searchValue = url.slice(url.indexOf('searchValue')).slice(12);
  },
  mounted() {
    this.getProductList();
    this.firstValue = this.$route.query.id;
    this.searchValue = this.$route.query.searchValue;
  },
  methods: {
    async getProductList() {
      this.productList = await this.$api('/product/products');
      this.showList = this.productList;
      if (this.firstValue != undefined) {
        this.getBrandProduct();
      }
      if (this.$route.query.searchValue != undefined) {
        console.log(this.$route.query.searchValue);
        this.getSearchProduct();
      }
    },
    async getCategoryList() {
      this.categoryList = await this.$api('/product/categories');
    },
    getSearchProduct() {
      // this.productList = await this.$api('/product/products');
      let newList = [];
      let search = this.searchValue;
      // alert(
      //   decodeURI(window.location.href)
      //     .slice(window.location.href.indexOf('searchValue'))
      //     .slice(12),
      // );
      // alert(search);
      // if (
      //   window.location.href.includes('list') &&
      //   decodeURI(window.location.href)
      //     .slice(window.location.href.indexOf('searchValue'))
      //     .slice(12) != search
      // ) {
      //   alert(search);
      //   search = decodeURI(window.location.href)
      //     .slice(window.location.href.indexOf('searchValue'))
      //     .slice(12);
      // }
      // let reloadFlag = 0;
      // if (window.location.href.includes('list') && reloadFlag == 0) {
      //   // location.reload();
      //   reloadFlag = 1;
      // }
      // window.onload = function () {
      //   if (!window.location.hash) {
      //     window.location = window.location + '#loaded';
      //     window.location.reload();
      //   }
      // };
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].productName.includes(search)) {
          newList.push(JSON.parse(JSON.stringify(this.productList[i])));
        }
      }
      let proxy = new Proxy(newList, {});
      this.showList = proxy;
      // window.scrollTo(1500, 0);
    },
    getBrandProduct() {
      // this.productList = await this.$api('/product/products');
      let newList = [];
      let first = this.firstValue;
      for (let i = 0; i < this.productList.length; i++) {
        if (first == this.productList[i].categoryFirstId) {
          newList.push(JSON.parse(JSON.stringify(this.productList[i])));
        }
      }
      let proxy = new Proxy(newList, {});
      this.showList = proxy;
      // window.scrollTo(1500, 0);
    },
    getBrandProduct2(secondValue) {
      // this.productList = await this.$api('/product/products');
      let newList = [];
      let second = secondValue;
      for (let i = 0; i < this.productList.length; i++) {
        if (second == this.productList[i].categorySecondId) {
          newList.push(JSON.parse(JSON.stringify(this.productList[i])));
        }
      }
      let proxy = new Proxy(newList, {});
      this.showList = proxy;
      // window.scrollTo(1500, 0);
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

<style scoped>
/* Adopt bootstrap pagination stylesheet. */
/* @import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'; */

/* Write your own CSS for pagination */

a {
  text-decoration: none;
}

p {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display',
    'Apple SD Gothic Neo', 'Apple-Gothic', 'Roboto', 'Noto Sans KR',
    'Droid Sans', 'dotum', sans-serif;
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
  margin-right: 20%;
  display: grid;
  grid-template-columns: 50% 50%;
}

.swiper_content div swiper {
  width: 400px;
}

.product_grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  grid-auto-rows: minmax(5px, auto);
  margin-right: 20%;
}

.product_grid div {
  background-color: rgb(238, 238, 238);
  width: 250px;
  height: 400px;
  margin-bottom: 80px;
}

.product_grid div img {
  height: 400px;
}

.product_grid div span p {
  font-weight: bold;
}
.product_grid div span p {
  margin: 0px;
}
</style>

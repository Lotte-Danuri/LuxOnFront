<template>
  <main class="list_grid">
    <div
      class="side_menu"
      id="style-3"
      style="
        height: 600px;
        overflow: scroll;
        overflow-x: hidden;
        position: sticky;
        top: 200px;
      "
    >
      <div v-for="(category, i) in categoryList" :key="i" :value="i">
        <h1>
          {{ category.categoryName }}
        </h1>
        <br />
        <ul>
          <li>
            <h4>전체{{ $route.params.searchValue }}</h4>
          </li>
          <li
            v-for="(categorySecond, j) in category.categorySecondDtoList"
            :key="j"
            :value="j"
            @click="myFilter($event)"
          >
            <h4>
              {{ categorySecond.categoryName }}
            </h4>
            <ul>
              <li
                v-for="(
                  categoryThird, k
                ) in categorySecond.categoryThirdDtoList"
                :key="k"
                :value="k"
              >
                {{ categoryThird.categoryName }}
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="inputPrice">
        <h3>가격</h3>
        <label for="minPrice">최소</label>
        <input type="text" id="minPrice" name="minP" placeholder="min Price" />
        <br />
        <br />
        <label for="maxPrice">최대</label>
        <input type="text" id="maxPrice" name="maxP" placeholder="max Price" />
      </div>
      <hr style="width: 160px" />
      <br />
      <button
        style="
          width: 160px;
          height: 50px;
          background-color: black;
          color: white;
          border-radius: 5px;
        "
      >
        필터 적용
      </button>
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
              <div style="background-color: gray; position: relative">
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
                      style="width: 523px; height: 523px"
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
              <div style="background-color: gray; position: relative">
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
                      style="width: 523px; height: 523px"
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
          <div v-for="product in productList" v-bind:key="product">
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
    };
  },
  watch: {
    searchValue() {
      this.searchValue2 = this.searchValue;
    },
  },
  created() {
    this.getProductList();
    console.log(this.$route.query.id);
    console.log(this.$route.query.searchValue);
    console.log(this.searchValue2);
    this.getCategoryList();

    const url = decodeURI(window.location.href);
    // alert(url);
    this.searchValue = url.slice(url.indexOf('searchValue')).slice(12);

    if (this.$route.query.searchValue != undefined) {
      // alert(this.$route.query.searchValue);
    }
  },
  methods: {
    async getProductList() {
      this.productList = await this.$api('/product/products');
    },
    async getCategoryList() {
      this.categoryList = await this.$api('/product/categories');
      console.log(this.categoryList);
    },
    clickCallback(pageNum) {
      console.log(pageNum);
    },
    myFilter(event) {
      // alert(this.selectedUl);
      this.isActive = !this.isActive;
      console.log(event.target.children);
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
        img: 'https://image.sivillage.com/upload/C00001/dspl/banner/1010/374/00/221000000288374.jpg?cVer=17020031&RS=&SP=1',
      },
      {
        author: 'Elon Musk',
        description: 'ghjhgjgj',
        img: 'https://image.sivillage.com/upload/C00001/dspl/banner/1010/225/00/220900000284225.jpg?cVer=10023119&RS=&SP=1',
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
  overflow-y: scroll;
}

#style-3::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

#style-3::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

#style-3::-webkit-scrollbar-thumb {
  background-color: #000000;
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

<template>
  <section>
    <swiper
      class="border-b-2 cursor-grab border-gray-500 max-w-screen-lg m-auto p-4 mt-24"
      :modules="moudles"
      :space-between="20"
      :loop="true"
      :pagination="{ clickable: true }"
      :autoplay="{
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      @click="showAlert"
    >
      <swiper-slide
        v-for="text in swiperTextBase"
        :key="text.description"
        class="pb-14 sm:flex sm:justify-evenly"
      >
        <div style="background-color: gray; position: relative">
          <div class="firstSwiper">
            <div class="bg-text">
              <h2>Winter LuxOn</h2>
              <h1 style="font-size: 50px">Luxury On</h1>
              <p>겨울 test</p>
            </div>
            <div style="postion: absolute; margini-top: -100px">
              <img
                :src="text.img"
                alt="image"
                style="
                  width: 100%;
                  height: 1000px;
                  position: absolute;
                  top: -50px;
                  filter: blur(15px);
                  -webkit-filter: blur(15px);
                "
                class="w-32 h-32 rounded-full object-cover mt-5 m-auto lg:m-0"
              />
            </div>
            <div style="postion: absolute; margini-top: -100px">
              <img
                :src="text.img"
                alt="image"
                style="
                  left: 50%;
                  width: 500px;
                  height: 750px;
                  position: absolute;
                  top: -50px;
                "
                class="w-32 h-32 rounded-full object-cover mt-5 m-auto lg:m-0"
              />
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </section>
  <section style="margin-top: 50px" class="favorite_cls" id="favorite_cls">
    <div class="container" style="margin-left: 15%">
      <h1 style="margin-left: -200px">Favorite Brand</h1>
      <br /><br />
      <swiper
        class="border-b-2 cursor-grab border-gray-500 max-w-screen-lg m-auto p-4 mt-24"
        :modules="moudles"
        :space-between="20"
        :loop="true"
        :pagination="{ clickable: true }"
        :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }"
        @click="showAlert"
      >
        <swiper-slide class="pb-14 sm:flex sm:justify-evenly">
          <div class="container_grid">
            <div class="item color1">
              <img
                src="https://image.sivillage.com/upload/C00001/goods/org/791/221004003248791.jpg?RS=350&SP=1"
                alt="image"
              />
              <span>
                <p>J.LINDEBERG</p>
                <p>[Women] 에블리나 봄버 자켓</p>
                <p>390,000</p>
              </span>
            </div>
            <div class="item color2">
              <img
                src="https://image.sivillage.com/upload/C00001/goods/org/648/220513002497648.jpg?RS=350&SP=1"
                alt="image"
              />
              <span>
                <p>J.LINDEBERG</p>
                <p>[Women] 에블리나 봄버 자켓</p>
                <p>390,000</p>
              </span>
            </div>
            <div class="item color3">
              <img
                src="https://image.sivillage.com/upload/C00001/goods/org/121/220308002104121.jpg?RS=350&SP=1"
                alt="image"
              />
              <span>
                <p>J.LINDEBERG</p>
                <p>[Women] 에블리나 봄버 자켓</p>
                <p>390,000</p>
              </span>
            </div>
            <div class="item color4">
              <img
                src="https://image.sivillage.com/upload/C00001/goods/org/868/220228002079868.jpg?RS=350&SP=1"
                alt="image"
              />
              <span>
                <p>J.LINDEBERG</p>
                <p>[Women] 에블리나 봄버 자켓</p>
                <p>390,000</p>
              </span>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="pb-14 sm:flex sm:justify-evenly">
          <div class="container_grid">
            <div class="item color5">
              <img
                src="https://image.sivillage.com/upload/C00001/goods/org/621/211201001837621.jpg?RS=350&SP=1"
                alt="image"
              />
              <span>
                <p>J.LINDEBERG</p>
                <p>[Women] 에블리나 봄버 자켓</p>
                <p>390,000</p>
              </span>
            </div>
            <div class="item color6">
              <img
                src="https://image.sivillage.com/upload/C00001/goods/org/523/221017003322523.jpg?RS=350&SP=1"
                alt="image"
              />
              <span>
                <p>J.LINDEBERG</p>
                <p>[Women] 에블리나 봄버 자켓</p>
                <p>390,000</p>
              </span>
            </div>
            <div class="item color7">
              <img
                src="https://image.sivillage.com/upload/C00001/goods/org/705/221019003338705.jpg?RS=350&SP=1"
                alt="image"
              />
              <span>
                <p>J.LINDEBERG</p>
                <p>[Women] 에블리나 봄버 자켓</p>
                <p>390,000</p>
              </span>
            </div>
            <div class="item color8">
              <img
                src="https://image.sivillage.com/upload/C00001/goods/org/621/211201001837621.jpg?RS=350&SP=1"
                alt="image"
              />
              <span>
                <p>J.LINDEBERG</p>
                <p>[Women] 에블리나 봄버 자켓</p>
                <p>390,000</p>
              </span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
  <section id="recommend_cls" class="recommend_cls">
    <div class="container" style="margin-left: 15%">
      <h1 style="margin-left: -200px">Recommended</h1>
      <br /><br />
      <swiper
        class="border-b-2 cursor-grab border-gray-500 max-w-screen-lg m-auto p-4 mt-24"
        :modules="moudles"
        :space-between="20"
        :loop="true"
        :pagination="{ clickable: true }"
        :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }"
        @click="showAlert"
      >
        <swiper-slide class="pb-14 sm:flex sm:justify-evenly">
          <div class="container_grid">
            <div class="item color1">
              <img
                src="https://image.sivillage.com/upload/C00001/goods/org/791/221004003248791.jpg?RS=350&SP=1"
                alt="image"
              />
              <span>
                <p>J.LINDEBERG</p>
                <p>[Women] 에블리나 봄버 자켓</p>
                <p>390,000</p>
              </span>
            </div>
            <div class="item color2">
              <img
                src="https://image.sivillage.com/upload/C00001/goods/org/648/220513002497648.jpg?RS=350&SP=1"
                alt="image"
              />
              <span>
                <p>J.LINDEBERG</p>
                <p>[Women] 에블리나 봄버 자켓</p>
                <p>390,000</p>
              </span>
            </div>
            <div class="item color3">
              <img
                src="https://image.sivillage.com/upload/C00001/goods/org/121/220308002104121.jpg?RS=350&SP=1"
                alt="image"
              />
              <span>
                <p>J.LINDEBERG</p>
                <p>[Women] 에블리나 봄버 자켓</p>
                <p>390,000</p>
              </span>
            </div>
            <div class="item color4">
              <img
                src="https://image.sivillage.com/upload/C00001/goods/org/868/220228002079868.jpg?RS=350&SP=1"
                alt="image"
              />
              <span>
                <p>J.LINDEBERG</p>
                <p>[Women] 에블리나 봄버 자켓</p>
                <p>390,000</p>
              </span>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="pb-14 sm:flex sm:justify-evenly">
          <div class="container_grid">
            <div
              class="item color5"
              v-for="(recommend, i) in state.products"
              :key="i"
              @click="showAlert"
            >
              <img :src="`${recommend.thumbnailUrl}`" alt="image" />
              <span>
                <p>{{ recommend.productName }}</p>
                <p>{{ recommend.price }}</p>
              </span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { EffectCube, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { ref } from 'vue';

import { reactive } from 'vue';
import { onBeforeMount } from 'vue';
import axios from 'axios';

SwiperCore.use([EffectCube, Pagination, Autoplay]);

export default {
  components: { Swiper, SwiperSlide },
  setup() {
    const swiperTextBase = ref([
      {
        author: 'Elon Musk',
        description: 'ghjhgjgj',
        img: 'https://image.sivillage.com/upload/C00001/dspl/banner/90/812/00/221000000299812.jpg',
      },
      {
        author: 'Elon Musk',
        description: 'ghjhgjgj',
        img: 'https://image.sivillage.com/upload/C00001/dspl/banner/1010/034/00/220900000284034.jpg?cVer=21032552',
      },
      {
        author: 'Elon Musk',
        description: 'ghjhgjgj',
        img: 'https://image.sivillage.com/upload/C00001/dspl/banner/1010/196/00/221000000297196.jpg?cVer=20035850',
      },
    ]);
    const swiperTextBase2 = ref([
      {
        img: 'https://image.sivillage.com/upload/C00001/goods/org/791/221004003248791.jpg?RS=350&SP=1',
        brand: 'Elon Musk',
        name: 'ghjhgjgj',
        price: '390000',
      },
      {
        img: 'https://image.sivillage.com/upload/C00001/goods/org/648/220513002497648.jpg?RS=350&SP=1',
        brand: 'Elon Musk',
        name: 'ghjhgjgj',
        price: '390000',
      },
      {
        img: 'https://image.sivillage.com/upload/C00001/goods/org/121/220308002104121.jpg?RS=350&SP=1',
        brand: 'Elon Musk',
        name: 'ghjhgjgj',
        price: '390000',
      },
      {
        img: 'https://image.sivillage.com/upload/C00001/goods/org/868/220228002079868.jpg?RS=350&SP=1',
        brand: 'Elon Musk',
        name: 'ghjhgjgj',
        price: '390000',
      },
      {
        img: 'https://image.sivillage.com/upload/C00001/goods/org/791/221004003248791.jpg?RS=350&SP=1',
        brand: 'Elon Musk',
        name: 'ghjhgjgj',
        price: '390000',
      },
      {
        img: 'https://image.sivillage.com/upload/C00001/goods/org/791/221004003248791.jpg?RS=350&SP=1',
        brand: 'Elon Musk',
        name: 'ghjhgjgj',
        price: '390000',
      },
      {
        img: 'https://image.sivillage.com/upload/C00001/goods/org/791/221004003248791.jpg?RS=350&SP=1',
        brand: 'Elon Musk',
        name: 'ghjhgjgj',
        price: '390000',
      },
      {
        img: 'https://image.sivillage.com/upload/C00001/goods/org/791/221004003248791.jpg?RS=350&SP=1',
        brand: 'Elon Musk',
        name: 'ghjhgjgj',
        price: '390000',
      },
    ]);

    const state = reactive({
      products: [],
    });

    onBeforeMount(() => {
      axios
        .get('https://sbbro.xyz/api/recommend/recommends/list', {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
          },
        })
        .then(response => {
          console.log(response);
          state.products = response.data;
        });
    });

    return { swiperTextBase, swiperTextBase2, state };
  },
  data() {
    return {
      productList: [],
    };
  },
  created() {
    this.getProductList();
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    async getProductList() {
      this.productList = await this.$api('/product/products');
      console.log(this.productList);
    },
    handleScroll() {
      // console.log(document.querySelector('html').scrollTop);
      let nowScroll = document.querySelector('html').scrollTop;
      if (nowScroll < 500) {
        document.getElementById('favorite_cls').style.opacity = '0';
        document.getElementById('favorite_cls').style.transform =
          'translateY(150px)';
      }
      if (nowScroll > 500) {
        document.getElementById('favorite_cls').style.opacity = '1';
        document.getElementById('favorite_cls').style.transform =
          'translateY(0)';
      }
      if (nowScroll < 700) {
        document.getElementById('recommend_cls').style.opacity = '0';
        document.getElementById('recommend_cls').style.transform =
          'translateY(150px)';
      }
      if (nowScroll > 1000) {
        document.getElementById('recommend_cls').style.opacity = '1';
        document.getElementById('recommend_cls').style.transform =
          'translateY(0)';
      }
    },
    showAlert() {
      // Use sweetalert2
      this.$swal('준비중 입니다');
    },
  },
};
</script>

<style scoped>
.firstSwiper {
  width: 100%;
  height: 600px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.firstSwiper img {
  margin-left: 1000px;
}

/* Position text in the middle of the page/image */
.bg-text {
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

.container_grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  grid-auto-rows: minmax(25px, auto);
}

.container_grid img {
  width: 300px;
  height: 400px;
}

.container_grid div span p {
  margin: 0px;
}

.favorite_cls {
  opacity: 0;
  transform: translateY(150px);
  transition: 2s all ease;
  /* transition-timing-function: ease;
  transition-duration: 1.5s;
  transition-property: opacity, transform; */
}

.favorite_cls.active {
  /* opacity: 0; */
  /* transform: translateY(0); */
  /* transition-timing-function: ease; */
}

.recommend_cls {
  opacity: 0;
  transform: translateY(150px);
  transition: 2s all ease;
  /* transition-timing-function: ease;
  transition-duration: 1.5s;
  transition-property: opacity, transform; */
}
</style>

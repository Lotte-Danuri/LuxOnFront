<template>
  <section>
    <swiper
      class="border-b-2 cursor-grab border-gray-500 max-w-screen-lg m-auto p-4 mt-24"
      :modules="moudles"
      :space-between="20"
      :loop="true"
      :pagination="{ clickable: true }"
      :autoplay="{
        delay: 70,
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
  <section style="margin-top: 100px">
    <div class="container" style="margin-left: 25%">
      <h1 style="margin-left: -200px">Favorite Brand</h1>
      <br /><br /><br /><br />
      <div class="container_grid">
        <div class="item color1">
          <img
            src="https://image.sivillage.com/upload/C00001/goods/org/791/221004003248791.jpg?RS=350&SP=1"
            alt="image"
          />
        </div>
        <div class="item color2">
          <img
            src="https://image.sivillage.com/upload/C00001/goods/org/648/220513002497648.jpg?RS=350&SP=1"
            alt="image"
          />
        </div>
        <div class="item color3">
          <img
            src="https://image.sivillage.com/upload/C00001/goods/org/121/220308002104121.jpg?RS=350&SP=1"
            alt="image"
          />
        </div>
        <div class="item color4">
          <img
            src="https://image.sivillage.com/upload/C00001/goods/org/868/220228002079868.jpg?RS=350&SP=1"
            alt="image"
          />
        </div>
        <div class="item color5">
          <img
            src="https://image.sivillage.com/upload/C00001/goods/org/621/211201001837621.jpg?RS=350&SP=1"
            alt="image"
          />
        </div>
        <div class="item color6">
          <img
            src="https://image.sivillage.com/upload/C00001/goods/org/523/221017003322523.jpg?RS=350&SP=1"
            alt="image"
          />
        </div>
        <div class="item color7">
          <img
            src="https://image.sivillage.com/upload/C00001/goods/org/705/221019003338705.jpg?RS=350&SP=1"
            alt="image"
          />
        </div>
        <div class="item color8">
          <img
            src="https://image.sivillage.com/upload/C00001/goods/org/621/211201001837621.jpg?RS=350&SP=1"
            alt="image"
          />
        </div>
        <div class="item color9">
          <img
            src="https://image.sivillage.com/upload/C00001/goods/org/177/220811002943177.png?RS=350&SP=1"
            alt="image"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { ref } from 'vue';

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
    return { modules: [Pagination, Autoplay], swiperTextBase };
  },
};
</script>

<style>
.firstSwiper {
  width: 100%;
  height: 700px;
  postion: absolute;
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
  grid-template-columns: 400px 400px 400px;
  grid-template-rows: 500px 500px 500px;
}

.container_grid img {
  width: 300px;
  height: 300px;
}
</style>

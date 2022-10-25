<template>
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
            <p>겨울 컬렉션</p>
          </div>
          <div style="postion: absolute; margini-top: -100px">
            <img
              :src="text.img"
              alt="image"
              style="
                width: 100%;
                height: 700px;
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
                height: 700px;
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
      <img
        :src="text.img"
        alt="image"
        class="w-32 h-32 rounded-full object-cover mt-5 m-auto lg:m-0"
      />
    </swiper-slide>
  </swiper>
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
</style>

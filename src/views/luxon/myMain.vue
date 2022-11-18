<template>
  <section style="margin-top: -70px">
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
            <div class="bg-text">
              <h2>Winter LuxOn</h2>
              <h1 style="font-size: 50px">{{ text.brand }}</h1>
              <p style="color: white; margin-top: 20px">
                {{ text.description }}
              </p>
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
            <div>
              <button
                style="
                  position: absolute;
                  background-color: transparent;
                  left: 0%;
                  top: 27%;
                  font-size: 200px;
                  color: white;
                "
              >
                <span class="material-icons-sharp" style="font-size: 100px">
                  arrow_back_ios
                </span>
              </button>
              <button
                style="
                  position: absolute;
                  background-color: transparent;
                  right: 0%;
                  top: 50%;
                  color: white;
                "
              >
                <span class="material-icons-sharp" style="font-size: 100px">
                  arrow_forward_ios
                </span>
              </button>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </section>
  <section>
    <div
      style="margin-left: 25%; margin-top: 3%; width: 60%; margin-bottom: 1%"
    >
      <div style="display: grid; grid-template-columns: 25% 25% 25% 25%">
        <div class="listBtn">
          <router-link
            :to="{
              name: 'MyList',
              query: { id: 3 },
            }"
          >
            <button>
              <img
                src="//www.chanel.com/apac/img/t_one/q_auto:good,fl_lossy,dpr_1.2,f_auto/w_642/prd-emea/sys-master/content/P1/haf/h52/9795611951134-Homepage_Fashion_ONE_Mobile(26).jpg 642w,//www.chanel.com/apac/img/t_one/q_auto:good,fl_lossy,dpr_1.2,f_auto/w_960/prd-emea/sys-master/content/P1/haf/h52/9795611951134-Homepage_Fashion_ONE_Mobile(26).jpg 960w,//www.chanel.com/apac/img/t_one/q_auto:good,fl_lossy,dpr_1.2,f_auto/w_1280/prd-emea/sys-master/content/P1/haf/h52/9795611951134-Homepage_Fashion_ONE_Mobile(26).jpg 1280w"
                style="width: 150px; height: 150px; border-radius: 100px"
              />
              <h2>여성</h2>
            </button>
          </router-link>
        </div>
        <div class="listBtn">
          <router-link
            :to="{
              name: 'MyList',
              query: { id: 5 },
            }"
          >
            <button>
              <img
                src="https://image.sivillage.com/upload/C00001/dspl/banner/1010/088/00/221000000303088.jpg?cVer=03041533&RS=&SP=1"
                style="width: 150px; height: 150px; border-radius: 100px"
              />
              <h2>남성</h2>
            </button>
          </router-link>
        </div>
        <div class="listBtn">
          <router-link
            :to="{
              name: 'MyList',
              query: { id: 6 },
            }"
          >
            <button>
              <img
                src="https://puls-img.chanel.com/1665492769363-pushbaspageone1210x680pximg03jpg_680x1210.jpg"
                style="width: 150px; height: 150px; border-radius: 100px"
              />
              <h2>패션잡화</h2>
            </button>
          </router-link>
        </div>
        <div class="listBtn">
          <router-link
            :to="{
              name: 'MyList',
              query: { id: 7 },
            }"
          >
            <button>
              <img
                src="https://image.sivillage.com/upload/C00001/dspl/banner/1010/801/00/220900000287801.jpg?cVer=31104641&RS=&SP=1"
                style="width: 150px; height: 150px; border-radius: 100px"
              />
              <h2>뷰티</h2>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
  <section
    style="
      background-image: url('https://contents.lotteon.com/display/dshoplnk/30511/2/M001155/289130/PB66348D4B3C34F5FF2DF2A17F24C2B70BAC43F300C76D0A9D0FC5B55BBD98C23/file');
      height: 150px;
      color: white;
    "
  >
    <div style="margin-left: 35%">
      <br />
      <p style="color: goldenrod; font-size: 40px">
        NFT 인증서 명품 검수 프로그램
      </p>
      <p style="color: white; font-size: 20px; margin-left: 10%">
        럭셔리 쇼핑의 디테일, LUX ON
      </p>
    </div>
  </section>
  <section
    id="recommend_cls"
    class="recommend_cls"
    style="
      background-image: url(https://api-beauty.dior.com/couture/var/dior/storage/images/horizon/beauty/womens-fragrance/new/29782799-27-int-EN/home-parfum-femme.jpg) !important;
    "
  >
    <div class="container" style="margin-left: 15%">
      <br /><br />
      <h1 style="margin-left: -200px; color: white">추천 상품</h1>
      <br /><br />
      <swiper
        class="border-b-2 cursor-grab border-gray-500 max-w-screen-lg m-auto p-4 mt-24"
        :space-between="21"
        :loop="true"
        :pagination="{ clickable: true }"
        :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }"
      >
        <swiper-slide class="pb-14 sm:flex sm:justify-evenly">
          <div class="container_grid">
            <div
              class="item color5"
              v-for="(recommend, i) in productList.slice(0, 4)"
              :key="i"
            >
              <router-link
                :to="{
                  path: '/product/myProduct',
                  query: { productCode: recommend.productCode },
                }"
              >
                <img :src="`${recommend.thumbnailUrl}`" alt="image" />
                <br />
                <span>
                  <h5 style="color: white">{{ recommend.productName }}</h5>
                  <p style="color: white">￦{{ comma(recommend.price) }}</p>
                </span>
              </router-link>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="pb-14 sm:flex sm:justify-evenly">
          <div class="container_grid">
            <div
              class="item color5"
              v-for="(recommend, i) in productList.slice(4, 8)"
              :key="i"
            >
              <router-link
                :to="{
                  path: '/product/myProduct',
                  query: { productCode: recommend.productCode },
                }"
              >
                <img :src="`${recommend.thumbnailUrl}`" alt="image" />
                <br />
                <span>
                  <h5 style="color: white">{{ recommend.productName }}</h5>
                  <p style="color: white">￦{{ comma(recommend.price) }}</p>
                </span>
              </router-link>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
  <section style="margin-top: 10px" class="coupon_cls" id="coupon_cls">
    <div class="container" style="margin-left: 15%">
      <!-- <h1 style="margin-left: -200px">기능1</h1> -->
      <br /><br />
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
        style="width: 2356px; margin-left: calc(-100vw + 110%) !important"
      >
        <swiper-slide class="pb-14 sm:flex sm:justify-evenly">
          <div class="coupon_grid">
            <div class="item color1">
              <img
                src="https://image.sivillage.com/upload/C00001/dspl/banner/1010/105/00/221000000300105.jpg?cVer=28085649&RS=400&SP=1"
                alt="image"
              />
              <div>
                <div class="coupon-text">
                  <h2>Coupon</h2>
                  <h2 style="font-size: 50px">Sale</h2>
                  <p style="color: white; margin-top: 20px">Sale</p>
                </div>
              </div>
            </div>
            <div class="item color2">
              <img
                src="https://image.sivillage.com/upload/C00001/dspl/banner/1010/042/00/220900000284042.jpg?cVer=31105127&RS=400&SP=1"
                alt="image"
              />
              <div>
                <div class="coupon-text">
                  <h2>Coupon</h2>
                  <h1 style="font-size: 50px">뷰티</h1>
                  <p style="color: white; margin-top: 20px">Beauty</p>
                </div>
              </div>
            </div>
            <div class="item color3">
              <img
                src="https://image.sivillage.com/upload/C00001/dspl/banner/1010/048/00/221100000306048.jpg?cVer=11100211&RS=400&SP=1"
                alt="image"
              />
              <div>
                <div class="coupon-text">
                  <h2>Coupon</h2>
                  <h1 style="font-size: 50px">여성</h1>
                  <p style="color: white; margin-top: 20px">For Girls</p>
                </div>
              </div>
            </div>
            <div class="item color4">
              <img
                src="https://image.sivillage.com/upload/C00001/dspl/banner/1010/991/00/221100000305991.jpg?cVer=11101746&RS=400&SP=1"
                alt="image"
              />
              <div>
                <div class="coupon-text">
                  <h2>Coupon</h2>
                  <h1 style="font-size: 50px">OFF</h1>
                  <p style="color: white; margin-top: 20px">Season OFF</p>
                </div>
              </div>
            </div>
            <div class="item color5">
              <img
                src="https://image.sivillage.com/upload/C00001/dspl/banner/1010/328/00/220900000285328.jpg?cVer=14102550&RS=400&SP=1"
                alt="image"
              />
              <div>
                <div class="coupon-text">
                  <h2>Coupon</h2>
                  <h1 style="font-size: 50px">패션</h1>
                  <p style="color: white; margin-top: 20px">악세서리</p>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="pb-14 sm:flex sm:justify-evenly">
          <div class="coupon_grid">
            <div class="item color5">
              <img
                src="https://image.sivillage.com/upload/C00001/dspl/banner/1010/991/00/221100000305991.jpg?cVer=11101746&RS=400&SP=1"
                alt="image"
              />
              <div>
                <div class="coupon-text">
                  <h2>Coupon</h2>
                  <h1 style="font-size: 50px">Special</h1>
                  <p style="color: white; margin-top: 20px">특별상품</p>
                </div>
              </div>
            </div>
            <div class="item color6">
              <img
                src="https://image.sivillage.com/upload/C00001/dspl/banner/1010/042/00/220900000284042.jpg?cVer=31105127&RS=400&SP=1"
                alt="image"
              />
              <div>
                <div class="coupon-text">
                  <h2>Coupon</h2>
                  <h1 style="font-size: 50px">화장품</h1>
                  <p style="color: white; margin-top: 20px">Cosmetic</p>
                </div>
              </div>
            </div>
            <div class="item color7">
              <img
                src="https://image.sivillage.com/upload/C00001/dspl/banner/1010/143/00/221000000298143.jpg?cVer=15104557&RS=400&SP=1"
                alt="image"
              />
              <div>
                <div class="coupon-text">
                  <h2>Coupon</h2>
                  <h1 style="font-size: 50px">Luxury</h1>
                  <p style="color: white; margin-top: 20px">Lux</p>
                </div>
              </div>
            </div>
            <div class="item color8">
              <img
                src="https://image.sivillage.com/upload/C00001/dspl/banner/1010/105/00/221000000300105.jpg?cVer=28085649&RS=400&SP=1"
                alt="image"
              />
              <div>
                <div class="coupon-text">
                  <h2>Coupon</h2>
                  <h1 style="font-size: 50px">시즌</h1>
                  <p style="color: white; margin-top: 20px">Season</p>
                </div>
              </div>
            </div>
            <div class="item color9">
              <img
                src="https://image.sivillage.com/upload/C00001/dspl/banner/1010/328/00/220900000285328.jpg?cVer=14102550&RS=400&SP=1"
                alt="image"
              />
              <div>
                <div class="coupon-text">
                  <h2>Coupon</h2>
                  <h1 style="font-size: 50px">여성</h1>
                  <p style="color: white; margin-top: 20px">For Girs</p>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>

  <section>
    <div style="margin-left: 20%">
      <div class="all_procut" style="margin-top: 3%">
        <!-- <button
          style="
            background-color: black;
            width: 40px;
            height: 30px;
            border-radius: 20px;
            position: absolute;
            left: 29%;
            margin-top: 3px;
            color: white;
          "
          @click="bestBtn"
        >
          ?
        </button> -->
        <h2 style="font-weight: bold">Best Product</h2>
        <br />
        <div class="product_grid">
          <div
            v-for="(product, index) in bestList.slice(0, 16)"
            v-bind:key="product"
            style="position: relative"
          >
            <router-link
              :to="{
                path: '/product/myProduct',
                query: { productCode: product.productCode },
              }"
            >
              <div
                class="rank_num"
                style="width: 30px; height: 30px; background-color: black"
              >
                {{ index + 1 }}
              </div>
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
  </section>

  <div class="pc-wrap">
    <div
      class="main__styling-slide"
      style="
        background-image: url('https://cdn-fo.sivillage.com/fo/assets/comm/image/main_styling_pattern.svg');
      "
    >
      <div class="main__styling-text">
        <h2 class="regularbold" style="margin-bottom: 0px">NFT</h2>
        <h2>보증서</h2>
        <div class="main__styling-info">
          <p class="main__styling-text-strong">PERFUME GALLERY</p>
          <p class="main__styling-text-description">
            [아무아쥬] 아너 오드퍼퓸 포 우먼 100ml
          </p>
        </div>
        <a href="#"
          ><img
            style="width: 150px; margin-left: 10px"
            src="https://qrcodethumb-phinf.pstatic.net/20221115_52/1668484058096jOxDz_PNG/13j7l.png"
          />
        </a>
      </div>
      <div class="main__styling-img">
        <a href="javascript:void(0);"
          ><img
            style="height: 550px; margin-top: 50px"
            src="https://image.sivillage.com/upload/C00001/goods/org/819/221012003299819.jpg?RS=600&amp;SP=1"
            alt="[아무아쥬] 아너 오드퍼퓸 포 우먼 100ml"
          />
        </a>
      </div>
      <div
        class=""
        style="
          background-image: url('https://pixy.org/src/474/thumbs350/4743058.jpg');
          background-size: 1000px 900px;
          background-repeat: no-repeat;
          margin-top: 60px;
          width: 700px;
          height: 620px;
          margin-left: 200px;
        "
      ></div>
    </div>
  </div>
  <div style="margin-left: 10%">
    <!-- <iframe
      width="1500"
      height="800"
      src="https://www.youtube.com/embed/DsZhTIwJV5E"
      title="The Dior Spring-Summer 2023 Show"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe> -->
  </div>
  <br />
  <br />
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { EffectCube, Pagination, Autoplay } from 'swiper';
// import 'swiper/css';
// import 'swiper/css/pagination';
import { ref } from 'vue';
// import router from '@/router';
import { reactive } from 'vue';
import { onBeforeMount } from 'vue';
import axios from 'axios';

// import LikeButton from '@/components/button/likeButton.vue';

SwiperCore.use([EffectCube, Pagination, Autoplay]);

export default {
  components: { Swiper, SwiperSlide },
  setup() {
    const swiperTextBase = ref([
      {
        brand: 'CHANEL',
        description: '2022/23 코코 네쥬 컬렉션',
        img: '//www.chanel.com/apac/img/t_one/q_auto:good,fl_lossy,dpr_1.2,f_auto/w_642/prd-emea/sys-master/content/P1/hf1/he1/10004788412446-Homepage_Fashion_ONE_Mobile2(1).jpg',
      },
      {
        brand: 'CELINE',
        description: 'HAUTE MAROQUINERIE',
        img: 'https://cms.celine.com/resource/blob/623944/0c7b44b3bb84ed2a755859ae1b7806e3/celine-homme-summer-23-dysfunctional-bauhaus-23-web-data.jpg',
      },
      {
        brand: 'DIOR',
        description: 'For GIFT',
        img: 'https://www.dior.com/couture/var/dior/storage/images/horizon/beauty/beauty-home-components/block-cover-cover-02-xmas-epopup/block-cover-item-xmas02/38380287-2-kor-KR/xmas022_1440_1200.jpg',
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
      productList: [],
      bestList: [],
    });

    onBeforeMount(() => {});

    return { swiperTextBase, swiperTextBase2, state };
  },
  data() {
    return {
      productList: [],
      bestList: [],
    };
  },
  created() {
    this.getProductList();
    window.addEventListener('scroll', this.handleScroll);
    if (localStorage.token) {
      this.getBestList();
    }
  },
  methods: {
    bestBtn() {
      this.$swal(
        '클릭수와 주문수에대해 상품전체갯수*0.5 한것의 순위를 각각 뽑고 각각 뽑은 순위가 서로 겹치는 상품에 대한 배열을 만든다음에 그 배열에서 상품전환율로 rank 오름차순처리한다.',
      );
    },
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    async getProductList() {
      this.productList = await this.$api('/product/products');
    },
    async getBestList() {
      try {
        const response = await axios.get(
          'https://sbbro.xyz/api/product/products/best/list',
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
            },
          },
        );
        this.bestList = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    handleScroll() {
      if (window.location.href.includes('main')) {
        let nowScroll = document.querySelector('html').scrollTop;
        // alert(nowScroll);
        if (nowScroll < 100) {
          document.getElementById('recommend_cls').style.opacity = '0';
          document.getElementById('recommend_cls').style.transform =
            'translateY(0)';
        }
        if (nowScroll > 200) {
          document.getElementById('recommend_cls').style.opacity = '1';
          document.getElementById('recommend_cls').style.transform =
            'translateY(0)';
        }
        if (nowScroll < 400) {
          document.getElementById('coupon_cls').style.opacity = '0';
        }
        if (nowScroll > 1000) {
          document.getElementById('coupon_cls').style.opacity = '1';
          document.getElementById('coupon_cls').style.transform =
            'translateY(0)';
        }
        // if (nowScroll < 1500) {
        //   document.getElementById('recommend_cls').style.opacity = '0';
        // }
        // if (nowScroll > 1500) {
        //   document.getElementById('recommend_cls').style.opacity = '1';
        //   document.getElementById('recommend_cls').style.transform =
        //     'translateY(0)';
        // }
      }
    },
    showAlert() {
      // Use sweetalert2
      this.$swal('준비중 입니다');
    },
  },
};
</script>

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
a {
  text-decoration: none;
  /* font-family: 'Do Hyeon', sans-serif; */
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
}

.coupon_cls .swiper-pagination-bullets span {
  display: none;
}

.swiper-pagination-bullets span {
  background-color: black;
}
</style>

<style scoped>
.listBtn button {
  background-color: transparent;
}
.firstSwiper {
  width: 100%;
  height: 600px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

/* .firstSwiper img {
  margin-left: 1000px;
} */

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

.coupon-text {
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
  color: white;
  font-weight: bold;
  border: 3px solid #f1f1f1;
  position: relative;
  margin-top: -60%;
  top: -100px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 50%;
  padding: 20px;
  text-align: center;
}

.container_grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  grid-auto-rows: minmax(25px, auto);
}
.coupon_grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(25px, auto);
}

.container_grid img {
  width: 280px;
  height: 400px;
  border-radius: 30px;
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

.main__styling-img img {
  height: 650px;
  width: 433px;
  object-fit: cover;
}

.main__styling-slide {
  position: relative;
  display: flex;
  height: 730px;
  padding: 0 183px 0 200px;
  box-sizing: border-box;
}

.main__styling-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main__styling-img {
  position: absolute;
  top: 41px;
  right: 223px;
}

.main__styling-text h2 {
  margin-bottom: 57px;
  font-size: 72px;
  color: #141a23;
}

.main__styling-text-strong {
  white-space: nowrap;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0.5px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.main__styling-text-description {
  white-space: nowrap;
  font-size: 16px;
  line-height: 22px;
  color: #404040;
  overflow: hidden;
  text-overflow: ellipsis;
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
  margin-bottom: 90px;
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

.rank_num {
  position: absolute;
  background-color: black;
  color: white;
  font-size: 20px;
  margin: 0;
  text-align: center;
}

.nft_grid {
  display: grid;
  grid-template-columns: 400px 500px;
  width: 800px;
}

.data_grid {
  display: grid;
  grid-template-columns: 150px 300px;
}

.data_grid h3 {
  font-weight: bold;
}
</style>

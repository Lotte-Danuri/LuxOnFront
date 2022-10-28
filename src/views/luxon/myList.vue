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
      <div>
        <h3>Category</h3>
        <ul>
          <li>전체</li>
          <li>아우터</li>
          <li>상의</li>
          <li>하의</li>
          <li>드레스/점프수트</li>
          <li>수트</li>
          <li>라운지웨어</li>
          <li>언더웨어</li>
        </ul>
      </div>
      <div>
        <h3>Filter</h3>
        <ul>
          <li>브랜드</li>
          <li>할인/혜택</li>
          <li>상품쿠폰</li>
          <li>세트 상품</li>
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
      <div>
        <h3>색상</h3>
        <ul class="color_grid" style="width: 150px; margin: 0px">
          <li class="option-color">
            <label class="option-detail">
              <input
                type="checkbox"
                autocomplete="off"
                class="checkEvent"
                id="ftrCk_color_01"
                data-selector="targetLink"
                data-filter_cd="01"
                data-text="화이트"
                value="화이트"
              />
              <span class="color-wrap">
                <img
                  src="https://image.sivillage.com/upload/C00001/goods/color/color_010005_210114010651.png"
                  alt="화이트"
                />
              </span>
            </label>
          </li>
          <li class="option-color">
            <label class="option-detail">
              <input
                type="checkbox"
                autocomplete="off"
                class="checkEvent"
                id="ftrCk_color_02"
                data-selector="targetLink"
                data-filter_cd="02"
                data-text="베이지"
                value="베이지"
              />
              <span class="color-wrap">
                <img
                  src="https://image.sivillage.com/upload/C00001/goods/color/color_020065_210114011229.png"
                  alt="베이지"
                />
              </span>
            </label>
          </li>
          <li class="option-color">
            <label class="option-detail">
              <input
                type="checkbox"
                autocomplete="off"
                class="checkEvent"
                id="ftrCk_color_03"
                data-selector="targetLink"
                data-filter_cd="03"
                data-text="그레이"
                value="그레이"
              />
              <span class="color-wrap">
                <img
                  src="https://image.sivillage.com/upload/C00001/goods/color/color_030005_210114010650.png"
                  alt="그레이"
                />
              </span>
            </label>
          </li>
          <li class="option-color">
            <label class="option-detail">
              <input
                type="checkbox"
                autocomplete="off"
                class="checkEvent"
                id="ftrCk_color_04"
                data-selector="targetLink"
                data-filter_cd="04"
                data-text="블랙"
                value="블랙"
              />
              <span class="color-wrap">
                <img
                  src="https://image.sivillage.com/upload/C00001/goods/color/color_040002_210114011352.png"
                  alt="블랙"
                />
              </span>
            </label>
          </li>
          <li class="option-color">
            <label class="option-detail">
              <input
                type="checkbox"
                autocomplete="off"
                class="checkEvent"
                id="ftrCk_color_05"
                data-selector="targetLink"
                data-filter_cd="05"
                data-text="브라운"
                value="브라운"
              />
              <span class="color-wrap">
                <img
                  src="https://image.sivillage.com/upload/C00001/goods/color/color_110021_210114010651.png"
                  alt="브라운"
                />
              </span>
            </label>
          </li>
          <li class="option-color">
            <label class="option-detail">
              <input
                type="checkbox"
                autocomplete="off"
                class="checkEvent"
                id="ftrCk_color_06"
                data-selector="targetLink"
                data-filter_cd="06"
                data-text="레드"
                value="레드"
              />
              <span class="color-wrap">
                <img
                  src="https://image.sivillage.com/upload/C00001/goods/color/color_060027_210114011352.png"
                  alt="레드"
                />
              </span>
            </label>
          </li>
          <li class="option-color">
            <label class="option-detail">
              <input
                type="checkbox"
                autocomplete="off"
                class="checkEvent"
                id="ftrCk_color_07"
                data-selector="targetLink"
                data-filter_cd="07"
                data-text="핑크"
                value="핑크"
              />
              <span class="color-wrap">
                <img
                  src="https://image.sivillage.com/upload/C00001/goods/color/color_070070_210114011352.png"
                  alt="핑크"
                />
              </span>
            </label>
          </li>
          <li class="option-color">
            <label class="option-detail">
              <input
                type="checkbox"
                autocomplete="off"
                class="checkEvent"
                id="ftrCk_color_08"
                data-selector="targetLink"
                data-filter_cd="08"
                data-text="오렌지"
                value="오렌지"
              />
              <span class="color-wrap">
                <img
                  src="https://image.sivillage.com/upload/C00001/goods/color/color_080018_210114011352.png"
                  alt="오렌지"
                />
              </span>
            </label>
          </li>
          <li class="option-color">
            <label class="option-detail">
              <input
                type="checkbox"
                autocomplete="off"
                class="checkEvent"
                id="ftrCk_color_09"
                data-selector="targetLink"
                data-filter_cd="09"
                data-text="옐로우"
                value="옐로우"
              />
              <span class="color-wrap">
                <img
                  src="https://image.sivillage.com/upload/C00001/goods/color/color_120010_210114010651.png"
                  alt="옐로우"
                />
              </span>
            </label>
          </li>
          <li class="option-color">
            <label class="option-detail">
              <input
                type="checkbox"
                autocomplete="off"
                class="checkEvent"
                id="ftrCk_color_10"
                data-selector="targetLink"
                data-filter_cd="10"
                data-text="그린"
                value="그린"
              />
              <span class="color-wrap">
                <img
                  src="https://image.sivillage.com/upload/C00001/goods/color/color_110022_210114010650.png"
                  alt="그린"
                />
              </span>
            </label>
          </li>
          <li class="option-color">
            <label class="option-detail">
              <input
                type="checkbox"
                autocomplete="off"
                class="checkEvent"
                id="ftrCk_color_11"
                data-selector="targetLink"
                data-filter_cd="11"
                data-text="블루"
                value="블루"
              />
              <span class="color-wrap">
                <img
                  src="https://image.sivillage.com/upload/C00001/goods/color/color_100018_210114010651.png"
                  alt="블루"
                />
              </span>
            </label>
          </li>
          <li class="option-color">
            <label class="option-detail">
              <input
                type="checkbox"
                autocomplete="off"
                class="checkEvent"
                id="ftrCk_color_12"
                data-selector="targetLink"
                data-filter_cd="12"
                data-text="퍼플"
                value="퍼플"
              />
              <span class="color-wrap">
                <img
                  src="https://image.sivillage.com/upload/C00001/goods/color/color_110023_210114010651.png"
                  alt="퍼플"
                />
              </span>
            </label>
          </li>
          <li class="option-color">
            <label class="option-detail">
              <input
                type="checkbox"
                autocomplete="off"
                class="checkEvent"
                id="ftrCk_color_13"
                data-selector="targetLink"
                data-filter_cd="13"
                data-text="골드"
                value="골드"
              />
              <span class="color-wrap">
                <img
                  src="https://image.sivillage.com/upload/C00001/goods/color/color_110024_210114010650.png"
                  alt="골드"
                />
              </span>
            </label>
          </li>
          <li class="option-color">
            <label class="option-detail">
              <input
                type="checkbox"
                autocomplete="off"
                class="checkEvent"
                id="ftrCk_color_14"
                data-selector="targetLink"
                data-filter_cd="14"
                data-text="실버"
                value="실버"
              />
              <span class="color-wrap">
                <img
                  src="https://image.sivillage.com/upload/C00001/goods/color/color_110025_210114010651.png"
                  alt="실버"
                />
              </span>
            </label>
          </li>
          <li class="option-color">
            <label class="option-detail">
              <input
                type="checkbox"
                autocomplete="off"
                class="checkEvent"
                id="ftrCk_color_15"
                data-selector="targetLink"
                data-filter_cd="15"
                data-text="기타"
                value="기타"
              />
              <span class="color-wrap">
                <img
                  src="https://image.sivillage.com/upload/C00001/goods/color/color_15_210114025641.png"
                  alt="기타"
                />
              </span>
            </label>
          </li>
        </ul>
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
      <div class="swiper-content">
        <div class="leftSwiper">
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
                  <div class="list-text">
                    <h2>Winter LuxOn</h2>
                    <h1 style="font-size: 50px">Luxury On</h1>
                    <p>겨울 test</p>
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
              v-for="text in swiperTextBase2"
              :key="text.description"
              class="pb-14 sm:flex sm:justify-evenly"
            >
              <div style="background-color: gray; position: relative">
                <div class="firstSwiper">
                  <div class="list-text">
                    <h2>Winter LuxOn</h2>
                    <h1 style="font-size: 50px">Luxury On</h1>
                    <p>겨울 test</p>
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
      <div class="all_procut" style="margin-top: -100px">
        <h2 style="font-weight: bold">All Product</h2>
        <br />
        <div class="product_grid">
          <div>
            <img
              src="https://image.sivillage.com/upload/C00001/goods/org/423/211102001634423.jpg?RS=350&SP=1"
            />
            <span>
              <p>SACAI</p>
              <p>언발 집업 하이넥 패딩 점퍼</p>
              <p>￦1,790,000</p>
            </span>
          </div>
          <div>
            <img
              src="https://image.sivillage.com/upload/C00001/goods/org/546/211015001544546.jpg?RS=350&SP=1"
            />
            <span>
              <p>SACAI</p>
              <p>언발 집업 하이넥 패딩 점퍼</p>
              <p>￦1,790,000</p>
            </span>
          </div>
          <div>
            <img
              src="https://image.sivillage.com/upload/C00001/goods/org/266/211019001559266.jpg?RS=350&SP=1"
            />
            <span>
              <p>SACAI</p>
              <p>언발 집업 하이넥 패딩 점퍼</p>
              <p>￦1,790,000</p>
            </span>
          </div>
          <div>
            <img
              src="https://image.sivillage.com/upload/C00001/goods/org/547/220914003112547.jpg?RS=350&SP=1"
            />
            <span>
              <p>SACAI</p>
              <p>언발 집업 하이넥 패딩 점퍼</p>
              <p>￦1,790,000</p>
            </span>
          </div>
          <div>
            <img
              src="https://image.sivillage.com/upload/C00001/goods/org/019/220906003076019.jpg?RS=350&SP=1"
            />
            <span>
              <p>SACAI</p>
              <p>언발 집업 하이넥 패딩 점퍼</p>
              <p>￦1,790,000</p>
            </span>
          </div>
          <div>
            <img
              src="https://image.sivillage.com/upload/C00001/goods/org/973/210917001469973.jpg?RS=300&SP=1"
            />
            <span>
              <p>SACAI</p>
              <p>언발 집업 하이넥 패딩 점퍼</p>
              <p>￦1,790,000</p>
            </span>
          </div>
          <div>
            <img
              src="https://image.sivillage.com/upload/C00001/goods/org/058/221019003343058.jpg?RS=300&SP=1"
            />
            <span>
              <p>SACAI</p>
              <p>언발 집업 하이넥 패딩 점퍼</p>
              <p>￦1,790,000</p>
            </span>
          </div>
          <div>
            <img
              src="https://image.sivillage.com/upload/C00001/goods/org/895/221024003363895.jpg?RS=300&SP=1"
            />
            <span>
              <p>SACAI</p>
              <p>언발 집업 하이넥 패딩 점퍼</p>
              <p>￦1,790,000</p>
            </span>
          </div>
          <div>
            <img
              src="https://image.sivillage.com/upload/C00001/goods/org/024/221026003379024.jpg?RS=300&SP=1"
            />
            <span>
              <p>SACAI</p>
              <p>언발 집업 하이넥 패딩 점퍼</p>
              <p>￦1,790,000</p>
            </span>
          </div>
          <div>
            <img
              src="https://image.sivillage.com/upload/C00001/goods/org/411/221014003312411.jpg?RS=300&SP=1"
            />
            <span>
              <p>SACAI</p>
              <p>언발 집업 하이넥 패딩 점퍼</p>
              <p>￦1,790,000</p>
            </span>
          </div>
          <div>
            <img
              src="https://image.sivillage.com/upload/C00001/goods/org/952/220810002934952.jpg?RS=300&SP=1"
            />
            <span>
              <p>SACAI</p>
              <p>언발 집업 하이넥 패딩 점퍼</p>
              <p>￦1,790,000</p>
            </span>
          </div>
          <div>
            <img
              src="https://image.sivillage.com/upload/C00001/goods/org/478/221024003365478.jpg?RS=300&SP=1"
            />
            <span>
              <p>SACAI</p>
              <p>언발 집업 하이넥 패딩 점퍼</p>
              <p>￦1,790,000</p>
            </span>
          </div>
          <div>
            <img
              src="https://image.sivillage.com/upload/C00001/goods/org/393/220908003092393.jpg?RS=300&SP=1"
            />
            <span>
              <p>SACAI</p>
              <p>언발 집업 하이넥 패딩 점퍼</p>
              <p>￦1,790,000</p>
            </span>
          </div>
          <div>
            <img
              src="https://image.sivillage.com/upload/C00001/goods/org/785/220916003124785.jpg?RS=300&SP=1"
            />
            <span>
              <p>SACAI</p>
              <p>언발 집업 하이넥 패딩 점퍼</p>
              <p>￦1,790,000</p>
            </span>
          </div>
          <div>
            <img
              src="https://image.sivillage.com/upload/C00001/goods/org/700/221018003331700.jpg?RS=300&SP=1"
            />
            <span>
              <p>SACAI</p>
              <p>언발 집업 하이넥 패딩 점퍼</p>
              <p>￦1,790,000</p>
            </span>
          </div>
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
  setup() {
    const swiperTextBase = ref([
      {
        author: 'Elon Musk',
        description: 'ghjhgjgj',
        img: 'https://image.sivillage.com/upload/C00001/dspl/banner/1010/608/00/221000000297608.jpg?cVer=20091259&RS=&SP=1',
      },
      {
        author: 'Elon Musk',
        description: 'ghjhgjgj',
        img: 'https://image.sivillage.com/upload/C00001/dspl/banner/1010/496/00/221000000288496.jpg?cVer=12125857&RS=&SP=1',
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
    const swiperTextBase2 = ref([
      {
        author: 'Elon Musk',
        description: 'ghjhgjgj',
        img: 'https://image.sivillage.com/upload/C00001/dspl/banner/1010/225/00/220900000284225.jpg?cVer=10023119&RS=&SP=1',
      },
      {
        author: 'Elon Musk',
        description: 'ghjhgjgj',
        img: 'https://image.sivillage.com/upload/C00001/dspl/banner/1010/374/00/221000000288374.jpg?cVer=17020031&RS=&SP=1',
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
    return { modules: [Pagination, Autoplay], swiperTextBase, swiperTextBase2 };
  },
};
</script>

<style scoped>
.side_menu div h3 {
  margin-bottom: 10px;
  font-weight: bold;
}
.side_menu div ul li {
  margin-bottom: 5px;
  font-size: 5px;
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
  postion: absolute;
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
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
  grid-auto-rows: minmax(5px, auto);
  margin-right: 20%;
}

.product_grid div {
  background-color: rgb(238, 238, 238);
  width: 200px;
  height: 300px;
  margin-bottom: 80px;
}

.product_grid div img {
  height: 300px;
}

.product_grid div span p {
  font-weight: bold;
}
.product_grid div span p {
  margin: 0px;
}
</style>

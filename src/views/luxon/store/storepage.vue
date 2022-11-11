<template>
  <div class="brand_top">
    <div class="brand_info">
      <div>
        <img class="brand_thumnail" :src="brand.imageUrl" />
      </div>
      <div class="brand_name">{{ brand.name }}</div>

      <div class="brand_store">
        <div>
          <input
            type="radio"
            class="btn-check"
            v-model="selectedStoreId"
            value=""
            id="storeAll"
            @change="getBrandProduct()"
            checked
          />
          <label name="options-outlined" class="btn stores" for="storeAll"
            >전체</label
          >
        </div>
        <div v-for="store in storeList" :key="store.storeId">
          <input
            type="radio"
            v-model="selectedStoreId"
            :value="store.storeId"
            class="btn-check"
            @change="getBrandProduct()"
            :id="store.storeId"
          />
          <label
            name="options-outlined"
            class="btn stores"
            :for="store.storeId"
            >{{ store.storeName }}</label
          >
        </div>
      </div>
      <div class="store_btns" v-if="selectedStoreId">
        <button class="btn btn-dark store_follow" @click="followBtn()">
          <i class="bi bi-heart"></i>팔로우
        </button>
        <button class="btn btn-dark store_chat" @click="followBtn()">
          <i class="bi bi-chat-left-dots"></i>채팅 문의
        </button>
      </div>
    </div>
  </div>
  <div class="list_grid">
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
                      getBrandProduct();
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
      <div class="all_procut">
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
              <span>
                <p>{{ product.productName }}</p>
                <p>￦{{ comma(product.price) }}</p>
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios';

export default {
  data() {
    return {
      productList: [],
      categoryList: [],
      categorySecondList: [],
      categoryThirdList: [],
      firstValue: '',
      secondValue: '',
      thirdValue: '',
      selectedStoreId: '',
      brandStores: [],
      storeList: [],
      brand: {},
    };
  },
  created() {
    this.getBrandProduct();
    this.getCategoryList();
    this.getBrandStores();
    this.getBrand();
  },
  methods: {
    async getCategoryList() {
      this.categoryList = await this.$api('/product/categories');
      console.log(this.categoryList);
    },
    async getProductList() {
      this.productList = await this.$api('/product/products');
    },
    async getBrandStores() {
      await axios
        .get(
          'https://sbbro.xyz/api/member/store/stores/' +
            this.$route.query.brandId,
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              contentType: 'application/json',
            },
          },
        )
        .then(res => (this.storeList = res.data));
      console.log(this.storeList);
    },
    async getBrand() {
      await axios
        .get(
          'https://sbbro.xyz/api/member/store/brand/' +
            this.$route.query.brandId,
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              contentType: 'application/json',
            },
          },
        )
        .then(res => (this.brand = res.data));
      console.log(this.brand);
    },
    async getBrandProduct() {
      await axios
        .post(
          'https://sbbro.xyz/api/product/products/brand',
          {
            brandId: this.$route.query.brandId,
            categoryFirstId: this.firstValue,
            categorySecondId: this.secondValue,
            categoryThirdId: null,
            storeId: this.selectedStoreId,
          },
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              contentType: 'application/json',
            },
          },
        )
        .then(response => {
          console.log(response.data);
          this.productList = response.data;
        });
    },
    async followBtn() {
      await axios
        .post(
          'https://sbbro.xyz/api/product/products/brand',
          {
            brandId: this.$route.query.brandId,
            categoryFirstId: this.firstValue,
            categorySecondId: this.secondValue,
            categoryThirdId: null,
            storeId: this.selectedStoreId,
          },
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              contentType: 'application/json',
            },
          },
        )
        .then(response => {
          console.log(response.data);
          this.productList = response.data;
        });
    },
  },
  setup() {
    const comma = val => {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    return {
      modules: [Pagination, Autoplay],
      comma,
    };
  },
};
</script>

<style scoped>
/* Adopt bootstrap pagination stylesheet. */
/* @import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'; */

/* Write your own CSS for pagination */

.side_menu div h3 {
  margin-bottom: 10px;
  font-weight: bold;
}
.side_menu div ul li {
  margin-bottom: 5px;
  font-size: 13px;
}

.side_menu {
  float: left;
  width: 200px;
}

#style-3::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

#style-3::-webkit-scrollbar-thumb {
  background-color: #000000;
}

.brand_top {
  padding: 20px;

  background-color: black;
  height: 300px;
  width: 100%;
}

.list_grid {
  margin-top: 5%;
  margin-left: 10%;
  display: grid;
  grid-template-columns: 15% 85%;
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

.brand_info {
  color: white;
  text-align: center;
  align-items: center;
}
.brand_name {
  align-self: center;
  font-size: large;
  margin-bottom: 5px;
}
.brand_thumnail {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin: auto;
  margin-bottom: 20px;
}
.brand_top {
  display: flex;
  justify-content: center;
}

.brand_store {
  display: flex;
  width: 400px;
  margin-bottom: -40px;
  justify-content: space-evenly;
}

.stores {
  border-radius: 50%;
  color: white;
  vertical-align: middle;
  height: 55px;
  width: 55px;
  padding-top: 17px;
  font-size: small;
  white-space: pre;
}

.stores:hover {
  background-color: white;
  color: black;
  border-radius: 0%;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
}

.btn-check:checked + .btn {
  background-color: white;
  color: black;
  border-color: white;
  border-radius: 0%;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
}

.store_btns {
  display: flex;
  justify-content: space-evenly;
  background-color: white;
  height: 40px;
  margin: auto;
  padding-top: 8px;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 10px;
  border-radius: 10px;
  width: 358px;
}

.store_follow {
  width: 100px;
  height: 33px;
}
.store_chat {
  width: 100px;
  height: 33px;
}
</style>

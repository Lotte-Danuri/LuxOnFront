<template>
  <br />
  <br />
  <h1>상품 관리</h1>
  <br />
  <div style="display: flex">
    <h3>상품 조회, 수정 및 NFT 증명서 등록이 가능합니다.</h3>
    <h3 style="font-style: italic; color: gray; margin-left: 49%">
      {{ userName }}
    </h3>
    <h3>　님 안녕하세요</h3>
    <a @click="logout" style="margin-left: 4%">
      <div style="display: flex; margin-bottom: 0px">
        <span class="material-icons-sharp">logout</span>
        <h3>Logout</h3>
      </div>
    </a>
  </div>
  <hr />
  <br />
  <main class="main_div">
    <div class="regi_grid">
      <div class="top_div">
        <div class="select_div">
          <div class="input-group mb-3">
            <select
              @change="changeCategoryFirst($event)"
              id="first_category_id"
              class="form-select"
              aria-label="Default select example"
            >
              <option :value="-1">- 대분류-</option>
              <option v-for="(category, i) in categoryList" :key="i" :value="i">
                <p>{{ category.categoryName }}</p>
                <div :id="`${category.id}`" style="dispaly: none"></div>
              </option>
            </select>
            <select
              @change="changeCategorySecond($event)"
              class="form-select"
              aria-label="Default select example"
            >
              <option :value="-1">- 중분류 -</option>
              <option
                v-for="(categorySecond, i) in categorySecondList"
                :key="i"
                :value="i"
              >
                <p>{{ categorySecond.categoryName }}</p>
                <p :id="`${categorySecond.id}`" style="dispaly: none"></p>
              </option>
            </select>
            <select
              @change="changeCategoryThird($event)"
              class="form-select"
              aria-label="Default select example"
            >
              <option :value="-1">- 소분류 -</option>
              <option
                v-for="(categoryThird, i) in categoryThirdList"
                :key="i"
                :value="i"
              >
                <p>{{ categoryThird.categoryName }}</p>
                <p :id="`${categoryThird.id}`" style="dispaly: none"></p>
              </option>
            </select>
            <input
              class="form-control"
              placeholder="상품명을 입력하세요"
              id="inputProductName"
            />
          </div>
          <button
            id="productSearchButton"
            class="btn btn-outline-dark"
            style="
              width: 140px;
              height: 50px;
              margin-left: 13%;
              /* margin-top: 30px; */
            "
            @click="productSearch"
          >
            상품검색
          </button>
        </div>
      </div>
    </div>
    <table id="customers">
      <tr>
        <th>순번</th>
        <th>사진</th>
        <th>상품명</th>
        <th>가격</th>
        <th style="width: 60px">좋아요</th>
        <th>대분류</th>
        <th>중분류</th>
        <th>소분류</th>
        <th>수정</th>
        <th>삭제</th>
        <th>증명서 등록</th>
      </tr>
      <tr v-for="(product, i) in productList" :key="i">
        <td>{{ i + 1 }}</td>
        <td><img :src="`${product.thumbnailUrl}`" style="height: 100px" /></td>
        <td>{{ product.productName }}</td>
        <td>{{ comma(product.price) }}원</td>
        <td>{{ product.likeCount }}개</td>
        <td>{{ product.categoryFirstName }}</td>
        <td>{{ product.categorySecondName }}</td>
        <td>{{ product.categoryThirdName }}</td>
        <td>
          <button
            style="
              background-color: white;
              width: 100px;
              height: 50px;
              color: black;
              border: solid 1px black;
            "
            @click="updateProduct(`${product.id}`)"
          >
            정보수정
          </button>
        </td>
        <td>
          <button
            style="
              background-color: white;
              width: 100px;
              height: 50px;
              color: black;
              border: solid 1px black;
            "
            @click="deleteProduct(`${product.id}`)"
          >
            상품삭제
          </button>
        </td>
        <td>
          <button
            style="
              background-color: white;
              width: 100px;
              height: 50px;
              color: black;
              border: solid 1px black;
            "
            @click="addNft(product)"
          >
            증명서 등록
          </button>
        </td>
      </tr>
    </table>
  </main>
</template>
<script>
import axios from 'axios';
import router from '@/router';
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';

export default {
  data() {
    return {
      productList: [],
      categoryList: [],
      categorySecondList: [],
      categoryThirdList: [],
      firstClickValue: '',
      secondClickValue: '',
      thirdClickValue: '',
      firstValue: '',
      secondValue: '',
      thirdValue: '',
      userName: localStorage.getItem('userName'),
      router: useRouter(),
    };
  },
  created() {
    this.getProductList();
    this.getCategoryList();
  },
  methods: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    async getCategoryList() {
      this.categoryList = await this.$api('/product/categories');
      console.log(this.categoryList);
    },
    async getProductList() {
      axios
        .get(
          'http://localhost:8000/product/sellers/products/' +
            localStorage.getItem('store_id'),
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          this.productList = response.data;
          console.log(this.productList);
        });
    },
    changeCategoryFirst(event) {
      console.log(this.firstClickValue);
      this.firstClickValue = event.target.value;
      if (this.firstClickValue == -1) {
        this.firstValue = '';
      } else {
        this.categorySecondList =
          this.categoryList[this.firstClickValue].categorySecondDtoList;
        this.firstValue = this.categoryList[this.firstClickValue].id;
      }
    },
    changeCategorySecond(event) {
      this.secondClickValue = event.target.value;
      if (this.secondClickValue == -1) {
        this.secondValue = '';
      } else {
        this.categoryThirdList =
          this.categorySecondList[this.secondClickValue].categoryThirdDtoList;
        this.secondValue =
          this.categoryList[this.firstClickValue].categorySecondDtoList[
            this.secondClickValue
          ].id;
      }
    },
    changeCategoryThird(event) {
      this.thirdClickValue = event.target.value;
      if (this.thirdClickValue == -1) {
        this.thirdValue = '';
      } else {
        this.thirdValue =
          this.categoryList[this.firstClickValue].categorySecondDtoList[
            this.secondClickValue
          ].categoryThirdDtoList[this.thirdClickValue].id;
      }
    },
    productSearch() {
      let firstClickId = parseInt(this.firstValue);
      let secondClickId = parseInt(this.secondValue);
      let thirdClickId = parseInt(this.thirdValue);
      let inputProductName = document.getElementById('inputProductName').value;
      axios
        .post(
          'http://localhost:8000/product/sellers/products/category',
          {
            stordId: localStorage.getItem('store_id'),
            categoryFirstId: firstClickId,
            categorySecondId: secondClickId,
            categoryThirdId: thirdClickId,
            productName: inputProductName,
          },
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          console.log(response.data);
          this.productList = response.data;
        });
    },

    updateProduct(productId) {
      router.push({ path: 'updateProduct', query: { productId: productId } });
    },

    deleteProduct(productId) {
      var id = parseInt(productId);
      axios
        .delete('http://localhost:8000/product/sellers/products', {
          data: {
            id: id,
          },
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          alert('상품 삭제 완료!');
          document.getElementById('productSearchButton').click();
        });
    },

    async getBrand(storeId) {
      try {
        const response = await axios.get(
          'http://localhost:8000/member/store/name/' + storeId,
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
            },
          },
        );
        console.log('getBrand', response);
        return response.data;
      } catch (arr) {
        console.log(arr);
      }
    },

    async addNft(product) {
      console.log(product);

      var brand = await this.getBrand(localStorage.getItem('store_id'));
      var postData = {
        productId: product.id,
        name: product.productName,
        symbol: product.productCode,
        image: product.thumbnailUrl,
        price: product.price,
        brandName: product.brandName,
        sellerId: localStorage.getItem('store_id'),
        brandName: brand.brandName,
      };

      Swal.fire({
        title: '상품의 영수증을 NFT로 관리하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: '네',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return axios.post('https://sbbro.xyz/v2/nft/contract', postData);
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then(result => {
        console.log(result);
        if (result.value.status == 200) {
          Swal.fire({
            icon: 'success',
            text: '등록이 완료되었습니다.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            text: '등록에 실패하였습니다.',
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.regi_grid {
  grid-template-columns: 700px 200px 200px;
  gap: 30px;
  padding: 10px 50px 10px 50px;
  border: solid 1px black;
  border-radius: 10px;
  margin-bottom: 50px;
}
.category_grid {
  /* display: grid; */
  /* grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(25px, auto); */
}

.category_grid div input {
  margin: 0px;
  width: 30px;
  height: 30px;
}

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  text-align: center;
  width: 90%;
  margin-left: 5%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #9b9b9b;
  color: white;
}

.table_grid {
  display: grid;
  grid-template-columns: 500px 50px 500px 100px;
  gap: 30px;
  border: solid 2px black;
  /* grid-auto-rows: minmax(25px, auto); */
}

.table_grid div table {
  width: 500px;
  margin-left: 10px;
  margin-top: 10px;
  border: solid 2px gray;
}
.select_div {
  display: flex;
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: 10%;
}

.select_div select {
  width: 60px;
  height: 50px;
  float: left;
}
.main_div {
  align-content: center;
  margin-left: 100px;
  margin-right: 100px;
}

.input-group {
  width: 65%;
}
</style>

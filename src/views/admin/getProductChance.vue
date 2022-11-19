<template>
  <br />
  <br />
  <h1>상품 분석</h1>
  <br />
  <div style="display: flex">
    <h3>상품의 방문횟수, 주문횟수, 주문전환율 조회가 가능합니다.</h3>
    <h3 style="font-style: italic; color: gray; margin-left: 45%">
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
  <main>
    <div class="regi_grid">
      <div class="top_div">
        <div class="input-group mb-3">
          <input type="datetime-local" class="form-control" id="startDate" />
          <input type="datetime-local" class="form-control" id="endDate" />
        </div>
        <button
          id="searchRecommendProductListButton"
          class="btn btn-outline-dark"
          style="
            width: 100px;
            height: 50px;
            border: solid 1px black;
            margin-left: 5%;
          "
          @click="searchRecommendProductList"
        >
          상품검색
        </button>
      </div>
    </div>
    <br />
    <br />
    <h3 style="margin-left: 40%">
      ※ 주문이 5회 이하이고, 주문 전환율이 낮은 순입니다.
    </h3>
    <br />
    <table id="customers">
      <tr>
        <th>순위</th>
        <th>사진</th>
        <th>상품명</th>
        <th>가격</th>
        <th>좋아요</th>
        <th>대분류</th>
        <th>중분류</th>
        <th>소분류</th>
        <th style="background-color: black">방문횟수</th>
        <th style="background-color: black">주문횟수</th>
        <th style="background-color: black">주문전환율</th>
        <th>수정</th>
      </tr>
      <tr v-for="(recommendProduct, i) in recommendProductList" :key="i">
        <td>{{ i + 1 }}</td>
        <td>
          <img
            :src="`${recommendProduct.thumbnailUrl}`"
            style="height: 100px"
          />
        </td>
        <td>{{ recommendProduct.productName }}</td>
        <td>{{ comma(recommendProduct.price) }}원</td>
        <td>{{ recommendProduct.likeCount }}개</td>
        <td>{{ recommendProduct.categoryFirstName }}</td>
        <td>{{ recommendProduct.categorySecondName }}</td>
        <td>{{ recommendProduct.categoryThirdName }}</td>
        <td>{{ recommendProduct.clickCount }}회</td>
        <td>{{ recommendProduct.orderCount }}회</td>
        <td>{{ recommendProduct.conversionRate.toFixed(2) }}%</td>
        <td>
          <button
            style="
              background-color: white;
              width: 100px;
              height: 50px;
              color: black;
              border: solid 1px black;
            "
            @click="updateProduct(`${recommendProduct.id}`)"
          >
            정보수정
          </button>
        </td>
      </tr>
    </table>
  </main>
</template>
<script>
import axios from 'axios';
import router from '@/router';

export default {
  data() {
    return {
      recommendProductList: [],
      startDate: '',
      endDate: '',
      userName: localStorage.getItem('userName'),
    };
  },
  created() {
    this.getRecommendProductList();
  },
  methods: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    async getRecommendProductList() {
      axios
        .post(
          'https://sbbro.xyz/api/product/sellers/products/chance',
          {
            storeId: localStorage.getItem('store_id'),
            startDate: new Date(1663062510835),
            endDate: new Date(1668678510835),
          },
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          this.recommendProductList = response.data;
          console.log(this.recommendProductList);
        });
    },
    searchRecommendProductList() {
      this.startDate = Date.parse(document.getElementById('startDate').value);
      this.endDate = Date.parse(document.getElementById('endDate').value);
      console.log(this.startDate);

      if (isNaN(this.startDate)) {
        alert('시작일을 입력하세요!');
        return;
      }

      if (isNaN(this.endDate)) {
        alert('종료일을 입력하세요!');
        return;
      }

      axios
        .post(
          'https://sbbro.xyz/api/product/sellers/products/chance',
          {
            storeId: localStorage.getItem('store_id'),
            startDate: new Date(this.startDate),
            endDate: new Date(this.endDate),
          },
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          alert('조회 성공!');
          this.recommendProductList = response.data;
          console.log(this.recommendProductList);
        });
    },
    updateProduct(recommendProductId) {
      router.push({
        path: 'updateProduct',
        query: { productId: recommendProductId },
      });
    },
    logout() {
      localStorage.removeItem('login_id');
      localStorage.removeItem('role');
      localStorage.removeItem('userName');
      localStorage.removeItem('token');
      localStorage.removeItem('store_id');
      router.push('../');
    },
  },
};
</script>

<style scoped>
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

.top_div {
  display: flex;
  margin-top: 35px;
  margin-bottom: 25px;
}

.top_div input {
  width: 100px;
  height: 50px;
  margin-left: 30px;
  text-align: center;
}

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  text-align: center;
  width: 80%;
  margin-left: 10%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  width: 60px;
  padding: 8px;
  font-size: 13px;
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
  text-align: center;
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

.select_div select {
  width: 200px;
  height: 50px;
  border: solid 1px gray;
}

.input-group {
  width: 50%;
  margin-left: 15%;
}

.regi_grid {
  border: solid 1px black;
  width: 60%;
  margin-left: 20%;
  border-radius: 10px;
}

.input-group mb-3 {
  margin-bottom: 0px;
}
</style>
margin-top: 35p

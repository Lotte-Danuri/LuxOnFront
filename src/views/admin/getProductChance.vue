<template>
  <h1>상품관리</h1>
  <h3>판매가 저조했으나, 고객 관심이 높은 상품을 확인할 수 있습니다.</h3>
  <main>
    <div class="regi_grid">
      <div class="top_div">
        시작일 : <input type="datetime-local" data-placeholder="시작일" id="startDate"/>
        종료일 : <input type="datetime-local" data-placeholder="종료일" id="endDate" />
      </div>
      <button
        id="searchRecommendProductListButton"
        style="
          background-color: white;
          width: 100px;
          height: 50px;
          color: black;
          border: solid 1px black;
        "
        @click="searchRecommendProductList"
      >
        상품검색
      </button>
    </div>
    <h3>주문이 5회 이하이고, 주문 전환율이 낮습니다.</h3>
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
        <th style="background-color: black;">방문횟수</th>
        <th style="background-color: black;">주문횟수</th>
        <th style="background-color: black;">주문전환율</th>
        <th>수정</th>
      </tr>
      <tr v-for="(recommendProduct,i) in recommendProductList" :key="i">
            <td>{{i+1}}</td>
            <td><img :src="`${recommendProduct.thumbnailUrl}`" style="height: 100px" /></td>
            <td>{{recommendProduct.productName}}</td>
            <td>{{recommendProduct.price}}원</td>
            <td>{{recommendProduct.likeCount}}개</td>
            <td>{{recommendProduct.categoryFirstName}}</td>
            <td>{{recommendProduct.categorySecondName}}</td>
            <td>{{recommendProduct.categoryThirdName}}</td>
            <td>{{recommendProduct.clickCount}}</td>
            <td>{{recommendProduct.orderCount}}</td>
            <td>{{recommendProduct.conversionRate}}%</td>
            <td><button
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
            </button></td>
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
      recommendProductList:[],
      startDate:"",
      endDate:""
    };
  },
  created() {
    this.getRecommendProductList();
  },
  methods: {
    async getRecommendProductList() {
      axios
        .post(
          'https://sbbro.xyz/api/product/sellers/products/chance',
          {
            storeId: localStorage.getItem('store_id'),
            startDate: new Date(0),
            endDate: new Date(9999999999999)
          },
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          this.recommendProductList=response.data;
          console.log(this.recommendProductList);
        });
    },
    searchRecommendProductList(){
      this.startDate = Date.parse(document.getElementById("startDate").value);
      this.endDate = Date.parse(document.getElementById("endDate").value);
      console.log(this.startDate);

      if(isNaN(this.startDate)){
        alert("시작일을 입력하세요!");
        return;
      }

      if(isNaN(this.endDate)){
        alert("종료일을 입력하세요!");
        return;
      }

      axios
        .post(
          'https://sbbro.xyz/api/product/sellers/products/chance',
          {
            storeId: localStorage.getItem('store_id'),
            startDate: new Date(this.startDate),
            endDate: new Date(this.endDate)
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
          this.recommendProductList=response.data;
          console.log(this.recommendProductList);
        });
    },
    updateProduct(recommendProductId){
      router.push({path: 'updateProduct',query: { productId:recommendProductId}})
    },
  },
};
</script>

<style scoped>
.regi_grid {
  display: grid;
  grid-template-columns: 700px 200px 200px;
  gap: 30px;
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

.top_div input {
  width: 200px;
  height: 40px;
  border: 2px solid black;
  margin-left: 30px;
  margin-bottom: 30px;
}

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
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
  text-align: left;
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
</style>

<template>
  <h1>쿠폰 등록</h1>
  <main>
    <div class="top_div">
      <input placeholder="쿠폰명" id="couponName"/>
      <input placeholder="내용" id="couponContent"/>
      <input placeholder="할인율" id="discountRate"/>
      <br />
      <input type="datetime-local" placeholder="시작일" id="startDate"/>
      <input type="datetime-local" placeholder="종료일" id="endDate"/>
      <br />
      <input placeholder="최소주문금액" id="minOrderPrice"/>
      <input placeholder="최대할인금액" id="maxDiscountPrice"/>
      <br />
      <input placeholder="상품선택" />
      <br />

      <select @change="changeCategoryFirst($event)" id="first_category_id">
        <option :value="-1">-- 전체 -- (첫번째 카테고리)</option>
        <option v-for="(category, i) in categoryList" :key="i" :value="i">
          <p>{{ category.categoryName }}</p>
          <div :id="`${category.id}`" style="dispaly: none"></div>
        </option>
      </select>
      <br />
      <br />
      <select @change="changeCategorySecond($event)">
        <option :value="-1">-- 전체 -- (두번째 카테고리)</option>
        <option v-for="(categorySecond, i) in categorySecondList" :key="i" :value="i">
          <p>{{ categorySecond.categoryName }}</p>
          <p :id="`${categorySecond.id}`" style="dispaly: none"></p>
        </option>
      </select>
      <br />
      <br />
      <select @change="changeCategoryThird($event)">
        <option :value="-1">-- 전체 -- (세번째 카테고리)</option>
        <option v-for="(categoryThird, i) in categoryThirdList" :key="i" :value="i">
          <p>{{ categoryThird.categoryName }}</p>
          <p :id="`${categoryThird.id}`" style="dispaly: none"></p>
        </option>
      </select>
      <br />
      <br />
    </div>

    <button
      style="
        background-color: white;
        width: 100px;
        height: 50px;
        color: black;
        border: solid 1px black;
        margin-left: 100px;
      "
      @click="productSearch"
    >
      상품검색
    </button>

    <table id="customers">
      <tr>
        <th>
          <td><input type="checkbox"/></td>
        </th>
        <th>이미지</th>
        <th>상품명</th>
        <th>상품가격</th>
        <th>재고</th>
        <th>보증기간</th>
        <th>게시일</th>
      </tr>
      <tr v-for="product in productList">
        <td><input type="checkbox" v-model="productCheckVmodel" :value="product"/></td>
        <td>
          <img :src="`${product.thumbnailUrl}`" style="height: 100px;"/>
        </td>
        <td>{{ product.productName }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.stock }}</td>
        <td>{{ product.warranty }}</td>
        <td>{{ product.createdDate }}</td>
      </tr>
    </table>
    <br>
    <button
      style="
        background-color: white;
        width: 100px;
        height: 50px;
        color: black;
        border: solid 1px black;
        margin-left: 100px;
      "
      @click="productAdd"
    >
      상품추가
    </button>
    <br>
    <table id="customers">
      <tr>
        <th>취소</th>
        <th>이미지</th>
        <th>상품명</th>
        <th>상품가격</th>
        <th>재고</th>
        <th>보증기간</th>
        <th>게시일</th>
      </tr>
      <tr v-for="product in productCheckList" :key="i">
        <td><input type="button" value="취소" style="background-color: wheat;"/></td>
        <td>
          <img :src="`${product.thumbnailUrl}`" style="height: 100px;"/>
        </td>
        <td>{{ product.productName }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.stock }}</td>
        <td>{{ product.warranty }}</td>
        <td>{{ product.createdDate }}</td>
      </tr>
    </table>
    <button
      style="background-color: black; width: 100px; height: 50px; color: white" @click="createCoupon"
    >
    등록
    </button>
  </main>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      categoryList: [],
      categorySecondList: [],
      categoryThirdList: [],
      productList: [],
      firstClickValue:"",
      secondClickValue:"",
      thirdClickValue:"",
      fistValue:"",
      secondValue:"",
      thirdValue:"",
      productCheckVmodel:[],
      productCheckList:[],
      couponName:"",
      couponContent:"",
      discountRate:0.0,
      startDate:"",
      endDate:"",
      minOrderPrice:0,
      maxDiscountPrice:0,
      productIdList:[]
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    async getCategoryList() {
      this.categoryList = await this.$api('/product/categories');
      console.log(this.categoryList);
    },
    changeCategoryFirst(event) {
      this.firstClickValue = event.target.value;
      if (this.firstClickValue == -1){
        this.firstValue=""
      } else {
        this.categorySecondList = this.categoryList[this.firstClickValue].categorySecondDtoList;
        this.firstValue = this.categoryList[this.firstClickValue].id;
      }
    },
    changeCategorySecond(event) {
      this.secondClickValue = event.target.value;
      if (this.secondClickValue == -1){
        this.secondValue=""
      } else {
        this.categoryThirdList = this.categorySecondList[this.secondClickValue].categoryThirdDtoList;
        this.secondValue = this.categoryList[this.firstClickValue].categorySecondDtoList[this.secondClickValue].id;
      }
    },
    changeCategoryThird(event) {
      this.thirdClickValue = event.target.value;
      if (this.thirdClickValue == -1){
        this.thirdValue=""
      } else {
        this.thirdValue = this.categoryList[this.firstClickValue].categorySecondDtoList[this.secondClickValue].categoryThirdDtoList[this.thirdClickValue].id;
      }
    },
    calc() {
      if (document.querySelector('.myCheckbox').checked) {
        console.log(this.id);
      }
    },
    productSearch() {
      let firstClickId = parseInt(this.firstValue);
      let secondClickId = parseInt(this.secondValue);
      let thirdClickId = parseInt(this.thirdValue);
      console.log(this.firstValue, this.secondValue, this.thirdValue);
      axios
        .post(
          'https://sbbro.xyz/api/product/sellers/products/category',
          {
            stordId: localStorage.getItem('store_id'),
            categoryFirstId: firstClickId,
            categorySecondId: secondClickId,
            categoryThirdId: thirdClickId,
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
    productAdd(){
      let check=0;
      this.productCheckVmodel.some((v) => {
        this.productCheckList.some((w) => {
          if (w.id == v.id){
            alert("중복 상품이 포함되어있습니다.");
            check=1;
            return true;
          }
        })
        if (check==1){
          return true;
        }
      })
      if (check==0){
        this.productCheckVmodel.forEach((v) => {
          this.productCheckList.push(v);
        })
      }

      console.log(this.productCheckList);
    },

    createCoupon(){
      this.productCheckList.forEach((v) => {
        this.productIdList.push(v.id);
      })
      console.log(this.productIdList);
      this.couponName = document.getElementById("couponName").value;
      this.couponContent = document.getElementById("couponContent").value;
      this.discountRate = document.getElementById("discountRate").value;
      this.startDate = Date.parse(document.getElementById("startDate").value);
      this.endDate = Date.parse(document.getElementById("endDate").value);
      this.minOrderPrice = document.getElementById("minOrderPrice").value;
      this.maxDiscountPrice = document.getElementById("maxDiscountPrice").value;
      console.log(localStorage.getItem('store_id'));
      axios
        .post(
          'https://sbbro.xyz/api/product/admin/coupons',
          {
            storeId: localStorage.getItem('store_id'),
            name: this.couponName,
            contents: this.couponContent,
            startDate: new Date(this.startDate),
            endDate: new Date(this.endDate),
            discountRate: this.discountRate,
            minOrderPrice: this.minOrderPrice,
            maxDiscountPrice: this.maxDiscountPrice,
            productId: this.productIdList
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
    }
  },
};
</script>

<style scoped>
.category_grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  grid-auto-rows: minmax(25px, auto);
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
  margin-left: 100px;
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
  background-color: #04aa6d;
  color: white;
}
</style>
<template>
  <br />
  <br />
  <h1>특별 할인</h1>
  <br />
  <div style="display:flex;">
    <h3>한 명의 사용자에게 특별할인을 제공할 수 있습니다.</h3>
    <h3 style="font-style: italic; color:gray; margin-left:44%;">{{ userName }}</h3>
    <h3>　님 안녕하세요</h3>
    <a @click="logout" style="margin-left: 4%;">
      <div style="display:flex; margin-bottom: 0px;">
        <span class="material-icons-sharp">logout</span>
        <h3>Logout</h3>
      </div>
    </a>
  </div>
  <hr />
  <br />
  <main>
    <!-- <div class="regi_grid">
      <div class="top_div">
        <input placeholder="쿠폰명" id="couponName" class="form-control" style="margin-left:25%;"/>
        <input placeholder="내용" id="couponContent" class="form-control" style="margin-left:25%;"/>
        <input placeholder="할인율" id="discountRate" class="form-control" style="margin-left:25%;"/>
        <div class="input-group" style="width: 50%; margin-bottom:1px; margin-left:25%;">
          <input type="datetime-local" data-placeholder="시작일" id="startDate" class="form-control"/>
          <input type="datetime-local" data-placeholder="종료일" id="endDate" class="form-control"/>
        </div>
        <br>
        <br>
        
      </div>
    </div> -->
    <br>
    <br>

    <div class="inner_grid">
      <div></div>
      <div style="
        width: 620px;
        height: 500px;
        border: 1px solid black;
        border-radius: 15px;
        overflow-x: hidden;
        padding-top: 15px;
      ">
        <div class="select_div">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="사용자 닉네임을 입력하세요" id="nickName" />
            <button class="btn btn-outline-secondary" @click="searchUser">
              사용자 찾기
            </button>
          </div>
          <table id="customers" class="customers" style="margin-left: 40%;">
            <tr>
              <th>선택</th>
              <th>이름</th>
              <th>아이디</th>
            </tr>
            <tr v-for="(user, i) in userList" :key="i">
              <td>
                <input type="radio" v-model="userCheckVmodel" :value="user.loginId" id="i" />
              </td>
              <td>{{ user.name }}</td>
              <td>{{ user.loginId }}</td>
            </tr>
          </table>
          <input placeholder="할인율" id="discountRate" class="form-control"
            style="margin-left:25%; margin-top: 5%; height: 40px;" />
          <div class="input-group" style="width: 50%; margin-bottom:1px; margin-left:25%;">
            <input type="datetime-local" data-placeholder="시작일" id="startDate" class="form-control" />
            <input type="datetime-local" data-placeholder="종료일" id="endDate" class="form-control" />
          </div>
          <div class="input-group" style="width:50%; margin-left:25%;">
            <select @change="changeCategoryFirst($event)" id="first_category_id" class="form-control">
              <option :value="-1">- 대분류 - </option>
              <option v-for="(category, i) in categoryList" :key="i" :value="i">
                <p>{{ category.categoryName }}</p>
                <div :id="`${category.id}`" style="dispaly: none"></div>
              </option>
            </select>
            <select @change="changeCategorySecond($event)" class="form-control">
              <option :value="-1">- 중분류 - </option>
              <option v-for="(categorySecond, i) in categorySecondList" :key="i" :value="i">
                <p>{{ categorySecond.categoryName }}</p>
                <p :id="`${categorySecond.id}`" style="dispaly: none"></p>
              </option>
            </select>
            <br />
            <br />
            <select @change="changeCategoryThird($event)" class="form-control">
              <option :value="-1">- 소분류 - </option>
              <option v-for="(categoryThird, i) in categoryThirdList" :key="i" :value="i">
                <p>{{ categoryThird.categoryName }}</p>
                <p :id="`${categoryThird.id}`" style="dispaly: none"></p>
              </option>
            </select>
          </div>
          <button class="btn btn-outline-dark" style="
              width: 140px;
              height: 50px;
              margin-left: 39%;
              margin-top: 5%;
              /* margin-top: 30px; */
            " @click="productSearch">
            상품검색
          </button>
        </div>
      </div>

      <div></div>
      <div style="
        width: 620px;
        height: 500px;
        background-color: white;
        border: 1px solid black;
        border-radius: 15px;
        overflow: scroll;
        overflow-x: hidden;
        padding-top: 15px;
      ">
        <h2 style="margin-left: 38%; margin-bottom: 20px;">검색 상품 LIST</h2>
        <table id="customers" style="width: 600px">
          <tr>
            <th>선택</th>
            <th>이미지</th>
            <th>상품명</th>
            <th>상품가격</th>
            <th>재고</th>
            <th>보증기간</th>
            <th>게시일</th>
          </tr>
          <!-- <tr v-for="n in 20">
            <td v-for="m in 7"></td>
          </tr> -->
          <tr v-for="product in productList">
            <td>
              <input type="radio" v-model="productCheckVmodel" :value="product" class="customers_check" />
            </td>
            <td>
              <img :src="`${product.thumbnailUrl}`" style="height: 100px" />
            </td>
            <td>{{ product.productName }}</td>
            <td>{{ product.price }}원</td>
            <td>{{ product.stock }}개</td>
            <td>{{ product.warranty }}개월</td>
            <td>{{ product.createdDate }}</td>
          </tr>
        </table>
      </div>
      <div></div>
    </div>
    <div>
      <button class="btn btn-outline-dark" style="
            width: 140px;
            height: 50px;
            margin-left: 46%;
            margin-top: 2%;
          " @click="specialCoupon">
        특별할인 등록
      </button>
    </div>
  </main>
</template>
<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      categoryList: [],
      categorySecondList: [],
      categoryThirdList: [],
      productList: [],
      firstClickValue: '',
      secondClickValue: '',
      thirdClickValue: '',
      fistValue: '',
      secondValue: '',
      thirdValue: '',
      productCheckVmodel: [],
      productCheckList: [],
      couponName: '',
      couponContent: '',
      discountRate: 0.0,
      startDate: '',
      endDate: '',
      productIdList: [],
      userName: localStorage.getItem('userName'),
      userList: [],
      couponId: 0,
      router: useRouter(),
      userCheckVmodel: ''
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
          'http://localhost:8000/product/sellers/products/category',
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
    logout() {
      localStorage.removeItem('login_id');
      localStorage.removeItem('role');
      localStorage.removeItem('userName');
      localStorage.removeItem('token');
      localStorage.removeItem('store_id');
      this.router.push('../');
    },
    searchUser() {
      this.nickName = document.getElementById('nickName').value;
      axios
        .post(
          'http://localhost:8000/auth/info',
          {
            name: this.nickName,
          },
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          this.userList = response.data;
          console.log(this.userList);
        });
    },
    specialCoupon() {
      this.startDate = Date.parse(document.getElementById('startDate').value);
      this.endDate = Date.parse(document.getElementById('endDate').value);
      this.discountRate = document.getElementById('discountRate').value;

      if (this.userCheckVmodel == '') {
        Swal.fire({
          title: '사용자를 지정해주세요',
          icon: 'error',
          showCancelButton: true,
        }).then(result => {
          return;
        });

        
      }
      if (this.productCheckVmodel.id == null) {
        Swal.fire({
          title: '상품을 지정해주세요',
          icon: 'error',
          showCancelButton: true,
        }).then(result => {
          return;
        });

        
      }

      this.productCheckList.push(this.productCheckVmodel.id);

      axios
        .post(
          'http://localhost:8000/product/admin/coupons',
          {
            storeId: localStorage.getItem('store_id'),
            name: "특별할인",
            contents: "특별할인 쿠폰입니다",
            startDate: new Date(this.startDate),
            endDate: new Date(this.endDate),
            discountRate: this.discountRate,
            productId: this.productCheckList,
          },
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          this.couponId = response.data;
          this.productCheckList = [];

          const strSplit = this.userCheckVmodel;
          const userName = strSplit.split("@")[0]

          axios
            .post(
              'http://localhost:8000/chat/chatRoom/chat',
              {
                id: null,
                content: '특별할인 쿠폰입니다',
                contentType: '특별할인',
                sendBy: localStorage.getItem('login_id'),
                sendTo: String(userName),
                source: String(this.productCheckVmodel.id) + '/' + String(this.couponId)
              },
              {
                headers: {
                  Authorization: `Bearer ` + localStorage.getItem('token'),
                  'Content-Type': 'application/json',
                },
              },
            )
            .then(response => {
              Swal.fire({
                title: '특별할인 전송 성공!',
                icon: 'success',
                showCancelButton: true,
              }).then(result => {
                this.userCheckVmodel = "";
                this.productCheckVmodel = []
                location.reload();
              });
            });
        });
    }
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

.top_div input {
  height: 50px;
  margin-bottom: 30px;
}

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  text-align: center;
  font-size: 13px;
  margin-top: 5%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
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

.inner_grid {
  display: grid;
  grid-template-columns: 130px 650px 100px 650px 100px;
}

.select_div select {
  width: 100px;
  height: 40px;
}

.regi_grid {
  border: solid 1px black;
  border-radius: 15px;
  width: 60%;
  padding: 50px 50px 25px 50px;
  margin-left: 20%;
}

.form-control {
  width: 50%;
}

.input-group {
  width: 50%;
  height: 40px;
  margin-left: 25%;
  margin-top: 5%;
}
</style>

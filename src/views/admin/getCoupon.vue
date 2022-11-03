<template>
    <h1>쿠폰 뿌리기</h1>
    <br><br>
    <main>
      <h3>생성된 쿠폰</h3>
      <br>
      <table id="customers">
        <tr>
          <th>선택</th>
          <th>쿠폰명</th>
          <th>내용</th>
          <th>할인율</th>
          <th>최소주문금액</th>
          <th>최대할인금액</th>
          <th>쿠폰시작일</th>
          <th>쿠폰종료일</th>
          <th>적용상품</th>
        </tr>
        <tr v-for="(coupon,i) in couponList" >
          <td><input type="checkbox" v-model="couponCheckVmodel" :value="coupon.id" id="i"/></td>
          <td>{{ coupon.name }}</td>
          <td>{{ coupon.contents }}</td>
          <td>{{ coupon.discountRate }}</td>
          <td>{{ coupon.minOrderPrice }}</td>
          <td>{{ coupon.maxDiscountPrice }}</td>
          <td>{{ coupon.startDate }}</td>
          <td>{{ coupon.endDate }}</td>
          <td><button style="background-color: black; width: 50px; height: 20px; color: white" :value="coupon" @click="showProduct(coupon)">상품보기</button></td>
        </tr>
      </table>
      <br>
      <hr>
      <table id="customers">
        <tr>
            <th>이미지</th>
            <th>상품명</th>
            <th>상품가격</th>
            <th>재고</th>
            <th>보증기간</th>
            <th>게시일</th>
        </tr>
        <tr v-for="product in productList" :key="i">
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
        <hr>
      <button style="background-color: black; width: 150px; height: 50px; color: white" @click="CouponToFollower">팔로워들에게 뿌리기</button>
      <hr>
      <br>
      <br>
    <div class="top_div">
      <input placeholder="사용자 닉네임을 입력하세요" id="nickName"/>
      <button style="background-color: black; width: 150px; height: 50px; color: white" @click="searchUser">사용자 찾기</button>
    </div>
    <table id="customers">
        <tr>
            <th>선택</th>
            <th>이름</th>
            <th>아이디</th>
        </tr>
        <tr v-for="(user,i) in userList" :key="i">
            <td><input type="checkbox" :value="user.id" id="i"/></td>
            <td>{{ user.name }}</td>
            <td>{{ user.loginId }}</td>
        </tr>
    </table>
    <hr>
    <button style="background-color: black; width: 150px; height: 50px; color: white" @click="CouponToUser">사용자에게 뿌리기</button>
    </main>
  </template>
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        couponList: [],
        productList: [],
        couponCheckVmodel: [],
        userList: [],
        nickName:"",
      };
    },
    created() {
      this.getCouponList();
    },
    methods: {
      async getCouponList() {
        axios
          .get(
            'https://sbbro.xyz/api/product/admin/coupons/'+localStorage.getItem('store_id'),
            {
              headers: {
                Authorization: `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json',
              },
            },
          )
          .then(response => {
            console.log(response.data);
            this.couponList = response.data;
          });
      },

      CouponToFollower(){
        axios
          .post(
            'https://sbbro.xyz/api/member/mycoupon/all',
            {
                storeId: localStorage.getItem('store_id'),
                couponList: this.couponCheckVmodel
            },
            {
              headers: {
                Authorization: `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json',
              },
            },
          )
          .then(response => {
            alert("팔로워들에게 뿌리기 성공!");
          });
         console.log(this.couponCheckVmodel);
      },

      CouponToUser(){
        if (this.couponCheckVmodel.length>1) {
            alert('사용자에게 최대 한개 쿠폰 발급이 가능합니다.');
            
        }
        console.log("hihi");
        // axios
        //   .post(
        //     'https://sbbro.xyz/api/chat/chatRoom/chat',
        //     {
        //         storeId: localStorage.getItem('store_id'),
        //         couponList: this.couponCheckVmodel
        //     },
        //     {
        //       headers: {
        //         Authorization: `Bearer ` + localStorage.getItem('token'),
        //         'Content-Type': 'application/json',
        //       },
        //     },
        //   )
        //   .then(response => {
        //     alert("사용자에게 뿌리기 성공!");
        //   });
        //  console.log(this.couponCheckVmodel);
      },

      showProduct(coupon){
         this.productList = coupon.productDtoList;
      },

      searchUser(){
        this.nickName = document.getElementById("nickName").value;
        axios
          .post(
            'https://sbbro.xyz/api/auth/info',
            {
                name: this.nickName
            },
            {
              headers: {
                Authorization: `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json',
              },
            },
          )
          .then(response => {
            this.userList = response.data
            console.log(this.userList);
          });        
      }
    }
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
<template>
  <br />
  <br />
  <h1>쿠폰 조회 및 전송</h1>
  <br />
  <div style="display: flex">
    <h3>
      쿠폰을 조회할 수 있으며 팔로워, 지정 사용자에게 쿠폰 전송이 가능합니다.
    </h3>
    <h3 style="font-style: italic; color: gray; margin-left: 37%">
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
    <br />
    <div class="inner_grid">
      <div></div>
      <div
        style="
          width: 620px;
          height: 500px;
          background-color: white;
          border: 1px solid black;
          border-radius: 15px;
          overflow: scroll;
          overflow-x: hidden;
          padding-top: 15px;
        "
      >
        <h2 style="margin-left: 38%; margin-bottom: 20px">쿠폰 LIST</h2>
        <table id="customers" style="width: 600px">
          <tr>
            <th>선택</th>
            <th>쿠폰명</th>
            <th>내용</th>
            <th>할인율</th>
            <!-- <th>최소주문금액</th> -->
            <!-- <th>최대할인금액</th> -->
            <th>쿠폰시작일</th>
            <th>쿠폰종료일</th>
            <th>적용상품</th>
          </tr>
          <tr v-for="(coupon, i) in couponList">
            <td>
              <input
                type="checkbox"
                v-model="couponCheckVmodel"
                :value="coupon.id"
                id="i"
              />
            </td>
            <td>{{ coupon.name }}</td>
            <td>{{ coupon.contents }}</td>
            <td>{{ coupon.discountRate }}</td>
            <!-- <td>{{ coupon.minOrderPrice }}</td> -->
            <!-- <td>{{ coupon.maxDiscountPrice }}</td> -->
            <td>{{ coupon.startDate }}</td>
            <td>{{ coupon.endDate }}</td>
            <td>
              <button
                style="
                  background-color: black;
                  width: 70px;
                  height: 20px;
                  color: white;
                "
                :value="coupon"
                @click="showProduct(coupon)"
              >
                상품보기 >>
              </button>
            </td>
          </tr>
        </table>
      </div>
      <div
        style="
          width: 620px;
          height: 500px;
          background-color: white;
          border: 1px solid black;
          border-radius: 15px;
          overflow: scroll;
          overflow-x: hidden;
          padding-top: 15px;
        "
      >
        <h2 style="margin-left: 36%; margin-bottom: 20px">
          쿠폰 적용 상품 LIST
        </h2>
        <table id="customers" style="width: 600px">
          <tr>
            <th>이미지</th>
            <th>상품명</th>
            <th>상품가격</th>
            <th>재고</th>
            <th>보증기간</th>
            <th>게시일</th>
          </tr>
          <tr v-for="product in productList">
            <td>
              <img :src="`${product.thumbnailUrl}`" style="height: 100px" />
            </td>
            <td>{{ product.productName }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.warranty }}</td>
            <td>{{ product.createdDate }}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="container">
      <div class="btn-group" role="group" aria-label="...">
        <button
          type="button"
          class="btn btn-dark"
          style=""
          id="button-class1"
          @click="toggle1()"
        >
          팔로워에게 쿠폰전송
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          id="button-class2"
          style=""
          @click="toggle2()"
        >
          사용자에게 쿠폰전송
        </button>
      </div>
    </div>
    <div id="id_bottom">
      <button
        class="btn btn-outline-dark"
        style="width: 200px; height: 60px; margin-left: 41%"
        @click="CouponToFollower"
      >
        팔로워에게 쿠폰전송
      </button>
    </div>
    <div id="id_top" style="display: none">
      <div class="top_div">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="사용자 닉네임을 입력하세요"
            id="nickName"
          />
          <button class="btn btn-outline-secondary" @click="searchUser">
            사용자 찾기
          </button>
        </div>
      </div>
      <table id="customers" class="customers">
        <tr>
          <th>선택</th>
          <th>이름</th>
          <th>아이디</th>
        </tr>
        <tr v-for="(user, i) in userList" :key="i">
          <td>
            <input
              type="checkbox"
              v-model="userCheckVmodel"
              :value="user.loginId"
              id="i"
            />
          </td>
          <td>{{ user.name }}</td>
          <td>{{ user.loginId }}</td>
        </tr>
      </table>
      <br />
      <br />
      <button
        class="btn btn-outline-dark"
        style="width: 200px; height: 60px; margin-left: 41%"
        @click="CouponToUser"
      >
        사용자에게 쿠폰전송
      </button>
    </div>
  </main>
</template>
<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

export default {
  data() {
    return {
      couponList: [],
      productList: [],
      couponCheckVmodel: [],
      userCheckVmodel: [],
      userList: [],
      nickName: '',
      userName: localStorage.getItem('userName'),
      router: useRouter(),
    };
  },
  created() {
    this.getCouponList();
  },
  methods: {
    async getCouponList() {
      axios
        .get(
          'https://sbbro.xyz/api/product/admin/coupons/' +
            localStorage.getItem('store_id'),
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

    CouponToFollower() {
      axios
        .post(
          'https://sbbro.xyz/api/member/mycoupon/all',
          {
            storeId: localStorage.getItem('store_id'),
            couponList: this.couponCheckVmodel,
          },
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          alert('팔로워들에게 뿌리기 성공!');
        });
      console.log(this.couponCheckVmodel);
    },

    CouponToUser() {
      if (this.couponCheckVmodel.length > 1) {
        alert('사용자에게 최대 한개 쿠폰 발급이 가능합니다.');
        return;
      }
      if (this.userCheckVmodel.length < 2) {
        axios
          .post(
            'https://sbbro.xyz/api/chat/chatRoom/chat',
            {
              id: null,
              content: '쿠폰이 도착했습니다',
              contentType: '쿠폰',
              sendBy: localStorage.getItem('login_id'),
              sendTo: this.userCheckVmodel[0].split('@')[0],
              source: String(this.couponCheckVmodel[0]),
            },
            {
              headers: {
                Authorization: `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json',
              },
            },
          )
          .then(response => {
            console.log(this.userCheckVmodel);
            alert('사용자 한명에게 뿌리기 성공!');
            this.userCheckVmodel = [];
          });
      } else {
        axios
          .post(
            'https://sbbro.xyz/api/chat/chatRoom/chats',
            {
              id: null,
              content: '쿠폰이 도착했습니다',
              contentType: '쿠폰',
              sendBy: localStorage.getItem('login_id'),
              sendTo: this.userCheckVmodel,
              source: String(this.couponCheckVmodel[0]),
            },
            {
              headers: {
                Authorization: `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json',
              },
            },
          )
          .then(response => {
            console.log(this.userCheckVmodel);
            alert('사용자 여러명에게 뿌리기 성공!');
            this.userCheckVmodel = [];
          });
      }
    },

    showProduct(coupon) {
      this.productList = coupon.productDtoList;
    },

    searchUser() {
      this.nickName = document.getElementById('nickName').value;
      axios
        .post(
          'https://sbbro.xyz/api/auth/info',
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

    toggle1() {
      document.getElementById('button-class1').className = 'btn btn-dark';
      document.getElementById('button-class2').className = 'btn btn-secondary';
      document.getElementById('id_top').style.display = 'none';
      document.getElementById('id_bottom').style.display = 'block';
    },

    toggle2() {
      document.getElementById('button-class1').className = 'btn btn-secondary';
      document.getElementById('button-class2').className = 'btn btn-dark';
      document.getElementById('id_top').style.display = 'block';
      document.getElementById('id_bottom').style.display = 'none';
    },

    logout() {
      localStorage.removeItem('login_id');
      localStorage.removeItem('role');
      localStorage.removeItem('userName');
      localStorage.removeItem('token');
      localStorage.removeItem('store_id');
      this.router.push('../');
    },
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

.inner_grid {
  display: grid;
  grid-template-columns: 130px 650px 100px 650px 100px;
  margin-bottom: 50px;
}

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  text-align: center;
  font-size: 13px;
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

.btn-group {
  margin-left: 35%;
  margin-bottom: 4%;
}

.input-group {
  width: 20%;
  margin-left: 37%;
}

.customers {
  margin-left: 43%;
}
</style>

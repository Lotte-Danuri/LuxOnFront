<template>
  <main>
    <h1>메인 센터</h1>
    <br />
    <br />
    <div class="zero_grid">
      <div>
        <span class="material-icons-sharp"> today </span>
        총판매량 1111111
      </div>
      <div><span class="material-icons-sharp"> poll </span>거래건수</div>
      <div><span class="material-icons-sharp"> cloud_queue </span>순수익</div>
      <div>뭐넣징</div>
    </div>
    <div class="first_grid">
      <div style="background-color: white">
        <canvas id="myChart" style="width: 100%; max-width: 1000px"></canvas>
      </div>
      <!-- <v-calendar /> -->
      <v-date-picker v-model="date" is-expanded style="height: 500px" />
    </div>
    <div class="second_grid">
      <div style="overflow: scroll">
        <h1>등록상품</h1>
        <hr />
        <div class="table_grid">
          <div>
            <table id="customers">
              <tr>
                <th>이미지</th>
                <th>상품명</th>
                <th>상품가격</th>
                <th>재고</th>
                <th>보증기간</th>
              </tr>
              <tr v-for="product in productList">
                <td>
                  <img :src="`${product.thumbnailUrl}`" style="height: 100px" />
                </td>
                <td>{{ product.productName }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.stock }}</td>
                <td>{{ product.warranty }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div>
        <h1>거래내역</h1>
        <hr />
        <div>
          <table>
            <tr>
              <th>이름</th>
              <th>상품명</th>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div></div>
    <!-- <div class="third_grid">
      <div></div>
      <div></div>
    </div> -->
  </main>
</template>
<script>
import 'v-calendar/dist/style.css';

import axios from 'axios';

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
      myChart: '',
    };
  },
  created() {
    this.getCategoryList();
  },
  mounted() {
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

    var xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    new Chart('myChart', {
      type: 'line',
      data: {
        labels: xValues,
        datasets: [
          {
            data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
            borderColor: 'red',
            fill: false,
          },
          {
            data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
            borderColor: 'green',
            fill: false,
          },
          {
            data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
            borderColor: 'blue',
            fill: false,
          },
        ],
      },
      options: {
        legend: { display: false },
      },
    });
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
  },
};
</script>

<style scoped>
.zero_grid {
  display: grid;
  grid-template-columns: 325px 325px 325px 325px;
  margin-bottom: 0px;
  gap: 50px;
  /* grid-auto-rows: minmax(25px, auto); */
}

.zero_grid div {
  border: solid 1px black;
  border-radius: 20px;
  background-color: white;
  height: 150px;
  font-size: 5px;
}

.first_grid {
  display: grid;
  grid-template-columns: 1000px 400px;
  margin-bottom: 0px;
  gap: 50px;
  /* grid-auto-rows: minmax(25px, auto); */
}

/* .first_grid div {
  background-color: gray;
  width: 100%;
  height: 400px;
} */

.second_grid {
  display: grid;
  grid-template-columns: 400px 1000px;
  margin-bottom: 0px;
  gap: 50px;
}

.second_grid div {
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 400px;
}

.third_grid {
  display: grid;
  grid-template-columns: 700px 700px;
  margin-bottom: 0px;
  gap: 50px;
}

.third_grid div {
  background-color: white;
  width: 100%;
  height: 400px;
}

.table_grid div table th {
  text-align: center;
}

.table_grid div table tr {
  text-align: center;
}
</style>

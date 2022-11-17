<template>
  <br />
  <br />
  <h1>메인 센터</h1>
  <br />
  <div style="display: flex">
    <h3>주문량, 클릭수, 좋아요 데이터를 제공할 수 있습니다.</h3>
    <h3 style="font-style: italic; color: gray; margin-left: 44%">
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
    <div class="zero_grid">
      <div>
        <span class="material-icons-sharp"> today 주문량</span>
        <h1>148</h1>
      </div>
      <div>
        <span class="material-icons-sharp"> poll 클릭 수</span>
        <h1>3,600</h1>
      </div>
      <div>
        <span class="material-icons-sharp"> cloud_queue 좋아요</span>
        <h1>1,210</h1>
      </div>
    </div>
    <div class="first_grid">
      <div style="width: 80%; margin-left: 10%; height: 90%">
        <canvas id="myChart2"></canvas>
      </div>
    </div>
  </main>
</template>
<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

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
      router: useRouter(),
      userName: localStorage.getItem('userName'),
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

    var xValues = [
      11.12,
      11.13,
      11.14,
      11.15,
      11.16,
      11.17,
      11.18,
      11.19,
      '11.20',
      11.21,
    ];

    new Chart('myChart2', {
      type: 'bar',
      data: {
        labels: xValues,
        datasets: [
          {
            data: [6, 14, 10, 10, 10, 11, 13, 22, 78, 24],
            backgroundColor: 'black',
            fill: true,
            label: '주문량',
          },
          {
            data: [160, 170, 170, 390, 200, 270, 400, 300, 300, 400],
            backgroundColor: '#666666',
            fill: true,
            label: '클릭수',
          },
          {
            data: [300, 200, 200, 300, 300, 400, 200, 100, 200, 100],
            backgroundColor: '#CCCCCC',
            label: '좋아요',
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              // This more specific font property overrides the global property
              font: {
                size: 14,
              },
            },
          },
        },
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
.zero_grid {
  display: grid;
  grid-template-columns: 325px 325px 325px;
  margin-left: 7%;
  margin-bottom: 5%;
  gap: 100px;
  /* grid-auto-rows: minmax(25px, auto); */
}

.zero_grid div {
  padding: 30px;
  border: solid 1px black;
  border-radius: 20px;
  background-color: white;
  width: 350px;
  height: 150px;
  font-size: 5px;
  margin-left: 25%;
}

.first_grid {
  display: grid;
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

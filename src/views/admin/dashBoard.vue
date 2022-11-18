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
      <input type="datetime-local" class="form-control" id="startDate" />
      <button @click="start_btn"></button>
      <div>
        <span class="material-icons-sharp"> dvr 주문량 </span>
        <h1>{{ this.orderTotal }}</h1>
      </div>
      <div>
        <span class="material-icons-sharp"> ads_click 클릭 수 </span>
        <h1>{{ this.clickTotal }}</h1>
      </div>
      <div>
        <span class="material-icons-sharp"> favorite_border 좋아요 </span>
        <h1>{{ this.likeTotal }}</h1>
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
      myChart: '',
      router: useRouter(),
      userName: localStorage.getItem('userName'),
      recommendProductList: [],
      likeTotal: 0,
      clickTotal: 0,
      orderTotal: 0,
      dateList: [],
    };
  },
  created() {
    this.getRecommendProductList();
  },
  mounted() {
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
    start_btn() {
      let dayList = [];

      console.log(document.getElementById('startDate').value);
      console.log(Date.parse('2022-11-17'));
      console.log(new Date(Date.parse('2022-11-17')));
      let today = new Date();

      for (let i = 1; i < 12; i++) {
        dayList.push(today.setDate(today.getDate() - i));
      }
      console.log(dayList);

      function getDateList(startDate, endDate) {
        axios
          .post(
            'https://sbbro.xyz/api/product/sellers/products/chance',
            {
              storeId: localStorage.getItem('store_id'),
              startDate: new Date(startDate),
              endDate: new Date(endDate),
            },
            {
              headers: {
                Authorization: `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json',
              },
            },
          )
          .then(response => {
            let dproductList = response.data;
            console.log(startDate + '/' + endDate + '/' + dproductList);
            let forderTotal = 0;
            let fclickTotal = 0;
            let flikeTotal = 0;
            for (let i = 0; i < dproductList.length; i++) {
              forderTotal += JSON.parse(
                JSON.stringify(dproductList[i].orderCount),
              );
              fclickTotal += JSON.parse(
                JSON.stringify(dproductList[i].clickCount),
              );
              flikeTotal += JSON.parse(
                JSON.stringify(dproductList[i].likeCount),
              );
            }
            // this.likeTotal = flikeTotal;
            // this.clickTotal = fclickTotal;
            // this.orderTotal = forderTotal;
            // console.log(flikeTotal, fclickTotal, forderTotal);
            return { flikeTotal, fclickTotal, forderTotal };
          });
      }
      for (let i = 0; i < 11; i++) {
        getDateList(dayList[i], dayList[i + 1]);
      }
    },
    async getRecommendProductList() {
      axios
        .post(
          'https://sbbro.xyz/api/product/sellers/products/chance',
          {
            storeId: localStorage.getItem('store_id'),
            startDate: new Date(0),
            endDate: new Date(9999999999999),
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
          let flikeTotal = 0;
          let fclickTotal = 0;
          let forderTotal = 0;
          for (let i = 0; i < this.recommendProductList.length; i++) {
            flikeTotal += JSON.parse(
              JSON.stringify(this.recommendProductList[i].likeCount),
            );
            fclickTotal += JSON.parse(
              JSON.stringify(this.recommendProductList[i].clickCount),
            );
            forderTotal += JSON.parse(
              JSON.stringify(this.recommendProductList[i].orderCount),
            );
          }
          this.likeTotal = flikeTotal;
          this.clickTotal = fclickTotal;
          this.orderTotal = forderTotal;
        });
    },
    async getDateList(startDate, endDate) {
      axios
        .post(
          'https://sbbro.xyz/api/product/sellers/products/chance',
          {
            storeId: localStorage.getItem('store_id'),
            startDate: new Date(startDate),
            endDate: new Date(endDate),
          },
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          this.dateList = response.data;
          // console.log(this.recommendProductList);
          let flikeTotal = 0;
          let fclickTotal = 0;
          let forderTotal = 0;
          for (let i = 0; i < this.recommendProductList.length; i++) {
            flikeTotal += JSON.parse(
              JSON.stringify(this.recommendProductList[i].likeCount),
            );
            fclickTotal += JSON.parse(
              JSON.stringify(this.recommendProductList[i].clickCount),
            );
            forderTotal += JSON.parse(
              JSON.stringify(this.recommendProductList[i].orderCount),
            );
          }
          // this.likeTotal = flikeTotal;
          // this.clickTotal = fclickTotal;
          // this.orderTotal = forderTotal;
          return { flikeTotal, fclickTotal, forderTotal };
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

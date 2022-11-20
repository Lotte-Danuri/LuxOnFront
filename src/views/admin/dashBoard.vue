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
    <!-- <div>
      {{ chartList }}
    </div> -->
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
      chartList: [],
      dayList: [],
      today: new Date(),
    };
  },
  created() {
    this.getRecommendProductList();
    this.getdayList();
    this.getChartList();
    // console.log('day' + this.dayList);
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

    setTimeout(() => {
      new Chart('myChart2', {
        type: 'bar',
        data: {
          labels: xValues,
          datasets: [
            {
              data: [
                this.chartList[9][0][0],
                this.chartList[8][0][0],
                this.chartList[7][0][0],
                this.chartList[6][0][0],
                this.chartList[5][0][0],
                this.chartList[4][0][0],
                this.chartList[3][0][0],
                this.chartList[2][0][0],
                this.chartList[1][0][0],
                this.chartList[0][0][0],
              ],
              backgroundColor: 'black',
              fill: true,
              label: '주문량',
            },
            {
              data: [
                this.chartList[9][0][1],
                this.chartList[8][0][1],
                this.chartList[7][0][1],
                this.chartList[6][0][1],
                this.chartList[5][0][1],
                this.chartList[4][0][1],
                this.chartList[3][0][1],
                this.chartList[2][0][1],
                this.chartList[1][0][1],
                this.chartList[0][0][1],
              ],
              backgroundColor: '#666666',
              fill: true,
              label: '클릭수',
            },
            {
              data: [
                this.chartList[9][0][2],
                this.chartList[8][0][2],
                this.chartList[7][0][2],
                this.chartList[6][0][2],
                this.chartList[5][0][2],
                this.chartList[4][0][2],
                this.chartList[3][0][2],
                this.chartList[2][0][2],
                this.chartList[1][0][2],
                this.chartList[0][0][2],
              ],
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
    }, '4000');
  },
  methods: {
    getdayList() {
      // console.log('today' + this.today);
      let dayList = [];
      for (let i = 0; i < 12; i++) {
        dayList.push(new Date().setDate(new Date().getDate() - i));
      }
      this.dayList = dayList;
      // console.log(this.today);
      // console.log(this.today.setDate(this.today.getDate() - 1));
      console.log(this.dayList);
    },
    async getChartList() {
      for (let i = 0; i < 10; i++) {
        await this.getDateList(this.dayList[i + 1], this.dayList[i]);
      }
      // console.log(this.chartList);
    },
    async getDateList(startDate, endDate) {
      try {
        const response = await axios.post(
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
        );
        let dproductList = response.data;
        // console.log(startDate + '/' + endDate + '/' + dproductList);
        let forderTotal = 0;
        let fclickTotal = 0;
        let flikeTotal = 0;
        let chartList = [];
        for (let i = 0; i < dproductList.length; i++) {
          forderTotal += JSON.parse(JSON.stringify(dproductList[i].orderCount));
          fclickTotal += JSON.parse(JSON.stringify(dproductList[i].clickCount));
          flikeTotal += JSON.parse(JSON.stringify(dproductList[i].likeCount));
          // console.log(dproductList[i].likeCount);
        }
        chartList.push([forderTotal, fclickTotal, flikeTotal]);
        // console.log(chartList);
        // return chartList;
        this.chartList.push(chartList);
      } catch (err) {
        console.log(err);
      }
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

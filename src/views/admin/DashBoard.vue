<template>
  <main>
    <h1 style="font-size: 60px; margin-top: 50px">메인 센터</h1>
    <div class="date">
      <input type="date" />
    </div>
    <div class="insights">
      <div class="sales">
        <br />
        <span class="material-icons-sharp">analytics</span>
        <div class="middle">
          <div class="left">
            <br />
            <h2>총 판매량</h2>
            <br />
            <h1>￦7,225,024</h1>
          </div>
          <div class="progress">
            <svg>
              <circle cx="38" cy="38" r="36"></circle>
            </svg>
            <div class="number">
              <p>81%</p>
            </div>
          </div>
        </div>
        <small class="text-muted">Last 24 Hours</small>
      </div>
      <!-- ------------ END OF SALES ----------- -->
      <div class="expenses">
        <br />
        <span class="material-icons-sharp">analytics</span>
        <div class="middle">
          <div class="left">
            <br />
            <h2>순 수익</h2>
            <br />
            <h1>￦1,225,024</h1>
          </div>
          <div class="progress">
            <svg>
              <circle cx="38" cy="38" r="36"></circle>
            </svg>
            <div class="number">
              <p>81%</p>
            </div>
          </div>
        </div>
        <small class="text-muted">Last 24 Hours</small>
      </div>
      <!-- ------------ END OF Incomes ----------- -->
      <div class="income">
        <br />
        <span class="material-icons-sharp">analytics</span>
        <div class="middle">
          <div class="left">
            <br />
            <h2>총 주문건수</h2>
            <br />
            <h1>125개</h1>
          </div>
          <div class="progress">
            <svg>
              <circle cx="38" cy="38" r="36"></circle>
            </svg>
            <div class="number">
              <p>81%</p>
            </div>
          </div>
        </div>
        <small class="text-muted">Last 24 Hours</small>
      </div>
      <!-- ------------ END OF EXPENSES ----------- -->
    </div>
    <div>
      <div
        class="chart-container"
        style="position: relative; height: 25vh; width: 25vw"
      >
        <canvas id="myChart"></canvas>
      </div>
    </div>

    <!-----------------END OF INSIGHTS ------------------>

    <div class="recent-orders">
      <h2>Recent Orders</h2>
      <table>
        <thread>
          <tr>
            <th>Product Name</th>
            <th>Product Number</th>
            <th>Payment</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thread>
        <tbody>
          <tr>
            <td>Foldable Mini Drone</td>
            <td>85631</td>
            <td>Due</td>
            <td class="warning">Pending</td>
            <td class="primary">Details</td>
          </tr>
        </tbody>
      </table>
      <a href="#">Show All</a>
    </div>
  </main>
  <!----------------------- EBD OF MAIN ------------------------->

  <div class="right">
    <div class="top">
      <button id="menu-btn">
        <span class="material-icons-sharp"> menu </span>
      </button>
      <div class="theme-toggler">
        <span class="material-icons-sharp active">light_mode</span>
        <span class="material-icons-sharp">dark_mode</span>
      </div>
      <div class="profile">
        <div class="info">
          <p>Hey, <b>Daniel</b></p>
          <small class="text-muted">Admin</small>
        </div>
        <div class="profile-photo">
          <img src="./images/profile-1.jpg" />
        </div>
      </div>
    </div>
    <!-- END OF TOP -->
    <div>
      <div style="float: right">
        <h2>Recent Updates</h2>
        <div class="updates">
          <div class="date">
            <div class="profile-photo">
              <img src="./images/profile-2.jpg" />
            </div>
            <div class="message">
              <p>
                <b>Mike Tyson</b> received his order or Night lion tech GPS
                drone.
              </p>
              <small class="text-muted">2 Minutes Ago</small>
            </div>
          </div>
        </div>
        <div class="updates">
          <div class="date">
            <div class="profile-photo">
              <img src="./images/profile-3.jpg" />
            </div>
            <div class="message">
              <p>
                <b>Mike Tyson</b> received his order or Night lion tech GPS
                drone.
              </p>
              <small class="text-muted">2 Minutes Ago</small>
            </div>
          </div>
        </div>
        <div class="updates">
          <div class="date">
            <div class="profile-photo">
              <img src="./images/profile-4.jpg" />
            </div>
            <div class="message">
              <p>
                <b>Mike Tyson</b> received his order or Night lion tech GPS
                drone.
              </p>
              <small class="text-muted">2 Minutes Ago</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!------------------------- END OF RECENT UPDATES ------------------------------->
    <div class="sales-analytics">
      <h2>통계</h2>
      <div class="item offline">
        <div class="icon">
          <span class="material-icons-sharp"> local_mall </span>
        </div>
        <div class="right">
          <div class="info">
            <h3>OFFLINE ORDERS</h3>
            <small class="text-muted">Last 24 Hours</small>
          </div>
          <h5 class="danger">-17%</h5>
          <h5>1100</h5>
        </div>
      </div>
      <div class="item online">
        <div class="icon">
          <span class="material-icons-sharp"> shopping_cart </span>
        </div>
        <div class="right">
          <div class="info">
            <h3>ONLINE ORDERS</h3>
            <small class="text-muted">Last 24 Hours</small>
          </div>
          <h5 class="success">+25%</h5>
          <h5>849</h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from 'chart.js/auto';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  mounted() {
    console.log('Component mounted.');
    const ctx = document.getElementById('myChart');

    const data = {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4,
        },
      ],
    };

    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
    });

    myChart;
  },
};
</script>

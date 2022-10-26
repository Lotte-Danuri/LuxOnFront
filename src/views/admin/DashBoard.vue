<template>
  <div class="dashContainer">
    <aside>
      <div class="top">
        <div class="logo">
          <img
            src="@/assets/logo/logo_black.png"
            style="width: 100px; height: 100px"
          />
          <h2 class="text-muted">Lux<span class="danger">ON</span></h2>
        </div>
        <div class="close" id="close-btn">
          <span class="material-icons-sharp">close</span>
        </div>
      </div>
      <div class="sidebar">
        <a href="#">
          <span class="material-icons-sharp">grid_view</span>
          <h3>Dashboard</h3>
        </a>
        <a href="#">
          <span class="material-icons-sharp">person_outline</span>
          <h3>Customers</h3>
        </a>
        <a href="#">
          <span class="material-icons-sharp">receipt_long</span>
          <h3>Orders</h3>
        </a>
        <a href="#">
          <span class="material-icons-sharp">insights</span>
          <h3>Analytics</h3>
        </a>
        <a href="#">
          <span class="material-icons-sharp">mail_outline</span>
          <h3>Messages</h3>
          <span class="message-count">26</span>
        </a>
        <a href="#">
          <span class="material-icons-sharp">settings</span>
          <h3>Settings</h3>
        </a>
        <a href="#">
          <span class="material-icons-sharp">add</span>
          <h3>Add Product</h3>
        </a>
        <a href="#">
          <span class="material-icons-sharp">logout</span>
          <h3>Logout</h3>
        </a>
      </div>
    </aside>
    <!-- --------------------------------------- END OF ASIDE ---------------------------- -->
    <main>
      <h1>Dashboard</h1>
      <div class="date">
        <input type="date" />
      </div>
      <div class="insights">
        <div class="sales">
          <span class="material-icons-sharp">analytics</span>
          <div class="middle">
            <div class="left">
              <h3>Total Sales</h3>
              <h1>$25,024</h1>
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
          <span class="material-icons-sharp">analytics</span>
          <div class="middle">
            <div class="left">
              <h3>Total Sales</h3>
              <h1>$25,024</h1>
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
        <div class="incomes">
          <span class="material-icons-sharp">analytics</span>
          <div class="middle">
            <div class="left">
              <h3>Total Sales</h3>
              <h1>$25,024</h1>
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
      <h2>Recent Updates</h2>
      <div class="updates">
        <div class="date">
          <div class="profile-photo">
            <img src="./images/profile-2.jpg" />
          </div>
          <div class="message">
            <p>
              <b>Mike Tyson</b> received his order or Night lion tech GPS drone.
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
              <b>Mike Tyson</b> received his order or Night lion tech GPS drone.
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
              <b>Mike Tyson</b> received his order or Night lion tech GPS drone.
            </p>
            <small class="text-muted">2 Minutes Ago</small>
          </div>
        </div>
      </div>
      <!------------------------- END OF RECENT UPDATES ------------------------------->
      <div class="sales-analytics">
        <h2>Sales Analytics</h2>
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
  </div>
</template>
<script>
const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');

menuBtn.addEventListener('click', () => {
  sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  sideMenu.style.display = 'none';
});

export default {
  components: {},
  data() {
    return {
      example: '',
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {},
};
</script>

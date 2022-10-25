<template>
  <div class="dashContainer">
    <aside>
      <div class="top">
        <div class="logo">
          <img src="@/assets/logo/logo_black.png" />
          <h2 class="text-muted">EGA<span class="danger">TOR</span></h2>
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
          <span class="material-icons-sharp">light_mode</span>
          <span class="material-icons-sharp">dark_mode</span>
        </div>
        <div class="profile">
          <div class="info">
            <p>Hey, <b>Daniel</b></p>
            <small class="text-muted">Admin</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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

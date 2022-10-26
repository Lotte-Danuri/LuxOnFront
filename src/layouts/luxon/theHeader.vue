<template>
  <section class="header_top">
    <nav class="navbar">
      <div class="navbar__logo">
        <router-link to="/main"
          ><img src="@/assets/logo/logo_black.png"
        /></router-link>
      </div>
      <ul class="navbar__menu">
        <div class="wrap">
          <div class="search">
            <input
              type="text"
              style="height: 36px"
              class="searchTerm"
              placeholder="검색어를 입력하세요"
            />
            <button type="submit" class="searchButton">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </ul>

      <ul class="navbar__icons">
        <li>
          <router-link to="/auth/MyLogin">
            <i class="fa-solid fa-right-to-bracket"></i>
            <p>로그인</p>
          </router-link>
        </li>
        <li>
          <i class="fa-solid fa-phone"></i>
          <p>고객센터</p>
        </li>
        <li>
          <i class="fa-solid fa-user"></i>
          <p>마이페이지</p>
        </li>
        <li>
          <i class="fa-regular fa-clock"></i>
          <p>최근본상품</p>
        </li>
        <li>
          <i class="fa-solid fa-bag-shopping"></i>
          <p>쇼핑백</p>
        </li>
      </ul>

      <a href="#" class="navbar__toogleBtn" @click="btnClick">
        <i class="fas fa-bars"></i>
      </a>
    </nav>
  </section>
  <section class="header_bottom">
    <nav class="navbar_bottom">
      <ul class="navbar__menu" style="margin-left: 200px; font-size: 15px">
        <li><a href="#">여성</a></li>
        <li><a href="#">남성</a></li>
        <li><a href="#">패션잡화</a></li>
        <li><a href="#">뷰티</a></li>
        <li><a href="#">골프</a></li>
        <li><a href="#">리빙</a></li>
        <li><a href="#">컬쳐</a></li>
        <li><a href="#">아동</a></li>
      </ul>
      <a href="#" class="navbar__toogleBtn" @click="btnClick">
        <i class="fas fa-bars"></i>
      </a>
    </nav>
  </section>
</template>
<script>
// const toggleBtn = document.querySelector('.navbar__toogleBtn');
const menu = document.querySelector('.navbar__menu');
const icons = document.querySelector('.navbar__icons');

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
  methods: {
    btnClick() {
      alert('test');
      menu.classList.toggle('active');
      icons.classList.toggle('active');
    },
  },
};
</script>

<style scoped>
:root {
  /* --text-color:
  --background-color:
  --accent-color: */
}

.header_bottom {
  margin: 0;
  font-family: 'Source Sans Pro';
  border-style: solid;
  border-color: gray;
  border-width: 1px 0px 0px 0px;
}

.navbar_bottom {
  border: #080808;
  background-color: rgb(250, 250, 250);
}

.navbar_bottom ul li a {
  color: gray;
}

img {
  width: 100px;
}

a {
  text-decoration: none;
  color: rgb(0, 0, 0);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fcfcfc;
  padding: 8px 12px;
}

.navbar__logo {
  font-size: 24px;
  color: white;
}

.navbar_logo i {
  color: #d49466;
}

.navbar__menu {
  display: flex;
  list-style: none;
  padding-left: 0;
  margin-bottom: -20px;
}

.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 3px solid black;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9dbfaf;
}

.searchTerm:focus {
  color: #080808;
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid #0f0f0f;
  background: black;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

/*Resize the wrap to see the search bar change!*/
.wrap {
  margin-left: -100px;
  width: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.navbar__menu li {
  padding: 8px 12px;
}

.navbar__menu li:hover {
  background-color: rgb(53, 53, 53);
  border-radius: 4px;
}

.navbar__menu li:hover a {
  background-color: rgb(53, 53, 53);
  color: white;
}

.navbar__icons {
  margin-bottom: -20px;
  list-style: none;
  color: rgb(14, 14, 14);
  display: flex;
  padding-left: 0;
}

.navbar__icons li {
  padding: 8px 12px;
}

.navbar__icons li i {
  font-size: 15px;
}

.navbar__icons li p {
  font-size: 8px;
}

.navbar__icons li i,
p {
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar__toogleBtn {
  display: none;
  position: absolute;
  right: 32px;
  font-size: 24px;
}

@media screen and (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 24px;
  }

  .navbar__menu {
    display: none;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .navbar__menu li {
    width: 100%;
    text-align: center;
  }

  .navbar__icons {
    justify-content: center;
    width: 100%;
  }

  .navbar__toogleBtn {
    display: block;
  }

  .navbar__menu.active,
  .navbar__icons.active {
    display: flex;
  }
}
</style>

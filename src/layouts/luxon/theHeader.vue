<template>
  <section class="header_top">
    <nav class="navbar">
      <div class="navbar__logo">
        <router-link to="/main"
          ><img style="margin-left: 10%" src="@/assets/logo/logo_black.png"
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
        <li v-if="state.localStorage.token == null">
          <router-link to="/login">
            <i class="fa-solid fa-right-to-bracket"></i>
            <p>로그인</p>
          </router-link>
        </li>
        <li v-else>
          <router-link to="/logout">
            <i class="fa-solid fa-right-to-bracket"></i>
            <p>로그아웃</p>
          </router-link>
        </li>
        <li>
          <i class="fa-solid fa-phone"></i>
          <p>고객센터</p>
        </li>
        <li>
          <router-link to="/mypage/order">
            <i class="fa-solid fa-user"></i>
            <p>마이페이지</p>
          </router-link>
        </li>
        <li>
          <i class="fa-regular fa-clock"></i>
          <p>최근본상품</p>
        </li>
        <li>
          <router-link :to="{name : 'cart'}">
            <i class="fa-solid fa-bag-shopping"></i>
            <p>쇼핑백</p>
          </router-link>
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
        <li><router-link to="/list">여성</router-link></li>
        <li><router-link to="/list">남성</router-link></li>
        <li><router-link to="/list">패션잡화</router-link></li>
        <li><router-link to="/list">뷰티</router-link></li>
        <li><router-link to="/list">골프</router-link></li>
        <li><router-link to="/list">리빙</router-link></li>
        <li><router-link to="/list">컬쳐</router-link></li>
        <li><router-link to="/list">아동</router-link></li>
      </ul>
      <a href="#" class="navbar__toogleBtn" @click="btnClick">
        <i class="fas fa-bars"></i>
      </a>
    </nav>
  </section>
</template>
<script>
import { reactive } from 'vue';
import { onMounted } from 'vue';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import axios from 'axios';

// const toggleBtn = document.querySelector('.navbar__toogleBtn');
const menu = document.querySelector('.navbar__menu');
const icons = document.querySelector('.navbar__icons');

export default {
  components: {},
  setup() {
    const state = reactive({
      localStorage: '',
    });

    onMounted(() => {
      state.localStorage = localStorage;
      if (localStorage.getItem('loginId') !== null) {
        // const cors = require('cors')

        // const corsOption = {
        //   origin: 'http://localhost:8080',
        //   credentials: true
        // }

        // createApp(App).use(cors(corsOption))
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
          apiKey: 'AIzaSyAHFnEL7qoOi2fQB9opoZeOFFy9MUH7GDM',
          authDomain: 'luxon-c4fb2.firebaseapp.com',
          projectId: 'luxon-c4fb2',
          storageBucket: 'luxon-c4fb2.appspot.com',
          messagingSenderId: '626968263040',
          appId: '1:626968263040:web:874cdbaa275151e4daa965',
          measurementId: 'G-ST05ZTCPJB',
        };

        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
        Notification.requestPermission().then(permission => {
          console.log('permission ', permission);
          if (permission !== 'granted') {
            alert('알림을 허용해주세요');
          }
        });

        // TODO: Send token to server for send notification
        getToken(messaging, {
          vapidKey:
            'BOX3DLO4QFmqhmQwbOUtXGFXqeGizpGhDx5GQ1WnkDTqp9nFRDc5WC1YK8VpJQ23SgOiiYvgygoQK2HvJ9b_U5c',
        })
          .then(currentToken => {
            if (currentToken) {
              axios
                .post(
                  'https://sbbro.xyz/api/chat/user/fcmToken',
                  {
                    userId: localStorage.getItem('loginId'),
                    fcmToken: currentToken,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ` + localStorage.getItem('token'),
                      contentType: 'application/json',
                    },
                  },
                )
                .catch(err => console.log(err));
            } else {
              console.log(
                'No registration token available. Request permission to generate one.',
              );
            }
          })
          .catch(err => {
            console.log('An error occurred while retrieving token. ', err);
          });

        // Handle received push notification at foreground
        onMessage(messaging, payload => {
          console.log(payload);
          alert(payload.data.message);
        });
      }
    });

    const btnClick = () => {
      alert('test');
      menu.classList.toggle('active');
      icons.classList.toggle('active');
    };

    return {
      state,
      btnClick,
    };
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

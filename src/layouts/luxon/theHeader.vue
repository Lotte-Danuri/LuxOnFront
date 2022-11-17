<template>
  <header style="background-color: white; height: 150px">
    <div style="margin-left: 10%; width: 80%">
      <section class="header_top">
        <nav class="navbar">
          <div class="navbar__logo">
            <router-link to="/main"
              ><img
                style="margin-left: 10%; width: 200px"
                src="@/assets/logo/logo_white_6.png"
            /></router-link>
          </div>
          <ul class="navbar__menu">
            <div class="wrap">
              <div class="search">
                <input
                  type="text"
                  style="height: 40px"
                  class="searchTerm"
                  placeholder="검색어를 입력하세요"
                  id="searchValue"
                  ref="ref_search"
                  @keyup.enter="searchBtn"
                >
                <button type="submit" class="searchButton" @click="searchBtn">
                  <i class="fa fa-search icon"></i>
                </button>
              </div>
            </div>
          </ul>

          <ul class="navbar__icons">
            <li v-if="state.localStorage.token == null">
              <router-link to="/login">
                <span class="material-symbols-outlined"> login </span>
                <!-- <i class="fa-solid fa-right-to-bracket"></i> -->
                <p>로그인</p>
              </router-link>
            </li>
            <li v-else>
              <router-link to="/logout">
                <span class="material-symbols-outlined"> login </span>
                <p>로그아웃</p>
              </router-link>
            </li>
            <li @click="sendMessage()">
              <!-- <i class="fa-solid fa-commenting"></i> -->
              <span class="material-symbols-outlined"> headset_mic </span>
              <p>고객센터</p>
            </li>
            <li>
              <router-link to="/mypage/order">
                <!-- <i class="fa-solid fa-user"></i> -->
                <span class="material-symbols-outlined">
person_filled
</span>
                <p>마이페이지</p>
              </router-link>
            </li>
            <!-- <li>
              <i class="fa-regular fa-clock"></i>
              <p>최근본상품</p>
            </li> -->
            <li>
              <router-link :to="{ name: 'cart' }">
                <!-- <i class="fa-solid fa-bag-shopping"></i> -->
                <span class="material-symbols-outlined">
shopping_cart
</span>
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
          <ul
            class="navbar__menu"
            style="margin-left: 200px; margin-top: -10px; font-size: 15px"
          >
            <li @click="reload">
              <router-link
                :to="{
                  name: 'MyList',
                  query: { id: 3 },
                }"
                >여성</router-link
              >
            </li>
            <li @click="reload">
              <router-link
                :to="{
                  name: 'MyList',
                  query: { id: 5 },
                }"
                >남성</router-link
              >
            </li>
            <li @click="reload">
              <router-link
                :to="{
                  name: 'MyList',
                  query: { id: 6 },
                }"
                >패션잡화</router-link
              >
            </li>
            <li @click="reload">
              <router-link
                :to="{
                  name: 'MyList',
                  query: { id: 7 },
                }"
                >뷰티</router-link
              >
            </li>
          </ul>
          <ul
            class="navbar__menu"
            style="margin-left: 900px; margin-top: -38px; font-size: 15px"
          ></ul>
          <a href="#" class="navbar__toogleBtn" @click="btnClick">
            <i class="fas fa-bars"></i>
          </a>
        </nav>
      </section>
    </div>
  </header>
</template>
<script>
import { reactive } from "vue";
import { onMounted } from "vue";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from "axios";
import { useRouter } from "vue-router";
import { getCurrentInstance } from "vue";

// const toggleBtn = document.querySelector('.navbar__toogleBtn');
const menu = document.querySelector(".navbar__menu");
const icons = document.querySelector(".navbar__icons");

export default {
  components: {},
  data() {
    return {
      searchValue: "",
    };
  },
  watch: {
    searchValue() {
      alert("search작동");
    },
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      localStorage: "",
      searchValue: "",
    });

    onMounted(() => {
      state.localStorage = localStorage;
      if (localStorage.getItem("login_id") !== null) {
        const firebaseConfig = {
          apiKey: "AIzaSyAHFnEL7qoOi2fQB9opoZeOFFy9MUH7GDM",
          authDomain: "luxon-c4fb2.firebaseapp.com",
          projectId: "luxon-c4fb2",
          storageBucket: "luxon-c4fb2.appspot.com",
          messagingSenderId: "626968263040",
          appId: "1:626968263040:web:874cdbaa275151e4daa965",
          measurementId: "G-ST05ZTCPJB",
        };

        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
        Notification.requestPermission().then((permission) => {
          console.log("permission ", permission);
          if (permission !== "granted") {
            alert("알림을 허용해주세요");
          }
        });

        // TODO: Send token to server for send notification
        getToken(messaging, {
          vapidKey:
            "BOX3DLO4QFmqhmQwbOUtXGFXqeGizpGhDx5GQ1WnkDTqp9nFRDc5WC1YK8VpJQ23SgOiiYvgygoQK2HvJ9b_U5c",
        })
          .then((currentToken) => {
            if (currentToken) {
              axios
                .post(
                  "https://sbbro.xyz/api/chat/user/fcmToken",
                  {
                    userId: localStorage.getItem("login_id"),
                    fcmToken: currentToken,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ` + localStorage.getItem("token"),
                      contentType: "application/json",
                    },
                  }
                )
                .catch((err) => console.log(err));
            } else {
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
          });

        // Handle received push notification at foreground
        onMessage(messaging, (payload) => {
          console.log(payload);
          alert(payload.data.message);
        });
      }
    });

    const emitter =
      getCurrentInstance().appContext.config.globalProperties.$emitter;
    const sendMessage = async () => {
      await axios
        .post(
          "https://sbbro.xyz/api/chat/chatRoom/chat",
          {
            id: null,
            content: "고객센터에 문의하기",
            contentType: "메세지",
            sendBy: localStorage.getItem("login_id"),
            sendTo: "admin",
            source: "",
          },
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        )
        .then(emitter.emit("chatShow"))
        .catch((err) => console.log(err));
    };

    const btnClick = () => {
      menu.classList.toggle("active");
      icons.classList.toggle("active");
    };

    const searchBtn = () => {
      let searchValue = document.getElementById("searchValue").value;
      // if (
      //   window.location.href.includes('list') &&
      //   decodeURI(window.location.href)
      //     .slice(window.location.href.indexOf('searchValue'))
      //     .slice(12) != searchValue
      // ) {
      //   searchValue = document.getElementById('searchValue').value;
      //   location.reload();
      // }
      router.push({
        name: "MyList",
        query: { searchValue: searchValue },
      });
    };

    // const set = t => {
    //   console.log(t);
    // };

    const reload = () => {
      location.reload();
    };

    return {
      state,
      btnClick,
      searchBtn,
      sendMessage,
      reload,
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

header {
  position: sticky;
  top: 0px;
  z-index: 999;
}

.header_bottom {
  margin: 0;
  font-family: "NotoSansKR,Malgun Gothic,arial,sans-serif";
  /* border-style: solid;
  border-color: gray;
  border-width: 1px 0px 0px 0px; */
}

.navbar_bottom {
  border: #080808;
  background-color: rgb(250, 250, 250);
}

.navbar_bottom ul li a {
  color: gray;
}

img {
  width: 120px;
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

/* .search {
  width: 120%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 110%;
  border: 3px solid black;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #000000;
}

.searchTerm:focus {
  color: #080808;
}

.searchButton {
  width: 40px;
  height: 40px;
  border: 1px solid #0f0f0f;
  background: black;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
} */

.search {
  position: relative;
  width: 100%;
  display: flex;
}

input {
  width: 100%;
  border: 2px solid #bbb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
}

.icon {
  position : absolute;
  width: 17px;
  top: 15px;
  right: 12px;
  margin: 0;
}

/*Resize the wrap to see the search bar change!*/
.wrap {
  margin-left: -100px;
  width: 30%;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.navbar__menu li {
  padding: 8px 12px;
}

.navbar__menu li:hover {
  background-color: rgb(53, 53, 53);
  border-radius: 4px;
  color: white;
}

.navbar__menu li:hover a {
  background-color: rgb(53, 53, 53);
  color: white;
}

.navbar__icons {
  margin-bottom: -40px;
  list-style: none;
  color: rgb(14, 14, 14);
  display: flex;
  padding-left: 0;
}

.navbar__icons li {
  padding: 8px 12px;
}

.navbar__icons li i {
  font-size: 25px;
}

.navbar__icons li p {
  font-size: 8px;
}

.navbar__icons li span,
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

<template>
  <section style="margin-top: 50px; margin-left: 100px">
    <div class="login_grid">
      <div>
        <img
          style="width: 100%; height: 100%"
          src="https://image.sivillage.com/upload/C00001/banner/5061/00/22100000021321020221017102900.jpg"
        />
      </div>
      <div class="inputDiv">
        <br />
        <h4>로그인</h4>
        <br />
        <input placeholder="아이디" />
        <input placeholder="비밀번호" />
        <br />
        <button
          style="
            background-color: black;
            color: white;
            width: 400px;
            height: 50px;
          "
        >
          로그인
        </button>
        <br />
        <button @click="kakaoLogin">
          <img src="@/assets/loginBtn/kakao_login.png" />
        </button>
        <img src="@/assets/loginBtn/naver_login.png" />
        <img src="@/assets/loginBtn/google_login.png" />
        <br />
        <router-link to="/auth/MySignup">
          <button
            style="
              background-color: white;
              color: black;
              width: 400px;
              height: 40px;
            "
          >
            회원가입
          </button>
        </router-link>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios';
export default {
  components: {},
  data() {
    return {
      example: '',
    };
  },
  methods: {
    kakaoLogin(){
      axios.get("localhost:8000/auth/oauth2/authorization/kakao").then((response)=>{
        console.log(response)
      })
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
};
</script>

<style>
.login_grid {
  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-rows: 100%;
}
.inputDiv {
  background-color: rgb(245, 245, 245);
  width: 80%;
  display: absolute;
  left: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.inputDiv input {
  width: 400px;
  height: 40px;
  margin-bottom: 20px;
}
.inputDiv img {
  width: 300px;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 10px;
}
</style>

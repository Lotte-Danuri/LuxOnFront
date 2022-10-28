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
        <kakaoLogin></kakaoLogin>
        <br />
        <br />
        <naver-login></naver-login>
        <br />
        <br />
        <button class="socialButton">
          <img src="@/assets/loginBtn/google_login.png" />
        </button>
        <br />
        <router-link to="/signup">
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
import { useRoute } from 'vue-router';
import kakaoLogin from '@/components/social_login/kakaoLogin.vue';
import NaverLogin from '@/components/social_login/naverLogin.vue';
import router from '@/router';
export default {
  components: {kakaoLogin, NaverLogin},
  data() {
    return {
      example: '',
    };
  },
  methods: {},
  beforeCreate() {},
  created() {
    if(localStorage.getItem('token')){
      router.push('/main')
    }
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
};
</script>

<style scoped>
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

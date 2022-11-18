<template>
  <section style="margin-top: 50px; margin-left: 40%">
    <div class="login_grid">
      <div class="inputDiv">
        <h2>로그인</h2>
        <br />
        <br />
        <input placeholder="아이디" v-model="state.id" />
        <input
          placeholder="비밀번호"
          type="password"
          v-model="state.password"
          v-on:keyup.enter="login"
        />
        <br />
        <button
          @click="login"
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
        <div
          style="
            display: grid;
            width: 400px;
            grid-template-columns: 40% 30%;
            margin-top: 10%;
            margin-left: 80%;
          "
        >
          <kakaoLogin></kakaoLogin>
          <naver-login></naver-login>
        </div>
        <br />
        <br />
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
            <h3 style="font-weight: bold">회원가입</h3>
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
import { reactive } from 'vue';
import { onBeforeMount } from 'vue';

export default {
  components: { kakaoLogin, NaverLogin },
  setup() {
    const state = reactive({
      id: '',
      password: '',
    });
    onBeforeMount(() => {
      if (localStorage.getItem('token')) {
        router.push('/main');
      }
    });

    const login = () => {
      axios
        .post('https://sbbro.xyz/api/auth/login', {
          id: state.id,
          password: state.password,
        })
        .then(response => {
          if (response.status == 200) {
            console.log(response);
            localStorage.setItem('token', response.headers.access_token);
            localStorage.setItem(
              'userName',
              decodeURIComponent(escape(window.atob(response.headers.name))),
            );
            localStorage.setItem('role', response.headers.role);
            localStorage.setItem('login_id', response.headers.login_id);
            if (response.headers.role == 0) {
              window.location.href = '/main';
            } else if (response.headers.role == 1) {
              window.location.href = '/admin/dashboard';
              localStorage.setItem('login_id', response.headers.store_id);
              localStorage.setItem('store_id', response.headers.store_id);
            } else if (response.headers.role == 2) {
              window.location.href = '/system/syspromotion';
              localStorage.setItem('store_id', response.headers.store_id);
            }
            // console.log(response.headers);
          }
        })
        .catch(response => {
          console.log(response);
          alert('로그인 실패');
        });
    };

    return {
      state,
      login,
    };
  },
};
</script>

<style scoped>
.login_grid {
  display: grid;
  grid-template-columns: 30% 40%;
  grid-template-rows: 100%;
  margin-top: 7%;
}
.inputDiv {
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
  border: solid 2px black;
}
.inputDiv img {
  width: 300px;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 10px;
}
</style>

<template>
  <button
    class="socialButton"
    @click="kakaoLogin"
    style="background-color: transparent"
  >
    <img
      src="//cdn-fo.sivillage.com/fo/assets/comm/image/icon_sns_kakaotalk.svg"
      style="width: 60px; height: 60px"
    />
  </button>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';
import router from '@/router';
export default {
  methods: {
    kakaoLogin() {
      axios
        .get('http://localhost:8000/auth/oauth/code/kakao')
        .then(response => {
          console.log(response);
          window.location.href = response.data;
        });
    },
  },
  created() {
    var route = useRoute();
    if (route.query.code != null) {
      localStorage.setItem('userinfo', route.query.code);
      axios
        .get(
          'http://localhost:8000/auth/oauth/token?code=' +
            route.query.code +
            '&service=kakao',
        )
        .then(response => {
          console.log(response);
          localStorage.setItem('token', response.data.accessToken);
          localStorage.setItem('userName', response.data.encodedName);
          localStorage.setItem('login_id', response.data.loginId);
          axios
            .post('http://localhost:8000/chat/user', {
              userId: response.data.loginId,
              userName: response.data.encodedName,
            })
            .then(response => {
              console.log(response);
            });
        })
        .finally(() => {
          window.location.href = '/main';
        });
    }
  },
};
</script>

<style>
.socialButton {
  border: none;
  width: 350px;
  height: 20px;
  margin-bottom: 20px;
}
.socialButton img {
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
}

#kakao_btn {
  color: #000000;
  font-weight: bold;
}
</style>

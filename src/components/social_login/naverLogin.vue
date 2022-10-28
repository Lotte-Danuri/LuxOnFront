<template>
  <button class="socialButton" @click="naverLogin">
    <img src="@/assets/loginBtn/naver_login.png" />
  </button>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";
import router from "@/router";
export default {
  methods: {
    naverLogin() {
      axios
        .get("https://sbbro.xyz/api/auth/oauth/code/naver")
        .then((response) => {
          console.log(response);
          window.location.href = response.data;
        });
    },
  },
  created() {
    var route = useRoute();
    if (route.query.code != null) {
      localStorage.setItem("userinfo", route.query.code);
      axios
        .get(
          "https://sbbro.xyz/api/auth/oauth/token?code=" +
            route.query.code +
            "&service=naver"
        )
        .then((response) => {
          console.log(response);
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("userName", response.data.encodedName);
        })
        .finally(() => {
          window.location.href = "/main"
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
</style>

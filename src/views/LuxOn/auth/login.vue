<template>
  <section style="margin-top: 50px; margin-left: 100px">
    <div class="container_grid">
      <div>
        <img
          style="width: 100%; height: 100%"
          src="https://image.sivillage.com/upload/C00001/banner/5061/00/22100000021321020221017102900.jpg"
        />
      </div>
      <div class="inputDiv">
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
        <img src="@/assets/loginBtn/kakao_login.png" />
        <img src="@/assets/loginBtn/naver_login.png" />
        <img src="@/assets/loginBtn/google_login.png" />
        <br />
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
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: '',
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

<style>
.container_grid {
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
  height: 60px;
  margin-bottom: 20px;
}
</style>

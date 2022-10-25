<!-- id: this.loginId,
password: this.password,
name: this.name,
gender: this.gender,
role: 0,
phoneNumber: this.phoneNumber,
address: this.address,
birthDate: this.birthDate -->

<template>
  <section style="margin-top: 50px; margin-left: 100px; margin-right: 100px">
    <div class="signup_grid">
      <div class="signDiv">
        <br />
        <h4>회원가입</h4>
        <br />
        <input placeholder="아이디" />
        <input placeholder="비밀번호" />
        <input placeholder="이름" />
        <input placeholder="성별" />
        <input placeholder="phone" />
        <input placeholder="주소" />
        <input placeholder="생일" />
        <div>
          <button>일반회원</button>
          <button>판매자</button>
        </div>
        <br />
        <button
          style="
            background-color: black;
            color: white;
            width: 300px;
            height: 50px;
          "
        >
          회원가입
        </button>
      </div>
      <div>
        <img
          style="width: 100%; height: 100%; margin-left: -100px"
          src="@/assets/img/cover-16.jpg"
        />
      </div>
    </div>
  </section>
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

<style>
.signup_grid {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 100%;
}
.signDiv {
  background-color: rgb(245, 245, 245);
  width: 80%;
  display: absolute;
  left: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.signDiv input {
  width: 300px;
  height: 40px;
  margin-bottom: 20px;
}
.signDiv img {
  width: 300px;
  height: 45px;
  margin-bottom: 20px;
}
</style>

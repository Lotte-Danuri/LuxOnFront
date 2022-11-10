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
        <input placeholder="아이디" v-model="state.id" />
        <input placeholder="비밀번호" v-model="state.password" />
        <input placeholder="이름" v-model="state.name" />
        <input placeholder="성별" v-model="state.gender" />
        <input placeholder="phone" v-model="state.phone" />
        <input placeholder="주소" v-model="state.address" />
        <input placeholder="생일" v-model="state.birthday" />
        <div>
          <button>일반회원</button>
          <button>판매자</button>
        </div>
        <br />
        <button
          @click="signUp"
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
import { reactive } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const state = reactive({
      id: '',
      password: '',
      name: '',
      gender: '',
      phone: '',
      address: '',
      birthday: '',
    });

    const signUp = () => {
      axios
        .post('https://sbbro.xyz/api/auth/users', {
          id: state.id,
          password: state.password,
          name: state.name,
          gender: state.gender,
          role: 0,
          birthDate: state.birthday,
          phoneNumber: state.phoneNumber,
          address: state.address,
        })
        .then(response => {
          axios
            .post('https://sbbro.xyz/api/chat/user', {
              userId: state.id,
              userName: state.name,
            })
            .then(response => {
              console.log(response);
            });
          console.log(response);
        });
    };
    return { state, signUp };
  },
};
</script>

<style scoped>
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

<!-- id: this.loginId,
password: this.password,
name: this.name,
gender: this.gender,
role: 0,
phoneNumber: this.phoneNumber,
address: this.address,
birthDate: this.birthDate -->

<template>
  <section style="margin-top: 50px; margin-left: 40%; margin-right: 100px">
    <div class="signup_grid">
      <div class="signDiv">
        <br />
        <h1>회원가입</h1>
        <br />
        <br />
        <br />
        <input placeholder="아이디" v-model="state.id" />
        <br />
        <input
          placeholder="비밀번호"
          type="password"
          v-model="state.password"
        />
        <p>숫자, 영문 포함 10자 이상</p>
        <p style="color: red">
          비밀번호는 10자 이상으로, 영문대소문자, 숫자 중 2가지 이상 조합으로
          공백없이 설정해 주세요.
        </p>
        <input
          placeholder="비밀번호 확인"
          type="password"
          v-model="state.password2"
        />
        <br />
        <input placeholder="이름" v-model="state.name" />
        <div class="wrapper">
          <input
            type="radio"
            name="select"
            id="option-1"
            checked
            v-bind:value="state.male"
            v-model="state.gender"
          />
          <input
            type="radio"
            name="select"
            id="option-2"
            v-bind:value="state.female"
            v-model="state.gender"
          />
          <label for="option-1" class="option option-1">
            <div class="dot"></div>
            <span>남성</span>
          </label>
          <label for="option-2" class="option option-2">
            <div class="dot"></div>
            <span>여성</span>
          </label>
        </div>
        <br />
        <input placeholder="핸드폰번호" v-model="state.phone" />
        <br />
        <div style="margin-left: 18px">
          <input placeholder="주소찾기를 눌러주세요" style="width: 180px" />
          <button
            style="
              background-color: black;
              width: 100px;
              height: 41px;
              margin-left: 20px;
              color: white;
            "
            @click="search"
          >
            주소찾기
          </button>
          <input
            type="text"
            id="big_address"
            placeholder="도로명주소"
            v-model="state.bigaddress"
          />
          <input
            type="text"
            id="small_address"
            placeholder="상세주소"
            v-model="state.smalladdress"
          />
        </div>
        <br />
        <input placeholder="생일" v-model="state.birthday" />
        <div class="wrapper2">
          <input
            type="radio"
            name="select2"
            id="option-3"
            checked
            v-bind:value="state.role1"
            v-model="state.rolePicked"
          />
          <input
            type="radio"
            name="select2"
            id="option-4"
            v-bind:value="state.role2"
            v-model="state.rolePicked"
          />
          <label for="option-3" class="option2 option-3">
            <div class="dot2"></div>
            <span>일반회원</span>
          </label>
          <label for="option-4" class="option2 option-4">
            <div class="dot2"></div>
            <span>판매자</span>
          </label>
        </div>
        <!-- {{ state.rolePicked }} -->
        <!-- <div>
          <label>
            <input
              type="radio"
              v-bind:value="state.role1"
              v-model="state.rolePicked"
            />
            일반회원
          </label>
          <label>
            <input
              type="radio"
              v-bind:value="state.role2"
              v-model="state.rolePicked"
            />
            판매자
          </label>
        </div> -->
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
    </div>
  </section>
</template>
<script>
import { reactive } from 'vue';
import axios from 'axios';
import router from '@/router';

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
      male: '남자',
      female: '여자',
      role1: '1',
      role2: '2',
      rolePicked: '',
      bigaddress: '',
      smalladdress: '',
    });

    const signUp = () => {
      state.address = state.bigaddress + state.smalladdress;
      axios
        .post('https://sbbro.xyz/api/auth/users', {
          id: state.id,
          password: state.password,
          name: state.name,
          gender: state.gender,
          role: state.rolePicked,
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
          router.push('/login');
        });
    };

    const search = () => {
      new window.daum.Postcode({
        oncomplete: data => {
          console.log(data);
          // this.address = data.roadAddress;
          document.getElementById('big_address').value = data.roadAddress;
          state.bigaddress = data.roadAddress;
        },
      }).open();
    };
    return { state, signUp, search };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lato:400,500,600,700&display=swap');
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
  border: 1px solid gray;
  font-size: 15px;
}
.signDiv img {
  width: 300px;
  height: 45px;
  margin-bottom: 20px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
}
html,
body {
  display: grid;
  height: 100%;
  place-items: center;
  background: #b4b4b4;
  font-family: 'Lato', sans-serif;
}
.wrapper {
  display: inline-flex;
  background: #fff;
  height: 100px;
  width: 350px;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
  padding: 20px 15px;
  /* box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.2); */
}
.wrapper .option {
  background: #fff;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 10px;
  border-radius: 5px;
  cursor: pointer;
  padding: 0 10px;
  border: 2px solid lightgrey;
  transition: all 0.3s ease;
}
.wrapper .option .dot {
  height: 20px;
  width: 20px;
  background: #d9d9d9;
  border-radius: 50%;
  position: relative;
}
.wrapper .option .dot::before {
  position: absolute;
  content: '';
  top: 4px;
  left: 4px;
  width: 12px;
  height: 12px;
  background: #979797;
  border-radius: 50%;
  opacity: 0;
  transform: scale(1.5);
  transition: all 0.3s ease;
}
input[type='radio'] {
  display: none;
}
#option-1:checked:checked ~ .option-1,
#option-2:checked:checked ~ .option-2 {
  border-color: #9c9c9c;
  background: #9b9b9b;
}
#option-1:checked:checked ~ .option-1 .dot,
#option-2:checked:checked ~ .option-2 .dot {
  background: #fff;
}
#option-1:checked:checked ~ .option-1 .dot::before,
#option-2:checked:checked ~ .option-2 .dot::before {
  opacity: 1;
  transform: scale(1);
}
.wrapper .option span {
  font-size: 15px;
  color: #808080;
}
#option-1:checked:checked ~ .option-1 span,
#option-2:checked:checked ~ .option-2 span {
  color: #fff;
}

/* ------------- */
.wrapper2 {
  display: inline-flex;
  background: #fff;
  height: 100px;
  width: 350px;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
  padding: 20px 15px;
  /* box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.2); */
}
.wrapper2 .option2 {
  background: #fff;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 10px;
  border-radius: 5px;
  cursor: pointer;
  padding: 0 10px;
  border: 2px solid lightgrey;
  transition: all 0.3s ease;
}
.wrapper2 .option2 .dot2 {
  height: 20px;
  width: 20px;
  background: #d9d9d9;
  border-radius: 50%;
  position: relative;
}
.wrapper2 .option2 .dot2::before {
  position: absolute;
  content: '';
  top: 4px;
  left: 4px;
  width: 12px;
  height: 12px;
  background: #979797;
  border-radius: 50%;
  opacity: 0;
  transform: scale(1.5);
  transition: all 0.3s ease;
}

#option-3:checked:checked ~ .option-3,
#option-4:checked:checked ~ .option-4 {
  border-color: #9c9c9c;
  background: #9b9b9b;
}
#option-3:checked:checked ~ .option-3 .dot2,
#option-4:checked:checked ~ .option-4 .dot2 {
  background: #fff;
}
#option-3:checked:checked ~ .option-3 .dot2::before,
#option-4:checked:checked ~ .option-4 .dot2::before {
  opacity: 1;
  transform: scale(1);
}
.wrapper2 .option2 span {
  font-size: 15px;
  color: #808080;
}
#option-3:checked:checked ~ .option-3 span,
#option-4:checked:checked ~ .option-4 span {
  color: #fff;
}
</style>

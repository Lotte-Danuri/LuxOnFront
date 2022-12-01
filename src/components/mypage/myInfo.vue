<template>
  <div class="mypage-shopping__content" style="">
    <form id="searchForm" method="post">
      <input type="hidden" name="page_idx" value="1" />
    </form>
    <br />
    <div class="signup_grid" style="margin-left: 33%; height: 700px">
      <div class="signDiv">
        <br />
        <h2>개인정보 수정</h2>
        <br />
        <br />
        <br />
        <input placeholder="아이디" v-model="state.id" />
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
          수정완료
        </button>
      </div>
    </div>
    <div class="product hide-scroll"></div>
  </div>
  <!-- mypage-shopping__content end -->
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import router from '@/router';

export default {
  setup() {
    const state = reactive({
      id: localStorage.getItem('login_id'),
      password: '',
      name: localStorage.getItem('userName'),
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
      console.log(state.id, state.name, state.phone, state.address);
      axios
        .post(
          'http://localhost:8000/member/info',
          {
            name: state.name,
            phoneNumber: state.phone,
            address: state.address,
          },
          {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem('token'),
            },
          },
        )
        .then(response => {
          console.log(response);
          router.push('/main');
        })
        .catch(err => console.log(err));
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
.product__thum a,
.product__thum .no-click {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.product__thum a img,
.product__thum .no-click img {
  width: 100%;
  mix-blend-mode: darken;
  -o-object-fit: cover;
  object-fit: cover;
}

.product__data .like-btn {
  position: absolute;
}

.detail__top-cart_sns ul li .like-btn {
  position: initial;
}

.sb-order__thum .like-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 2;
}

.like-btn {
  width: 24px;
  height: 24px;
  background-image: url(../image/icon_heart_light_off.svg);
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 0;
  text-indent: -9999px;
  overflow: hidden;
}

.like-btn.on {
  background-image: url(../image/icon_heart_light_on.svg);
}

.like-btn.on {
  -webkit-animation: like-on 1s;
  animation: like-on 1s;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
}

.product__thum .like-btn {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 12px;
  right: 12px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 2;
  font-size: 0;
  text-indent: -9999px;
  overflow: hidden;
  background-image: url(../image/ico_like_off_light.svg);
}

.product__thum .like-btn.on {
  background-image: url(../image/ico_like_on_light.svg);
}

.siv-product__thum .like-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
}

.filter__option .options .option .like-btn {
  width: 16px;
  height: 16px;
  margin: 0 6px;
}

.module-cody-recom__tab .product__list.type-w80px .product__thum {
  width: 80px;
  height: 120px;
}

.module-cody-recom__tab .product__list.type-w80px .product__thum > a {
  position: relative;
}

.module-cody-recom__tab
  .product__list.type-w80px
  .product__thum
  > a.active
  img {
  opacity: 1;
}

.module-cody-recom__tab
  .product__list.type-w80px
  .product__thum
  > a.active
  .module-cody-recom__bedge {
  background: #d99c63;
}

.module-cody-recom__tab
  .product__list.type-w80px
  .product__thum
  > a.active::after {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  border: 1px solid #d99c63;
  content: '';
}

.module-cody-recom__tab .product__list.type-w80px .product__thum > a img {
  opacity: 0.5;
}

.product__thum {
  aspect-ratio: 264/396;
}

.product__list.square-type .product__thum {
  aspect-ratio: 1/1;
}

.product__list.square-type .product__thum img {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.product__thum > a,
.product__thum > .no-click {
  justify-content: center;
}

.product__thum .siv-product__cover {
  z-index: 10;
}

.product__item.type_v .product__thum {
  width: 56px;
  height: 84px;
  background-color: #f8f8f8;
}

.product__thum {
  position: relative;
  width: 100%;
  height: auto;
  background: #f8f8f8;
}

.product__thum .like-btn {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 12px;
  right: 12px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 2;
  font-size: 0;
  text-indent: -9999px;
  overflow: hidden;
  background-image: url(../image/ico_like_off_light.svg);
}

.product__thum .like-btn.on {
  background-image: url(../image/ico_like_on_light.svg);
}

.product__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}

.product.swiper-container .product__list {
  flex-wrap: nowrap;
}

.product__list.gap--sml {
  gap: 12px;
}

.product__list.gap--mid {
  gap: 24px;
}

.product__list.gap--big {
  gap: 84px;
}

.product__list.thum--2.gap--sml .product__item,
.product__list.thum--2.gap--sml .product__more {
  flex-basis: calc((100% - 12px) / 2);
}

.product__list.thum--2.gap--sml .product__item:nth-of-type(2n),
.product__list.thum--2.gap--sml .product__more:nth-of-type(2n) {
  margin-right: -12px;
}

.product__list.thum--2.gap--mid .product__item,
.product__list.thum--2.gap--mid .product__more {
  flex-basis: calc((100% - 24px) / 2);
}

.product__list.thum--2.gap--mid .product__item:nth-of-type(2n),
.product__list.thum--2.gap--mid .product__more:nth-of-type(2n) {
  margin-right: -24px;
}

.product__list.thum--2.gap--big .product__item,
.product__list.thum--2.gap--big .product__more {
  flex-basis: calc((100% - 84px) / 2);
}

.product__list.thum--2.gap--big .product__item:nth-of-type(2n),
.product__list.thum--2.gap--big .product__more:nth-of-type(2n) {
  margin-right: -84px;
}

.product__list.thum--3.gap--sml .product__item,
.product__list.thum--3.gap--sml .product__more {
  flex-basis: calc((100% - 24px) / 3);
}

.product__list.thum--3.gap--sml .product__item:nth-of-type(3n),
.product__list.thum--3.gap--sml .product__more:nth-of-type(3n) {
  margin-right: -12px;
}

.product__list.thum--3.gap--mid .product__item,
.product__list.thum--3.gap--mid .product__more {
  flex-basis: calc((100% - 48px) / 3);
}

.product__list.thum--3.gap--mid .product__item:nth-of-type(3n),
.product__list.thum--3.gap--mid .product__more:nth-of-type(3n) {
  margin-right: -24px;
}

.product__list.thum--3.gap--big .product__item,
.product__list.thum--3.gap--big .product__more {
  flex-basis: calc((100% - 168px) / 3);
}

.product__list.thum--3.gap--big .product__item:nth-of-type(3n),
.product__list.thum--3.gap--big .product__more:nth-of-type(3n) {
  margin-right: -84px;
}

.product__list.thum--4.gap--sml .product__item,
.product__list.thum--4.gap--sml .product__more {
  flex-basis: calc((100% - 36px) / 4);
}

.product__list.thum--4.gap--sml .product__item:nth-of-type(4n),
.product__list.thum--4.gap--sml .product__more:nth-of-type(4n) {
  margin-right: -12px;
}

.product__list.thum--4.gap--mid .product__item,
.product__list.thum--4.gap--mid .product__more {
  flex-basis: calc((100% - 72px) / 4);
}

.product__list.thum--4.gap--mid .product__item:nth-of-type(4n),
.product__list.thum--4.gap--mid .product__more:nth-of-type(4n) {
  margin-right: -24px;
}

.product__list.thum--4.gap--big .product__item,
.product__list.thum--4.gap--big .product__more {
  flex-basis: calc((100% - 252px) / 4);
}

.product__list.thum--4.gap--big .product__item:nth-of-type(4n),
.product__list.thum--4.gap--big .product__more:nth-of-type(4n) {
  margin-right: -84px;
}

.product__list.thum--5.gap--sml .product__item,
.product__list.thum--5.gap--sml .product__more {
  flex-basis: calc((100% - 48px) / 5);
}

.product__list.thum--5.gap--sml .product__item:nth-of-type(5n),
.product__list.thum--5.gap--sml .product__more:nth-of-type(5n) {
  margin-right: -12px;
}

.product__list.thum--5.gap--mid .product__item,
.product__list.thum--5.gap--mid .product__more {
  flex-basis: calc((100% - 96px) / 5);
}

.product__list.thum--5.gap--mid .product__item:nth-of-type(5n),
.product__list.thum--5.gap--mid .product__more:nth-of-type(5n) {
  margin-right: -24px;
}

.product__list.thum--5.gap--big .product__item,
.product__list.thum--5.gap--big .product__more {
  flex-basis: calc((100% - 336px) / 5);
}

.product__list.thum--5.gap--big .product__item:nth-of-type(5n),
.product__list.thum--5.gap--big .product__more:nth-of-type(5n) {
  margin-right: -84px;
}

.product__list.thum--6.gap--sml .product__item,
.product__list.thum--6.gap--sml .product__more {
  flex-basis: calc((100% - 60px) / 6);
}

.product__list.thum--6.gap--sml .product__item:nth-of-type(6n),
.product__list.thum--6.gap--sml .product__more:nth-of-type(6n) {
  margin-right: -12px;
}

.product__list.thum--6.gap--mid .product__item,
.product__list.thum--6.gap--mid .product__more {
  flex-basis: calc((100% - 120px) / 6);
}

.product__list.thum--6.gap--mid .product__item:nth-of-type(6n),
.product__list.thum--6.gap--mid .product__more:nth-of-type(6n) {
  margin-right: -24px;
}

.product__list.thum--6.gap--big .product__item,
.product__list.thum--6.gap--big .product__more {
  flex-basis: calc((100% - 420px) / 6);
}

.product__list.thum--6.gap--big .product__item:nth-of-type(6n),
.product__list.thum--6.gap--big .product__more:nth-of-type(6n) {
  margin-right: -84px;
}

.product__list.exception {
  gap: 0;
}

.product__list.square-type .product__thum {
  aspect-ratio: 1/1;
}

.product__list.square-type .product__thum img {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.signup_grid {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 100%;
}
.signDiv {
  background-color: rgb(255, 255, 255);
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

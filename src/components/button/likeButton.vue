<template>
  <button @click="clickButton" style="background-color: transparent">
    <img
      height="50"
      :src="state.imgSrc"
      id="like_btn"
      style="background-color: transparent"
    />
  </button>
</template>

<script>
import { reactive, ref } from 'vue';
import { onBeforeMount } from 'vue';
import likeImg from '@/assets/img/heart_icon.png';
import unLikeImg from '@/assets/img/heart_icon_unlike.png';
import axios from 'axios';
import { getCurrentInstance } from 'vue';
import Swal from 'sweetalert2';

export default {
  props: {
    productCode: String,
  },
  setup(props) {
    const globalProperties =
      getCurrentInstance().appContext.config.globalProperties;

    const state = reactive({
      buttonCheck: false,
      imgSrc: '',
      checkingLike: '',
      token: localStorage.getItem('token'),
    });

    onBeforeMount(async () => {
      if (globalProperties.$isLogin() == false) {
        state.imgSrc = unLikeImg;
        return;
      }

      await checkLike();
      if (state.checkingLike == true) {
        state.imgSrc = likeImg;
        state.buttonCheck = true;
      } else {
        state.imgSrc = unLikeImg;
      }
    });

    const checkLike = async () => {
      await axios
        .post(
          'http://localhost:8000/member/likes/check',
          {
            productCode: props.productCode,
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          },
        )
        .then(response => {
          // console.log(response);
          state.checkingLike = response.data;
        });
    };

    const clickButton = async () => {
      if (globalProperties.$isLogin() == false) {
        Swal.fire('로그인이 필요합니다.');
        return;
      }

      console.log(state.buttonCheck);
      if (state.buttonCheck == false) {
        await axios
          .post(
            'http://localhost:8000/member/likes',
            {
              productCode: props.productCode,
            },
            {
              headers: {
                Authorization: 'Bearer ' + state.token,
              },
            },
          )
          .then(response => {
            console.log(response);
            state.buttonCheck = !state.buttonCheck;
            state.imgSrc = likeImg;
          });
      } else {
        await axios
          .delete('http://localhost:8000/member/likes', {
            data: {
              productCode: props.productCode,
            },
            headers: {
              Authorization: 'Bearer ' + state.token,
            },
          })
          .then(response => {
            console.log(response);
            state.buttonCheck = !state.buttonCheck;
            state.imgSrc = unLikeImg;
          });
      }
    };
    return { state, clickButton, checkLike };
  },
};
</script>

<style></style>

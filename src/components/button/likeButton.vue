<template>
  <button @click="clickButton">
    <img height="50" :src="state.imgSrc" id="like_btn" />
  </button>
</template>

<script>
import { reactive, ref } from 'vue';
import { onBeforeMount } from 'vue';
import likeImg from '@/assets/img/heart_icon.png';
import unLikeImg from '@/assets/img/heart_icon_unlike.png';
import axios from 'axios';
import { prop } from 'dom7';
import { onMounted } from 'vue';

export default {
  props: {
    productCode: String,
  },
  setup(props) {
    // if (localStorage.getItem('token') == null) {
    //   document.getElementById('like_btn').src = likeImg;
    // }

    const state = reactive({
      buttonCheck: false,
      imgSrc: '',
      checkingLike: '',
      token: localStorage.getItem('token'),
    });

    onBeforeMount(async () => {
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
          'https://sbbro.xyz/api/member/likes/check',
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
          console.log(response);
          state.checkingLike = response.data;
        });
    };

    const clickButton = async () => {
      console.log(state.buttonCheck);
      if (state.buttonCheck == false) {
        await axios
          .post(
            'https://sbbro.xyz/api/member/likes',
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
          .delete('https://sbbro.xyz/api/member/likes', {
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

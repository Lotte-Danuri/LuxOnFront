<template>
  <button @click="clickButton">
    <img height="50" :src="state.imgSrc" />
  </button>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import { onBeforeMount } from '@vue/runtime-core';
import likeImg from '@/assets/img/heart_icon.png';
import unLikeImg from '@/assets/img/heart_icon_unlike.png';

export default {
  setup() {
    const state = reactive({
        buttonCheck : false,
        imgSrc :'',
    })

    onBeforeMount(()=>{
        if(checkLike()){
            state.imgSrc = likeImg;
        }else{
            state.imgSrc = unLikeImg;
        }
    })

    const checkLike = ()=>{
        return state.buttonCheck;
    }

    const clickButton= ()=>{
        console.log(state.buttonCheck)
        if(state.buttonCheck == false){
            state.buttonCheck = !state.buttonCheck
            state.imgSrc = likeImg
        }
        else{
            state.buttonCheck = !state.buttonCheck
            state.imgSrc = unLikeImg;
        }
    }

    return {state, clickButton, checkLike,};
  },
};
</script>

<style></style>

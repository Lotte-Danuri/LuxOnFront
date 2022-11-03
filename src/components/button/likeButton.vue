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
import axios from 'axios';
import { prop } from 'dom7';

export default {
  props:{
    productCode : String
  },
  setup(props) {
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
      axios.get("https://sbbro.xyz/api/member/likes/check",{
        productCode : props.productCode
      },{
        headers : {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      }).then((response)=>{
        console.log(response)
      })
      
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

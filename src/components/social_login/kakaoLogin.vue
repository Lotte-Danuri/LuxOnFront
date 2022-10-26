<template>
         <button class="socialButton" @click="kakaoLogin">
          <img src="@/assets/loginBtn/kakao_login_large_narrow.png" />
        </button>
</template>

<script>
import axios from 'axios'
import { useRoute } from 'vue-router'
import router from '@/router'
export default {
    methods: {
        kakaoLogin(){
      // axios.get("localhost:8000/auth/code").then((response)=>{
        // console.log(response)
        // window.location.href = response.data
        window.location.href = "https://kauth.kakao.com/oauth/authorize?client_id=8b40c9e82abc0e1e377694b7e9d7297e&redirect_uri=http://localhost:5173/login/kakao&response_type=code"
      // })
    }
    },
    created() {
        var route = useRoute()
        if(route.query.code != null){
            console.log("백엔드로 보내기")
            console.log(route.query.code)
            localStorage.setItem("userinfo",route.query.code)
            // axios.get("code 보낼 url").then((response)=>{
            //     localStorage.setItem("token")
            //     localStorage.setItem("userName")
            // })
            // .finally(()=>{
                // })
            router.push("/main")
        }
    }
}
</script>

<style>

</style>
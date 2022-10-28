<template>
  
</template>

<script>
import router from '@/router';
import { onBeforeMount } from '@vue/runtime-core';

export default {
    setup() {
        
        onBeforeMount(()=>{
            localStorage.removeItem('token')
            localStorage.removeItem('userName')
            window.location.href='/main'
        })
        return {
        }
    },
}
</script>

<style>

</style>
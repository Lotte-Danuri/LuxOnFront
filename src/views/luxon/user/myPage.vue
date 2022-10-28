<template>
    <section class="ee-contents mypage-shopping"><br>
        <div class="pc-wrap">
            <div class="mypage-shopping__container">
                <left-bar></left-bar>

                <router-view>
                </router-view>
                
            </div>
        </div>
    </section>
</template>

<script>
import leftBar from '@/components/mypage/leftBar.vue'
import MainContent from '@/components/mypage/mainContent.vue'
import { onBeforeMount } from '@vue/runtime-core'
import router from '@/router'
export default {
  components: { leftBar, MainContent },
  setup() {
    onBeforeMount(()=>{
      router.push('/mypage/order')
    })
    return {
      
    }
  },
}
</script>

<style>
.mypage-shopping__container {
  display: flex;
  align-items: flex-start;
  margin-top: 24px;
}
.ee-contents {
  min-width: 1440px;
  margin: 0 auto;
  padding-bottom: 120px;
}

.header ~ .ee-contents {
  --header-height: 137px;
  --header-height-slim: 63px;
}
.header:not(.is-slim) ~ .ee-contents {
  --visible-header-height: 137px;
}
.header.is-slim ~ .ee-contents {
  --visible-header-height: 63px;
}
.header.has-banner ~ .ee-contents {
  --header-height: 227px;
  --header-height-slim: 153px;
}
.header.has-banner:not(.is-slim) ~ .ee-contents {
  --visible-header-height: 227px;
}
.header.has-banner.is-slim ~ .ee-contents {
  --visible-header-height: 153px;
}
.jaju-header ~ .ee-contents {
  --header-height: 152px;
  --header-height-slim: 106px;
}
.jaju-header.has-banner ~ .ee-contents {
  --header-height: 252px;
  --header-height-slim: 206px;
}
.jaju-header:not(.is-slim) ~ .ee-contents {
  --visible-header-height: 152px;
}
.jaju-header.is-slim ~ .ee-contents {
  --visible-header-height: 106px;
}
.jaju-header.has-banner:not(.is-slim) ~ .ee-contents {
  --visible-header-height: 252px;
}
.jaju-header.has-banner.is-slim ~ .ee-contents {
  --visible-header-height: 206px;
}
.pc-wrap {
  position: relative;
  margin: 0 auto;
  width: 1416px;
  padding: 0 12px;
}
.header.is-slim .header__bottom .pc-wrap {
  width: 960px;
  gap: 40px;
  justify-content: space-between;
  padding: 0;
}
.header.is-slim .header__bottom .pc-wrap .header__bottom-right-wrap {
  padding-right: 40px;
}
.header.is-slim .header__bottom .pc-wrap .header__bottom-left,
.header.is-slim .header__bottom .pc-wrap .header__bottom-right {
  gap: 32px;
}
.header.is-slim .header__bottom .pc-wrap .header__bottom-left a,
.header.is-slim .header__bottom .pc-wrap .header__bottom-right a {
  height: 60px;
}
.header.is-slim .header__bottom .pc-wrap .header__bottom-left .nav__debs a,
.header.is-slim .header__bottom .pc-wrap .header__bottom-right .nav__debs a {
  height: 36px;
}
.header.is-slim .header__bottom .pc-wrap .header__bottom-left .nav__debs,
.header.is-slim .header__bottom .pc-wrap .header__bottom-right .nav__debs {
  top: 60px;
}
.header.is-slim .header__bottom .header__bottom-left-wrap {
  margin-left: -40px;
}
.header__top .pc-wrap {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88px;
  overflow-x: visible;
  padding: 0;
}
.header__top.hidden {
  display: none;
}
.header__bottom .pc-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}
.menu .menu-title {
  font-size: 16px;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
}
.menu ul li a {
  display: block;
  height: 36px;
  font-size: 14px;
  font-weight: 400;
  color: #787878;
  line-height: 36px;
}
.menu ul li.on a {
  color: #000;
}
.mypage-lnb {
  width: 208px;
  padding: 23px 24px 22px;
  margin-right: 16px;
  border: 1px solid #e0e0e0;
  background: #fff;
  box-sizing: border-box;
  align-self: baseline;
}
.mypage-lnb__title {
  height: 32px;
  padding: 19px 0 18px;
  margin: 0 0 1px;
  color: #131922;
  font-size: 28px;
  line-height: 32px;
  font-weight: bold;
}
.mypage-lnb__set .menu {
  padding-bottom: 23px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 23px;
}
.mypage-lnb__set .menu .menu-title {
  font-size: 16px;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
}
.mypage-lnb__set .menu ul li a {
  display: block;
  height: 36px;
  font-size: 14px;
  font-weight: 400;
  color: #787878;
  line-height: 36px;
}
.mypage-lnb__set .menu ul li.on a {
  color: #000;
}
.mypage-lnb__set .shinsegae p {
  margin-bottom: 90px;
}
.mypage-lnb__set .shinsegae p a {
  line-height: 1.5;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  word-break: keep-all;
}
.mypage-lnb__set .certified-button {
  padding: 22px 24px;
  padding-right: 34px;
  background: #f8f8f8;
}
.mypage-lnb__set .certified-button button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 114px;
  font-size: 14px;
  font-weight: 500;
  color: #131922;
  text-align: left;
}
.mypage-lnb__set .certified-button button img {
  width: 20px;
  height: 20px;
}
.mypage-shopping__content {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  width: 1192px;
  min-height: 1467px;
  padding: 40px;
  box-sizing: border-box;
}
</style>